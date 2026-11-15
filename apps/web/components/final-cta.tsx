import { finalCta } from '../content/landing';
import { AccentText } from './ui/accent-text';
import { ButtonLink } from './ui/button';
import { Eyebrow } from './ui/eyebrow';
import { Swirl } from './ui/swirl';

// On small screens the swirl sits above the text; from lg it fills the left half behind it.
export function FinalCta() {
  return (
    <section
      data-theme="dark"
      aria-labelledby="final-cta-title"
      className="relative overflow-hidden bg-page px-gutter pb-section-y text-text lg:min-h-125 lg:py-22"
    >
      <div
        aria-hidden="true"
        className="relative h-60 max-lg:-mx-gutter lg:absolute lg:inset-y-0 lg:left-0 lg:h-auto lg:w-160"
      >
        <Swirl variant="cta" className="-scale-x-100 absolute bottom-0 left-0 w-100 lg:w-160" />
      </div>
      <div className="relative mx-auto grid max-w-content pt-10 lg:grid-cols-2 lg:pt-0">
        <div className="flex flex-col items-start gap-6 lg:col-start-2 lg:gap-7">
          <Eyebrow>{finalCta.eyebrow}</Eyebrow>
          <h2
            id="final-cta-title"
            className="text-balance font-heading text-56 leading-display tracking-display lg:text-96"
          >
            <AccentText text={finalCta.title} />
          </h2>
          <p className="max-w-md text-pretty text-17 text-text-muted lg:text-20">{finalCta.lead}</p>
          <div className="flex flex-wrap items-center gap-5 pt-2">
            <ButtonLink href={finalCta.cta.href}>{finalCta.cta.label}</ButtonLink>
            <span className="font-label text-13 text-text-muted tracking-caption">
              {finalCta.priceNote}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
