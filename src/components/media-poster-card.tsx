import type { Media } from "@/lib/tmdb"
import { Film, Star, Tv } from "lucide-react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"

interface MediaPosterCardProps {
  media: Media
}

export function MediaPosterCard({ media }: MediaPosterCardProps) {
  const { t } = useTranslation()

  return (
    <Link
      to={`/w/${media.mediaType}/${media.id}`}
      className="group block w-35 shrink-0 select-none sm:w-40"
    >
      <div className="relative aspect-2/3 overflow-hidden rounded-xl bg-muted">
        {media.posterUrl ? (
          <img
            src={media.posterUrl}
            alt={`${media.title} ${t("common.posterAlt")}`}
            loading="lazy"
            className="size-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex size-full items-center justify-center">
            <Film className="size-7 text-muted-foreground" />
          </div>
        )}

        {media.voteAverage > 0 && (
          <div className="absolute right-2 bottom-2 flex items-center gap-1 rounded-md bg-background/85 px-2 py-1 text-xs font-medium backdrop-blur-md">
            <Star className="size-3 fill-current" />
            {media.voteAverage.toFixed(1)}
          </div>
        )}
      </div>

      <div className="mt-2">
        <p className="truncate text-sm font-medium">{media.title}</p>

        <div className="mt-1 flex items-center gap-1.5 text-xs text-muted-foreground">
          {media.mediaType === "movie" ? (
            <Film className="size-3" />
          ) : (
            <Tv className="size-3" />
          )}

          <span>
            {media.mediaType === "movie"
              ? t("common.movie")
              : t("common.tvShow")}
          </span>

          {media.year && (
            <>
              <span>•</span>
              <span>{media.year}</span>
            </>
          )}
        </div>
      </div>
    </Link>
  )
}
