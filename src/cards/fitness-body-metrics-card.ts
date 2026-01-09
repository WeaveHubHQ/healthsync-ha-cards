import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "../styles/shared";
import { FitnessCardBaseConfig, HomeAssistant, MetricConfig } from "../types";
import { guessMetricName, metricDisplay, parseNumber } from "../utils/formatting";

@customElement("fitness-body-metrics-card")
export class FitnessBodyMetricsCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: FitnessCardBaseConfig;

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

  public setConfig(config: FitnessCardBaseConfig): void {
    if (!config.metrics || !Array.isArray(config.metrics) || config.metrics.length === 0) {
      throw new Error("Add a metrics array with body metrics");
    }
    this.config = { ...config, metrics: [...config.metrics] };
  }

  public getCardSize(): number {
    return 3;
  }

  private previousValue(entity?: any): number | null {
    if (!entity) return null;
    const candidates = [
      entity.attributes?.previous_state,
      entity.attributes?.previous,
      entity.attributes?.last_value,
      entity.attributes?.prior_value
    ];
    for (const candidate of candidates) {
      const parsed = parseNumber(candidate);
      if (parsed !== null) return parsed;
    }
    return null;
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
    const previous = this.previousValue(entity);
    const diff = value !== null && previous !== null ? value - previous : null;

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
                ${diff > 0 ? "+" : ""}${diff.toFixed(1)}
              </span>`
            : html`<span class="trend">No previous reading</span>`}
        </div>
      </div>
    `;
  }

  protected render() {
    if (!this.config) return nothing;
    return html`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? "Body Metrics"}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((metric) => this.renderMetric(metric))}
        </div>
      </ha-card>
    `;
  }
}
