'use client';

import { dashboardChrome } from '../../content/dashboard';
import { Icon } from '../ui/icon';
import { iconButtonClassName } from '../ui/icon-button';
import { useDashboardRoot } from './dashboard-root';

// The look keys off data-theme rather than React state, so it is right from the first
// paint, before React knows the theme.
const variants = {
  // a round icon button for the top bar
  icon: { button: iconButtonClassName('plain', 'size-9!'), icon: '' },
  // a full-width row with its label, for the mobile More menu; a filled circle marks dark as on
  row: {
    button: 'flex min-h-14 w-full cursor-pointer items-center justify-between text-16',
    icon: iconButtonClassName('plain', 'in-data-[theme=dark]:bg-surface'),
  },
} as const;

// One "Dark mode" button. The icon shows the theme it switches to: a moon in light mode,
// a sun in dark mode.
export function ThemeToggle({ variant = 'icon' }: { variant?: keyof typeof variants }) {
  const { theme, setTheme } = useDashboardRoot();
  const dark = theme === 'dark';
  const styles = variants[variant];
  const icon = (
    <>
      <Icon name="moon" className="in-data-[theme=dark]:hidden" />
      <Icon name="sun" className="hidden in-data-[theme=dark]:block" />
    </>
  );
  return (
    <button
      type="button"
      aria-pressed={dark}
      aria-label={variant === 'icon' ? dashboardChrome.darkMode : undefined}
      onClick={() => setTheme(dark ? 'light' : 'dark')}
      className={styles.button}
    >
      {variant === 'row' ? (
        <>
          {dashboardChrome.darkMode}
          <span className={styles.icon}>{icon}</span>
        </>
      ) : (
        icon
      )}
    </button>
  );
}
