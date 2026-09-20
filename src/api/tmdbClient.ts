const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

const lang = () =>
  import.meta.env.VITE_TMDB_LANG?.toString() || "es-MX";

const token = () =>
  import.meta.env.VITE_TMDB_READ_TOKEN?.toString() || "";

export const imageBase = IMAGE_BASE;

const ensureToken = () => {
  if (!token()) {
    throw new Error(
      "VITE_TMDB_READ_TOKEN not found"
    );
  }
};

export async function tmdbGet<T>(
  path: string,
  params: Record<string, string | number | boolean | undefined> = {}
): Promise<T> {
  ensureToken();
  const query = new URLSearchParams({ language: lang() });
  for (const [key, value] of Object.entries(params)) {
    if (value !== undefined && value !== "") query.set(key, String(value));
  }
  const res = await fetch(`${BASE_URL}${path}?${query.toString()}`, {
    headers: {
      Authorization: `Bearer ${token()}`,
      "Content-Type": "application/json",
    },
  });
  if (res.status === 401) {
    throw new Error("Token TMDB inválido o ausente (401). Revisa VITE_TMDB_READ_TOKEN.");
  }
  if (res.status === 429) {
    throw new Error("Límite de peticiones TMDB alcanzado (429). Reintenta en unos segundos.");
  }
  if (!res.ok) {
    throw new Error(`Error TMDB ${res.status} en ${path}`);
  }
  return (await res.json()) as T;
}

// Tipos mínimos de la API TMDB usados por NovaPlay
export interface TmdbMovie {
  id: number;
  title: string;
  adult?: boolean;
  poster_path: string | null;
  backdrop_path: string | null;
  overview: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
  runtime?: number;
  genre_ids?: number[];
}

export interface TmdbPaged<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface TmdbVideo {
  key: string;
  site: string;
  type: string;
  official?: boolean;
}
