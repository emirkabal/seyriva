import { SUPPORTED_LANGUAGES, type Language } from "@/i18n"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Check, Languages } from "lucide-react"
import { useTranslation } from "react-i18next"

export function LanguageSwitcher() {
  const { i18n } = useTranslation()

  const currentLanguage = (
    i18n.resolvedLanguage ??
    i18n.language ??
    "tr"
  ).split("-")[0] as Language

  const currentOption =
    SUPPORTED_LANGUAGES.find(
      (language) => language.value === currentLanguage
    ) ?? SUPPORTED_LANGUAGES[0]

  async function changeLanguage(language: Language) {
    await i18n.changeLanguage(language)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2"
          aria-label="Dil seç"
        >
          <Languages className="size-4" />

          <span className="hidden sm:inline">{currentOption.nativeLabel}</span>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="min-w-40">
        {SUPPORTED_LANGUAGES.map((language) => {
          const isActive = language.value === currentLanguage

          return (
            <DropdownMenuItem
              key={language.value}
              onClick={() => changeLanguage(language.value)}
              className="flex items-center justify-between gap-4"
            >
              <span>{language.nativeLabel}</span>

              {isActive && <Check className="size-4 text-muted-foreground" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
