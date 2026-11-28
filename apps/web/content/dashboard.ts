import type { IconName } from '../components/ui/icon';
import type { PlanCategoryId } from '../lib/health/plan';
import { footer } from './site';

// Copy for the member dashboard, worded as in design/wireframe/dashboard.html.
// Square-bracketed text is a placeholder still to be written.

export const dashboardChrome = {
  // the wireframe banner line plus the site disclaimer, so the guardrail wording stays in one place
  banner: `Demo account with synthetic data. ${footer.disclaimer}`,
  soon: 'Soon',
  later: 'Coming later',
  // icon-only links that are not ready say so in their accessible name
  soonSuffix: (label: string) => `${label}, soon`,
  groupToggle: (label: string) => `${label} pages`,
  darkMode: 'Dark mode',
  more: 'More',
  close: 'Close',
  dismissBanner: 'Hide this notice',
  notifications: (count: number) => `Notifications, ${count} new`,
  account: (name: string) => `Account: ${name}`,
  mainNav: 'Main',
} as const;

// disabled demo actions say why they do nothing
export const demoActionNote = 'Demo only: booking and reminders are turned off.';

export const home = {
  welcome: {
    eyebrow: 'Welcome back',
    greeting: (name: string) => `Hi ${name}`,
    results: (month: string, clinician: string) =>
      `Results from ${month}, reviewed by ${clinician}`,
    seeWhatChanged: 'See what changed',
    bookConsult: 'Book your results consult',
  },
  score: {
    title: 'Overall health score',
    outOf: 'of 100',
    previous: (score: number) => `Previous: ${score}`,
    previousShort: (score: number) => `was ${score}`,
    explain: 'How this is calculated',
  },
  scoreExplainer: {
    eyebrow: 'Overall health score',
    title: 'How this is calculated',
    intro: (areaCount: string) =>
      `combines your ${areaCount} category scores. Areas with a bigger effect on long-term health, like Heart and Metabolic, count for more.`,
    introLead: 'Your score of',
    holdingBack: 'Holding your score back',
    helping: 'Helping your score',
    disclaimer:
      'Scores describe your results, not you, and are not a diagnosis. Your clinician looks at your full history, not just this number.',
    method: 'Read the full method',
    close: 'Close',
  },
  testing: {
    title: 'Your testing',
    tabsLabel: 'Your testing',
    upcoming: 'Upcoming',
    done: 'Done',
    consult: 'Results consult',
    withClinician: (clinician: string) => `With ${clinician}`,
    notBooked: 'Not booked',
    booked: 'Booked',
    book: 'Book',
    draw: 'Blood draw',
    due: (month: string) => `Due ${month}`,
    remind: 'Remind me',
    drawn: (date: string) => `Drawn ${date}`,
    reviewed: (date: string, clinician: string) => `Reviewed ${date} by ${clinician}`,
  },
  areas: {
    title: 'Your categories',
    lead: 'Ranked by where focus will help most.',
    viewAll: 'View all categories',
    viewAllShort: 'View all',
    rank: (rank: number) => `#${rank} focus`,
    outOf: '/100',
    driving: (drivers: string) => `What's driving this: ${drivers}`,
    drivenBy: (drivers: string) => `Driven by ${drivers}`,
    // placeholder: no genetic, microbiome or emotional health testing exists yet, so these cards only point at coming-soon
    extrasLabel: 'More categories',
    extras: [
      { id: 'genetics', label: 'Genetics', icon: 'dna' },
      { id: 'microbiome', label: 'Microbiome', icon: 'microbe' },
      { id: 'emotional', label: 'Emotional health', icon: 'smile' },
    ] satisfies { id: string; label: string; icon: IconName }[],
    notTested: 'Not tested yet',
    learnMore: 'Learn more',
  },
  focus: {
    eyebrow: (category: string) => `This week's focus · ${category}`,
    cta: 'View recommendation',
  },
  insights: {
    title: 'Insights',
    seeAll: 'See all',
    meta: (minutes: number, topic: string) => `${minutes} min read · ${topic}`,
  },
  plan: {
    title: 'Your action plan',
    lead: 'Chosen by your clinical team from your results and health profile.',
    seeAll: 'See full plan',
    filterLabel: 'Filter your action plan',
    // the wireframe's filter chips after Priorities; follow-up testing has no chip
    filters: [
      'exercise',
      'nutrition',
      'sleep',
      'lifestyle',
      'screening',
    ] satisfies PlanCategoryId[],
    open: 'Open',
    // placeholder: no demo recommendations exist for these categories yet
    empty: (category: string) => `[${category.toUpperCase()} RECOMMENDATIONS TO COME]`,
  },
  change: {
    since: (month: string) => `since ${month}`,
    none: (month: string) => `No change since ${month}`,
    up: 'Up',
    down: 'Down',
  },
  imageLabel: 'Image',
} as const;
