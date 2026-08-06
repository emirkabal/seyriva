import { Film, Play } from "lucide-react"

interface MediaPlayerProps {
  type: "movie" | "tv"
  id: number
  title: string
}

function buildPlayerUrl(type: "movie" | "tv", id: number) {
  const template = "https://cinesrc.st/embed/{type}/{id}" as string | undefined

  if (!template) {
    return null
  }

  return template.replaceAll("{type}", type).replaceAll("{id}", String(id))
}

export function MediaPlayer({ type, id, title }: MediaPlayerProps) {
  const playerUrl = buildPlayerUrl(type, id)

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-2xl border bg-black shadow-2xl">
      {playerUrl ? (
        <iframe
          src={playerUrl}
          title={`${title} video oynatıcısı`}
          className="absolute inset-0 size-full border-0"
          allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
          allowFullScreen
          frameBorder="0"
          loading="eager"
        />
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-muted/30 px-6 text-center">
          <div className="flex size-16 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Play className="size-7 fill-current" />
          </div>

          <div>
            <p className="font-medium">Video oynatıcı hazır</p>
          </div>

          <div className="flex items-center gap-2 rounded-lg border bg-background/80 px-3 py-2 font-mono text-xs text-muted-foreground">
            <Film className="size-3.5" />
            {type}/{id}
          </div>
        </div>
      )}
    </div>
  )
}
