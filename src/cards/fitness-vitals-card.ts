import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "../styles/shared";
import { FitnessCardBaseConfig, HomeAssistant, MetricConfig, RangeConfig } from "../types";
import { evaluateRange, formatTrend, guessMetricName, metricDisplay, parseNumber } from "../utils/formatting";
import { computeLocalize } from "../localize";
import { normalizeMetrics, getPeriod } from "../utils/metrics";
import { computeTrend, previousFromEntity, TrendResult, fetchHistorySeries } from "../utils/history";
import { resolveZones } from "../utils/zones";
import { sparkline } from "../components/sparkline";

@customElement("fitness-vitals-card")
export class FitnessVitalsCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: FitnessCardBaseConfig;
  @state() private trends: Record<string, TrendResult> = {};
  @state() private historySeries: Record<string, number[]> = {};

  static styles = [
    cardStyles,
    css`
      .metric {
        position: relative;
      }
      .status-chip {
        align-self: flex-start;
      }
    `
  ];

  static async getConfigElement() {
    return document.createElement("fitness-vitals-card-editor");
  }

  public setConfig(config: FitnessCardBaseConfig): void {
    if (!config.metrics || !Array.isArray(config.metrics) || config.metrics.length === 0) {
      throw new Error("Add a metrics array with at least one entry");
    }
    this.config = { ...config, metrics: normalizeMetrics(config.metrics, config.preset) };
  }

  public getCardSize(): number {
    return 3;
  }

  protected updated(changed: Map<string, any>) {
    if ((changed.has("hass") || changed.has("config")) && this.config) {
      this.loadTrends();
      this.loadHistory();
    }
  }

  private async loadTrends() {
    if (!this.config || !this.hass) return;
    const period = getPeriod(this.config.period);
    const trendMap: Record<string, TrendResult> = { ...this.trends };
    await Promise.all(
      this.config.metrics.map(async (metric) => {
        const entityId = metric.entity ?? "";
        const entity = entityId ? this.hass?.states?.[entityId] : undefined;
        if (period === "current") {
          const current = entity ? parseNumber(entity.state) : null;
          const previous = previousFromEntity(entity);
          trendMap[entityId] = {
            current,
            previous,
            diff: current !== null && previous !== null ? current - previous : null,
            label: period
          };
          return;
        }
        if (!entityId) {
          trendMap[entityId] = { current: null, previous: null, diff: null, label: period };
          return;
        }
        const trend = await computeTrend(this.hass!, metric.trend_entity ?? entityId, period);
        trendMap[entityId] = trend;
      })
    );
    this.trends = trendMap;
  }

  private async loadHistory() {
    if (!this.config || !this.hass || !this.config.history) return;
    const days = this.config.history_window_days ?? 7;
    const points = this.config.history_points ?? 24;
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    const series: Record<string, number[]> = { ...this.historySeries };
    await Promise.all(
      this.config.metrics
        .filter((m) => m.entity)
        .map(async (metric) => {
          const id = metric.entity!;
          const values = await fetchHistorySeries(this.hass!, id, start, end, points);
          series[id] = values;
        })
    );
    this.historySeries = series;
  }

  private localize(key: string, vars?: Record<string, string | number>): string {
    return computeLocalize(this.hass)(key, vars);
  }

  private renderTrend(metric: MetricConfig, unit?: string) {
    if (this.config?.show_trends === false) return nothing;
    const trend = this.trends[metric.entity ?? ""];
    if (!trend || trend.diff === null) return nothing;
    const period = getPeriod(this.config?.period);
    const periodLabel = this.localize(`label.period.${period}`) || period;
    const compare = this.localize("label.vs_previous", { period: periodLabel });
    return html`<div class="subtle">
      ${this.localize("label.trend")} (${compare}): ${formatTrend(trend.diff, unit, metric.decimals)}
    </div>`;
  }

  private defaultRanges(metric: MetricConfig, name: string): RangeConfig | undefined {
    const lowered = name.toLowerCase();
    if (lowered.includes("oxygen") || lowered.includes("spo2")) {
      return { low: 92, normal: [95, 100] };
    }
    if (lowered.includes("respiratory")) {
      return { low: 10, high: 24, normal: [12, 20] };
    }
    if (lowered.includes("resting") || lowered.includes("heart rate")) {
      return { low: 45, high: 110, normal: [55, 95] };
    }
    if (lowered.includes("variability") || lowered.includes("hrv")) {
      return { low: 15, normal: [20, 150] };
    }
    if (lowered.includes("glucose")) {
      return { low: 70, high: 180, normal: [80, 140] };
    }
    return metric.ranges as RangeConfig | undefined;
  }

  private renderMetric(metric: MetricConfig) {
    const { value, text, entity } = metricDisplay(this.hass, metric);
    const name = guessMetricName(metric, entity);
    const icon = metric.icon ?? entity?.attributes?.icon;
    const ranges = resolveZones(metric, this.config?.zones) ?? metric.ranges ?? this.defaultRanges(metric, name);
    const { status, band } = evaluateRange(value, ranges);

    const statusLabel =
      band?.label ??
      (status === "low"
        ? this.localize("label.low")
        : status === "high"
          ? this.localize("label.high")
          : status === "normal"
            ? this.localize("label.ok")
            : "");

    return html`
      <div class="metric ${this.config?.compact ? "compact" : ""}">
        <div class="label">
          ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
          <span>${name}</span>
          ${statusLabel
            ? html`<span class="pill status-${status ?? "normal"} status-chip">${statusLabel}</span>`
            : nothing}
        </div>
        <div class="value status-${status ?? "normal"}">${text}</div>
        ${this.renderTrend(metric, metric.unit_override ?? entity?.attributes?.unit_of_measurement)}
        ${this.config?.history && metric.entity && this.historySeries[metric.entity]
          ? html`<div>${sparkline(this.historySeries[metric.entity])}</div>`
          : nothing}
        ${band?.min !== undefined || band?.max !== undefined
          ? html`<div class="subtle">
              ${band.min !== undefined ? `≥ ${band.min}` : ""} ${band.max !== undefined
                ? `≤ ${band.max}`
                : ""}
            </div>`
          : nothing}
      </div>
    `;
  }

  protected render() {
    if (!this.config) return nothing;
    return html`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.vitals_title")}</div>
          <div class="subtle">${this.localize(`label.period.${getPeriod(this.config.period)}`)}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((metric) => this.renderMetric(metric))}
        </div>
      </ha-card>
    `;
  }
}
