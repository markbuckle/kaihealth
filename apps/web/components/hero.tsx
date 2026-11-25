import { hero } from '../content/landing';
import { HeroDashboard } from './hero-dashboard';
import { AccentText } from './ui/accent-text';
import { ButtonLink } from './ui/button';
import { Ribbon } from './ui/ribbon';
import { Wave } from './ui/wave';

// one-off: glow sizes and positions are copied from the wireframe, mobile first then desktop
const glows = [
  'bg-swirl-5/70 -left-15 top-2.5 h-55 w-65 lg:left-10 lg:top-10 lg:h-95 lg:w-130',
  'bg-swirl-3/60 bottom-2.5 left-10 h-45 w-75 lg:bottom-5 lg:left-30 lg:h-80 lg:w-140',
  'bg-swirl-6/50 -right-10 top-0 h-50 w-60 lg:right-auto lg:left-120 lg:h-65 lg:w-130',
  'bg-swirl-1/42 hidden lg:block right-15 top-40 h-85 w-115',
];

// The artwork layer is pinned to the wireframe's artboard width (390 or 1440) and centred,
// so the glows keep their positions at any screen width.
// The ribbon hangs over the hero's bottom edge, so it sits outside the hero's clipping.
// Its wrapper clips only the sides, so the wide canvas never causes a horizontal scroll.
// The canvas spans the full width at the scene camera's 18:7 frame, so the ribbon scales with
// the screen and always runs edge to edge. Below 760px it stops shrinking and crops to the dip.
// The wave shares that frame and carves the hero's bottom edge into a curve under the ribbon.
// The hero ends with room for the wave (a tenth of the frame width, so 76px at the least),
// which lets its glows run on down into the wave instead of stopping at a straight line.
// The dashboard sits above everything.
// one-off: lifting the frame 91.71% of its height (66% for the ribbon's place, plus the room
// for the wave) sets where the ribbon sits. The hero edge baked into ui/wave.tsx follows from it.
const ribbonFrame =
  '-translate-x-1/2 -translate-y-[91.71%] absolute top-0 left-1/2 aspect-[18/7] w-[max(100%,47.5rem)]';

export function Hero() {
  return (
    <>
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
          <p className="max-w-lead text-pretty text-17 text-text-muted lg:text-20">
            <AccentText text={hero.lead} />
          </p>
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
          </div>
          <HeroDashboard className="relative z-20" />
        </div>
        <div className="aspect-[10/1] min-h-19" />
      </section>
      <div className="relative z-10 h-0 overflow-x-clip">
        <Wave variant="hero" className={ribbonFrame} />
        <Ribbon variant="hero" className={ribbonFrame} />
      </div>
    </>
  );
}
