import { dashboardChrome } from '../../content/dashboard';

// On every dashboard page, in place of the site footer's concept-project line.
export function DemoBanner() {
  return (
    <p className="bg-surface px-4 py-1.5 text-center font-label text-11 text-text-muted leading-list tracking-caption lg:py-2 lg:text-12">
      {dashboardChrome.banner}
    </p>
  );
}
