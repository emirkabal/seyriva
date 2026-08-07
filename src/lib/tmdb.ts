const TMDB_API_BASE = "https://api.themoviedb.org/3"
const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p"

const DEFAULT_LANGUAGE = "tr-TR"
const DEFAULT_REGION = "TR"

type TMDBQueryValue = string | number | boolean | null | undefined

export type MediaType = "movie" | "tv"

export interface Media {
  id: number
  mediaType: MediaType
  title: string
  originalTitle: string
  overview: string
  releaseDate: string | null
  year: number | null
  posterPath: string | null
  backdropPath: string | null
  posterUrl: string | null
  backdropUrl: string | null
  voteAverage: number
  voteCount: number
  popularity: number
  genreIds: number[]
  originalLanguage: string
  adult: boolean
}

export interface Genre {
  id: number
  name: string
}

export interface MediaDetails extends Media {
  genres: Genre[]
  runtimeMinutes: number | null
  status: string | null
  tagline: string | null
  homepage: string | null
  numberOfSeasons: number | null
  numberOfEpisodes: number | null
}

export interface TMDBListResponse<T> {
  page: number
  results: T[]
  totalPages: number
  totalResults: number
}

export interface MediaListOptions {
  page?: number
  language?: string
  region?: string
}

export interface SearchMediaOptions {
  page?: number
  language?: string
  includeAdult?: boolean
}

export interface MediaDetailsOptions {
  language?: string
}

interface TMDBGenre {
  id: number
  name: string
}

interface TMDBBaseMediaResponse {
  id: number
  adult?: boolean
  overview?: string
  poster_path?: string | null
  backdrop_path?: string | null
  popularity?: number
  vote_average?: number
  vote_count?: number
  original_language?: string
  genre_ids?: number[]
  genres?: TMDBGenre[]
  homepage?: string | null
  status?: string | null
  tagline?: string | null
}

interface TMDBMovieResponse extends TMDBBaseMediaResponse {
  title?: string
  original_title?: string
  release_date?: string
  runtime?: number | null
}

interface TMDBTVResponse extends TMDBBaseMediaResponse {
  name?: string
  original_name?: string
  first_air_date?: string
  episode_run_time?: number[]
  number_of_seasons?: number
  number_of_episodes?: number
}

type TMDBMovieSearchResult = TMDBMovieResponse & {
  media_type: "movie"
}

type TMDBTVSearchResult = TMDBTVResponse & {
  media_type: "tv"
}

interface TMDBPersonSearchResult {
  id: number
  media_type: "person"
}

type TMDBSearchResult =
  TMDBMovieSearchResult | TMDBTVSearchResult | TMDBPersonSearchResult

interface TMDBRawListResponse<T> {
  page: number
  results: T[]
  total_pages: number
  total_results: number
}

interface TMDBErrorResponse {
  success?: boolean
  status_code?: number
  status_message?: string
}

export class TMDBError extends Error {
  readonly statusCode: number | null
  readonly endpoint: string

  constructor(message: string, statusCode: number | null, endpoint: string) {
    super(message)
    this.name = "TMDBError"
    this.statusCode = statusCode
    this.endpoint = endpoint
  }
}

function getAccessToken(): string {
  const token =
    "d6026e393eb5243af3cf84211acd46fe"

  if (!token) {
    throw new Error("TMDB_ACCESS_TOKEN environment variable is missing")
  }

  return token
}

function validatePage(page: number): number {
  if (!Number.isInteger(page) || page < 1) {
    throw new RangeError("Page must be a positive integer")
  }

  return page
}

function validateMediaId(id: number): number {
  if (!Number.isInteger(id) || id < 1) {
    throw new RangeError("Media ID must be a positive integer")
  }

  return id
}

function normalizeDate(date?: string | null): string | null {
  const value = date?.trim()

  return value || null
}

function extractYear(date: string | null): number | null {
  if (!date) {
    return null
  }

  const year = Number.parseInt(date.slice(0, 4), 10)

  return Number.isNaN(year) ? null : year
}

function extractGenreIds(item: TMDBBaseMediaResponse): number[] {
  if (item.genre_ids) {
    return item.genre_ids
  }

  return item.genres?.map((genre) => genre.id) ?? []
}

