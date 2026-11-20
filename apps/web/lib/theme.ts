import { routes } from './config';

export const themes = ['light', 'dark'] as const;
export type Theme = (typeof themes)[number];

// The only thing the product stores: the dashboard theme choice, as "light" or "dark".
// The path keeps the cookie off every landing page request.
export const themeCookie = {
  name: 'kai-theme',
  path: routes.dashboard,
  maxAgeSeconds: 60 * 60 * 24 * 365,
} as const;

export function parseTheme(value: string | undefined): Theme | undefined {
  return themes.find((theme) => theme === value);
}
