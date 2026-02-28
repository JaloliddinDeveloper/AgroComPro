import i18next from "i18next";

/**
 * @param {Object} obj
 * @param {string} baseKey
 * @returns {any}
 */
export function getLocalizedKey(obj, baseKey) {
  if (!obj || typeof obj !== "object") return undefined;

  const lang = i18next.language || "uz";

  const localizedKey = `${baseKey}${lang.charAt(0).toUpperCase() + lang.slice(1)}`;

  return obj[localizedKey] || obj[baseKey];
}