export function getTMDBImageUrl(
  path: string | null | undefined,
  size: string = "w500"
): string | null {
  if (!path) {
    return null
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`

  return `${TMDB_IMAGE_BASE}/${size}${normalizedPath}`
}

function normalizeMovie(item: TMDBMovieResponse): Media {
  const releaseDate = normalizeDate(item.release_date)

  return {
    id: item.id,
    mediaType: "movie",
    title:
      item.title?.trim() || item.original_title?.trim() || `Movie ${item.id}`,
    originalTitle:
      item.original_title?.trim() || item.title?.trim() || `Movie ${item.id}`,
    overview: item.overview?.trim() ?? "",
    releaseDate,
    year: extractYear(releaseDate),
    posterPath: item.poster_path ?? null,
    backdropPath: item.backdrop_path ?? null,
    posterUrl: getTMDBImageUrl(item.poster_path, "w500"),
    backdropUrl: getTMDBImageUrl(item.backdrop_path, "w1280"),
    voteAverage: item.vote_average ?? 0,
    voteCount: item.vote_count ?? 0,
    popularity: item.popularity ?? 0,
    genreIds: extractGenreIds(item),
    originalLanguage: item.original_language ?? "",
    adult: item.adult ?? false,
  }
}

function normalizeTVShow(item: TMDBTVResponse): Media {
  const releaseDate = normalizeDate(item.first_air_date)

  return {
    id: item.id,
    mediaType: "tv",
    title: item.name?.trim() || item.original_name?.trim() || `TV ${item.id}`,
    originalTitle:
      item.original_name?.trim() || item.name?.trim() || `TV ${item.id}`,
    overview: item.overview?.trim() ?? "",
    releaseDate,
    year: extractYear(releaseDate),
    posterPath: item.poster_path ?? null,
    backdropPath: item.backdrop_path ?? null,
    posterUrl: getTMDBImageUrl(item.poster_path, "w500"),
    backdropUrl: getTMDBImageUrl(item.backdrop_path, "w1280"),
    voteAverage: item.vote_average ?? 0,
    voteCount: item.vote_count ?? 0,
    popularity: item.popularity ?? 0,
    genreIds: extractGenreIds(item),
    originalLanguage: item.original_language ?? "",
    adult: item.adult ?? false,
  }
}

function normalizeMovieDetails(item: TMDBMovieResponse): MediaDetails {
  return {
    ...normalizeMovie(item),
    genres: item.genres ?? [],
    runtimeMinutes: item.runtime ?? null,
    status: item.status?.trim() || null,
    tagline: item.tagline?.trim() || null,
    homepage: item.homepage?.trim() || null,
    numberOfSeasons: null,
    numberOfEpisodes: null,
  }
}

function normalizeTVDetails(item: TMDBTVResponse): MediaDetails {
  const runtime = item.episode_run_time?.find((value) => value > 0) ?? null

  return {
    ...normalizeTVShow(item),
    genres: item.genres ?? [],
    runtimeMinutes: runtime,
    status: item.status?.trim() || null,
    tagline: item.tagline?.trim() || null,
    homepage: item.homepage?.trim() || null,
    numberOfSeasons: item.number_of_seasons ?? null,
    numberOfEpisodes: item.number_of_episodes ?? null,
  }
}

function normalizeListResponse<T>(
  response: TMDBRawListResponse<T>,
  normalizer: (item: T) => Media
): TMDBListResponse<Media> {
  return {
    page: response.page,
    results: response.results.map(normalizer),
    totalPages: response.total_pages,
    totalResults: response.total_results,
  }
}

async function fetchFromTMDB<T>(
  endpoint: string,
  params: Record<string, TMDBQueryValue> = {}
): Promise<T> {
  const url = new URL(`${TMDB_API_BASE}${endpoint}`)
  url.searchParams.set("api_key", getAccessToken())

  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  }

  try {
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      signal: AbortSignal.timeout(10_000),
    })

    if (!response.ok) {
      const payload = (await response
        .json()
        .catch(() => null)) as TMDBErrorResponse | null

      throw new TMDBError(
        payload?.status_message ||
          `TMDB request failed with status ${response.status}`,
        response.status,
        endpoint
      )
    }

    return (await response.json()) as T
  } catch (error) {
    if (error instanceof TMDBError) {
      throw error
    }

    const message =
      error instanceof Error ? error.message : "Unknown TMDB request error"

    throw new TMDBError(`Failed to fetch from TMDB: ${message}`, null, endpoint)
  }
}

export async function getPopularMovies(
  options: MediaListOptions = {}
): Promise<TMDBListResponse<Media>> {
  const {
    page = 1,
    language = DEFAULT_LANGUAGE,
    region = DEFAULT_REGION,
  } = options

  const response = await fetchFromTMDB<TMDBRawListResponse<TMDBMovieResponse>>(
    "/movie/popular",
    {
      page: validatePage(page),
      language,
      region,
    }
  )

  return normalizeListResponse(response, normalizeMovie)
}

export async function getTopRatedMovies(
  options: MediaListOptions = {}
): Promise<TMDBListResponse<Media>> {
  const {
    page = 1,
    language = DEFAULT_LANGUAGE,
    region = DEFAULT_REGION,
  } = options

  const response = await fetchFromTMDB<TMDBRawListResponse<TMDBMovieResponse>>(
    "/movie/top_rated",
    {
      page: validatePage(page),
      language,
      region,
    }
  )

  return normalizeListResponse(response, normalizeMovie)
}

export async function getUpcomingMovies(
  options: MediaListOptions = {}
): Promise<TMDBListResponse<Media>> {
  const {
    page = 1,
    language = DEFAULT_LANGUAGE,
    region = DEFAULT_REGION,
  } = options

  const response = await fetchFromTMDB<TMDBRawListResponse<TMDBMovieResponse>>(
    "/movie/upcoming",
    {
      page: validatePage(page),
      language,
      region,
    }
  )

  return normalizeListResponse(response, normalizeMovie)
}

export async function getPopularTVShows(
  options: MediaListOptions = {}
): Promise<TMDBListResponse<Media>> {
  const { page = 1, language = DEFAULT_LANGUAGE } = options

  const response = await fetchFromTMDB<TMDBRawListResponse<TMDBTVResponse>>(
    "/tv/popular",
    {
      page: validatePage(page),
      language,
    }
  )

  return normalizeListResponse(response, normalizeTVShow)
}

export async function getTopRatedTVShows(
  options: MediaListOptions = {}
): Promise<TMDBListResponse<Media>> {
  const { page = 1, language = DEFAULT_LANGUAGE } = options

  const response = await fetchFromTMDB<TMDBRawListResponse<TMDBTVResponse>>(
    "/tv/top_rated",
    {
      page: validatePage(page),
      language,
    }
  )

  return normalizeListResponse(response, normalizeTVShow)
}

export async function searchMedia(
  query: string,
  options: SearchMediaOptions = {}
): Promise<TMDBListResponse<Media>> {
  const normalizedQuery = query.trim()

  if (!normalizedQuery) {
    return {
      page: 1,
      results: [],
      totalPages: 0,
      totalResults: 0,
    }
  }

  const {
    page = 1,
    language = DEFAULT_LANGUAGE,
    includeAdult = false,
  } = options

  const response = await fetchFromTMDB<TMDBRawListResponse<TMDBSearchResult>>(
    "/search/multi",
    {
      query: normalizedQuery,
      page: validatePage(page),
      language,
      include_adult: includeAdult,
    }
  )

  const results = response.results.flatMap((item) => {
    if (item.media_type === "movie") {
      return [normalizeMovie(item)]
    }

    if (item.media_type === "tv") {
      return [normalizeTVShow(item)]
    }

    return []
  })

  return {
    page: response.page,
    results,
    totalPages: response.total_pages,
    totalResults: response.total_results,
  }
}

export async function getMovieDetails(
  movieId: number,
  options: MediaDetailsOptions = {}
): Promise<MediaDetails> {
  const { language = DEFAULT_LANGUAGE } = options

  const response = await fetchFromTMDB<TMDBMovieResponse>(
    `/movie/${validateMediaId(movieId)}`,
    { language }
  )

  return normalizeMovieDetails(response)
}

export async function getTVDetails(
  seriesId: number,
  options: MediaDetailsOptions = {}
): Promise<MediaDetails> {
  const { language = DEFAULT_LANGUAGE } = options

  const response = await fetchFromTMDB<TMDBTVResponse>(
    `/tv/${validateMediaId(seriesId)}`,
    { language }
  )

  return normalizeTVDetails(response)
}

export async function getMediaDetails(
  mediaId: number,
  mediaType: MediaType,
  options: MediaDetailsOptions = {}
): Promise<MediaDetails> {
  if (mediaType === "movie") {
    return getMovieDetails(mediaId, options)
  }

  return getTVDetails(mediaId, options)
}
