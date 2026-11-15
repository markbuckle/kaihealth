'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Link from 'next/link';
import { cn } from '../../lib/cn';
import { ButtonLink } from './button';
import { Icon } from './icon';

export const mobileMenuVariants = ['sheet'] as const;
export type MobileMenuVariant = (typeof mobileMenuVariants)[number];

const variants: Record<MobileMenuVariant, { overlay: string; panel: string }> = {
  sheet: {
    overlay: 'fixed inset-0 bg-neutral-900/60',
    panel: 'fixed inset-y-0 right-0 flex w-full max-w-sm flex-col gap-8 bg-page px-5 pb-8',
  },
};

type MenuLink = { label: string; href: string };

type MobileMenuProps = {
  links: MenuLink[];
  cta: MenuLink;
  variant?: MobileMenuVariant;
  className?: string;
};

const iconButton =
  'flex size-11 cursor-pointer items-center justify-center rounded-pill border-hairline text-text';

// The panel is portalled to the end of the body, outside the dark header,
// so it sets data-theme itself.
export function MobileMenu({ links, cta, variant = 'sheet', className }: MobileMenuProps) {
  const styles = variants[variant];
  return (
    <Dialog.Root>
      <Dialog.Trigger aria-label="Open menu" className={cn(iconButton, className)}>
        <Icon name="menu" />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content
          data-theme="dark"
          aria-describedby={undefined}
          className={cn(styles.panel, 'font-body text-text')}
        >
          <div className="flex h-17 items-center justify-between">
            <Dialog.Title className="font-label text-12 text-text-muted uppercase tracking-label">
              Menu
            </Dialog.Title>
            <Dialog.Close aria-label="Close menu" className={iconButton}>
              <Icon name="close" />
            </Dialog.Close>
          </div>
          <nav aria-label="Primary">
            <ul className="flex flex-col">
              {links.map((link) => (
                <li key={link.href} className="border-b border-border">
                  <Dialog.Close asChild>
                    <Link href={link.href} className="flex min-h-14 items-center text-20">
                      {link.label}
                    </Link>
                  </Dialog.Close>
                </li>
              ))}
            </ul>
          </nav>
          <Dialog.Close asChild>
            <ButtonLink href={cta.href} className="w-full">
              {cta.label}
            </ButtonLink>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
