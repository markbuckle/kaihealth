import { hero } from '../content/landing';
import { HeroDashboard } from './hero-dashboard';
import { AccentText } from './ui/accent-text';
import { ButtonLink } from './ui/button';
import { Swirl } from './ui/swirl';

// one-off: glow sizes and positions are copied from the wireframe, mobile first then desktop
const glows = [
  'bg-swirl-5/70 -left-15 top-2.5 h-55 w-65 lg:left-10 lg:top-10 lg:h-95 lg:w-130',
  'bg-swirl-3/60 bottom-2.5 left-10 h-45 w-75 lg:bottom-5 lg:left-30 lg:h-80 lg:w-140',
  'bg-swirl-6/50 -right-10 top-0 h-50 w-60 lg:right-auto lg:left-120 lg:h-65 lg:w-130',
  'bg-swirl-1/42 hidden lg:block right-15 top-40 h-85 w-115',
];

// The artwork layer is pinned to the wireframe's artboard width (390 or 1440) and centred,
// so the glows and swirl keep their positions at any screen width.
export function Hero() {
  return (
    <section
      data-theme="dark"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-page text-text"
    >
      <div className="relative z-10 mx-auto flex max-w-content flex-col items-center gap-5 px-5 pt-7 text-center lg:gap-7 lg:pt-16">
        <h1
          id="hero-title"
          className="max-w-4xl text-balance font-heading text-56 leading-display tracking-display lg:text-96"
        >
          <AccentText text={hero.title} />
        </h1>
        <p className="max-w-lead text-pretty text-17 text-text-muted lg:text-20">{hero.lead}</p>
        <div className="flex w-full flex-col gap-3 pt-1.5 sm:w-auto sm:flex-row lg:pt-2">
          <ButtonLink href={hero.primary.href}>{hero.primary.label}</ButtonLink>
          <ButtonLink href={hero.secondary.href} variant="outline" className="max-sm:hidden">
            {hero.secondary.label}
          </ButtonLink>
        </div>
      </div>
      <div className="relative flex justify-center px-5 pt-18 pb-24 lg:pt-16 lg:pb-22">
        <div
          aria-hidden="true"
          className="-translate-x-1/2 absolute inset-y-0 left-1/2 w-97.5 lg:w-360"
        >
          {glows.map((glow) => (
            <div
              key={glow}
              className={`absolute rounded-round blur-blob-compact lg:blur-blob ${glow}`}
            />
          ))}
          <Swirl
            variant="hero"
            className="-left-37.5 lg:-left-22.5 absolute top-5 w-190 lg:w-405"
          />
        </div>
        <HeroDashboard className="relative" />
      </div>
    </section>
  );
}
