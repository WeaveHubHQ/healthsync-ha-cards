import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { WorkoutsCardConfig } from "../types";
import { fireEvent } from "../utils/events";
import { periodOptions } from "./schemas";

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

  setConfig(config: WorkoutsCardConfig) {
    this._config = { ...config };
  }

  private _valueChanged(ev: CustomEvent) {
    const config = ev.detail.value as WorkoutsCardConfig;
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
