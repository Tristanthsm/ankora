export type ClassValue = string | number | null | undefined | boolean

/**
 * Utility function to merge class names without external dependencies.
 * Filters out falsy values and joins the rest with spaces.
 */
export function cn(...inputs: ClassValue[]) {
  return inputs.filter(Boolean).join(' ')
}
