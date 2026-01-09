import en from "../languages/en.json";
import es from "../languages/es.json";

type LanguageMap = Record<string, string>;

const languages: Record<string, LanguageMap> = {
  en,
  es
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
  return (key: string, vars?: Record<string, string | number>) => localize(key, language, vars);
}
