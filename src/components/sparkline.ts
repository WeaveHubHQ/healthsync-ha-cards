import { svg, TemplateResult } from "lit";

export function sparkline(values: number[], width = 120, height = 40): TemplateResult {
  const clean = values.filter((v) => Number.isFinite(v));
  if (!clean.length) return svg``;
  const min = Math.min(...clean);
  const max = Math.max(...clean);
  const range = max - min || 1;
  const step = width / Math.max(values.length - 1, 1);
  const points = values.map((v, i) => {
    const normalized = Number.isFinite(v) ? (v - min) / range : 0.5;
    const y = height - normalized * height;
    const x = i * step;
    return `${x},${y}`;
  });
  return svg`<svg viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">
    <polyline
      fill="none"
      stroke="var(--accent-color, var(--primary-color))"
      stroke-width="2"
      points="${points.join(" ")}"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>`;
}
