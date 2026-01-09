import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "../styles/shared";
import { FitnessCardBaseConfig, HomeAssistant, MetricConfig, Period } from "../types";
import {
  goalValue,
  guessMetricName,
  metricDisplay,
  progressPercent,
  formatTrend
} from "../utils/formatting";
import { computeLocalize } from "../localize";
import { normalizeMetrics, getPeriod } from "../utils/metrics";
import { computeTrend, previousFromEntity, TrendResult } from "../utils/history";

@customElement("fitness-activity-summary-card")
export class FitnessActivitySummaryCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: FitnessCardBaseConfig;
  @state() private trends: Record<string, TrendResult> = {};

  static styles = [
    cardStyles,
    css`
      .metric {
        position: relative;
      }
      .goal-row {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 6px;
      }
      .progress-label {
        font-size: 0.8rem;
        color: var(--secondary-text-color);
      }
    `
  ];

  static async getConfigElement() {
    return document.createElement("fitness-activity-summary-card-editor");
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
        const trendEntityId = metric.trend_entity ?? entityId;
        if (!entityId) {
          trendMap[entityId] = { current: null, previous: null, diff: null, label: period };
          return;
        }
        if (period === "current") {
          const currentVal = entity ? Number(entity.state) : null;
          const previous = metric.trend_entity
            ? previousFromEntity(this.hass?.states?.[metric.trend_entity])
            : previousFromEntity(entity);
          trendMap[entityId] = {
            current: currentVal,
            previous,
            diff: currentVal !== null && previous !== null ? currentVal - previous : null,
            label: period
          };
          return;
        }
        const trend = await computeTrend(this.hass!, trendEntityId, period);
        trendMap[entityId] = trend;
      })
    );
    this.trends = trendMap;
  }

  private renderTrend(metric: MetricConfig, unit?: string) {
    const period = getPeriod(this.config?.period);
    if (this.config?.show_trends === false) return nothing;
    const trend = this.trends[metric.entity ?? ""];
    if (!trend || trend.diff === null) return nothing;
    return html`<div class="subtle">
      ${this.localize("label.trend")} (${this.localize(`label.period.${period}`)}):
      ${formatTrend(trend.diff, unit, metric.decimals)}
    </div>`;
  }

  private localize(key: string, vars?: Record<string, string | number>): string {
    return computeLocalize(this.hass)(key, vars);
  }

  private renderMetric(metric: MetricConfig) {
    const { value, text, entity } = metricDisplay(this.hass, metric);
    const goal = goalValue(metric, this.hass);
    const progress = progressPercent(value, goal);
    const name = guessMetricName(metric, entity);
    const icon = metric.icon ?? entity?.attributes?.icon;

    return html`
      <div class="metric ${this.config?.compact ? "compact" : ""}">
        <div class="label">
          ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
          <span>${name}</span>
        </div>
        <div class="value">${text}</div>
        ${this.renderTrend(metric, metric.unit_override ?? entity?.attributes?.unit_of_measurement)}
        ${goal !== undefined && progress !== null
          ? html`
              <div class="goal-row">
                <span class="progress-label">${progress}% of goal</span>
                <span class="progress-label">${this.localize("label.goal")}: ${goal}</span>
              </div>
              <div class="progress">
                <div class="bar" style="width: ${Math.min(progress, 100)}%"></div>
              </div>
            `
          : nothing}
      </div>
    `;
  }

  protected render() {
    if (!this.config) return nothing;
    return html`
      <ha-card>
        <div class="header">
          <div class="title">
            ${this.config.title ?? this.localize("card.activity_title")}
          </div>
          <div class="subtle">${this.localize(`label.period.${getPeriod(this.config.period)}`)}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((metric) => this.renderMetric(metric))}
        </div>
      </ha-card>
    `;
  }
}
