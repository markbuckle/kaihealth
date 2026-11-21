import type { IconName } from '../components/ui/icon';
import type { NavIconName } from '../components/ui/nav-icon';
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
  // drawn to the left of the label in the sidebar
  icon?: NavIconName;
};

const page = (label: string, path: string, icon?: NavIconName, ready = false): DashboardPage => ({
  label,
  href: `${routes.dashboard}${path}`,
  ready,
  icon,
});

const later = (label: string, path: string, icon?: NavIconName): DashboardPage => ({
  ...page(label, path, icon),
  later: true,
});

export const dashboardPages = {
  summary: page('Summary', '', 'summary', true),
  results: page('Results', '/results'),
  areas: page('Categories', '/areas', 'areas'),
  areaPriorities: page('Priorities', '/areas/priorities', 'priorities'),
  plan: page('Action plan', '/plan', 'plan'),
  planPriorities: page('Priorities', '/plan/priorities', 'plan-priorities'),
  records: page('Records', '/records', 'records'),
  wearables: later('Wearables', '/wearables', 'wearables'),
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
  page(area.label, `/areas/${area.id}`, area.id);

export const planCategoryPage = (category: { id: PlanCategoryId; label: string }) =>
  page(category.label, `/plan/${category.id}`, category.id);

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
      later('Cellular', '/areas/cellular', 'cellular'),
      later('Neural', '/areas/neural', 'neural'),
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
