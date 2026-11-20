// The brand name is a working name. Change it here and nowhere else.
export const siteConfig = {
  name: 'Kai Health',
  description:
    'A portfolio concept for a Canadian preventive-health membership. Not a real testing service.',
  locale: 'en-CA',
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
