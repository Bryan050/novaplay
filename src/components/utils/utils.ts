export const capitalize = (text: string, separator?: string) => {
  if (!text) return "";
  const capitalized = text
    ?.split(separator || " ")
    .map((word) => word?.charAt(0).toUpperCase() + word?.slice(1).toLocaleLowerCase())
    .join(" ") as string;
  return capitalized;
};

export const getSearchUrlParams = () => {
  const urlSearchParamas = new URLSearchParams(location.search);
  const category = urlSearchParamas.get("c") || undefined;
  const searchTerm = urlSearchParamas.get("st") || undefined;
  return {
    category,
    searchTerm,
  };
};
