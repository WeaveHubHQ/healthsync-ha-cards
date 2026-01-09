import { MetricConfig, RangeConfig } from "./types";

export interface MetricPreset {
  id: string;
  name: string;
  icon: string;
  unit?: string;
  decimals?: number;
  ranges?: RangeConfig;
}

type PresetGroup = Record<string, MetricPreset>;

export const metricPresets: PresetGroup = {
  steps: { id: "steps", name: "Steps", icon: "mdi:shoe-print", unit: "count", decimals: 0 },
  active_energy: { id: "active_energy", name: "Active Energy", icon: "mdi:fire", unit: "kcal", decimals: 0 },
  distance_walk_run: { id: "distance_walk_run", name: "Walk/Run Distance", icon: "mdi:walk", unit: "mi", decimals: 2 },
  distance_cycling: { id: "distance_cycling", name: "Cycling Distance", icon: "mdi:bike", unit: "mi", decimals: 2 },
  flights_climbed: { id: "flights_climbed", name: "Flights Climbed", icon: "mdi:stairs-up", unit: "count", decimals: 0 },

  heart_rate: { id: "heart_rate", name: "Heart Rate", icon: "mdi:heart-pulse", unit: "bpm", decimals: 0, ranges: { low: 50, normal: [55, 95], high: 120 } },
  resting_heart_rate: { id: "resting_heart_rate", name: "Resting HR", icon: "mdi:heart", unit: "bpm", decimals: 0, ranges: { low: 45, normal: [50, 90], high: 110 } },
  hrv_sdnn: { id: "hrv_sdnn", name: "HRV (SDNN)", icon: "mdi:heart-flash", unit: "ms", decimals: 0, ranges: { low: 20 } },
  spo2: { id: "spo2", name: "SpO2", icon: "mdi:water-percent", unit: "%", decimals: 1, ranges: { low: 92, normal: [95, 100] } },
  respiratory_rate: { id: "respiratory_rate", name: "Respiratory Rate", icon: "mdi:lungs", unit: "breaths/min", decimals: 0, ranges: { low: 10, normal: [12, 20], high: 24 } },

  asleep: { id: "asleep", name: "Asleep", icon: "mdi:sleep", unit: "min", decimals: 0 },
  in_bed: { id: "in_bed", name: "In bed", icon: "mdi:bed", unit: "min", decimals: 0 },
  sleep_core: { id: "sleep_core", name: "Core", icon: "mdi:alpha-c-circle", unit: "min", decimals: 0 },
  sleep_deep: { id: "sleep_deep", name: "Deep", icon: "mdi:alpha-d-circle", unit: "min", decimals: 0 },
  sleep_rem: { id: "sleep_rem", name: "REM", icon: "mdi:alpha-r-circle", unit: "min", decimals: 0 },
  sleep_unknown: { id: "sleep_unknown", name: "Unknown", icon: "mdi:help-circle-outline", unit: "min", decimals: 0 },

  weight: { id: "weight", name: "Weight", icon: "mdi:scale-bathroom", unit: "lb", decimals: 1 },
  bmi: { id: "bmi", name: "BMI", icon: "mdi:human-male-height", unit: "count", decimals: 1 },
  body_fat_percentage: { id: "body_fat_percentage", name: "Body Fat", icon: "mdi:percent", unit: "%", decimals: 1 },
  lean_body_mass: { id: "lean_body_mass", name: "Lean Mass", icon: "mdi:human", unit: "lb", decimals: 1 },
  vo2_max: { id: "vo2_max", name: "VO2 Max", icon: "mdi:run", unit: "mL/(kg*min)", decimals: 1 },
  glucose: { id: "glucose", name: "Blood Glucose", icon: "mdi:diabetes", unit: "mg/dL", decimals: 0 },

  workout_cycling: { id: "workout_cycling", name: "Cycling", icon: "mdi:bike" },
  workout_walking: { id: "workout_walking", name: "Walking", icon: "mdi:walk" },
  workout_strength_training: { id: "workout_strength_training", name: "Strength Training", icon: "mdi:weight-lifter" },
  workout_functional_strength: { id: "workout_functional_strength", name: "Functional Strength", icon: "mdi:arm-flex" },
  workout_hiit: { id: "workout_hiit", name: "HIIT", icon: "mdi:lightning-bolt" },
  workout_generic: { id: "workout_generic", name: "Workout", icon: "mdi:arm-flex-outline" }
};

export const cardPresets: Record<string, MetricConfig[]> = {
  activity: [
    { preset: "active_energy" },
    { preset: "steps" },
    { preset: "distance_walk_run" },
    { preset: "flights_climbed" }
  ],
  vitals: [
    { preset: "heart_rate" },
    { preset: "resting_heart_rate" },
    { preset: "hrv_sdnn" },
    { preset: "spo2" },
    { preset: "respiratory_rate" }
  ],
  sleep: [
    { preset: "asleep", stage: "asleep" },
    { preset: "in_bed", stage: "in_bed" },
    { preset: "sleep_core", stage: "core" },
    { preset: "sleep_deep", stage: "deep" },
    { preset: "sleep_rem", stage: "rem" },
    { preset: "sleep_unknown", stage: "unknown" }
  ],
  body: [
    { preset: "weight" },
    { preset: "bmi" },
    { preset: "body_fat_percentage" },
    { preset: "lean_body_mass" },
    { preset: "vo2_max" }
  ],
  workouts: [],
  overview: []
};

export function applyMetricPreset(metric: MetricConfig): MetricConfig {
  if (!metric.preset) return metric;
  const preset = metricPresets[metric.preset];
  if (!preset) return metric;
  return {
    ...preset,
    ...metric,
    name: metric.name ?? preset.name,
    icon: metric.icon ?? preset.icon,
    unit_override: metric.unit_override ?? preset.unit,
    decimals: metric.decimals ?? preset.decimals,
    ranges: metric.ranges ?? preset.ranges
  };
}
