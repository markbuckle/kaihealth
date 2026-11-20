'use client';

import * as Dialog from '@radix-ui/react-dialog';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

// The one Dialog wrapper. Radix handles the focus trap, Escape, scroll lock and aria-modal.
// Compose it: <Sheet><SheetTrigger asChild>...</SheetTrigger><SheetContent>...</SheetContent></Sheet>
export const Sheet = Dialog.Root;
export const SheetTrigger = Dialog.Trigger;
export const SheetClose = Dialog.Close;
export const SheetTitle = Dialog.Title;

export const sheetVariants = ['side', 'drawer'] as const;
export type SheetVariant = (typeof sheetVariants)[number];

const variants: Record<SheetVariant, { overlay: string; panel: string }> = {
  // full height from the right, as the landing page menu
  side: {
    overlay: 'fixed inset-0 bg-neutral-900/60',
    panel: 'fixed inset-y-0 right-0 flex w-full max-w-sm flex-col bg-page',
  },
  // a bottom sheet on small screens and a full-height panel on the right from md
  // one-off: max-h-[90dvh] leaves a strip of the page showing above the bottom sheet
  drawer: {
    overlay: 'fixed inset-0 z-40 bg-neutral-900/60',
    panel:
      'fixed inset-x-0 bottom-0 z-50 flex max-h-[90dvh] flex-col overflow-y-auto rounded-t-card bg-page md:inset-y-0 md:right-0 md:left-auto md:max-h-none md:w-120 md:rounded-none md:border-border md:border-l',
  },
};

type SheetContentProps = {
  variant?: SheetVariant;
  // the panel portals out of the page, so it can set its own theme
  theme?: 'light' | 'dark';
  // or it can portal into a themed element and inherit from it
  container?: HTMLElement | null;
  className?: string;
  children: ReactNode;
};

export function SheetContent({
  variant = 'side',
  theme,
  container,
  className,
  children,
}: SheetContentProps) {
  const styles = variants[variant];
  return (
    <Dialog.Portal container={container}>
      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content
        data-theme={theme}
        aria-describedby={undefined}
        className={cn(styles.panel, 'font-body text-text', className)}
      >
        {children}
      </Dialog.Content>
    </Dialog.Portal>
  );
}
