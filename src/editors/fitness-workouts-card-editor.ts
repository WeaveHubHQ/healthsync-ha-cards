import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { WorkoutsCardConfig } from "../types";
import { fireEvent } from "../utils/events";
import { periodOptions } from "./schemas";
import { autoDetectMetrics } from "../utils/autodetect";
import { computeLocalize } from "../localize";

const workoutSchema = [
  { name: "name", selector: { text: {} } },
  { name: "icon", selector: { icon: {} } },
  { name: "duration_entity", selector: { entity: {} } },
  { name: "energy_entity", selector: { entity: {} } },
  { name: "distance_entity", selector: { entity: {} } }
];

@customElement("fitness-workouts-card-editor")
export class FitnessWorkoutsCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private _config?: WorkoutsCardConfig;
  @state() private _suggestions: any[] = [];
  @state() private _selected: Record<string, boolean> = {};

  setConfig(config: WorkoutsCardConfig) {
    this._config = { ...config };
  }

  private localize(key: string) {
    return computeLocalize(this.hass)(key);
  }

  private _valueChanged(ev: CustomEvent) {
    const config = ev.detail.value as WorkoutsCardConfig;
    this._config = config;
    fireEvent(this, "config-changed", { config });
  }

  private _detect() {
    if (!this.hass) return;
    const suggestions = autoDetectMetrics(this.hass)
      .filter((s) => (s.preset || "").startsWith("workout"))
      .map((s) => ({ ...s, key: s.preset || s.entity }));
    const selected: Record<string, boolean> = {};
    suggestions.forEach((s) => s.key && (selected[s.key] = true));
    this._suggestions = suggestions;
    this._selected = selected;
  }

  private _applySuggestions() {
    if (!this._config) return;
    const accepted = this._suggestions.filter((s) => s.key && this._selected[s.key]);
    if (!accepted.length) return;
    const workouts = accepted.map((s) => ({
      name: s.name || s.preset,
      duration_entity: s.entity
    }));
    const config = { ...this._config, workouts: [...workouts, ...(this._config.workouts || [])] };
    this._config = config;
    fireEvent(this, "config-changed", { config });
  }

  protected render() {
    if (!this.hass) return null;
    const data = this._config ?? { type: "custom:fitness-workouts-card", workouts: [] };
    const schema: any[] = [
      { name: "title", selector: { text: {} } },
      { name: "preset", selector: { select: { options: ["workouts"] } } },
      { name: "period", selector: { select: { options: periodOptions } } },
      { name: "compact", selector: { boolean: {} } },
      { name: "workouts", type: "array", schema: workoutSchema }
    ];
    return html`
      <div style="display:flex; gap:8px; align-items:center; margin-bottom:8px;">
        <button @click=${this._detect}>${this.localize("action.auto_detect")}</button>
        ${this._suggestions.length
          ? html`<button @click=${this._applySuggestions}>
              ${this.localize("action.apply_suggestions")}
            </button>`
          : ""}
      </div>
      ${this._suggestions.length
        ? html`<div>
            ${this._suggestions.map(
              (s) => html`<label style="display:block;">
                <input
                  type="checkbox"
                  .checked=${this._selected[s.preset]}
                  @change=${(e: any) =>
                    (this._selected = { ...this._selected, [s.preset]: e.target.checked })}
                />
                ${s.name || s.preset}: ${s.entity}
              </label>`
            )}
          </div>`
        : ""}
      <ha-form
        .hass=${this.hass}
        .data=${data}
        .schema=${schema}
        .computeLabel=${(s: any) => s.name}
        @value-changed=${this._valueChanged}
      ></ha-form>
    `;
  }
}
