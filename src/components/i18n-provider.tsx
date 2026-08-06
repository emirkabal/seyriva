import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import {
  DEFAULT_LANGUAGE,
  getTranslation,
  getLocale,
  isLanguage,
  type Language,
} from "@/lib/i18n"

interface I18nContextValue {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: string, params?: Record<string, string | number>) => string
  locale: string
}

const I18nContext = createContext<I18nContextValue | null>(null)

const STORAGE_KEY = "seyriva.language"

function readStoredLanguage(): Language {
  if (typeof window === "undefined") {
    return DEFAULT_LANGUAGE
  }

  const stored = window.localStorage.getItem(STORAGE_KEY)
  return isLanguage(stored) ? stored : DEFAULT_LANGUAGE
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(DEFAULT_LANGUAGE)

  useEffect(() => {
    setLanguageState(readStoredLanguage())

    const handleLanguageChange = (event: Event) => {
      const nextLanguage = (event as CustomEvent<Language>).detail
      if (isLanguage(nextLanguage)) {
        setLanguageState(nextLanguage)
      }
    }

    window.addEventListener("seyriva-language-change", handleLanguageChange)

    return () => {
      window.removeEventListener("seyriva-language-change", handleLanguageChange)
    }
  }, [])

  const setLanguage = (nextLanguage: Language) => {
    setLanguageState(nextLanguage)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, nextLanguage)
      window.dispatchEvent(new CustomEvent("seyriva-language-change", { detail: nextLanguage }))
    }
  }

  const t = useMemo(
    () => (key: string, params?: Record<string, string | number>) => {
      const translation = getTranslation(language, key)
      if (!params) {
        return translation
      }

      return translation.replace(/\{(\w+)\}/g, (match, paramName) => {
        const value = params[paramName]
        return value === undefined ? match : String(value)
      })
    },
    [language],
  )

  const locale = useMemo(() => getLocale(language), [language])

  const value = useMemo<I18nContextValue>(
    () => ({ language, setLanguage, t, locale }),
    [language, locale, t],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error("useI18n must be used within an I18nProvider")
  }

  return context
}
