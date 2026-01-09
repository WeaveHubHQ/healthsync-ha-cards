export type MetricCategory =
  | "energy"
  | "distance"
  | "steps"
  | "vitals"
  | "sleep"
  | "body"
  | "workout"
  | "flights"
  | "other";

export type Period = "current" | "today" | "7d" | "30d";

export interface HassEntity {
  entity_id?: string;
  state: string;
  attributes: {
    unit_of_measurement?: string;
    friendly_name?: string;
    icon?: string;
    [key: string]: any;
  };
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  formatEntityState?: (entity: HassEntity, style?: string) => string;
  callApi?: (method: string, path: string, body?: any) => Promise<any>;
  locale?: { language?: string };
  language?: string;
}

export interface RangeBand {
  label?: string;
  min?: number;
  max?: number;
  color?: string;
}

export interface RangeConfig {
  low?: number;
  normal?: [number, number] | number;
  high?: number;
  bands?: RangeBand[];
}

export interface MetricConfig {
  entity?: string;
  name?: string;
  icon?: string;
  unit_override?: string;
  decimals?: number;
  goal?: number | { entity: string };
  goal_entity?: string;
  ranges?: RangeConfig | RangeBand[];
  stage?: "asleep" | "in_bed" | "core" | "deep" | "rem" | "unknown";
  preset?: string;
  trend_entity?: string;
}

export interface FitnessCardBaseConfig {
  type: string;
  title?: string;
  metrics: MetricConfig[];
  compact?: boolean;
  period?: Period;
  show_trends?: boolean;
  preset?: string;
}

export interface WorkoutMetricConfig {
  name: string;
  icon?: string;
  duration_entity?: string;
  energy_entity?: string;
  distance_entity?: string;
}

export interface WorkoutsCardConfig {
  type: string;
  title?: string;
  workouts: WorkoutMetricConfig[];
  compact?: boolean;
  period?: Period;
  preset?: string;
  show_trends?: boolean;
}

export interface OverviewCardConfig {
  type: string;
  title?: string;
  primary_metrics: MetricConfig[];
  secondary_metrics?: MetricConfig[];
  compact?: boolean;
  period?: Period;
  preset?: string;
  show_trends?: boolean;
}
