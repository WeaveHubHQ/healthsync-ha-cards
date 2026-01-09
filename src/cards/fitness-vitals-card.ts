import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "../styles/shared";
import { FitnessCardBaseConfig, HomeAssistant, MetricConfig, RangeConfig } from "../types";
import { evaluateRange, guessMetricName, metricDisplay } from "../utils/formatting";

@customElement("fitness-vitals-card")
export class FitnessVitalsCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: FitnessCardBaseConfig;

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

  public setConfig(config: FitnessCardBaseConfig): void {
    if (!config.metrics || !Array.isArray(config.metrics) || config.metrics.length === 0) {
      throw new Error("Add a metrics array with at least one entry");
    }
    this.config = { ...config, metrics: [...config.metrics] };
  }

  public getCardSize(): number {
    return 3;
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
    const ranges = metric.ranges ?? this.defaultRanges(metric, name);
    const { status, band } = evaluateRange(value, ranges);

    const statusLabel =
      band?.label ??
      (status === "low" ? "Low" : status === "high" ? "High" : status === "normal" ? "OK" : "");

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
          <div class="title">${this.config.title ?? "Vitals"}</div>
        </div>
        <div class="metric-grid">
          ${this.config.metrics.map((metric) => this.renderMetric(metric))}
        </div>
      </ha-card>
    `;
  }
}
