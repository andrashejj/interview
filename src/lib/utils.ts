/**
 * Format date to be consistent between server and client
 */
export function formatDate(dateString: string): string {
  try {
    const date = new Date(dateString);
    // Use UTC to ensure consistency between server and client
    return date.toLocaleDateString('en-US', { 
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  } catch {
    return 'Invalid Date';
  }
}

/**
 * Utility to suppress hydration warnings for browser extension interference
 */
export function suppressHydrationWarning<T extends Record<string, unknown>>(
  props: T
): T & { suppressHydrationWarning: boolean } {
  return {
    ...props,
    suppressHydrationWarning: true,
  };
} 