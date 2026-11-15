import { routes, sectionIds } from '../lib/config';

// Headings mark their italic accent words with asterisks: "three *steps.*"
// Square-bracketed text and $X are placeholders still to be written.

export const hero = {
  title: 'Start early, *live healthy*',
  lead: 'A yearly membership with 100+ lab tests, results explained by clinicians, and a dashboard that tracks how your numbers change.',
  primary: { label: 'Start testing', href: routes.comingSoon },
  secondary: { label: 'See what we test', href: `#${sectionIds.whatWeTest}` },
  dashboard: {
    title: 'Your biomarkers',
    tabs: ['Overview', 'Heart', 'Metabolic', 'Nutrients'],
    totalLabel: 'biomarkers in your latest test',
    sampleLabel: 'Sample data',
  },
} as const;

export const howItWorks = {
  eyebrow: 'How it works',
  title: 'From blood draw to plan in three *steps.*',
  steps: [
    {
      number: '01',
      title: 'Test',
      body: 'Book a blood draw at a partner collection site. Your membership covers 100+ lab tests a year.',
      illustration: 'schedule',
    },
    {
      number: '02',
      title: 'Results explained',
      body: 'A clinician reviews every result and tells you what it means in plain language.',
      illustration: 'results',
    },
    {
      number: '03',
      title: 'Follow your plan',
      body: 'Get clear next steps, then retest and watch your biomarkers move on your dashboard.',
      illustration: 'plan',
    },
  ],
  // labels inside the decorative step illustrations
  schedule: {
    days: [
      { day: 'Mon', date: '12' },
      { day: 'Tue', date: '13' },
      { day: 'Wed', date: '14' },
      { day: 'Thu', date: '15' },
      { day: 'Fri', date: '16' },
    ],
    selectedDay: 'Wed',
    times: ['8:30', '9:00', '9:30', '10:00'],
    selectedTime: '9:00',
  },
  plan: ['Nutrition', 'Supplements', 'Sleep and training'],
} as const;

export const dashboardPreview = {
  title: 'Comprehensive data made *simple*',
  lead: 'Each biomarker shows where you sit in the range and how it has moved since your last test.',
  noteLabel: 'Clinician note',
} as const;

export const whatWeTest = {
  eyebrow: 'What we test',
  title: '100+ tests across your whole *body.*',
  tabsLabel: 'Test categories',
  fullList: { label: 'See the full test list', href: routes.comingSoon },
} as const;

export const trust = {
  eyebrow: 'Why trust it',
  title: 'Reviewed by clinicians. Stored in *Canada.*',
  cards: [
    {
      icon: 'user',
      title: 'Clinician-reviewed results',
      body: 'Every result is reviewed by a licensed Canadian clinician before it reaches your dashboard.',
      caption: 'Clinical team · [NAMES]',
      photos: 3,
    },
    {
      icon: 'shield',
      title: 'Data stored in Canada',
      body: 'Your results and personal information are kept on servers located in Canada.',
      caption: 'Storage region · Canada',
      photos: 0,
    },
  ],
} as const;

export const membership = {
  eyebrow: 'Membership',
  title: 'One membership. *Everything* included.',
  planLabel: 'Annual membership',
  price: '$X',
  period: 'per year',
  cta: { label: 'Start testing', href: routes.comingSoon },
  terms: '[BILLING AND CANCELLATION TERMS]',
  includedLabel: 'Included',
  included: [
    '100+ lab tests every year',
    'Results explained by clinicians',
    'A dashboard that tracks your biomarkers over time',
    'A plan to follow after every test',
  ],
} as const;

export const faq = {
  eyebrow: 'FAQ',
  title: 'Questions, *answered.*',
} as const;

export const finalCta = {
  eyebrow: 'Get ahead',
  title: 'Start with a *baseline.*',
  lead: 'Join, book your first draw and see 100+ biomarkers explained.',
  cta: { label: 'Start testing', href: routes.comingSoon },
  priceNote: '$X per year',
} as const;
