export type Language = "tr" | "en" | "de" | "fr" | "es"

export const DEFAULT_LANGUAGE: Language = "tr"

export const SUPPORTED_LANGUAGES: Array<{
  value: Language
  label: string
  nativeLabel: string
}> = [
  {
    value: "tr",
    label: "Turkish",
    nativeLabel: "Türkçe",
  },
  {
    value: "en",
    label: "English",
    nativeLabel: "English",
  },
  {
    value: "de",
    label: "German",
    nativeLabel: "Deutsch",
  },
  {
    value: "fr",
    label: "French",
    nativeLabel: "Français",
  },
  {
    value: "es",
    label: "Spanish",
    nativeLabel: "Español",
  },
]

export const translations = {
  tr: {
    common: {
      home: "Ana sayfa",
      backToHome: "Ana sayfaya dön",
      language: "Dil",
      movie: "Film",
      tvShow: "Dizi",
      loading: "Yükleniyor",
      retry: "Tekrar dene",
      loadMore: "Daha fazla yükle",
      error: "Bir hata oluştu",
      unknown: "Bilinmiyor",
      noResults: "Sonuç bulunamadı",
      viewAll: "Tümünü gör",
      posterAlt: "Afiş",
      homePage: "Ana sayfa",
      invalidLink: "Geçersiz bağlantı",
      somethingWentWrong: "Bir şeyler ters gitti",
      contentUnavailable: "İçerik mevcut değil",
      back: "Geri",
    },
    home: {
      title: "Seyriva",
      subtitle: "İzlemek istediğin film veya diziyi keşfet.",
      placeholder: "Film veya dizi ara...",
      ariaLabel: "Film veya dizi ara",
      searchError: "Arama sırasında bir hata oluştu.",
      shortQuery: "Arama yapmak için en az {count} karakter yaz.",
      noResultsHint: "Farklı bir film veya dizi adıyla tekrar dene.",
      popularMoviesTitle: "Haftanın popülerleri",
      popularMoviesDescription: "Şu sıralar en çok ilgi gören filmler.",
      popularTvTitle: "Popüler diziler",
      popularTvDescription: "İzleyicilerin şu anda takip ettiği diziler.",
      topRatedTitle: "En yüksek puanlı filmler",
      topRatedDescription: "İzleyicilerden en yüksek puanları alan filmler.",
    },
    browse: {
      invalidCategoryTitle: "Kategori bulunamadı",
      invalidCategoryDescription: "Aradığın içerik kategorisi mevcut değil.",
      contentError: "İçerikler yüklenirken bir hata oluştu.",
      failedToLoad: "İçerikler yüklenemedi",
      retry: "Tekrar dene",
      categoryTitle: "Kategori bulunamadı",
      categoryDescription: "Aradığın içerik kategorisi mevcut değil.",
    },
    watch: {
      invalidLinkDescription: "Film veya dizi bağlantısı geçerli değil.",
      detailsError: "Yapım bilgileri alınırken bir hata oluştu.",
      notFound: "Yapım bulunamadı.",
      invalidLink: "Geçersiz bağlantı",
    },
    media: {
      overviewFallback: "Bu yapım için henüz bir açıklama bulunmuyor.",
      topic: "Konu",
      genre: "Tür",
      releaseDate: "Yayın tarihi",
      status: "Durum",
      runtime: "Süre",
      episodeRuntime: "Bölüm süresi",
      season: "Sezon",
      episode: "Bölüm",
      officialSite: "Resmî site",
      votes: "oy",
      hoursShort: "sa",
      minutesShort: "dk",
      hourShort: "sa",
      minuteShort: "dk",
      posterAlt: "Afiş",
      noPoster: "Afiş yok",
      typeLabel: "Tür",
      originalTitle: "Orijinal başlık",
    },
  },
  en: {
    common: {
      home: "Home",
      backToHome: "Back to home",
      language: "Language",
      movie: "Movie",
      tvShow: "TV show",
      loading: "Loading",
      retry: "Try again",
      loadMore: "Load more",
      error: "Something went wrong",
      unknown: "Unknown",
      noResults: "No results",
      viewAll: "View all",
      posterAlt: "Poster",
      homePage: "Home",
      invalidLink: "Invalid link",
      somethingWentWrong: "Something went wrong",
      contentUnavailable: "Content is unavailable",
      back: "Back",
    },
    home: {
      title: "Seyriva",
      subtitle: "Discover the movie or series you want to watch.",
      placeholder: "Search for a movie or series...",
      ariaLabel: "Search for a movie or series",
      searchError: "An error occurred while searching.",
      shortQuery: "Type at least {count} characters to search.",
      noResultsHint: "Try a different movie or series title.",
      popularMoviesTitle: "Popular this week",
      popularMoviesDescription: "Discover the movies generating the most buzz right now.",
      popularTvTitle: "Popular series",
      popularTvDescription: "Series that viewers are currently following the most.",
      topRatedTitle: "Top rated movies",
      topRatedDescription: "Movies with the highest audience scores.",
    },
    browse: {
      invalidCategoryTitle: "Category not found",
      invalidCategoryDescription: "The content category you are looking for does not exist.",
      contentError: "An error occurred while loading content.",
      failedToLoad: "Content could not be loaded",
      retry: "Try again",
    },
    watch: {
      invalidLinkDescription: "The movie or series link is not valid.",
      detailsError: "An error occurred while retrieving the production details.",
      notFound: "Production not found.",
      invalidLink: "Invalid link",
    },
    media: {
      overviewFallback: "No description is available for this title yet.",
      topic: "Overview",
      genre: "Genre",
      releaseDate: "Release date",
      status: "Status",
      runtime: "Runtime",
      episodeRuntime: "Episode runtime",
      season: "Season",
      episode: "Episode",
      officialSite: "Official site",
      votes: "votes",
      hoursShort: "hr",
      minutesShort: "min",
      hourShort: "hr",
      minuteShort: "min",
      posterAlt: "Poster",
      noPoster: "No poster",
      typeLabel: "Type",
      originalTitle: "Original title",
    },
  },
  de: {
    common: {
      home: "Startseite",
      backToHome: "Zur Startseite",
      language: "Sprache",
      movie: "Film",
      tvShow: "Serie",
      loading: "Wird geladen",
      retry: "Erneut versuchen",
      loadMore: "Mehr laden",
      error: "Etwas ist schiefgelaufen",
      unknown: "Unbekannt",
      noResults: "Keine Ergebnisse",
      viewAll: "Alle ansehen",
      posterAlt: "Poster",
      homePage: "Startseite",
      invalidLink: "Ungültiger Link",
      somethingWentWrong: "Etwas ist schiefgelaufen",
      contentUnavailable: "Inhalt ist nicht verfügbar",
      back: "Zurück",
    },
    home: {
      title: "Seyriva",
      subtitle: "Entdecke den Film oder die Serie, die du anschauen möchtest.",
      placeholder: "Suche nach einem Film oder einer Serie...",
      ariaLabel: "Suche nach einem Film oder einer Serie",
      searchError: "Beim Suchen ist ein Fehler aufgetreten.",
      shortQuery: "Gib mindestens {count} Zeichen ein, um zu suchen.",
      noResultsHint: "Versuche einen anderen Filmtitel oder Serientitel.",
      popularMoviesTitle: "Diese Woche beliebt",
      popularMoviesDescription: "Entdecke die Filme, die gerade viel Aufmerksamkeit erhalten.",
      popularTvTitle: "Beliebte Serien",
      popularTvDescription: "Serien, denen die Zuschauer derzeit am meisten folgen.",
      topRatedTitle: "Bestbewertete Filme",
      topRatedDescription: "Filme mit den höchsten Zuschauerbewertungen.",
    },
    browse: {
      invalidCategoryTitle: "Kategorie nicht gefunden",
      invalidCategoryDescription: "Die gesuchte Inhaltskategorie existiert nicht.",
      contentError: "Beim Laden des Inhalts ist ein Fehler aufgetreten.",
      failedToLoad: "Inhalt konnte nicht geladen werden",
      retry: "Erneut versuchen",
    },
    watch: {
      invalidLinkDescription: "Der Film- oder Serienlink ist ungültig.",
      detailsError: "Beim Abrufen der Produktionsdetails ist ein Fehler aufgetreten.",
      notFound: "Produktion nicht gefunden.",
      invalidLink: "Ungültiger Link",
    },
    media: {
      overviewFallback: "Für diese Produktion ist noch keine Beschreibung verfügbar.",
      topic: "Zusammenfassung",
      genre: "Genre",
      releaseDate: "Veröffentlichungsdatum",
      status: "Status",
      runtime: "Laufzeit",
      episodeRuntime: "Folgenlänge",
      season: "Staffel",
      episode: "Folge",
      officialSite: "Offizielle Website",
      votes: "Stimmen",
      hoursShort: "Std",
      minutesShort: "Min",
      hourShort: "Std",
      minuteShort: "Min",
      posterAlt: "Poster",
      noPoster: "Kein Poster",
      typeLabel: "Typ",
      originalTitle: "Originaltitel",
    },
  },
  fr: {
    common: {
      home: "Accueil",
      backToHome: "Retour à l’accueil",
      language: "Langue",
      movie: "Film",
      tvShow: "Série",
      loading: "Chargement",
      retry: "Réessayer",
      loadMore: "Charger plus",
      error: "Une erreur s’est produite",
      unknown: "Inconnu",
      noResults: "Aucun résultat",
      viewAll: "Tout voir",
      posterAlt: "Affiche",
      homePage: "Accueil",
      invalidLink: "Lien invalide",
      somethingWentWrong: "Une erreur s’est produite",
      contentUnavailable: "Le contenu est indisponible",
      back: "Retour",
    },
    home: {
      title: "Seyriva",
      subtitle: "Découvrez le film ou la série que vous souhaitez regarder.",
      placeholder: "Rechercher un film ou une série...",
      ariaLabel: "Rechercher un film ou une série",
      searchError: "Une erreur s’est produite lors de la recherche.",
      shortQuery: "Saisissez au moins {count} caractères pour rechercher.",
      noResultsHint: "Essayez un autre titre de film ou de série.",
      popularMoviesTitle: "Populaires cette semaine",
      popularMoviesDescription: "Découvrez les films qui suscitent le plus d’intérêt en ce moment.",
      popularTvTitle: "Séries populaires",
      popularTvDescription: "Les séries que les spectateurs suivent actuellement le plus.",
      topRatedTitle: "Films les mieux notés",
      topRatedDescription: "Les films avec les meilleures notes de la part des spectateurs.",
    },
    browse: {
      invalidCategoryTitle: "Catégorie introuvable",
      invalidCategoryDescription: "La catégorie de contenu que vous recherchez n’existe pas.",
      contentError: "Une erreur s’est produite lors du chargement du contenu.",
      failedToLoad: "Le contenu n’a pas pu être chargé",
      retry: "Réessayer",
    },
    watch: {
      invalidLinkDescription: "Le lien du film ou de la série n’est pas valide.",
      detailsError: "Une erreur s’est produite lors de la récupération des détails de la production.",
      notFound: "Production introuvable.",
      invalidLink: "Lien invalide",
    },
    media: {
      overviewFallback: "Aucune description n’est disponible pour cette production pour le moment.",
      topic: "Résumé",
      genre: "Genre",
      releaseDate: "Date de sortie",
      status: "Statut",
      runtime: "Durée",
      episodeRuntime: "Durée d’épisode",
      season: "Saison",
      episode: "Épisode",
      officialSite: "Site officiel",
      votes: "votes",
      hoursShort: "h",
      minutesShort: "min",
      hourShort: "h",
      minuteShort: "min",
      posterAlt: "Affiche",
      noPoster: "Pas d’affiche",
      typeLabel: "Type",
      originalTitle: "Titre original",
    },
  },
  es: {
    common: {
      home: "Inicio",
      backToHome: "Volver al inicio",
      language: "Idioma",
      movie: "Película",
      tvShow: "Serie",
      loading: "Cargando",
      retry: "Reintentar",
      loadMore: "Cargar más",
      error: "Algo salió mal",
      unknown: "Desconocido",
      noResults: "No hay resultados",
      viewAll: "Ver todo",
      posterAlt: "Póster",
      homePage: "Inicio",
      invalidLink: "Enlace no válido",
      somethingWentWrong: "Algo salió mal",
      contentUnavailable: "El contenido no está disponible",
      back: "Atrás",
    },
    home: {
      title: "Seyriva",
      subtitle: "Descubre la película o serie que quieres ver.",
      placeholder: "Busca una película o serie...",
      ariaLabel: "Busca una película o serie",
      searchError: "Ocurrió un error al buscar.",
      shortQuery: "Escribe al menos {count} caracteres para buscar.",
      noResultsHint: "Prueba con un título diferente de película o serie.",
      popularMoviesTitle: "Populares esta semana",
      popularMoviesDescription: "Descubre las películas que más conversación están generando ahora.",
      popularTvTitle: "Series populares",
      popularTvDescription: "Las series que los espectadores siguen más en este momento.",
      topRatedTitle: "Películas mejor valoradas",
      topRatedDescription: "Películas con las puntuaciones más altas del público.",
    },
    browse: {
      invalidCategoryTitle: "Categoría no encontrada",
      invalidCategoryDescription: "La categoría de contenido que buscas no existe.",
      contentError: "Ocurrió un error al cargar el contenido.",
      failedToLoad: "No se pudo cargar el contenido",
      retry: "Reintentar",
    },
    watch: {
      invalidLinkDescription: "El enlace de la película o serie no es válido.",
      detailsError: "Ocurrió un error al recuperar los detalles de la producción.",
      notFound: "No se encontró la producción.",
      invalidLink: "Enlace no válido",
    },
    media: {
      overviewFallback: "Todavía no hay una descripción disponible para esta producción.",
      topic: "Resumen",
      genre: "Género",
      releaseDate: "Fecha de estreno",
      status: "Estado",
      runtime: "Duración",
      episodeRuntime: "Duración del episodio",
      season: "Temporada",
      episode: "Episodio",
      officialSite: "Sitio oficial",
      votes: "votos",
      hoursShort: "h",
      minutesShort: "min",
      hourShort: "h",
      minuteShort: "min",
      posterAlt: "Póster",
      noPoster: "Sin póster",
      typeLabel: "Tipo",
      originalTitle: "Título original",
    },
  },
} as const

export function isLanguage(value: string | null | undefined): value is Language {
  return value === "tr" || value === "en" || value === "de" || value === "fr" || value === "es"
}

export function getLanguageLabel(language: Language) {
  return SUPPORTED_LANGUAGES.find((option) => option.value === language)?.nativeLabel ?? language
}

export function getLocale(language: Language) {
  switch (language) {
    case "en":
      return "en-US"
    case "de":
      return "de-DE"
    case "fr":
      return "fr-FR"
    case "es":
      return "es-ES"
    default:
      return "tr-TR"
  }
}

function getNestedValue(value: unknown, path: string[]) {
  return path.reduce<unknown>((current, piece) => {
    if (typeof current === "object" && current !== null && piece in current) {
      return (current as Record<string, unknown>)[piece]
    }

    return undefined
  }, value)
}

export function getTranslation(language: Language, key: string) {
  const pieces = key.split(".")
  const fallback = getNestedValue(translations[DEFAULT_LANGUAGE], pieces)
  const target = getNestedValue(translations[language], pieces)

  if (typeof target === "string" && target.length > 0) {
    return target
  }

  if (typeof fallback === "string" && fallback.length > 0) {
    return fallback
  }

  return key
}
