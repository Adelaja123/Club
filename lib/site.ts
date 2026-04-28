export const SITE_URL = "https://oluwagbotemi.space";

export function getSiteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}
