import { routes } from '../lib/config';

export const comingSoon = {
  eyebrow: 'Coming soon',
  title: 'Not open *yet.*',
  lead: 'This is a concept project. There is no membership to join and no tests to book.',
  form: {
    legend: 'Waitlist',
    emailLabel: 'Email',
    emailPlaceholder: 'you@example.com',
    submit: 'Join the waitlist',
    note: 'Demo only. This form is turned off and nothing you type is sent or stored.',
  },
  back: { label: 'Back to home', href: routes.home },
} as const;
