import { MediaPosterCard } from "@/components/media-poster-card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Media } from "@/lib/tmdb"
import { ChevronRight } from "lucide-react"
import { motion } from "motion/react"
import { useTranslation } from "react-i18next"
import { Link } from "react-router"

interface MediaRailProps {
  title: string
  description?: string
  items: Media[]
  viewAllHref?: string
}

export function MediaRail({
  title,
  description,
  items,
  viewAllHref,
}: MediaRailProps) {
  const { t } = useTranslation()

  if (items.length === 0) {
    return null
  }

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 10,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.25,
      }}
    >
      <div className="mb-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <h2 className="text-lg font-semibold tracking-tight md:text-xl">
            {title}
          </h2>

          {description && (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          )}
        </div>

        {viewAllHref && (
          <Link
            to={viewAllHref}
            className="flex shrink-0 items-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            {t("common.viewAll")}
            <ChevronRight className="size-3.5" />
          </Link>
        )}
      </div>

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="-mx-4 w-auto md:mx-0 md:w-full"
      >
        <CarouselContent className="-ml-3">
          {items.map((media, index) => (
            <CarouselItem
              key={`${media.mediaType}-${media.id}`}
              className={[
                "basis-auto pl-3",
                index === 0 && "pl-7 md:pl-3",
                index === items.length - 1 && "pr-4 md:pr-0",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              <MediaPosterCard media={media} />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </motion.section>
  )
}
