export interface Genre {
  id: number;
  label: string;
  slug: string;
}

/** 14 géneros de cine TMDB usados como categorías de NovaPlay. */
export const GENRES: Genre[] = [
  { id: 28, label: "Acción", slug: "accion" },
  { id: 12, label: "Aventura", slug: "aventura" },
  { id: 16, label: "Animación", slug: "animacion" },
  { id: 35, label: "Comedia", slug: "comedia" },
  { id: 80, label: "Crimen", slug: "crimen" },
  { id: 99, label: "Documental", slug: "documental" },
  { id: 18, label: "Drama", slug: "drama" },
  { id: 14, label: "Fantasía", slug: "fantasia" },
  { id: 27, label: "Terror", slug: "terror" },
  { id: 9648, label: "Misterio", slug: "misterio" },
  { id: 10749, label: "Romance", slug: "romance" },
  { id: 878, label: "Ciencia ficción", slug: "ciencia-ficcion" },
  { id: 53, label: "Suspense", slug: "suspense" },
  { id: 10752, label: "Bélica", slug: "belica" },
];

export const genreIdBySlug = (slug?: string): number | undefined => {
  if (!slug) return undefined;
  return GENRES.find((g) => g.slug === slug.toLowerCase())?.id;
};

export const genreLabelBySlug = (slug?: string): string | undefined => {
  if (!slug) return undefined;
  return GENRES.find((g) => g.slug === slug.toLowerCase())?.label;
};
