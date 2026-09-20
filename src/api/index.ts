import { FeaturedVideos, VideoDetails } from "../models/Video";
import { ApiResponse } from "../models/Response";
import {
  tmdbGet,
  TmdbMovie,
  TmdbPaged,
  TmdbVideo,
} from "./tmdbClient";
import {
  pickTrailerKey,
  posterUrl,
  formatCompact,
  formatRating,
  formatRuntime,
  toPageCount,
  toVideo,
} from "./mappers";
import { genreIdBySlug } from "../data/genres";

const emptyFeatured = (message = "Error"): ApiResponse<FeaturedVideos> => ({
  data: { videos: [], pagination: { pageCount: 0 } },
  message,
});

const mapPaged = (
  data: TmdbPaged<TmdbMovie>
): ApiResponse<FeaturedVideos> => ({
  data: {
    videos: data.results
      .filter((m) => !m.adult)
      .map(toVideo),
    pagination: { pageCount: toPageCount(data.total_pages) },
  },
  message: "OK",
});

export const listHomeVideos = async (
  page: number,
  category?: string
): Promise<ApiResponse<FeaturedVideos>> => {
  try {
    const genreId = genreIdBySlug(category);
    if (genreId) {
      const data = await tmdbGet<TmdbPaged<TmdbMovie>>("/discover/movie", {
        page,
        with_genres: genreId,
        sort_by: "popularity.desc",
        include_adult: false,
      });
      return mapPaged(data);
    }
    const data = await tmdbGet<TmdbPaged<TmdbMovie>>(
      "/trending/movie/week",
      { page }
    );
    return mapPaged(data);
  } catch (error) {
    console.error("Error consumiendo TMDB (listHomeVideos):", error);
    return emptyFeatured((error as Error).message);
  }
};

export const listVideosByTag = async (
  pathname: string,
  page: number,
  category?: string
): Promise<ApiResponse<FeaturedVideos>> => {
  try {
    // pathname llega como "/tag/CO"; extraemos el código ISO de país.
    const region = pathname.split("/").pop()?.toUpperCase();
    const genreId = genreIdBySlug(category);
    const data = await tmdbGet<TmdbPaged<TmdbMovie>>("/discover/movie", {
      page,
      with_origin_country: region,
      with_genres: genreId,
      sort_by: "popularity.desc",
      include_adult: false,
    });
    return mapPaged(data);
  } catch (error) {
    console.error("Error consumiendo TMDB (listVideosByTag):", error);
    return emptyFeatured((error as Error).message);
  }
};

export const searchVideos = async (
  searchTerm: string,
  page: number
): Promise<ApiResponse<FeaturedVideos>> => {
  try {
    const data = await tmdbGet<TmdbPaged<TmdbMovie>>("/search/movie", {
      query: searchTerm,
      page,
      include_adult: false,
    });
    return mapPaged(data);
  } catch (error) {
    console.error("Error consumiendo TMDB (searchVideos):", error);
    return emptyFeatured((error as Error).message);
  }
};

export const getVideoDetails = async (
  _query: string,
  pathname: string
): Promise<ApiResponse<VideoDetails>> => {
  try {
    // pathname: "/video/1576.1576" o "/1576.1576" → id TMDB tras el último punto.
    const id = pathname.split(".").pop()?.replace(/\D/g, "") || "";
    if (!id) throw new Error("ID de película no válido");
    const [movie, videos, similar] = await Promise.all([
      tmdbGet<TmdbMovie>(`/movie/${id}`),
      tmdbGet<{ results: TmdbVideo[] }>(`/movie/${id}/videos`),
      tmdbGet<TmdbPaged<TmdbMovie>>(`/movie/${id}/similar`, { page: 1 }),
    ]);
    const trailerKey = pickTrailerKey(videos.results);
    return {
      data: {
        video: {
          ...toVideo(movie),
          duration: formatRuntime(movie.runtime),
          url_video: trailerKey
            ? `https://www.youtube.com/watch?v=${trailerKey}`
            : `https://www.themoviedb.org/movie/${movie.id}`,
          overview: movie.overview,
          backdrop_path: movie.backdrop_path
            ? posterUrl(movie.backdrop_path)
            : undefined,
        },
        related: (similar.results || []).map(toVideo).slice(0, 12),
      },
      message: trailerKey ?? "",
    };
  } catch (error) {
    console.error("Error consumiendo TMDB (getVideoDetails):", error);
    return {
      data: { video: { title: "", views: "" }, related: [] },
      message: (error as Error).message,
    };
  }
};

// Re-export de utilidades para la ficha de detalle.
export { formatCompact, formatRating, formatRuntime };
