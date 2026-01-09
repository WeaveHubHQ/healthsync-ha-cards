import { metricPresets } from "../presets";

export const periodOptions = [
  { value: "current", label: "Current" },
  { value: "today", label: "Today" },
  { value: "7d", label: "7 days" },
  { value: "30d", label: "30 days" }
];

export const presetOptions = Object.values(metricPresets).map((preset) => ({
  value: preset.id,
  label: preset.name
}));

export const metricSchema = [
  { name: "entity", selector: { entity: {} } },
  { name: "preset", selector: { select: { options: presetOptions } } },
  { name: "name", selector: { text: {} } },
  { name: "icon", selector: { icon: {} } },
  { name: "unit_override", selector: { text: {} } },
  { name: "decimals", selector: { number: { min: 0, max: 4, mode: "box" } } },
  { name: "goal", selector: { number: { min: 0, mode: "box" } } },
  { name: "goal_entity", selector: { entity: {} } },
  { name: "trend_entity", selector: { entity: {} } },
  {
    name: "ranges",
    schema: [
      { name: "low", selector: { number: { mode: "box" } } },
      { name: "normal", selector: { text: {} } },
      { name: "high", selector: { number: { mode: "box" } } }
    ]
  }
];

export const historyFields = [
  { name: "history", selector: { boolean: {} } },
  { name: "history_window_days", selector: { number: { min: 1, max: 60, mode: "box" } } },
  { name: "history_points", selector: { number: { min: 4, max: 120, mode: "box" } } }
];
