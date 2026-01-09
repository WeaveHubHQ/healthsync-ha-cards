import { MetricConfig } from "../types";
import { metricPresets } from "../presets";

interface Detection {
  preset: string;
  entity: string;
}

const keywordMap: Record<string, string> = {
  steps: "steps",
  heart_rate_variability: "hrv_sdnn",
  hrv: "hrv_sdnn",
  heart_rate: "heart_rate",
  resting_heart_rate: "resting_heart_rate",
  oxygen_saturation: "spo2",
  respiratory_rate: "respiratory_rate",
  sleep_asleep: "asleep",
  sleep_in_bed: "in_bed",
  sleep_core: "sleep_core",
  sleep_deep: "sleep_deep",
  sleep_rem: "sleep_rem",
  sleep_unknown: "sleep_unknown",
  weight: "weight",
  bmi: "bmi",
  body_fat: "body_fat_percentage",
  vo2: "vo2_max",
  hydration: "hydration",
  distance_walking_running: "distance_walk_run",
  distance_cycling: "distance_cycling",
  active_energy: "active_energy",
  basal_energy: "basal_energy",
  flights_climbed: "flights_climbed",
  workout_duration: "workout_generic",
  workout_energy: "workout_generic"
};

export function autoDetectMetrics(hass: any): MetricConfig[] {
  if (!hass?.states) return [];
  const matches: Detection[] = [];
  const entities = Object.entries(hass.states) as [string, any][];
  entities.forEach(([entityId, entity]) => {
    const lower = entityId.toLowerCase();
    for (const key of Object.keys(keywordMap)) {
      if (lower.includes(key)) {
        matches.push({ preset: keywordMap[key], entity: entityId });
        return;
      }
    }
    const unit = entity.attributes?.unit_of_measurement;
    if (unit === "bpm") matches.push({ preset: "heart_rate", entity: entityId });
    if (unit === "%") matches.push({ preset: "spo2", entity: entityId });
    if (unit === "kcal") matches.push({ preset: "active_energy", entity: entityId });
    if (unit === "mi" || unit === "km") matches.push({ preset: "distance_walk_run", entity: entityId });
    if (unit === "ms") matches.push({ preset: "hrv_sdnn", entity: entityId });
    if (unit === "mg/dL") matches.push({ preset: "glucose", entity: entityId });
  });

  const unique: Record<string, MetricConfig> = {};
  matches.forEach((m) => {
    if (!unique[m.preset]) {
      unique[m.preset] = { preset: m.preset, entity: m.entity, name: metricPresets[m.preset]?.name };
    }
  });
  return Object.values(unique);
}
