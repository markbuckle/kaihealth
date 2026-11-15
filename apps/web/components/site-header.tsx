import Link from 'next/link';
import { headerActions, primaryNav } from '../content/site';
import { ButtonLink } from './ui/button';
import { Logo } from './ui/logo';
import { MobileMenu } from './ui/mobile-menu';

export function SiteHeader() {
  return (
    <header data-theme="dark" className="bg-page text-text">
      <div className="flex h-17 items-center justify-between gap-8 px-5 lg:h-22 lg:px-14">
        <Logo />
        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex gap-9">
            {primaryNav.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="flex min-h-11 items-center text-15 text-text-muted hover:text-text"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="flex items-center gap-2 lg:gap-6">
          <Link
            href={headerActions.logIn.href}
            className="hidden min-h-11 items-center font-medium text-15 lg:flex"
          >
            {headerActions.logIn.label}
          </Link>
          <ButtonLink href={headerActions.start.href} size="sm">
            {headerActions.start.label}
          </ButtonLink>
          <MobileMenu links={primaryNav} cta={headerActions.start} className="lg:hidden" />
        </div>
      </div>
    </header>
  );
}
