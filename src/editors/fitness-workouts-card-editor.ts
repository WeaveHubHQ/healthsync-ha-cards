import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { WorkoutsCardConfig } from "../types";
import { fireEvent } from "../utils/events";
import { periodOptions } from "./schemas";
import { autoDetectMetrics } from "../utils/autodetect";
import { computeLocalize } from "../localize";
import { metricPresets } from "../presets";

const workoutSchema = [
  { name: "name", selector: { text: {} } },
  { name: "icon", selector: { icon: {} } },
  { name: "enabled", selector: { boolean: {} } },
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
  @state() private _presetSelection: Record<string, boolean> = {};

  setConfig(config: WorkoutsCardConfig) {
    this._config = { ...config };
    this._syncPresetSelection(config);
  }

  private workoutPresets() {
    return Object.values(metricPresets).filter((p) => p.id.startsWith("workout_"));
  }

  private guessPresetForWorkout(w: any): string | undefined {
    if (w?.preset) return w.preset;
    const name = (w?.name || "").toString().toLowerCase().trim();
    const icon = w?.icon;
    for (const p of this.workoutPresets()) {
      const presetName = p.name.toLowerCase();
      const idName = p.id.replace("workout_", "").replace(/_/g, " ");
      if (name && (name === presetName || name === idName)) return p.id;
      if (icon && p.icon && icon === p.icon) return p.id;
    }
    return undefined;
  }

  private findWorkoutIndexForPreset(presetId: string, workouts: any[]) {
    return workouts.findIndex((w) => this.guessPresetForWorkout(w) === presetId);
  }

  private _syncPresetSelection(config: WorkoutsCardConfig) {
    const selected: Record<string, boolean> = {};
    (config.workouts || []).forEach((w) => {
      const presetId = this.guessPresetForWorkout(w);
      if (presetId) {
        selected[presetId] = w.enabled !== false;
      }
    });
    this._presetSelection = selected;
  }

  private localize(key: string) {
    return computeLocalize(this.hass)(key);
  }

  private label(key: string, fallback: string) {
    const value = this.localize(key);
    if (!value || value.startsWith("label.")) return fallback;
    return value;
  }

  private _valueChanged(ev: CustomEvent) {
    const config = ev.detail.value as WorkoutsCardConfig;
    this._config = config;
    this._syncPresetSelection(config);
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
      preset: s.preset,
      name: s.name || s.preset,
      icon: metricPresets[s.preset]?.icon,
      duration_entity: s.entity,
      enabled: true
    }));
    const config = { ...this._config, workouts: [...workouts, ...(this._config.workouts || [])] };
    this._config = config;
    this._syncPresetSelection(config);
    fireEvent(this, "config-changed", { config });
  }

  private _togglePreset(presetId: string, checked: boolean) {
    if (!this._config) return;
    const preset = metricPresets[presetId];
    const workouts = [...(this._config.workouts || [])];
    const idx = this.findWorkoutIndexForPreset(presetId, workouts);
    if (idx === -1 && checked) {
      workouts.push(this._upsertPresetWorkout(presetId, {}, preset));
    } else if (idx >= 0) {
      workouts[idx] = { ...workouts[idx], enabled: checked, preset: presetId, icon: workouts[idx].icon ?? preset?.icon, name: workouts[idx].name ?? preset?.name };
    }
    const config = { ...this._config, workouts };
    this._config = config;
    this._presetSelection = { ...this._presetSelection, [presetId]: checked };
    fireEvent(this, "config-changed", { config });
  }

  private _presetEntry(presetId: string) {
    return (this._config?.workouts || []).find((w) => this.guessPresetForWorkout(w) === presetId);
  }

  private _upsertPresetWorkout(
    presetId: string,
    updates: Partial<WorkoutsCardConfig["workouts"][number]>,
    preset = metricPresets[presetId]
  ) {
    return {
      preset: presetId,
      name: updates.name ?? preset?.name ?? presetId,
      icon: updates.icon ?? preset?.icon,
      enabled: updates.enabled ?? true,
      duration_entity: updates.duration_entity,
      energy_entity: updates.energy_entity,
      distance_entity: updates.distance_entity
    };
  }

  private _updatePresetField(presetId: string, field: "duration_entity" | "energy_entity" | "distance_entity", value: string | null) {
    if (!this._config) return;
    const workouts = [...(this._config.workouts || [])];
    const idx = this.findWorkoutIndexForPreset(presetId, workouts);
    if (idx === -1) {
      workouts.push(this._upsertPresetWorkout(presetId, { [field]: value || undefined }));
    } else {
      workouts[idx] = { ...workouts[idx], [field]: value || undefined, preset: presetId };
    }
    const config = { ...this._config, workouts };
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
      <div style="margin: 12px 0;">
        <div style="font-weight:600; margin-bottom:6px;">
          ${this.label("label.workouts", "Workouts")}
        </div>
        ${this.workoutPresets().map((p) => {
          const entry = this._presetEntry(p.id);
          const enabled = this._presetSelection[p.id] ?? false;
          return html`<div style="margin-bottom:8px;">
            <label style="display:flex; align-items:center; gap:8px;">
              <input
                type="checkbox"
                .checked=${enabled}
                @change=${(e: any) => this._togglePreset(p.id, e.target.checked)}
              />
              ${p.name}
            </label>
                ${enabled
                  ? html`<div
                      style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:6px; padding-left:18px; margin-top:6px;"
                    >
                      <ha-entity-picker
                        .hass=${this.hass}
                        .value=${entry?.duration_entity || ""}
                        .label=${this.label("label.duration", "Duration entity")}
                        @value-changed=${(e: any) =>
                          this._updatePresetField(p.id, "duration_entity", e.detail?.value)}
                      ></ha-entity-picker>
                      <ha-entity-picker
                        .hass=${this.hass}
                        .value=${entry?.energy_entity || ""}
                        .label=${this.label("label.energy", "Energy entity")}
                        @value-changed=${(e: any) =>
                          this._updatePresetField(p.id, "energy_entity", e.detail?.value)}
                      ></ha-entity-picker>
                      <ha-entity-picker
                        .hass=${this.hass}
                        .value=${entry?.distance_entity || ""}
                        .label=${this.label("label.distance", "Distance entity")}
                        @value-changed=${(e: any) =>
                          this._updatePresetField(p.id, "distance_entity", e.detail?.value)}
                      ></ha-entity-picker>
                    </div>`
                  : ""}
          </div>`;
        })}
        <div style="color: var(--secondary-text-color); font-size: 0.9em; margin-top:4px;">
          Toggle workouts to add/remove entries; edit entities below.
        </div>
      </div>
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
