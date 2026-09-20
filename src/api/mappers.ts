import { Video } from "../models/Video";
import { TmdbMovie, imageBase } from "./tmdbClient";

export const posterUrl = (path?: string | null): string =>
  path ? `${imageBase}${path}` : "https://placehold.co/640x360?text=NovaPlay";

export const formatCompact = (value?: number): string => {
  if (value === undefined || value === null) return "—";
  return new Intl.NumberFormat("es", { notation: "compact" }).format(value);
};

export const formatRuntime = (minutes?: number): string => {
  if (!minutes) return "—";
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return h > 0 ? `${h}h ${m}min` : `${m}min`;
};

export const formatRating = (value?: number): string =>
  value === undefined || value === null ? "—" : value.toFixed(1);

export const toVideo = (m: TmdbMovie): Video => ({
  id: m.id,
  title: m.title,
  views: formatCompact(m.vote_count),
  duration: m.runtime ? formatRuntime(m.runtime) : undefined,
  url_image: posterUrl(m.poster_path),
  origin: "tmdb",
  url_path: `/${m.id}.${m.id}`,
  url_video: `https://www.themoviedb.org/movie/${m.id}`,
  likes: formatRating(m.vote_average),
  overview: m.overview,
  backdrop_path: m.backdrop_path ? `${imageBase}${m.backdrop_path}` : undefined,
  release_date: m.release_date,
  vote_average: m.vote_average,
  vote_count: m.vote_count,
});

/** TMDB limita a 500 páginas; se capa para el paginador. */
export const toPageCount = (totalPages?: number): number => {
  if (!totalPages || totalPages < 1) return 1;
  return Math.min(totalPages, 500);
};

export const pickTrailerKey = (
  videos: { key: string; site: string; type: string; official?: boolean }[]
): string | undefined => {
  const yt = videos.filter((v) => v.site === "YouTube");
  return (
    yt.find((v) => v.type === "Trailer" && v.official)?.key ??
    yt.find((v) => v.type === "Trailer")?.key ??
    yt.find((v) => v.type === "Teaser")?.key ??
    yt[0]?.key
  );
};
