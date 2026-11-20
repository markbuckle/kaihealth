'use client';

import Link from 'next/link';
import { cn } from '../../lib/cn';
import { ButtonLink } from './button';
import { Icon } from './icon';
import { iconButtonClassName } from './icon-button';
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from './sheet';

export const mobileMenuVariants = ['sheet'] as const;
export type MobileMenuVariant = (typeof mobileMenuVariants)[number];

const variants: Record<MobileMenuVariant, string> = {
  sheet: 'gap-8 px-5 pb-8',
};

type MenuLink = { label: string; href: string };

type MobileMenuProps = {
  links: MenuLink[];
  cta: MenuLink;
  variant?: MobileMenuVariant;
  className?: string;
};

const iconButton = iconButtonClassName('outline');

// The panel is portalled to the end of the body, outside the dark header,
// so it sets data-theme itself.
export function MobileMenu({ links, cta, variant = 'sheet', className }: MobileMenuProps) {
  return (
    <Sheet>
      <SheetTrigger aria-label="Open menu" className={cn(iconButton, className)}>
        <Icon name="menu" />
      </SheetTrigger>
      <SheetContent variant="side" theme="dark" className={variants[variant]}>
        <div className="flex h-17 items-center justify-between">
          <SheetTitle className="font-label text-12 text-text-muted uppercase tracking-label">
            Menu
          </SheetTitle>
          <SheetClose aria-label="Close menu" className={iconButton}>
            <Icon name="close" />
          </SheetClose>
        </div>
        <nav aria-label="Primary">
          <ul className="flex flex-col">
            {links.map((link) => (
              <li key={link.href} className="border-b border-border">
                <SheetClose asChild>
                  <Link href={link.href} className="flex min-h-14 items-center text-20">
                    {link.label}
                  </Link>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        <SheetClose asChild>
          <ButtonLink href={cta.href} className="w-full">
            {cta.label}
          </ButtonLink>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
