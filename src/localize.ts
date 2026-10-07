import en from "../languages/en.json";
import es from "../languages/es.json";
import de from "../languages/de.json";
import { setNumberLocale } from "./utils/formatting";

type LanguageMap = Record<string, string>;

const languages: Record<string, LanguageMap> = {
  en,
  es,
  de
};

function pickLanguage(language?: string): LanguageMap {
  if (!language) return languages.en;
  const normalized = language.split("-")[0];
  return languages[normalized] || languages.en;
}

export function localize(key: string, language?: string, vars?: Record<string, string | number>): string {
  const strings = pickLanguage(language);
  const base = strings[key] ?? languages.en[key] ?? key;
  if (!vars) return base;
  return Object.entries(vars).reduce(
    (acc, [token, value]) => acc.replace(`{${token}}`, String(value)),
    base
  );
}

export function computeLocalize(hass?: any) {
  const language = hass?.locale?.language || hass?.language;
  // Numbers follow the same language as the labels: 57,8 kg in German,
  // 57.8 kg in English.
  setNumberLocale(language);
  return (key: string, vars?: Record<string, string | number>) => localize(key, language, vars);
}
