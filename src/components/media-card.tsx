import { Button } from "@/components/ui/button"
import type { Media } from "@/lib/tmdb"
import { Film, Star, Tv } from "lucide-react"
import { motion } from "motion/react"
import { forwardRef } from "react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"

interface MediaCardProps {
  media: Media
}

export const MediaCard = forwardRef<HTMLDivElement, MediaCardProps>(
  function MediaCard({ media }, ref) {
    const { t } = useTranslation()
    const mediaLabel = media.mediaType === "movie" ? t("common.movie") : t("common.tvShow")

    return (
      <motion.div
        ref={ref}
        layout="position"
        className="relative w-full"
        initial={{
          opacity: 0,
          y: 10,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        exit={{
          opacity: 0,
          y: -8,
        }}
        transition={{
          layout: {
            type: "spring",
            stiffness: 500,
            damping: 42,
            mass: 0.8,
          },
          opacity: {
            duration: 0.16,
          },
          y: {
            duration: 0.18,
          },
        }}
      >
        <Button
          variant="ghost"
          className="h-auto w-full justify-start overflow-hidden rounded-xl p-0 text-left"
        >
          <Link
            to={`/w/${media.mediaType}/${media.id}`}
            className="flex w-full min-w-0 items-center gap-4 p-2"
          >
            <div className="flex h-20 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-muted">
              {media.posterUrl ? (
                <img
                  src={media.posterUrl}
                  alt={`${media.title} ${t("common.posterAlt")}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <Film className="size-5 text-muted-foreground" />
              )}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate font-medium">
                {media.title}
              </p>

              <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  {media.mediaType === "movie" ? (
                    <Film className="size-3.5" />
                  ) : (
                    <Tv className="size-3.5" />
                  )}

                  {mediaLabel}
                </span>

                {media.year !== null && (
                  <>
                    <span aria-hidden="true">•</span>
                    <span>{media.year}</span>
                  </>
                )}

                {media.voteAverage > 0 && (
                  <>
                    <span aria-hidden="true">•</span>

                    <span className="flex items-center gap-1">
                      <Star className="size-3.5" />
                      {media.voteAverage.toFixed(1)}
                    </span>
                  </>
                )}
              </div>

              {media.overview && (
                <p className="mt-2 line-clamp-2 whitespace-normal text-xs leading-relaxed text-muted-foreground">
                  {media.overview}
                </p>
              )}
            </div>
          </Link>
        </Button>
      </motion.div>
    )
  },
)

MediaCard.displayName = "MediaCard"