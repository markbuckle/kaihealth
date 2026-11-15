// The brand name is a working name. Change it here and nowhere else.
export const siteConfig = {
  name: 'Que Health',
  description:
    'A portfolio concept for a Canadian preventive-health membership. Not a real testing service.',
  locale: 'en-CA',
} as const;

export const routes = {
  home: '/',
  // every call to action points here until the product exists
  comingSoon: '/coming-soon',
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
} as const;
