import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { FitnessCardBaseConfig } from "../types";
import { fireEvent } from "../utils/events";
import { metricSchema, periodOptions } from "./schemas";

@customElement("fitness-body-metrics-card-editor")
export class FitnessBodyMetricsCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private _config?: FitnessCardBaseConfig;

  setConfig(config: FitnessCardBaseConfig) {
    this._config = { ...config };
  }

  private _valueChanged(ev: CustomEvent) {
    const config = ev.detail.value as FitnessCardBaseConfig;
    this._config = config;
    fireEvent(this, "config-changed", { config });
  }

  protected render() {
    if (!this.hass) return null;
    const data = this._config ?? { type: "custom:fitness-body-metrics-card", metrics: [] };
    const schema: any[] = [
      { name: "title", selector: { text: {} } },
      { name: "preset", selector: { select: { options: ["body"] } } },
      { name: "period", selector: { select: { options: periodOptions } } },
      { name: "compact", selector: { boolean: {} } },
      { name: "show_trends", selector: { boolean: {} } },
      { name: "metrics", type: "array", schema: metricSchema }
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
