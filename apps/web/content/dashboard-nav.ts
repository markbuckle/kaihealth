import type { IconName } from '../components/ui/icon';
import { routes } from '../lib/config';
import { type AreaId, healthAreas } from '../lib/health/areas';
import { type PlanCategoryId, planCategories } from '../lib/health/plan';

// Every dashboard destination in the wireframe. A page is only a link once it is ready;
// until then it renders disabled with a "Soon" label, so nothing leads to a 404.
// Shipping a screen means adding its route and flipping its ready flag here.
export type DashboardPage = {
  label: string;
  // the planned path; not linked until the page is ready
  href: string;
  ready: boolean;
  // planned for the product but not offered yet: shows "Coming later" instead of "Soon"
  later?: boolean;
};

const page = (label: string, path: string, ready = false): DashboardPage => ({
  label,
  href: `${routes.dashboard}${path}`,
  ready,
});

const later = (label: string, path: string): DashboardPage => ({
  ...page(label, path),
  later: true,
});

export const dashboardPages = {
  summary: page('Summary', '', true),
  results: page('Results', '/results'),
  areas: page('Categories', '/areas'),
  areaPriorities: page('Priorities', '/areas/priorities'),
  plan: page('Action plan', '/plan'),
  planPriorities: page('Priorities', '/plan/priorities'),
  records: page('Records', '/records'),
  wearables: later('Wearables', '/wearables'),
  messages: page('Messages', '/messages'),
  checkup: page('Your checkup', '/checkup'),
  notifications: page('Notifications', '/notifications'),
  askKai: page('Ask Kai', '/ask'),
  settings: page('Settings', '/settings'),
  account: page('Account', '/account'),
  insights: page('Insights', '/insights'),
  scoreMethod: page('Score method', '/score-method'),
} satisfies Record<string, DashboardPage>;

export const areaPage = (area: { id: AreaId; label: string }) =>
  page(area.label, `/areas/${area.id}`);

export const planCategoryPage = (category: { id: PlanCategoryId; label: string }) =>
  page(category.label, `/plan/${category.id}`);

export const recommendationPage = (id: string, title: string) =>
  page(title, `/plan/recommendations/${id}`);

export const insightPage = (id: string, title: string) => page(title, `/insights/${id}`);

export type SidebarEntry =
  | { type: 'link'; page: DashboardPage }
  | { type: 'group'; page: DashboardPage; items: DashboardPage[] }
  | { type: 'divider' };

export const sidebarNav: SidebarEntry[] = [
  { type: 'link', page: dashboardPages.summary },
  {
    type: 'group',
    page: dashboardPages.areas,
    items: [
      dashboardPages.areaPriorities,
      ...healthAreas.map(areaPage),
      later('Cellular', '/areas/cellular'),
      later('Neural', '/areas/neural'),
    ],
  },
  {
    type: 'group',
    page: dashboardPages.plan,
    items: [dashboardPages.planPriorities, ...planCategories.map(planCategoryPage)],
  },
  { type: 'divider' },
  { type: 'link', page: dashboardPages.records },
  { type: 'link', page: dashboardPages.wearables },
];

// the mobile tab bar; a label here overrides the page label to fit the tab
export const tabBarNav: { page: DashboardPage; icon: IconName; label?: string }[] = [
  { page: dashboardPages.summary, icon: 'home' },
  { page: dashboardPages.results, icon: 'results' },
  { page: dashboardPages.plan, icon: 'plan', label: 'Plan' },
  { page: dashboardPages.messages, icon: 'messages' },
];

// the tab bar's More menu: the sidebar pages the tabs do not cover, then settings
export const moreNav: DashboardPage[] = [
  dashboardPages.areas,
  dashboardPages.records,
  dashboardPages.wearables,
  dashboardPages.settings,
];
