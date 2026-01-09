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
  entity: string;
  name?: string;
  icon?: string;
  unit_override?: string;
  decimals?: number;
  goal?: number | { entity: string };
  goal_entity?: string;
  ranges?: RangeConfig | RangeBand[];
  stage?: "asleep" | "in_bed" | "core" | "deep" | "rem" | "unknown";
}

export interface FitnessCardBaseConfig {
  type: string;
  title?: string;
  metrics: MetricConfig[];
  compact?: boolean;
}
