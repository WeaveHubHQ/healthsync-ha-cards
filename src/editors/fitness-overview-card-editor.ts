import { LitElement, html } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { OverviewCardConfig } from "../types";
import { fireEvent } from "../utils/events";
import { metricSchema, periodOptions, historyFields } from "./schemas";
import { autoDetectMetrics } from "../utils/autodetect";
import { computeLocalize } from "../localize";

@customElement("fitness-overview-card-editor")
export class FitnessOverviewCardEditor extends LitElement {
  @property({ attribute: false }) public hass?: any;
  @state() private _config?: OverviewCardConfig;
  @state() private _suggestions: any[] = [];
  @state() private _selected: Record<string, boolean> = {};

  setConfig(config: OverviewCardConfig) {
    this._config = { ...config };
  }

  private localize(key: string) {
    return computeLocalize(this.hass)(key);
  }

  private _valueChanged(ev: CustomEvent) {
    const config = ev.detail.value as OverviewCardConfig;
    this._config = config;
    fireEvent(this, "config-changed", { config });
  }

  private _detect() {
    if (!this.hass) return;
    const suggestions = autoDetectMetrics(this.hass).map((s) => ({
      ...s,
      key: s.preset || s.entity
    }));
    const selected: Record<string, boolean> = {};
    suggestions.forEach((s) => s.key && (selected[s.key] = true));
    this._suggestions = suggestions;
    this._selected = selected;
  }

  private _applySuggestions() {
    if (!this._config) return;
    const accepted = this._suggestions.filter((s) => this._selected[s.preset]);
    if (!accepted.length) return;
    const config: OverviewCardConfig = {
      ...this._config,
      primary_metrics: [...accepted.slice(0, 4), ...(this._config.primary_metrics || [])],
      secondary_metrics: [
        ...accepted.slice(4),
        ...((this._config.secondary_metrics as any[]) || [])
      ]
    };
    this._config = config;
    fireEvent(this, "config-changed", { config });
  }

  protected render() {
    if (!this.hass) return null;
    const data =
      this._config ??
      ({ type: "custom:fitness-overview-card", primary_metrics: [], secondary_metrics: [] } as OverviewCardConfig);
    const schema: any[] = [
      { name: "title", selector: { text: {} } },
      { name: "preset", selector: { select: { options: ["overview"] } } },
      { name: "period", selector: { select: { options: periodOptions } } },
      { name: "compact", selector: { boolean: {} } },
      { name: "show_trends", selector: { boolean: {} } },
      ...historyFields,
      { name: "primary_metrics", type: "array", schema: metricSchema },
      { name: "secondary_metrics", type: "array", schema: metricSchema }
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
