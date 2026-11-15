import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { SiteFooter } from '../components/site-footer';
import { SiteHeader } from '../components/site-header';
import { siteConfig } from '../lib/config';
import { fontVariables } from './fonts';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  openGraph: {
    type: 'website',
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    locale: siteConfig.locale.replace('-', '_'),
  },
  twitter: {
    card: 'summary',
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={siteConfig.locale} className={fontVariables}>
      <body className="bg-page font-body text-16 text-text leading-body antialiased">
        <a
          href="#main"
          className="sr-only z-50 rounded-button bg-button px-5 py-3 text-button-text focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
