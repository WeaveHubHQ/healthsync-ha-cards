import { HassEntity, HomeAssistant, Period } from "../types";
import { parseNumber } from "./formatting";

interface HistoryEntry {
  state: string;
  last_changed: string;
}

type HistoryResponse = HistoryEntry[][];

const cache = new Map<string, { ts: number; value: number | null }>();
const seriesCache = new Map<string, { ts: number; value: number[] }>();
const CACHE_MS = 30_000;
const THROTTLE_MS = 2_000;
const lastRequest: Record<string, number> = {};

function buildKey(entityId: string, start: Date, end: Date) {
  return `${entityId}-${start.toISOString()}-${end.toISOString()}`;
}

async function fetchHistory(
  hass: HomeAssistant,
  entityId: string,
  start: Date,
  end: Date
): Promise<number | null> {
  const key = buildKey(entityId, start, end);
  const now = Date.now();
  const cached = cache.get(key);
  if (lastRequest[key] && now - lastRequest[key] < THROTTLE_MS) {
    if (cached) return cached.value;
  }
  if (cached && now - cached.ts < CACHE_MS) return cached.value;

  try {
    const path = `history/period/${start.toISOString()}?filter_entity_id=${entityId}&end_time=${end.toISOString()}&minimal_response`;
    // @ts-ignore hass.callApi is provided by HA
    lastRequest[key] = now;
    const response: HistoryResponse = await hass.callApi?.("GET", path);
    const series = Array.isArray(response) ? response[0] : undefined;
    if (!series || !series.length) {
      cache.set(key, { ts: now, value: null });
      return null;
    }
    const latest = [...series].reverse().find((item) => parseNumber(item.state) !== null);
    const parsed = latest ? parseNumber(latest.state) : null;
    cache.set(key, { ts: now, value: parsed });
    return parsed;
  } catch (error) {
    cache.set(key, { ts: now, value: null });
    return null;
  }
}

function windowForPeriod(period: Period): { start: Date; end: Date; prevStart: Date; prevEnd: Date } {
  const end = new Date();
  const start = new Date();
  if (period === "today") {
    start.setHours(0, 0, 0, 0);
    const prevStart = new Date(start);
    prevStart.setDate(prevStart.getDate() - 1);
    const prevEnd = new Date(start);
    return { start, end, prevStart, prevEnd };
  }
  if (period === "7d") {
    start.setDate(start.getDate() - 7);
    const prevEnd = new Date(start);
    const prevStart = new Date(start);
    prevStart.setDate(prevStart.getDate() - 7);
    return { start, end, prevStart, prevEnd };
  }
  if (period === "30d") {
    start.setDate(start.getDate() - 30);
    const prevEnd = new Date(start);
    const prevStart = new Date(start);
    prevStart.setDate(prevStart.getDate() - 30);
    return { start, end, prevStart, prevEnd };
  }
  const prevEnd = new Date();
  const prevStart = new Date(prevEnd.getTime() - 30 * 60 * 1000);
  return { start, end, prevStart, prevEnd };
}

export interface TrendResult {
  current: number | null;
  previous: number | null;
  diff: number | null;
  label: string;
}

export async function computeTrend(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  period: Period
): Promise<TrendResult> {
  if (!hass || !entityId) {
    return { current: null, previous: null, diff: null, label: period };
  }
  const { start, end, prevStart, prevEnd } = windowForPeriod(period);
  const current = await fetchHistory(hass, entityId, start, end);
  const previous = await fetchHistory(hass, entityId, prevStart, prevEnd);
  const diff = current !== null && previous !== null ? current - previous : null;
  return { current, previous, diff, label: period };
}

export function previousFromEntity(entity?: HassEntity): number | null {
  if (!entity) return null;
  const candidates = [
    entity.attributes?.previous_state,
    entity.attributes?.previous,
    entity.attributes?.last_value,
    entity.attributes?.prior_value
  ];
  for (const candidate of candidates) {
    const parsed = parseNumber(candidate);
    if (parsed !== null) return parsed;
  }
  return null;
}

export async function fetchHistorySeries(
  hass: HomeAssistant | undefined,
  entityId: string | undefined,
  start: Date,
  end: Date,
  points: number
): Promise<number[]> {
  if (!hass || !entityId) return [];
  const key = `${entityId}-${start.toISOString()}-${end.toISOString()}-${points}`;
  const now = Date.now();
  const cached = seriesCache.get(key);
  if (cached && now - cached.ts < CACHE_MS) return cached.value;

  try {
    lastRequest[key] = now;
    const path = `history/period/${start.toISOString()}?filter_entity_id=${entityId}&end_time=${end.toISOString()}&minimal_response`;
    // @ts-ignore
    const response: HistoryResponse = await hass.callApi?.("GET", path);
    const series = Array.isArray(response) ? response[0] : undefined;
    if (!series || !series.length) {
      seriesCache.set(key, { ts: now, value: [] });
      return [];
    }
    const bucket: number[] = [];
    const span = end.getTime() - start.getTime();
    const interval = span / points;
    for (let i = 0; i < points; i++) {
      const bucketStart = start.getTime() + i * interval;
      const bucketEnd = bucketStart + interval;
      const slice = series.filter((item) => {
        const ts = new Date(item.last_changed).getTime();
        return ts >= bucketStart && ts < bucketEnd;
      });
      const latest = [...slice].reverse().find((item) => parseNumber(item.state) !== null);
      bucket.push(latest ? (parseNumber(latest.state) as number) : NaN);
    }
    seriesCache.set(key, { ts: now, value: bucket });
    return bucket;
  } catch {
    seriesCache.set(key, { ts: now, value: [] });
    return [];
  }
}
