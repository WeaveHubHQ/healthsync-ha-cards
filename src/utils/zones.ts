import { RangeBand, RangeConfig, MetricConfig } from "../types";

const defaultZones: Record<string, RangeConfig> = {
  heart_rate: { bands: [{ label: "Low", max: 50, severity: "low" }, { label: "Normal", min: 50, max: 100, severity: "normal" }, { label: "High", min: 100, severity: "high" }] },
  resting_heart_rate: { bands: [{ label: "Low", max: 45, severity: "low" }, { label: "Normal", min: 45, max: 90, severity: "normal" }, { label: "High", min: 90, severity: "high" }] },
  spo2: { bands: [{ label: "Low", max: 92, severity: "low" }, { label: "Normal", min: 95, max: 100, severity: "normal" }] },
  respiratory_rate: { bands: [{ label: "Low", max: 10, severity: "low" }, { label: "Normal", min: 12, max: 20, severity: "normal" }, { label: "High", min: 24, severity: "high" }] },
  glucose: { bands: [{ label: "Low", max: 70, severity: "low" }, { label: "Normal", min: 80, max: 140, severity: "normal" }, { label: "High", min: 180, severity: "high" }] },
  weight: { bands: [] }
};

export function metricKey(metric: MetricConfig): string | undefined {
  return metric.preset || metric.entity;
}

export function resolveZones(
  metric: MetricConfig,
  cardZones?: Record<string, { bands: RangeBand[] }>
): RangeConfig | undefined {
  if (metric.zones_disabled) return undefined;
  const key = metricKey(metric);
  if (!key) return undefined;
  if (metric.ranges) {
    if (Array.isArray(metric.ranges)) return { bands: metric.ranges as RangeBand[] };
    return metric.ranges as RangeConfig;
  }
  if (cardZones && cardZones[key]) return cardZones[key];
  if (metric.preset && defaultZones[metric.preset]) return defaultZones[metric.preset];
  return undefined;
}
