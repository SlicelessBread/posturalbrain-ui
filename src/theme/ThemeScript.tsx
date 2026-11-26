import { themeScript } from './theme';

/**
 * Put it in the <head> of the root layout, and add `suppressHydrationWarning` to <html>:
 * it sets the theme on <html> before the page is painted, so the wrong theme never flashes.
 */
export function ThemeScript({ nonce }: { nonce?: string }) {
  // The script is built from constants of this package; nothing from a caller or a request enters it.
  return <script nonce={nonce} dangerouslySetInnerHTML={{ __html: themeScript() }} />;
}
