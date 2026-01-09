import catalog from "../../data/metric-catalog.json";
import { MetricCategory } from "../types";

export interface MetricCatalogEntry {
  entity_id: string;
  friendly_name?: string;
  unit_of_measurement?: string;
  device_class?: string | null;
  state_class?: string | null;
  icon?: string | null;
  category: MetricCategory;
}

export const metricCatalog: MetricCatalogEntry[] = (catalog as MetricCatalogEntry[]).map(
  (item) => ({
    ...item,
    category: (item.category ?? "other") as MetricCategory
  })
);

export function byCategory(category: MetricCategory): MetricCatalogEntry[] {
  return metricCatalog.filter((entry) => entry.category === category);
}

export function findMetric(entityId: string): MetricCatalogEntry | undefined {
  return metricCatalog.find((entry) => entry.entity_id === entityId);
}
