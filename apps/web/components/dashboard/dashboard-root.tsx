'use client';

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { parseTheme, type Theme, themeCookie } from '../../lib/theme';

type DashboardRootState = {
  // undefined until known: on a first visit only the browser knows the system setting
  theme: Theme | undefined;
  setTheme: (theme: Theme) => void;
  sidebarOpen: boolean;
  toggleSidebar: () => void;
  // dialogs portal in here so they inherit the dashboard theme
  portal: HTMLElement | null;
};

const DashboardRootContext = createContext<DashboardRootState | null>(null);

export function useDashboardRoot(): DashboardRootState {
  const state = useContext(DashboardRootContext);
  if (!state) throw new Error('useDashboardRoot must be used inside DashboardRoot.');
  return state;
}

function systemTheme(): Theme {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

// The dashboard's root element. data-theme here re-points the colour roles for everything
// inside, and data-style="app" adds the dashboard's own dark values from tokens.css.
export function DashboardRoot({
  initialTheme,
  className,
  children,
}: {
  initialTheme: Theme | undefined;
  className?: string;
  children: ReactNode;
}) {
  const [theme, setThemeState] = useState(initialTheme);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [root, setRoot] = useState<HTMLDivElement | null>(null);

  // On a first visit the inline script has already set the theme on the element before
  // paint; adopt it. After a client-side navigation there was no script, so ask the browser.
  useEffect(() => {
    if (theme || !root) return;
    setThemeState(parseTheme(root.dataset.theme) ?? systemTheme());
  }, [theme, root]);

  function setTheme(next: Theme) {
    setThemeState(next);
    const secure = window.location.protocol === 'https:' ? '; Secure' : '';
    // biome-ignore lint/suspicious/noDocumentCookie: the Cookie Store API is missing from some supported browsers
    document.cookie = `${themeCookie.name}=${next}; Path=${themeCookie.path}; Max-Age=${themeCookie.maxAgeSeconds}; SameSite=Lax${secure}`;
  }

  return (
    <DashboardRootContext.Provider
      value={{
        theme,
        setTheme,
        sidebarOpen,
        toggleSidebar: () => setSidebarOpen((open) => !open),
        portal: root,
      }}
    >
      {/* the first-visit script may set data-theme before React loads, so React must not undo it */}
      <div
        ref={setRoot}
        data-theme={theme}
        data-style="app"
        suppressHydrationWarning
        className={className}
      >
        {children}
      </div>
    </DashboardRootContext.Provider>
  );
}
