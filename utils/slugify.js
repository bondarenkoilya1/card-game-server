export const slugify = (text) => {
  return text
    .normalize("NFD") // remove accent
    .replace(/[\u0300-\u036f]/g, "") // remove unusual symbols (ä, etc.)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-") // hyphenate
    .replace(/^-+|-+$/g, ""); // trim leading and trailing hyphens
};
