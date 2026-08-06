import i18next from "i18next"
import { initReactI18next } from "react-i18next"

import de from "./locales/de.json"
import en from "./locales/en.json"
import es from "./locales/es.json"
import fr from "./locales/fr.json"
import tr from "./locales/tr.json"

export type Language = "tr" | "en" | "de" | "fr" | "es"

export const DEFAULT_LANGUAGE: Language = "tr"

export const SUPPORTED_LANGUAGES = [
  {
    value: "tr",
    label: "Turkish",
    nativeLabel: "Türkçe",
  },
  {
    value: "en",
    label: "English",
    nativeLabel: "English",
  },
  {
    value: "de",
    label: "German",
    nativeLabel: "Deutsch",
  },
  {
    value: "fr",
    label: "French",
    nativeLabel: "Français",
  },
  {
    value: "es",
    label: "Spanish",
    nativeLabel: "Español",
  },
] as const

export function isLanguage(value: string | null | undefined): value is Language {
  return value === "tr" || value === "en" || value === "de" || value === "fr" || value === "es"
}

export function getLanguageLabel(language: Language) {
  return SUPPORTED_LANGUAGES.find((option) => option.value === language)?.nativeLabel ?? language
}

export function getLocale(language: Language) {
  switch (language) {
    case "en":
      return "en-US"
    case "de":
      return "de-DE"
    case "fr":
      return "fr-FR"
    case "es":
      return "es-ES"
    default:
      return "tr-TR"
  }
}

export function getTMDBLanguage(language: string | null | undefined) {
  const normalized = language?.split("-")[0]

  switch (normalized) {
    case "en":
      return "en-US"
    case "de":
      return "de-DE"
    case "fr":
      return "fr-FR"
    case "es":
      return "es-ES"
    case "tr":
    default:
      return "tr-TR"
  }
}

function getInitialLanguage() {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE
  }

  const storedLanguage = window.localStorage.getItem("seyriva-language")
  if (storedLanguage && isLanguage(storedLanguage)) {
    return storedLanguage
  }

  const browserLanguage = window.navigator.language.split("-")[0]
  if (isLanguage(browserLanguage)) {
    return browserLanguage
  }

  return DEFAULT_LANGUAGE
}

const resources = {
  tr: {
    translation: tr,
  },
  en: {
    translation: en,
  },
  de: {
    translation: de,
  },
  fr: {
    translation: fr,
  },
  es: {
    translation: es,
  },
} as const

void i18next.use(initReactI18next).init({
  resources,
  lng: getInitialLanguage(),
  supportedLngs: SUPPORTED_LANGUAGES.map((language) => language.value),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
  defaultNS: "translation",
  react: {
    useSuspense: false,
  },
})

if (typeof window !== "undefined") {
  i18next.on("languageChanged", (language) => {
    if (isLanguage(language)) {
      window.localStorage.setItem("seyriva-language", language)
    }
  })
}

export default i18next
