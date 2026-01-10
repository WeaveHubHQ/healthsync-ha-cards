import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "../styles/shared";
import { HomeAssistant, WorkoutsCardConfig, WorkoutMetricConfig, Period } from "../types";
import { computeLocalize } from "../localize";
import { formatMinutes, formatValue, parseNumber } from "../utils/formatting";
import { getPeriod } from "../utils/metrics";
import { metricPresets } from "../presets";

interface WorkoutValues {
  duration: number | null;
  energy: number | null;
  distance: number | null;
}

@customElement("fitness-workouts-card")
export class FitnessWorkoutsCard extends LitElement {
  @property({ attribute: false }) public hass?: HomeAssistant;
  @state() private config?: WorkoutsCardConfig;

  static styles = [
    cardStyles,
    css`
      .workout-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .row {
        display: grid;
        grid-template-columns: 1fr repeat(3, minmax(70px, 100px));
        gap: 10px;
        align-items: center;
      }
      .header-row {
        font-weight: 700;
        color: var(--secondary-text-color);
      }
      .total {
        font-weight: 700;
      }
      .value {
        text-align: right;
      }
      .compact .row {
        grid-template-columns: 1fr repeat(2, minmax(60px, 80px));
      }
    `
  ];

  static async getConfigElement() {
    return document.createElement("fitness-workouts-card-editor");
  }

  public setConfig(config: WorkoutsCardConfig): void {
    if (!config.workouts || !Array.isArray(config.workouts)) {
      throw new Error("Add a workouts array");
    }
    this.config = { ...config, workouts: [...config.workouts] };
  }

  public getCardSize(): number {
    return 4;
  }

  private localize(key: string, vars?: Record<string, string | number>): string {
    return computeLocalize(this.hass)(key, vars);
  }

  private workoutValues(item: WorkoutMetricConfig): WorkoutValues {
    const duration = parseNumber(this.hass?.states?.[item.duration_entity ?? ""]?.state);
    const energy = parseNumber(this.hass?.states?.[item.energy_entity ?? ""]?.state);
    const distance = parseNumber(this.hass?.states?.[item.distance_entity ?? ""]?.state);
    return { duration, energy, distance };
  }

  private renderValue(value: number | null, unit?: string): string {
    if (unit === "min" && value !== null) return formatMinutes(value);
    return formatValue(value, unit);
  }

  private workoutMeta(item: WorkoutMetricConfig) {
    const presetId = (item as any).preset as string | undefined;
    return presetId ? metricPresets[presetId] : undefined;
  }

  private workoutName(item: WorkoutMetricConfig) {
    return (
      item.name ??
      this.workoutMeta(item)?.name ??
      this.localize("label.workout") ||
      "Workout"
    );
  }

  private workoutIcon(item: WorkoutMetricConfig) {
    return item.icon ?? this.workoutMeta(item)?.icon;
  }

  private activeWorkouts(): WorkoutMetricConfig[] {
    return (this.config?.workouts ?? []).filter((w) => w.enabled !== false);
  }

  private totalRow() {
    if (!this.config) return nothing;
    const workouts = this.activeWorkouts();
    if (!workouts.length) return nothing;
    const totals: WorkoutValues = { duration: 0, energy: 0, distance: 0 };
    workouts.forEach((w) => {
      const vals = this.workoutValues(w);
      totals.duration = vals.duration !== null ? (totals.duration ?? 0) + vals.duration : totals.duration;
      totals.energy = vals.energy !== null ? (totals.energy ?? 0) + vals.energy : totals.energy;
      totals.distance = vals.distance !== null ? (totals.distance ?? 0) + vals.distance : totals.distance;
    });
    return html`
      <div class="row total">
        <div>${this.localize("label.total")}</div>
        <div class="value">${this.renderValue(totals.duration, "min")}</div>
        <div class="value">${this.renderValue(totals.energy, "kcal")}</div>
        ${workouts.some((w) => w.distance_entity)
          ? html`<div class="value">${this.renderValue(totals.distance, "mi")}</div>`
          : nothing}
      </div>
    `;
  }

  private renderRow(item: WorkoutMetricConfig) {
    const { duration, energy, distance } = this.workoutValues(item);
    const showDistance = Boolean(item.distance_entity);
    const icon = this.workoutIcon(item);
    return html`
      <div class="row">
        <div class="label">
          ${icon ? html`<ha-icon .icon=${icon}></ha-icon>` : nothing}
          <span>${this.workoutName(item)}</span>
        </div>
        <div class="value">${this.renderValue(duration, "min")}</div>
        <div class="value">${this.renderValue(energy, "kcal")}</div>
        ${showDistance ? html`<div class="value">${this.renderValue(distance, "mi")}</div>` : nothing}
      </div>
    `;
  }

  protected render() {
    if (!this.config) return nothing;
    const workouts = this.activeWorkouts();
    return html`
      <ha-card class=${this.config.compact ? "compact" : ""}>
        <div class="header">
          <div class="title">${this.config.title ?? this.localize("card.workouts_title")}</div>
          <div class="subtle">${this.localize(`label.period.${getPeriod(this.config.period)}`)}</div>
        </div>
        <div class="workout-list">
          <div class="row header-row">
            <div></div>
            <div class="value">${this.localize("label.duration")}</div>
            <div class="value">${this.localize("label.energy")}</div>
            ${workouts.some((w) => w.distance_entity)
              ? html`<div class="value">${this.localize("label.distance")}</div>`
              : nothing}
          </div>
          ${this.totalRow()}
          ${workouts.map((w) => this.renderRow(w))}
        </div>
      </ha-card>
    `;
  }
}
