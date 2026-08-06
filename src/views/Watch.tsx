import { MediaDetailsPanel } from "@/components/media-details"
import { LanguageSwitcher } from "@/components/language-switcher"
import { MediaPlayer } from "@/components/media-player"
import { Button } from "@/components/ui/button"
import { getMediaDetails, type MediaDetails, type MediaType } from "@/lib/tmdb"
import { AlertCircle, ChevronLeft } from "lucide-react"
import { motion } from "motion/react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import { useTranslation } from "react-i18next"
import { getTMDBLanguage } from "@/i18n"
import { ThemeSwitcher } from "@/components/theme-switcher"

export function Watch() {
  const { type, id } = useParams()
  const { i18n, t } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language ?? "tr"
  const currentTMDBLanguage = getTMDBLanguage(currentLanguage)

  const [media, setMedia] = useState<MediaDetails | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reloadKey, setReloadKey] = useState(0)

  const mediaId = Number(id)
  const isValidType = type === "movie" || type === "tv"
  const isValidId = Number.isInteger(mediaId) && mediaId > 0

  useEffect(() => {
    if (!isValidType || !isValidId) {
      setIsLoading(false)
      return
    }

    let isActive = true

    setIsLoading(true)
    setError(null)

    getMediaDetails(mediaId, type as MediaType, {
      language: currentTMDBLanguage,
    })
      .then((data) => {
        if (!isActive) {
          return
        }

        setMedia(data)
      })
      .catch(() => {
        if (!isActive) {
          return
        }

        setError(t("watch.detailsError"))
      })
      .finally(() => {
        if (isActive) {
          setIsLoading(false)
        }
      })

    return () => {
      isActive = false
    }
  }, [type, mediaId, isValidType, isValidId, reloadKey, t, currentTMDBLanguage])

  if (!isValidType || !isValidId) {
    return <InvalidWatchPage t={t} />
  }

  if (isLoading) {
    return <WatchLoading />
  }

  if (error || !media) {
    return (
      <WatchError
        message={error ?? t("watch.notFound")}
        onRetry={() => setReloadKey((value) => value + 1)}
        t={t}
      />
    )
  }

  return (
    <main className="relative min-h-svh overflow-x-clip bg-background">
      {media.backdropUrl && (
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-130 bg-cover bg-center opacity-25"
          style={{
            backgroundImage: `url("${media.backdropUrl}")`,
          }}
        />
      )}

      <div className="pointer-events-none absolute inset-x-0 top-0 h-135 bg-linear-to-b from-background/20 via-background/85 to-background" />

      <div className="relative mx-auto w-full max-w-7xl px-4 pt-6 pb-20 md:px-6">
        <div className="flex items-center justify-between gap-3">
          <Button variant="ghost" size="sm">
            <Link to="/" className="flex items-center gap-2">
              <ChevronLeft className="size-4" />
              {t("common.home")}
            </Link>
          </Button>

          <div className="flex items-center gap-1">
            <ThemeSwitcher />
            <LanguageSwitcher />
          </div>
        </div>

        <motion.div
          className="mt-6"
          initial={{
            opacity: 0,
            y: 12,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.3,
          }}
        >
          <MediaPlayer
            type={media.mediaType}
            id={media.id}
            title={media.title}
          />
        </motion.div>

        <motion.section
          className="mt-10"
          initial={{
            opacity: 0,
            y: 16,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.08,
            duration: 0.3,
          }}
        >
          <MediaDetailsPanel media={media} />
        </motion.section>
      </div>
    </main>
  )
}

function WatchLoading() {
  return (
    <main className="mx-auto min-h-svh w-full max-w-7xl px-4 py-6 md:px-6">
      <div className="h-9 w-28 animate-pulse rounded-lg bg-muted" />

      <div className="mt-6 aspect-video w-full animate-pulse rounded-2xl bg-muted" />

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div>
          <div className="h-8 w-32 animate-pulse rounded-lg bg-muted" />
          <div className="mt-5 h-12 w-3/4 animate-pulse rounded-lg bg-muted" />
          <div className="mt-4 h-5 w-1/2 animate-pulse rounded-lg bg-muted" />

          <div className="mt-8 space-y-3">
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-full animate-pulse rounded bg-muted" />
            <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
          </div>
        </div>

        <div className="aspect-2/3 animate-pulse rounded-2xl bg-muted" />
      </div>
    </main>
  )
}

interface WatchErrorProps {
  message: string
  onRetry: () => void
  t: (key: string, options?: Record<string, unknown>) => string
}

function WatchError({ message, onRetry, t }: WatchErrorProps) {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 text-center">
        <AlertCircle className="mx-auto size-10 text-destructive" />

        <h1 className="mt-4 text-lg font-semibold">
          {t("common.somethingWentWrong")}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">{message}</p>

        <div className="mt-6 flex justify-center gap-2">
          <Button variant="outline">
            <Link to="/">{t("common.home")}</Link>
          </Button>

          <Button onClick={onRetry}>{t("common.retry")}</Button>
        </div>
      </div>
    </main>
  )
}

function InvalidWatchPage({
  t,
}: {
  t: (key: string, options?: Record<string, unknown>) => string
}) {
  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border bg-card p-6 text-center">
        <AlertCircle className="mx-auto size-10 text-destructive" />

        <h1 className="mt-4 text-lg font-semibold">{t("watch.invalidLink")}</h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {t("watch.invalidLinkDescription")}
        </p>

        <Button className="mt-6">
          <Link to="/">{t("common.backToHome")}</Link>
        </Button>
      </div>
    </main>
  )
}

export default Watch
