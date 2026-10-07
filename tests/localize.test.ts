import { afterEach, describe, it, expect } from "vitest";
import { computeLocalize, localize } from "../src/localize";
import { formatTrend, formatValue, setNumberLocale } from "../src/utils/formatting";

afterEach(() => setNumberLocale(undefined));

describe("German translation", () => {
  it("picks German labels, also for regional tags", () => {
    expect(localize("label.period.today", "de")).toBe("Heute");
    expect(localize("label.period.today", "de-AT")).toBe("Heute");
  });

  it("fills placeholders in German strings", () => {
    expect(localize("label.vs_previous", "de", { period: "7 Tage" })).toContain("7 Tage");
  });

  it("falls back to English for unknown languages", () => {
    expect(localize("label.period.today", "xx")).toBe("Today");
  });

  it("formats numbers in the language of the labels", () => {
    computeLocalize({ locale: { language: "de" } });
    expect(formatValue(57.8, "kg", 1)).toBe("57,8 kg");
    expect(formatTrend(-0.4, "kg", 1)).toBe("-0,4 kg");
    computeLocalize({ locale: { language: "en" } });
    expect(formatValue(57.8, "kg", 1)).toBe("57.8 kg");
  });

  it("keeps the plain format without a language", () => {
    expect(formatValue(1234.5, "kcal", 1)).toBe("1234.5 kcal");
  });
});
