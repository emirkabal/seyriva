import { MediaCard } from "@/components/media-card"
import { LanguageSwitcher } from "@/components/language-switcher"
import { MediaRail } from "@/components/media-rail"
import { Input } from "@/components/ui/input"
import {
  getPopularMovies,
  getPopularTVShows,
  getTopRatedMovies,
  searchMedia,
  type Media,
} from "@/lib/tmdb"
import { LoaderCircle, Search } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { getTMDBLanguage } from "@/i18n"
import { ThemeSwitcher } from "@/components/theme-switcher"

const SEARCH_DELAY = 400
const MIN_QUERY_LENGTH = 2

export function Home() {
  const { i18n, t } = useTranslation()
  const currentLanguage = i18n.resolvedLanguage ?? i18n.language ?? "tr"
  const currentTMDBLanguage = getTMDBLanguage(currentLanguage)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<Media[]>([])
  const [settledQuery, setSettledQuery] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [popularMovies, setPopularMovies] = useState<Media[]>([])
  const [popularTVShows, setPopularTVShows] = useState<Media[]>([])
  const [topRatedMovies, setTopRatedMovies] = useState<Media[]>([])
  const [isDiscoverLoading, setIsDiscoverLoading] = useState(true)

  const normalizedQuery = query.trim()

  useEffect(() => {
    let isActive = true

    async function loadDiscovery() {
      try {
        const [movies, tvShows, topRated] = await Promise.all([
          getPopularMovies({ language: currentTMDBLanguage }),
          getPopularTVShows({ language: currentTMDBLanguage }),
          getTopRatedMovies({ language: currentTMDBLanguage }),
        ])

        if (!isActive) {
          return
        }

        setPopularMovies(movies.results.slice(0, 12))
        setPopularTVShows(tvShows.results.slice(0, 12))
        setTopRatedMovies(topRated.results.slice(0, 12))
      } finally {
        if (isActive) {
          setIsDiscoverLoading(false)
        }
      }
    }

    loadDiscovery()

    return () => {
      isActive = false
    }
  }, [currentTMDBLanguage])

  useEffect(() => {
    if (normalizedQuery.length === 0) {
      setResults([])
      setSettledQuery("")
      setError(null)
      setIsLoading(false)
      return
    }

    if (normalizedQuery.length < MIN_QUERY_LENGTH) {
      setError(null)
      setIsLoading(false)
      return
    }

    let isActive = true

    const timeout = window.setTimeout(async () => {
      setIsLoading(true)
      setError(null)

      try {
        const data = await searchMedia(normalizedQuery, {
          language: currentTMDBLanguage,
        })

        if (!isActive) {
          return
        }

        setResults(data.results)
        setSettledQuery(normalizedQuery)
      } catch {
        if (!isActive) {
          return
        }

        setError(t("home.searchError"))
      } finally {
        if (isActive) {
          setIsLoading(false)
        }
      }
    }, SEARCH_DELAY)

    return () => {
      isActive = false
      window.clearTimeout(timeout)
    }
  }, [normalizedQuery, t, currentTMDBLanguage])

  const isQueryTooShort =
    normalizedQuery.length > 0 && normalizedQuery.length < MIN_QUERY_LENGTH

  const showNoResults =
    !isLoading &&
    !error &&
    normalizedQuery.length >= MIN_QUERY_LENGTH &&
    settledQuery === normalizedQuery &&
    results.length === 0

  const isSearching = normalizedQuery.length > 0

  return (
    <main className="mx-auto min-h-screen w-full max-w-5xl overflow-x-clip px-4 pb-20">
      <div className="flex justify-end pt-4">
        <div className="flex items-center gap-1">
          <ThemeSwitcher />
          <LanguageSwitcher />
        </div>
      </div>

      <section className="mx-auto max-w-2xl pt-8 text-center md:pt-14">
        <h1 className="text-4xl font-bold tracking-tight md:text-6xl">
          {t("home.title")}
        </h1>

        <p className="mt-4 text-sm text-muted-foreground md:text-base">
          {t("home.subtitle")}
        </p>

        <div className="relative mt-12 md:mt-16">
          <Search className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground" />

          <Input
            value={query}
            className="h-14 rounded-xl pr-12 pl-12 text-base"
            placeholder={t("home.placeholder")}
            autoComplete="off"
            spellCheck={false}
            aria-label={t("home.ariaLabel")}
            aria-busy={isLoading}
            onChange={(event) => setQuery(event.target.value)}
          />

          <AnimatePresence initial={false}>
            {isLoading && (
              <motion.div
                key="search-loading"
                className="absolute top-1/2 right-4 -translate-y-1/2"
                initial={{
                  opacity: 0,
                }}
                animate={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                <LoaderCircle className="size-5 animate-spin text-muted-foreground" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence mode="wait">
        {isSearching ? (
          <motion.section
            key="search-results"
            className="mx-auto mt-6 w-full max-w-2xl overflow-x-clip"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            aria-live="polite"
          >
            <AnimatePresence initial={false}>
              {error && (
                <motion.div
                  key="search-error"
                  className="mb-3 rounded-xl border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive"
                  initial={{
                    opacity: 0,
                    y: -6,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -6,
                  }}
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {isQueryTooShort && (
                <motion.p
                  key="short-query"
                  className="py-6 text-center text-sm text-muted-foreground"
                  initial={{
                    opacity: 0,
                  }}
                  animate={{
                    opacity: 1,
                  }}
                  exit={{
                    opacity: 0,
                  }}
                >
                  {t("home.shortQuery", { count: MIN_QUERY_LENGTH })}
                </motion.p>
              )}
            </AnimatePresence>

            <AnimatePresence initial={false}>
              {showNoResults && (
                <motion.div
                  key="no-results"
                  className="py-12 text-center"
                  initial={{
                    opacity: 0,
                    y: 8,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                  }}
                  exit={{
                    opacity: 0,
                    y: -8,
                  }}
                >
                  <p className="font-medium">{t("common.noResults")}</p>

                  <p className="mt-1 text-sm text-muted-foreground">
                    {t("home.noResultsHint")}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="relative flex w-full flex-col gap-2 overflow-x-clip">
              <AnimatePresence initial={false} mode="popLayout">
                {results.map((media) => (
                  <MediaCard
                    key={`${media.mediaType}-${media.id}`}
                    media={media}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.section>
        ) : (
          <motion.div
            key="discover"
            className="mt-16 space-y-12"
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: 8,
            }}
            transition={{
              duration: 0.2,
            }}
          >
            {isDiscoverLoading ? (
              <DiscoverySkeleton />
            ) : (
              <>
                <MediaRail
                  title={t("home.popularMoviesTitle")}
                  description={t("home.popularMoviesDescription")}
                  items={popularMovies}
                  viewAllHref="/browse/popular-movies"
                />

                <MediaRail
                  title={t("home.popularTvTitle")}
                  description={t("home.popularTvDescription")}
                  items={popularTVShows}
                  viewAllHref="/browse/popular-tv"
                />

                <MediaRail
                  title={t("home.topRatedTitle")}
                  description={t("home.topRatedDescription")}
                  items={topRatedMovies}
                  viewAllHref="/browse/top-rated-movies"
                />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

function DiscoverySkeleton() {
  return (
    <div className="space-y-12">
      {[1, 2, 3].map((section) => (
        <div key={section}>
          <div className="mb-4 h-6 w-44 animate-pulse rounded-md bg-muted" />

          <div className="flex gap-3 overflow-hidden">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="w-35 shrink-0 sm:w-40">
                <div className="aspect-2/3 animate-pulse rounded-xl bg-muted" />
                <div className="mt-2 h-4 w-3/4 animate-pulse rounded bg-muted" />
                <div className="mt-2 h-3 w-1/2 animate-pulse rounded bg-muted" />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Home
