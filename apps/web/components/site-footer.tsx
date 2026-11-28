import Link from 'next/link';
import { footer } from '../content/site';
import { Eyebrow } from './ui/eyebrow';
import { Logo } from './ui/logo';

// z-20 keeps the footer in front of the closing call to action's ribbon, which tucks in behind it
export function SiteFooter() {
  return (
    <footer
      data-theme="dark"
      className="relative z-20 border-border border-t bg-surface px-gutter pt-18 pb-10 text-text"
    >
      <div className="mx-auto flex max-w-content flex-col gap-14">
        <div className="flex flex-col gap-12 lg:flex-row lg:justify-between lg:gap-16">
          <div className="flex max-w-xs flex-col gap-3">
            <Logo />
            <p className="text-pretty text-15 text-text-muted">{footer.blurb}</p>
          </div>
          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-12 gap-y-10 sm:grid-cols-3 lg:flex lg:gap-24"
          >
            {footer.columns.map((column) => (
              <div key={column.title} className="flex flex-col gap-4">
                <Eyebrow>{column.title}</Eyebrow>
                <ul className="flex flex-col gap-2">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        className="flex min-h-8 items-center text-15 hover:underline"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>
        <div className="flex flex-col gap-3 border-border border-t pt-6 font-label text-12 text-text-muted tracking-caption sm:flex-row sm:justify-between">
          <span>{footer.copyright}</span>
          <span>{footer.disclaimer}</span>
        </div>
      </div>
    </footer>
  );
}
