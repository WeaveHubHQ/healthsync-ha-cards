import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "../styles/shared";
import { HomeAssistant, MetricConfig, OverviewCardConfig } from "../types";
import { formatTrend, goalValue, guessMetricName, metricDisplay, progressPercent } from "../utils/formatting";
import { computeLocalize } from "../localize";
import { normalizeMetrics, getPeriod } from "../utils/metrics";
import { computeTrend, previousFromEntity, TrendResult } from "../utils/history";

@customElement("fitness-overview-card")
export class FitnessOverviewCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: OverviewCardConfig;
  @state() private trends: Record<string, TrendResult> = {};

  static styles = [
    cardStyles,
    css`
      .primary-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
        gap: 12px;
      }
      .secondary {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: 12px;
      }
      .chip-value {
        font-weight: 700;
      }
      .progress-ring {
        width: 32px;
        height: 32px;
        border-radius: 50%;
        background: var(--divider-color);
        position: relative;
      }
      .progress-ring::after {
        content: "";
        position: absolute;
        inset: 4px;
        border-radius: 50%;
        background: var(--card-background-color, var(--ha-card-background, #1e1e1e));
      }
      .progress-fill {
        position: absolute;
        inset: 0;
        border-radius: 50%;
      }
    `
  ];

  static async getConfigElement() {
    return document.createElement("fitness-overview-card-editor");
  }

  public setConfig(config: OverviewCardConfig): void {
    if (!config.primary_metrics || !Array.isArray(config.primary_metrics) || config.primary_metrics.length === 0) {
      throw new Error("Add primary_metrics");
    }
    this.config = {
      ...config,
      primary_metrics: normalizeMetrics(config.primary_metrics, config.preset),
      secondary_metrics: normalizeMetrics(config.secondary_metrics ?? [], config.preset)
    };
  }

  public getCardSize(): number {
    return 4;
  }

  protected updated(changed: Map<string, any>) {
    if ((changed.has("hass") || changed.has("config")) && this.config) {
      this.loadTrends();
    }
  }

  private async loadTrends() {
    if (!this.config || !this.hass) return;
    const period = getPeriod(this.config.period);
    const trendMap: Record<string, TrendResult> = { ...this.trends };
    const allMetrics = [...this.config.primary_metrics, ...(this.config.secondary_metrics ?? [])];
    await Promise.all(
      allMetrics.map(async (metric) => {
        const entityId = metric.entity ?? "";
        const entity = entityId ? this.hass?.states?.[entityId] : undefined;
        if (period === "current") {
          const current = entity ? Number(entity.state) : null;
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

  private localize(key: string, vars?: Record<string, string | number>): string {
    return computeLocalize(this.hass)(key, vars);
  }

  private renderTrend(metric: MetricConfig, unit?: string) {
    if (this.config?.show_trends === false) return nothing;
    const trend = this.trends[metric.entity ?? ""];
    if (!trend || trend.diff === null) return nothing;
    const period = getPeriod(this.config?.period);
    return html`<div class="subtle">
      ${this.localize("label.trend")} (${this.localize(`label.period.${period}`)}):
      ${formatTrend(trend.diff, unit, metric.decimals)}
    </div>`;
  }

  private renderProgressRing(progress?: number) {
    if (progress === undefined || progress === null) return nothing;
    const clamped = Math.min(progress, 100);
    const gradient = `conic-gradient(var(--accent-color, var(--primary-color)) ${clamped}%, var(--divider-color, #ccc) ${clamped}% 100%)`;
    return html`
      <div class="progress-ring">
        <div class="progress-fill" style="background:${gradient}"></div>
      </div>
    `;
  }

  private renderPrimary(metric: MetricConfig) {
    const { value, text, entity } = metricDisplay(this.hass, metric);
    const name = guessMetricName(metric, entity);
    const icon = metric.icon ?? entity?.attributes?.icon;
    const goal = goalValue(metric, this.hass);
    const progress = progressPercent(value, goal);
    const unit = metric.unit_override ?? entity?.attributes?.unit_of_measurement;
    return html`
      <div class="metric">
        <div class="label">
          ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
          <span>${name}</span>
          ${this.renderProgressRing(progress ?? undefined)}
        </div>
        <div class="value">${text}</div>
        ${goal !== undefined && progress !== null
          ? html`<div class="subtle">
              ${this.localize("label.of_goal", { percent: progress })}
              • ${this.localize("label.goal")}: ${goal}
            </div>`
          : nothing}
        ${this.renderTrend(metric, unit)}
      </div>
    `;
  }

  private renderSecondary(metric: MetricConfig) {
    const { text, entity } = metricDisplay(this.hass, metric);
    const name = guessMetricName(metric, entity);
    const icon = metric.icon ?? entity?.attributes?.icon;
    const trend = this.renderTrend(metric, metric.unit_override ?? entity?.attributes?.unit_of_measurement);
    return html`
      <div class="chip">
        ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
        <span>${name}</span>
        <span class="chip-value">${text}</span>
        ${trend}
      </div>
    `;
  }

  protected render() {
    if (!this.config) return nothing;
    return html`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.overview_title")}</div>
          <div class="subtle">${this.localize(`label.period.${getPeriod(this.config.period)}`)}</div>
        </div>
        <div class="primary-grid">
          ${this.config.primary_metrics.map((metric) => this.renderPrimary(metric))}
        </div>
        ${this.config.secondary_metrics && this.config.secondary_metrics.length
          ? html`<div class="secondary">
              ${this.config.secondary_metrics.map((metric) => this.renderSecondary(metric))}
            </div>`
          : nothing}
      </ha-card>
    `;
  }
}
