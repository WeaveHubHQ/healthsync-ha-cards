import { html, TemplateResult } from "lit";

export function barSeries(values: number[], labels?: string[]): TemplateResult {
  const max = Math.max(...values.filter((v) => Number.isFinite(v)), 0);
  return html`
    <div style="display:flex; gap:6px; align-items:flex-end;">
      ${values.map((v, idx) => {
        const height = max > 0 && Number.isFinite(v) ? Math.max((v / max) * 100, 4) : 4;
        return html`<div style="text-align:center; flex:1;">
          <div
            style="height:${height}px; background: var(--accent-color, var(--primary-color)); border-radius:6px;"
            title=${Number.isFinite(v) ? String(v) : "—"}
          ></div>
          ${labels ? html`<div style="font-size:0.7rem; color:var(--secondary-text-color);">${labels[idx]}</div>` : ""}
        </div>`;
      })}
    </div>
  `;
}
