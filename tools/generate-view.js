#!/usr/bin/env node
// Simple view generator. Edit the mappings below to match your entities, then run:
// node tools/generate-view.js

const presets = {
  activity: [
    { preset: "active_energy", entity: "sensor.health_active_energy_burned_daily_total", goal: 600 },
    { preset: "steps", entity: "sensor.health_steps_daily_total", goal: 8000 },
    { preset: "distance_walk_run", entity: "sensor.health_distance_walking_running_daily_total" },
    { preset: "flights_climbed", entity: "sensor.health_flights_climbed_daily_total" }
  ],
  vitals: [
    { preset: "heart_rate", entity: "sensor.health_heart_rate" },
    { preset: "resting_heart_rate", entity: "sensor.health_resting_heart_rate" },
    { preset: "hrv_sdnn", entity: "sensor.health_heart_rate_variability_sdnn" },
    { preset: "spo2", entity: "sensor.health_oxygen_saturation" },
    { preset: "respiratory_rate", entity: "sensor.health_respiratory_rate" }
  ],
  sleep: [
    { preset: "asleep", entity: "sensor.health_sleep_asleep" },
    { preset: "in_bed", entity: "sensor.health_sleep_in_bed" },
    { preset: "sleep_core", entity: "sensor.health_sleep_core" },
    { preset: "sleep_deep", entity: "sensor.health_sleep_deep" },
    { preset: "sleep_rem", entity: "sensor.health_sleep_rem" },
    { preset: "sleep_unknown", entity: "sensor.health_sleep_unknown" }
  ],
  body: [
    { preset: "weight", entity: "sensor.health_weight" },
    { preset: "bmi", entity: "sensor.health_bmi" },
    { preset: "body_fat_percentage", entity: "sensor.health_body_fat_percentage" },
    { preset: "lean_body_mass", entity: "sensor.health_lean_body_mass" },
    { preset: "vo2_max", entity: "sensor.health_vo2_max" }
  ]
};

const view = {
  title: "Fitness",
  cards: [
    {
      type: "custom:fitness-overview-card",
      period: "today",
      history: true,
      preset: "overview",
      primary_metrics: presets.activity.slice(0, 3),
      secondary_metrics: [presets.vitals[0], presets.vitals[3], presets.body[0]]
    },
    {
      type: "custom:fitness-activity-summary-card",
      period: "7d",
      history: true,
      metrics: presets.activity
    },
    {
      type: "custom:fitness-vitals-card",
      history: true,
      metrics: presets.vitals
    },
    {
      type: "custom:fitness-sleep-card",
      metrics: presets.sleep
    },
    {
      type: "custom:fitness-body-metrics-card",
      history: true,
      metrics: presets.body
    }
  ]
};

console.log("# Generated Lovelace view");
console.log(JSON.stringify(view, null, 2));
