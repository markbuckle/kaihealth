import { routes, sectionIds, siteConfig } from '../lib/config';

export type NavLink = { label: string; href: string };

// absolute anchors so the links also work from other pages
const anchor = (id: string) => `${routes.home}#${id}`;

export const primaryNav: NavLink[] = [
  { label: 'How it works', href: anchor(sectionIds.howItWorks) },
  { label: 'What we test', href: anchor(sectionIds.whatWeTest) },
  { label: 'Membership', href: anchor(sectionIds.membership) },
  { label: 'FAQ', href: anchor(sectionIds.faq) },
];

export const headerActions = {
  logIn: { label: 'Log in', href: routes.comingSoon },
  start: { label: 'Start testing', href: routes.comingSoon },
} satisfies Record<string, NavLink>;

export const footer = {
  blurb: 'A preventive health membership for people in Canada.',
  // placeholder destinations: About, Clinicians, Contact, Privacy and Terms have no pages yet
  columns: [
    {
      title: 'Product',
      links: primaryNav.slice(0, 3),
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: routes.comingSoon },
        { label: 'Clinicians', href: routes.comingSoon },
        { label: 'Contact', href: routes.comingSoon },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: routes.comingSoon },
        { label: 'Terms', href: routes.comingSoon },
      ],
    },
  ],
  copyright: `© 2026 ${siteConfig.name}`,
  disclaimer: 'Concept project. Not a real testing service. No real data is collected.',
} as const;
