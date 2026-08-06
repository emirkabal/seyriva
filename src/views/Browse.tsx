import { LanguageSwitcher } from "@/components/language-switcher"
import { MediaPosterCard } from "@/components/media-poster-card"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Button } from "@/components/ui/button"
import { getTMDBLanguage } from "@/i18n"
import {
  getPopularMovies,
  getPopularTVShows,
  getTopRatedMovies,
  type Media,
  type TMDBListResponse,
} from "@/lib/tmdb"
import { AlertCircle, ChevronLeft, LoaderCircle } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCallback, useEffect, useRef, useState } from "react"
import { useTranslation } from "react-i18next"
import { Link, useParams } from "react-router"

type BrowseCategory = "popular-movies" | "popular-tv" | "top-rated-movies"

interface BrowseConfig {
  titleKey: string
  descriptionKey: string
  fetcher: (options: {
    page?: number
    language?: string
  }) => Promise<TMDBListResponse<Media>>
}

const BROWSE_CATEGORIES: Record<BrowseCategory, BrowseConfig> = {
  "popular-movies": {
    titleKey: "home.popularMoviesTitle",
    descriptionKey: "home.popularMoviesDescription",
    fetcher: getPopularMovies,
  },

  "popular-tv": {
    titleKey: "home.popularTvTitle",
    descriptionKey: "home.popularTvDescription",
    fetcher: getPopularTVShows,
  },

  "top-rated-movies": {
    titleKey: "home.topRatedTitle",
    descriptionKey: "home.topRatedDescription",
    fetcher: getTopRatedMovies,
  },
}

function isBrowseCategory(value: string | undefined): value is BrowseCategory {
  if (!value) {
    return false
  }

  return value in BROWSE_CATEGORIES
}

export function Browse() {
  const { category } = useParams()
  const { i18n, t } = useTranslation()

  const loadMoreRef = useRef<HTMLDivElement | null>(null)

  const currentLanguage = i18n.resolvedLanguage ?? i18n.language ?? "tr"

  const currentTMDBLanguage = getTMDBLanguage(currentLanguage)

  const [items, setItems] = useState<Media[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingMore, setIsLoadingMore] = useState(false)

  const [error, setError] = useState<string | null>(null)

  const validCategory = isBrowseCategory(category)

  const config = validCategory ? BROWSE_CATEGORIES[category] : null

  const loadPage = useCallback(
    async (pageToLoad: number, append = false) => {
      if (!config) {
        return
      }

      if (append) {
        setIsLoadingMore(true)
      } else {
        setIsLoading(true)
      }

      setError(null)

      try {
        const data = await config.fetcher({
          page: pageToLoad,
          language: currentTMDBLanguage,
        })

        setItems((current) => {
          if (!append) {
            return data.results
          }

          const existing = new Set(
            current.map((media) => `${media.mediaType}-${media.id}`)
          )

          const newItems = data.results.filter(
            (media) => !existing.has(`${media.mediaType}-${media.id}`)
          )

          return [...current, ...newItems]
        })

        setPage(data.page)
        setTotalPages(data.totalPages)
      } catch {
        setError(t("browse.contentError"))
      } finally {
        setIsLoading(false)
        setIsLoadingMore(false)
      }
    },
    [config, currentTMDBLanguage, t]
  )

  useEffect(() => {
    setItems([])
    setPage(1)
    setTotalPages(1)
    setError(null)

    if (config) {
      void loadPage(1)
    }
  }, [category, config, currentTMDBLanguage, loadPage])

  useEffect(() => {
    const target = loadMoreRef.current

    if (!target || isLoading || isLoadingMore || page >= totalPages || error) {
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          return
        }

        void loadPage(page + 1, true)
      },
      {
        root: null,
        rootMargin: "500px 0px",
        threshold: 0,
      }
    )

    observer.observe(target)

    return () => {
      observer.disconnect()
    }
  }, [page, totalPages, isLoading, isLoadingMore, error, loadPage])

  if (!validCategory || !config) {
    return <InvalidBrowsePage />
  }

  return (
    <main className="min-h-svh bg-background">
      <div className="mx-auto w-full max-w-7xl px-4 pt-6 pb-20 md:px-6">
        <div className="flex items-center justify-between gap-4">
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

        <header className="mt-8">
          <motion.div
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              {t(config.titleKey)}
            </h1>

            <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
              {t(config.descriptionKey)}
            </p>
          </motion.div>
        </header>

        {isLoading ? (
          <BrowseSkeleton />
        ) : error && items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center justify-center text-center">
            <AlertCircle className="size-8 text-destructive" />

            <p className="mt-4 font-medium">{t("browse.failedToLoad")}</p>

            <p className="mt-1 text-sm text-muted-foreground">{error}</p>

            <Button
              className="mt-5"
              onClick={() => {
                void loadPage(1)
              }}
            >
              {t("common.retry")}
            </Button>
          </div>
        ) : (
          <>
            <motion.div
              className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: 0.025,
                  },
                },
              }}
            >
              <AnimatePresence>
                {items.map((media) => (
                  <motion.div
                    key={`${media.mediaType}-${media.id}`}
                    className="min-w-0"
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: 8,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                      },
                    }}
                    initial="hidden"
                    animate="visible"
                  >
                    <div className="[&>a]:w-full">
                      <MediaPosterCard media={media} />
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {error && items.length > 0 && (
              <div className="mt-10 flex flex-col items-center text-center">
                <p className="text-sm text-destructive">{error}</p>

                <Button
                  variant="outline"
                  className="mt-4"
                  disabled={isLoadingMore}
                  onClick={() => {
                    void loadPage(page + 1, true)
                  }}
                >
                  {t("common.retry")}
                </Button>
              </div>
            )}

            {page < totalPages && !error && (
              <div
                ref={loadMoreRef}
                className="flex h-28 items-center justify-center"
                aria-hidden="true"
              >
                {isLoadingMore && (
                  <LoaderCircle className="size-5 animate-spin text-muted-foreground" />
                )}
              </div>
            )}

            {page >= totalPages && items.length > 0 && <div className="h-12" />}
          </>
        )}
      </div>
    </main>
  )
}

function BrowseSkeleton() {
  return (
    <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {Array.from({
        length: 18,
      }).map((_, index) => (
        <div key={index}>
          <div className="aspect-2/3 animate-pulse rounded-xl bg-muted" />

          <div className="mt-3 h-4 w-3/4 animate-pulse rounded bg-muted" />

          <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted" />
        </div>
      ))}
    </div>
  )
}

function InvalidBrowsePage() {
  const { t } = useTranslation()

  return (
    <main className="flex min-h-svh items-center justify-center p-6">
      <div className="text-center">
        <h1 className="text-xl font-semibold">
          {t("browse.invalidCategoryTitle")}
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          {t("browse.invalidCategoryDescription")}
        </p>

        <Button className="mt-6">
          <Link to="/">{t("common.backToHome")}</Link>
        </Button>
      </div>
    </main>
  )
}

export default Browse
