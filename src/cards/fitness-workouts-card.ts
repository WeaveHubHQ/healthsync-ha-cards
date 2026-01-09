import { LitElement, css, html, nothing } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { cardStyles } from "../styles/shared";
import { HomeAssistant, WorkoutsCardConfig, WorkoutMetricConfig, Period } from "../types";
import { computeLocalize } from "../localize";
import { formatMinutes, formatValue, parseNumber } from "../utils/formatting";
import { getPeriod } from "../utils/metrics";

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
    if (!config.workouts || !Array.isArray(config.workouts) || config.workouts.length === 0) {
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

  private totalRow() {
    if (!this.config) return nothing;
    const totals: WorkoutValues = { duration: 0, energy: 0, distance: 0 };
    this.config.workouts.forEach((w) => {
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
        ${this.config.workouts.some((w) => w.distance_entity)
          ? html`<div class="value">${this.renderValue(totals.distance, "mi")}</div>`
          : nothing}
      </div>
    `;
  }

  private renderRow(item: WorkoutMetricConfig) {
    const { duration, energy, distance } = this.workoutValues(item);
    const showDistance = Boolean(item.distance_entity);
    return html`
      <div class="row">
        <div class="label">
          ${item.icon ? html`<ha-icon .icon=${item.icon}></ha-icon>` : nothing}
          <span>${item.name}</span>
        </div>
        <div class="value">${this.renderValue(duration, "min")}</div>
        <div class="value">${this.renderValue(energy, "kcal")}</div>
        ${showDistance ? html`<div class="value">${this.renderValue(distance, "mi")}</div>` : nothing}
      </div>
    `;
  }

  protected render() {
    if (!this.config) return nothing;
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
            ${this.config.workouts.some((w) => w.distance_entity)
              ? html`<div class="value">${this.localize("label.distance")}</div>`
              : nothing}
          </div>
          ${this.totalRow()}
          ${this.config.workouts.map((w) => this.renderRow(w))}
        </div>
      </ha-card>
    `;
  }
}
