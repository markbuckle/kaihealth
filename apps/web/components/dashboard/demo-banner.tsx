'use client';

import { useState } from 'react';
import { dashboardChrome } from '../../content/dashboard';
import { cn } from '../../lib/cn';
import { Icon } from '../ui/icon';
import { IconButton } from '../ui/icon-button';

// On every dashboard page, in place of the site footer's concept-project line. It can be
// dismissed for the visit; nothing is stored, so it returns on a reload.
export function DemoBanner() {
  const [open, setOpen] = useState(true);
  return (
    // the row collapses from its full height to zero, which slides the page up with it
    <div
      className={cn(
        'grid bg-surface transition-[grid-template-rows] duration-(--duration-base) ease-standard motion-reduce:transition-none',
        open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
      )}
    >
      {/* inert keeps a hidden banner out of the tab order and away from screen readers */}
      <div inert={!open} className="overflow-hidden">
        <div className="flex items-center gap-2 py-1.5 pr-2 pl-4 lg:py-2">
          <p className="flex-1 text-center font-label text-11 text-text-muted leading-list tracking-caption lg:text-12">
            {dashboardChrome.banner}
          </p>
          <IconButton
            variant="bare"
            aria-label={dashboardChrome.dismissBanner}
            onClick={() => setOpen(false)}
            className="kai-motion-trigger size-8!"
          >
            <Icon name="close" className="kai-close size-4" />
          </IconButton>
        </div>
      </div>
    </div>
  );
}
