import { getLocale, type Language } from "@/i18n"
import type { MediaDetails } from "@/lib/tmdb"
import {
  CalendarDays,
  Clock3,
  Film,
  Globe2,
  Layers3,
  ListVideo,
  Star,
  Tv,
} from "lucide-react"
import { useTranslation } from "react-i18next"

interface MediaDetailsProps {
  media: MediaDetails
}

function formatRuntime(minutes: number | null, t: (key: string) => string) {
  if (!minutes) {
    return null
  }

  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours === 0) {
    return `${remainingMinutes}${t("media.minutesShort")}`
  }

  if (remainingMinutes === 0) {
    return `${hours}${t("media.hoursShort")}`
  }

  return `${hours}${t("media.hoursShort")} ${remainingMinutes}${t("media.minutesShort")}`
}

export function MediaDetailsPanel({ media }: MediaDetailsProps) {
  const { t, i18n } = useTranslation()
  const locale = getLocale(
    (i18n.resolvedLanguage ?? i18n.language ?? "tr") as Language
  )
  const isMovie = media.mediaType === "movie"
  const runtime = formatRuntime(media.runtimeMinutes, t)

  return (
    <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="min-w-0">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium">
            {isMovie ? (
              <Film className="size-3.5" />
            ) : (
              <Tv className="size-3.5" />
            )}

            {isMovie ? t("common.movie") : t("common.tvShow")}
          </span>

          {media.status && (
            <span className="rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium">
              {media.status}
            </span>
          )}

          {media.voteAverage > 0 && (
            <span className="inline-flex items-center gap-1.5 rounded-full border bg-muted/40 px-3 py-1 text-xs font-medium">
              <Star className="size-3.5 fill-current" />
              {media.voteAverage.toFixed(1)}
            </span>
          )}
        </div>

        <h1 className="mt-5 text-3xl font-bold tracking-tight md:text-5xl">
          {media.title}
        </h1>

        {media.originalTitle !== media.title && (
          <p className="mt-2 text-sm text-muted-foreground">
            {media.originalTitle}
          </p>
        )}

        {media.tagline && (
          <p className="mt-5 text-lg text-muted-foreground italic">
            “{media.tagline}”
          </p>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {media.year && (
            <span className="flex items-center gap-1.5">
              <CalendarDays className="size-4" />
              {media.year}
            </span>
          )}

          {runtime && (
            <span className="flex items-center gap-1.5">
              <Clock3 className="size-4" />
              {runtime}
            </span>
          )}

          {media.originalLanguage && (
            <span className="flex items-center gap-1.5 uppercase">
              <Globe2 className="size-4" />
              {media.originalLanguage}
            </span>
          )}

          {media.voteCount > 0 && (
            <span>
              {media.voteCount.toLocaleString(locale)} {t("media.votes")}
            </span>
          )}
        </div>

        {media.genres.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {media.genres.map((genre) => (
              <span
                key={genre.id}
                className="rounded-lg bg-secondary px-3 py-1.5 text-xs text-secondary-foreground"
              >
                {genre.name}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8">
          <h2 className="text-lg font-semibold">{t("media.topic")}</h2>

          <p className="mt-3 max-w-3xl text-sm leading-7 whitespace-pre-line text-muted-foreground md:text-base">
            {media.overview || t("media.overviewFallback")}
          </p>
        </div>

        {!isMovie && (
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {media.numberOfSeasons !== null && (
              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Layers3 className="size-4" />
                  {t("media.season")}
                </div>

                <p className="mt-2 text-2xl font-semibold">
                  {media.numberOfSeasons}
                </p>
              </div>
            )}

            {media.numberOfEpisodes !== null && (
              <div className="rounded-xl border bg-card p-4">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ListVideo className="size-4" />
                  {t("media.episode")}
                </div>

                <p className="mt-2 text-2xl font-semibold">
                  {media.numberOfEpisodes}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <aside className="lg:order-last">
        <div className="overflow-hidden rounded-2xl border bg-card">
          <div className="aspect-2/3 bg-muted">
            {media.posterUrl ? (
              <img
                src={media.posterUrl}
                alt={`${media.title} ${t("common.posterAlt")}`}
                className="size-full object-cover"
              />
            ) : (
              <div className="flex size-full items-center justify-center">
                <Film className="size-10 text-muted-foreground" />
              </div>
            )}
          </div>

          <div className="space-y-4 p-4 text-sm">
            <DetailRow
              label={t("media.genre")}
              value={isMovie ? t("common.movie") : t("common.tvShow")}
            />

            {media.releaseDate && (
              <DetailRow
                label={t("media.releaseDate")}
                value={new Intl.DateTimeFormat(locale, {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                }).format(new Date(media.releaseDate))}
              />
            )}

            {media.status && (
              <DetailRow label={t("media.status")} value={media.status} />
            )}

            {runtime && (
              <DetailRow
                label={isMovie ? t("media.runtime") : t("media.episodeRuntime")}
                value={runtime}
              />
            )}

            {media.homepage && (
              <a
                href={media.homepage}
                target="_blank"
                rel="noreferrer"
                className="block rounded-lg border px-3 py-2 text-center font-medium transition-colors hover:bg-muted"
              >
                {t("media.officialSite")}
              </a>
            )}
          </div>
        </div>
      </aside>
    </div>
  )
}

interface DetailRowProps {
  label: string
  value: string
}

function DetailRow({ label, value }: DetailRowProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-muted-foreground">{label}</span>

      <span className="text-right font-medium">{value}</span>
    </div>
  )
}
