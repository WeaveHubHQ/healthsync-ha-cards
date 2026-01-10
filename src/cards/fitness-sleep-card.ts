import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "../styles/shared";
import { FitnessCardBaseConfig, HomeAssistant, MetricConfig } from "../types";
import { formatMinutes, guessMetricName, metricDisplay, parseNumber } from "../utils/formatting";
import { computeLocalize } from "../localize";
import { normalizeMetrics } from "../utils/metrics";

type SleepStage = "asleep" | "in_bed" | "core" | "deep" | "rem" | "unknown";

const STAGE_COLORS: Record<SleepStage, string> = {
  asleep: "var(--sleep-asleep-color, #4a90e2)",
  in_bed: "var(--sleep-in-bed-color, #9ea3aa)",
  core: "var(--sleep-core-color, #f5a623)",
  deep: "var(--sleep-deep-color, #2e9b4f)",
  rem: "var(--sleep-rem-color, #9b59b6)",
  unknown: "var(--sleep-unknown-color, #bfc2c6)"
};

@customElement("fitness-sleep-card")
export class FitnessSleepCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: FitnessCardBaseConfig;

  static styles = [
    cardStyles,
    css`
      .summary {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 8px;
        margin-bottom: 8px;
      }
      .stage-bar {
        height: 12px;
        border-radius: 999px;
        background: var(--divider-color, rgba(128, 128, 128, 0.3));
        overflow: hidden;
        display: flex;
        margin: 8px 0;
      }
      .stage-segment {
        height: 100%;
      }
      .stage-legend {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
        gap: 6px;
      }
      .legend-item {
        display: flex;
        align-items: center;
        gap: 8px;
      }
      .swatch {
        width: 12px;
        height: 12px;
        border-radius: 3px;
      }
    `
  ];

  static async getConfigElement() {
    return document.createElement("fitness-sleep-card-editor");
  }

  public setConfig(config: FitnessCardBaseConfig): void {
    if (!config.metrics || !Array.isArray(config.metrics) || config.metrics.length === 0) {
      throw new Error("Add a metrics array with sleep stages");
    }
    this.config = { ...config, metrics: normalizeMetrics(config.metrics, config.preset) };
  }

  public getCardSize(): number {
    return 3;
  }

  private stageFromMetric(metric: MetricConfig): SleepStage {
    if (metric.stage) return metric.stage;
    const id = (metric.entity ?? "").toLowerCase();
    if (id.includes("in_bed")) return "in_bed";
    if (id.includes("sleep_core")) return "core";
    if (id.includes("sleep_deep")) return "deep";
    if (id.includes("sleep_rem")) return "rem";
    if (id.includes("sleep_unknown")) return "unknown";
    if (id.includes("sleep_asleep")) return "asleep";
    return "asleep";
  }

  private localize(key: string, vars?: Record<string, string | number>): string {
    return computeLocalize(this.hass)(key, vars);
  }

  protected render() {
    if (!this.config) return nothing;
    const durations: Partial<Record<SleepStage, number>> = {};

    this.config.metrics.forEach((metric) => {
      const entityId = metric.entity ?? "";
      const entity = entityId ? this.hass?.states?.[entityId] : undefined;
      const val = parseNumber(entity?.state);
      if (val === null) return;
      const stage = this.stageFromMetric(metric);
      durations[stage] = val;
    });

    const stageOrder: SleepStage[] = ["core", "deep", "rem", "unknown"];
    const asleepValue =
      durations.asleep ??
      stageOrder.reduce((sum, key) => sum + (durations[key] ?? 0), 0);
    const inBedValue = durations.in_bed ?? asleepValue;
    const totalForBreakdown = stageOrder.reduce((sum, key) => sum + (durations[key] ?? 0), 0);

    return html`
      <ha-card>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.sleep_title")}</div>
          ${this.config?.period
            ? html`<div class="subtle">
                ${this.localize(`label.period.${this.config.period}`) || this.config.period}
              </div>`
            : nothing}
        </div>
        <div class="summary">
          <div>
            <div class="label">${this.localize("label.asleep")}</div>
            <div class="value">${asleepValue !== undefined ? formatMinutes(asleepValue) : "—"}</div>
          </div>
          <div>
            <div class="label">${this.localize("label.in_bed")}</div>
            <div class="value">${inBedValue !== undefined ? formatMinutes(inBedValue) : "—"}</div>
          </div>
        </div>
        <div class="stage-bar">
          ${stageOrder
            .filter((stage) => (durations[stage] ?? 0) > 0)
            .map((stage) => {
              const val = durations[stage] ?? 0;
              const pct = totalForBreakdown > 0 ? (val / totalForBreakdown) * 100 : 0;
              return html`<div
                class="stage-segment"
                style="width: ${pct}%; background: ${STAGE_COLORS[stage]}"
              ></div>`;
            })}
        </div>
        <div class="stage-legend">
          ${stageOrder.map((stage) => {
            const val = durations[stage];
            const name = this.localize(`label.${stage}`) || stage.toUpperCase();
            return html`<div class="legend-item">
              <span class="swatch" style="background:${STAGE_COLORS[stage]}"></span>
              <div>
                <div class="label">${name}</div>
                <div class="subtle">
                  ${val !== undefined && val !== null ? formatMinutes(val) : "—"}
                </div>
              </div>
            </div>`;
          })}
        </div>
      </ha-card>
    `;
  }
}
