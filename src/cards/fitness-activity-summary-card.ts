import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "../styles/shared";
import { FitnessCardBaseConfig, HomeAssistant, MetricConfig } from "../types";
import {
  goalValue,
  guessMetricName,
  metricDisplay,
  progressPercent
} from "../utils/formatting";

@customElement("fitness-activity-summary-card")
export class FitnessActivitySummaryCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: FitnessCardBaseConfig;

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

  public setConfig(config: FitnessCardBaseConfig): void {
    if (!config.metrics || !Array.isArray(config.metrics) || config.metrics.length === 0) {
      throw new Error("Add a metrics array with at least one entry");
    }
    this.config = { ...config, metrics: [...config.metrics] };
  }

  public getCardSize(): number {
    return 3;
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
        ${goal !== undefined && progress !== null
          ? html`
              <div class="goal-row">
                <span class="progress-label">${progress}% of goal</span>
                <span class="progress-label">Goal: ${goal}</span>
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
          <div class="title">${this.config.title ?? "Fitness Activity"}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((metric) => this.renderMetric(metric))}
        </div>
      </ha-card>
    `;
  }
}
