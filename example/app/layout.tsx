import type { Metadata, Viewport } from 'next';
import { Red_Hat_Display, Red_Hat_Text } from 'next/font/google';
import { ThemeScript } from 'posturalbrain-ui';
import 'posturalbrain-ui/styles.css';

// The variables are set on <body>, so they win over the :root values of the stylesheet.
const display = Red_Hat_Display({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-display',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
});
const text = Red_Hat_Text({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-text',
  fallback: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'system-ui', 'sans-serif'],
});

export const metadata: Metadata = { title: 'posturalbrain-ui: prova', description: 'App di prova del design system.' };
export const viewport: Viewport = { width: 'device-width', initialScale: 1, viewportFit: 'cover' };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className={`pb-app ${display.variable} ${text.variable}`}>{children}</body>
    </html>
  );
}
