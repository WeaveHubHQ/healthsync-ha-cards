import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "../styles/shared";
import { FitnessCardBaseConfig, HomeAssistant, MetricConfig } from "../types";
import { formatTrend, guessMetricName, metricDisplay, parseNumber } from "../utils/formatting";
import { computeLocalize } from "../localize";
import { normalizeMetrics, getPeriod } from "../utils/metrics";
import { computeTrend, previousFromEntity, TrendResult, fetchHistorySeries } from "../utils/history";
import { sparkline } from "../components/sparkline";

@customElement("fitness-body-metrics-card")
export class FitnessBodyMetricsCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: FitnessCardBaseConfig;
  @state() private trends: Record<string, TrendResult> = {};
  @state() private historySeries: Record<string, number[]> = {};

  static styles = [
    cardStyles,
    css`
      .trend {
        display: inline-flex;
        align-items: center;
        gap: 4px;
        font-size: 0.85rem;
        color: var(--secondary-text-color);
      }
      .trend.up {
        color: var(--success-color, var(--primary-color));
      }
      .trend.down {
        color: var(--error-color, #ef5350);
      }
    `
  ];

  static async getConfigElement() {
    return document.createElement("fitness-body-metrics-card-editor");
  }

  public setConfig(config: FitnessCardBaseConfig): void {
    if (!config.metrics || !Array.isArray(config.metrics) || config.metrics.length === 0) {
      throw new Error("Add a metrics array with body metrics");
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

  private previousValue(entity?: any): number | null {
    return previousFromEntity(entity);
  }

  private trendIcon(diff: number): string {
    if (diff > 0) return "mdi:arrow-up-bold";
    if (diff < 0) return "mdi:arrow-down-bold";
    return "mdi:minus";
  }

  private renderMetric(metric: MetricConfig) {
    const { value, text, entity } = metricDisplay(this.hass, metric);
    const name = guessMetricName(metric, entity);
    const icon = metric.icon ?? entity?.attributes?.icon;
    const trend = this.trends[metric.entity ?? ""];
    const previous = this.previousValue(entity);
    const diff =
      trend?.diff !== undefined
        ? trend.diff
        : value !== null && previous !== null
          ? value - previous
          : null;

    return html`
      <div class="metric ${this.config?.compact ? "compact" : ""}">
        <div class="label">
          ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
          <span>${name}</span>
        </div>
        <div class="value">${text}</div>
        <div class="subtle">
          ${diff !== null
            ? html`<span class="trend ${diff > 0 ? "up" : diff < 0 ? "down" : ""}">
                <ha-icon .icon=${this.trendIcon(diff)}></ha-icon>
                ${formatTrend(diff, metric.unit_override ?? entity?.attributes?.unit_of_measurement)}
                (${this.localize("label.vs_previous", {
                  period: this.localize(`label.period.${getPeriod(this.config?.period)}`) ||
                    getPeriod(this.config?.period)
                })})
              </span>`
            : html`<span class="trend">${this.localize("label.no_previous")}</span>`}
        </div>
        ${this.config?.history && metric.entity && this.historySeries[metric.entity]
          ? html`<div>${sparkline(this.historySeries[metric.entity])}</div>`
          : nothing}
      </div>
    `;
  }

  protected render() {
    if (!this.config) return nothing;
    return html`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.body_title")}</div>
          <div class="subtle">${this.localize(`label.period.${getPeriod(this.config?.period)}`)}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((metric) => this.renderMetric(metric))}
        </div>
      </ha-card>
    `;
  }
}
