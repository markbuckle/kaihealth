'use client';

import { dashboardChrome } from '../../content/dashboard';
import { Icon } from '../ui/icon';
import { iconButtonClassName } from '../ui/icon-button';
import { useDashboardRoot } from './dashboard-root';

// The pressed look keys off data-theme rather than React state, so it is right from the first
// paint, before React knows the theme. A filled circle marks dark mode as on.
const pressed = 'in-data-[theme=dark]:bg-surface';

const variants = {
  // a round icon button for the top bar
  icon: { button: iconButtonClassName('plain', pressed), icon: '' },
  // a full-width row with its label, for the mobile More menu
  row: {
    button: 'flex min-h-14 w-full cursor-pointer items-center justify-between text-16',
    icon: iconButtonClassName('plain', pressed),
  },
} as const;

// A "Dark mode" button that is pressed while the dashboard is dark. It keeps one moon icon,
// because the wireframe's settings icon already looks like a sun.
export function ThemeToggle({ variant = 'icon' }: { variant?: keyof typeof variants }) {
  const { theme, setTheme } = useDashboardRoot();
  const dark = theme === 'dark';
  const styles = variants[variant];
  const icon = <Icon name="moon" />;
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
