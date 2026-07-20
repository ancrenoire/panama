export const SITE_PASSWORD = process.env.SITE_PASSWORD ?? "hallbar";

export const AUTH_COOKIE_NAME = "panama_access";
export const AUTH_COOKIE_VALUE = "granted";

/** One week, in seconds */
export const AUTH_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;

export function isAuthorized(cookieValue: string | undefined): boolean {
  return cookieValue === AUTH_COOKIE_VALUE;
}
