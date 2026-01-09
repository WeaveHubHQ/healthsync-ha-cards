import { HassEntity, HomeAssistant, MetricConfig, RangeBand, RangeConfig } from "../types";

const UNAVAILABLE_STATES = new Set([
  "unknown",
  "unavailable",
  "none",
  "null",
  "nan",
  ""
]);

export function parseNumber(value?: string | number | null): number | null {
  if (value === null || value === undefined) return null;
  const asString = String(value).trim();
  if (UNAVAILABLE_STATES.has(asString)) return null;
  const parsed = Number(asString);
  return Number.isFinite(parsed) ? parsed : null;
}

export function defaultDecimals(unit?: string): number {
  switch (unit) {
    case "bpm":
    case "breaths/min":
    case "count":
    case "kcal":
    case "ms":
    case "mg/dL":
    case "s":
      return 0;
    case "%":
      return 1;
    case "lb":
    case "fl oz US":
      return 1;
    case "mi":
      return 2;
    case "mL/(kg*min)":
      return 1;
    default:
      return 1;
  }
}

function formatSeconds(value: number): string {
  if (value >= 3600) {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value % 3600) / 60);
    return `${hours}h ${minutes}m`;
  }
  if (value >= 90) {
    const minutes = Math.floor(value / 60);
    const seconds = Math.round(value % 60);
    return `${minutes}m ${seconds}s`;
  }
  return `${Math.round(value)}s`;
}

export function formatMinutes(value: number): string {
  if (value >= 90) {
    const hours = Math.floor(value / 60);
    const minutes = Math.round(value % 60);
    return `${hours}h ${minutes}m`;
  }
  const decimals = value >= 10 ? 0 : 1;
  return `${value.toFixed(decimals)} min`;
}

export function formatValue(
  value: number | null,
  unit?: string,
  decimals?: number,
  unitOverride?: string
): string {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "—";
  }

  const displayUnit = unitOverride ?? unit;
  if (unit === "min") {
    return formatMinutes(value);
  }
  if (unit === "s") {
    return formatSeconds(value);
  }

  const precision = decimals ?? defaultDecimals(unit);
  const rounded = value.toFixed(precision);
  return displayUnit ? `${rounded} ${displayUnit}` : rounded;
}

export function formatTrend(diff: number | null, unit?: string, decimals?: number): string {
  if (diff === null || Number.isNaN(diff)) return "—";
  const prefix = diff > 0 ? "+" : "";
  const precision = decimals ?? defaultDecimals(unit);
  const rounded = diff.toFixed(precision);
  return unit ? `${prefix}${rounded} ${unit}` : `${prefix}${rounded}`;
}

export function goalValue(metric: MetricConfig, hass?: HomeAssistant): number | undefined {
  if (!hass) return typeof metric.goal === "number" ? metric.goal : undefined;
  if (typeof metric.goal === "number") return metric.goal;
  if (metric.goal_entity) {
    const goalState = hass.states?.[metric.goal_entity];
    const parsed = parseNumber(goalState?.state);
    if (parsed !== null) return parsed;
  }
  if (metric.goal && typeof metric.goal === "object" && "entity" in metric.goal) {
    const goalState = hass.states?.[metric.goal.entity];
    const parsed = parseNumber(goalState?.state);
    if (parsed !== null) return parsed;
  }
  return undefined;
}

export function progressPercent(value: number | null, goal?: number): number | null {
  if (value === null || goal === undefined || goal === 0) return null;
  return Math.min(Math.round((value / goal) * 100), 999);
}

function asRangeConfig(ranges?: RangeConfig | RangeBand[]): RangeConfig | undefined {
  if (!ranges) return undefined;
  if (Array.isArray(ranges)) {
    return { bands: ranges };
  }
  return ranges;
}

export function evaluateRange(
  value: number | null,
  ranges?: RangeConfig | RangeBand[]
): { status?: "low" | "normal" | "high" | "band"; band?: RangeBand } {
  if (value === null || ranges === undefined) return {};
  const normalized = asRangeConfig(ranges);
  if (!normalized) return {};

  if (normalized.bands && normalized.bands.length) {
    const hit = normalized.bands.find(
      (band) =>
        (band.min === undefined || value >= band.min) &&
        (band.max === undefined || value <= band.max)
    );
    return hit ? { status: "band", band: hit } : {};
  }

  const { low, normal, high } = normalized;
  if (low !== undefined && value < low) return { status: "low" };
  if (high !== undefined && value > high) return { status: "high" };
  if (Array.isArray(normal)) {
    if (
      (normal[0] === undefined || value >= normal[0]) &&
      (normal[1] === undefined || value <= normal[1])
    ) {
      return { status: "normal" };
    }
  } else if (typeof normal === "number" && value === normal) {
    return { status: "normal" };
  } else if (low !== undefined || high !== undefined) {
    return { status: "normal" };
  }
  return {};
}

export function extractValue(entity: HassEntity | undefined): number | null {
  if (!entity) return null;
  return parseNumber(entity.state);
}

export function metricDisplay(
  hass: HomeAssistant | undefined,
  metric: MetricConfig
): { value: number | null; unit?: string; text: string; entity?: HassEntity } {
  const entityId = metric.entity ?? "";
  const entity = entityId ? hass?.states?.[entityId] : undefined;
  const unit = metric.unit_override ?? entity?.attributes?.unit_of_measurement;
  const value = extractValue(entity);
  const text = formatValue(value, unit, metric.decimals, metric.unit_override);
  return { value, unit, text, entity };
}

export function guessMetricName(metric: MetricConfig, entity?: HassEntity): string {
  return (
    metric.name ||
    entity?.attributes?.friendly_name ||
    (metric.entity ? metric.entity.split(".").slice(1).join(".") : "Metric")
  );
}
