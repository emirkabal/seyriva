import {
  Check,
  Laptop,
  Moon,
  Sun,
} from "lucide-react"

import { useTheme } from "@/components/theme-provider"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const THEMES = [
  {
    value: "light",
    label: "Açık",
    icon: Sun,
  },
  {
    value: "dark",
    label: "Koyu",
    icon: Moon,
  },
  {
    value: "system",
    label: "Sistem",
    icon: Laptop,
  },
] as const

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  const currentTheme =
    THEMES.find((item) => item.value === theme) ??
    THEMES[2]

  const CurrentIcon = currentTheme.icon

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Tema değiştir"
        >
          <CurrentIcon className="size-4" />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align="end"
        className="min-w-36"
      >
        {THEMES.map((item) => {
          const Icon = item.icon
          const isActive = theme === item.value

          return (
            <DropdownMenuItem
              key={item.value}
              onClick={() => setTheme(item.value)}
              className="gap-2"
            >
              <Icon className="size-4" />

              <span className="flex-1">
                {item.label}
              </span>

              {isActive && (
                <Check className="size-4 text-muted-foreground" />
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}