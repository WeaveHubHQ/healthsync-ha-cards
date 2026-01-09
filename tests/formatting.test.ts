import { describe, it, expect } from "vitest";
import { defaultDecimals, evaluateRange, parseNumber } from "../src/utils/formatting";

describe("formatting helpers", () => {
  it("parses numbers safely", () => {
    expect(parseNumber("10.5")).toBe(10.5);
    expect(parseNumber("unknown")).toBeNull();
    expect(parseNumber(null)).toBeNull();
  });

  it("chooses default decimals by unit", () => {
    expect(defaultDecimals("bpm")).toBe(0);
    expect(defaultDecimals("%")).toBe(1);
    expect(defaultDecimals("mi")).toBe(2);
  });

  it("evaluates ranges with bands", () => {
    const res = evaluateRange(95, { bands: [{ label: "Normal", min: 90, max: 100, severity: "normal" }] });
    expect(res.status).toBe("normal");
  });
});
