//src\components\common\utils.tsconst FALLBACK_DATE = "—" as const

const FALLBACK_DATE = "—" as const;

/**
 * Formats a date into YYYY-MM-DD.
 * Returns fallback if date is invalid or not provided.
 */
export function formatDate(
  input?: string | Date,
  fallback: string = FALLBACK_DATE,
): string {
  if (!input) return fallback;

  const date = input instanceof Date ? input : new Date(input);

  if (Number.isNaN(date.getTime())) return fallback;

  // Avoid timezone shifting by extracting parts directly
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}
