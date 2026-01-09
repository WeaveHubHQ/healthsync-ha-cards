# Healthsync Fitness Cards

Lovelace cards for Apple Health style fitness data. Metrics are supplied via YAML (no hardcoded entities) and formatting is inferred from units so any Home Assistant user can drop in their own sensors.

## What’s inside
- Four cards: `fitness-activity-summary-card`, `fitness-vitals-card`, `fitness-sleep-card`, `fitness-body-metrics-card`
- Shared formatting for energy, distance, steps, vitals, body metrics, sleep stages, workouts
- Theme-aware styling for Home Assistant dark/light modes
- Metric catalog generated from `ha-apple-health-states.filtered.json` in `data/metric-catalog.json` for quick reference

## Installation
1. Copy `dist/fitness-cards.js` to `config/www/community/healthsync-ha-cards/`.
2. Add a Lovelace resource: URL `/local/community/healthsync-ha-cards/fitness-cards.js`, type `module`.
3. Restart the frontend or clear cache.
4. Optional: install via HACS by adding this repo as a custom repository, then select “Healthsync Fitness Cards”.

## Card config model (shared)
Every card takes a `metrics` array with entries supporting:
- `entity` (required), `name`, `icon`, `unit_override`, `decimals`
- Goals: `goal` (number) or `goal_entity`
- `ranges`: thresholds `{low, normal, high}` or an array of bands `{label,min,max,color}`
- Sleep-only helper: `stage` (`asleep|in_bed|core|deep|rem|unknown`) to force stage mapping
- `compact: true` on the card to tighten padding

Formatting defaults by unit:
- `bpm`, `breaths/min`, `count`, `kcal`, `ms`, `mg/dL`, `s` → 0 decimals
- `%` → 1 decimal
- `lb`, `fl oz US` → 1 decimal
- `mi` → 2 decimals
- Minutes are shown as `xh ym` once they grow large (e.g., `420 min` → `7h 0m`)
- Unknown/unavailable renders as `—`

## Mapping your own entities
Pick the Apple Health sensors you want to show (Developer Tools → States), copy their entity IDs, and plug them into the `metrics` array. If your units differ, set `unit_override` or `decimals` to match your preference. Use `goal` or `goal_entity` for progress bars. Sleep stages can be auto-detected from the entity id, or force them with `stage`.

## Examples (based on the provided catalog)

### Activity summary
```yaml
- type: custom:fitness-activity-summary-card
  title: Activity Rings
  metrics:
    - entity: sensor.jasons_iphone_health_active_energy_burned_daily_total
      name: Active Energy
      icon: mdi:fire
      goal: 600
    - entity: sensor.jasons_iphone_health_steps_daily_total
      name: Steps
      icon: mdi:shoe-print
      goal: 8000
    - entity: sensor.jasons_iphone_health_distance_walking_running_daily_total
      name: Walk/Run Distance
      icon: mdi:walk
      goal: 3
      decimals: 2
    - entity: sensor.jasons_iphone_health_flights_climbed_daily_total
      name: Flights Climbed
      icon: mdi:stairs-up
      goal: 10
```

### Vitals
```yaml
- type: custom:fitness-vitals-card
  title: Vitals
  metrics:
    - entity: sensor.jasons_iphone_health_heart_rate
      name: Heart Rate
      icon: mdi:heart-pulse
      ranges:
        low: 50
        normal: [55, 95]
        high: 120
    - entity: sensor.jasons_iphone_health_resting_heart_rate
      name: Resting HR
      icon: mdi:heart
      ranges:
        low: 45
        normal: [50, 90]
        high: 110
    - entity: sensor.jasons_iphone_health_heart_rate_variability_sdnn
      name: HRV (SDNN)
      icon: mdi:heart-flash
      ranges:
        low: 20
    - entity: sensor.jasons_iphone_health_oxygen_saturation
      name: SpO2
      icon: mdi:water-percent
      ranges:
        low: 92
        normal: [95, 100]
    - entity: sensor.jasons_iphone_health_respiratory_rate
      name: Respiratory Rate
      icon: mdi:lungs
      ranges:
        low: 10
        normal: [12, 20]
        high: 24
```

### Sleep
```yaml
- type: custom:fitness-sleep-card
  title: Sleep
  metrics:
    - entity: sensor.jasons_iphone_health_sleep_asleep
      name: Asleep
      stage: asleep
    - entity: sensor.jasons_iphone_health_sleep_in_bed
      name: In Bed
      stage: in_bed
    - entity: sensor.jasons_iphone_health_sleep_core
      name: Core
      stage: core
    - entity: sensor.jasons_iphone_health_sleep_deep
      name: Deep
      stage: deep
    - entity: sensor.jasons_iphone_health_sleep_rem
      name: REM
      stage: rem
    - entity: sensor.jasons_iphone_health_sleep_unknown
      name: Unknown
      stage: unknown
```

### Body metrics
```yaml
- type: custom:fitness-body-metrics-card
  title: Body Metrics
  metrics:
    - entity: sensor.jasons_iphone_health_weight
      name: Weight
      icon: mdi:scale-bathroom
      decimals: 1
    - entity: sensor.jasons_iphone_health_bmi
      name: BMI
      icon: mdi:human-male-height
      decimals: 1
    - entity: sensor.jasons_iphone_health_body_fat_percentage
      name: Body Fat
      icon: mdi:percent
      unit_override: "%"
    - entity: sensor.jasons_iphone_health_lean_body_mass
      name: Lean Mass
      icon: mdi:human
      decimals: 1
    - entity: sensor.jasons_iphone_health_vo2_max
      name: VO2 Max
      icon: mdi:run
      decimals: 1
```

## Development
- `npm install`
- `npm run dev` to serve the ES module for local testing
- `npm run build` creates `dist/fitness-cards.js`
- `npm run lint` type-checks the project
