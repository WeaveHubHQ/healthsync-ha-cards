import { MetricConfig, Period } from "../types";
import { applyMetricPreset, cardPresets } from "../presets";

export function normalizeMetrics(metrics: MetricConfig[] = [], preset?: string): MetricConfig[] {
  if (metrics.length === 0 && preset && cardPresets[preset]) {
    metrics = cardPresets[preset].map((m) => ({ ...m }));
  }
  return metrics.map((metric) => applyMetricPreset(metric));
}

export function getPeriod(configPeriod?: Period): Period {
  return configPeriod ?? "current";
}
