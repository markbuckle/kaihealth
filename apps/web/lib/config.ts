// The brand name is a working name. Change it here and nowhere else.
export const siteConfig = {
  name: 'Kai Health',
  description:
    'A portfolio concept for a Canadian preventive-health membership. Not a real testing service.',
  locale: 'en-CA',
} as const;

// Each logo is the newest file in design/logos whose name starts with its prefix, so a new
// version (kai-health-logo-blue-v2.svg) is picked up with no code change. To use another
// file, change the prefix.
export const logoFiles = {
  landing: 'kai-health-logo-blue',
  // the dashboard picks one for its light or dark theme
  dashboardLight: 'kai-health-logo-trial',
  dashboardDark: 'kai-health-logo-trial-dark',
} as const;

export const routes = {
  home: '/',
  // every call to action points here until the product exists
  comingSoon: '/coming-soon',
  // the member dashboard; its pages and their ready flags are in content/dashboard-nav.ts
  dashboard: '/dashboard',
} as const;

// section ids on the home page, shared by the sections and the links that point at them
export const sectionIds = {
  howItWorks: 'how-it-works',
  whatWeTest: 'what-we-test',
  membership: 'membership',
  faq: 'faq',
} as const;

export const featureFlags = {
  // the styleguide is a development tool, so it is off in production builds
  styleguide: process.env.NODE_ENV !== 'production',
  // the dashboard is a public demo with synthetic data until sign-in exists
  demoDashboard: true,
} as const;
