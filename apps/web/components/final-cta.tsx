import { finalCta } from '../content/landing';
import { AccentText } from './ui/accent-text';
import { ButtonLink } from './ui/button';
import { Eyebrow } from './ui/eyebrow';
import { Ribbon } from './ui/ribbon';

// The ribbon starts in the section above and runs down past this one, so it sits beside the
// section rather than inside its clipping. Its canvas keeps the scene camera's 2:3 frame and
// takes its size from its height. The part of the scene above the footer fills the top 11/15 of
// that frame: from lg it spans from 6.5rem up into the section above (inside its bottom padding)
// to 2.5rem down into the footer, so the frame is (100% + 9rem) * 15/11 tall.
// The section above and the footer sit in front of the ribbon (both are z-20), so it seems to
// slide out from under one and tuck in behind the other.
// On small screens the ribbon fills the space above the text instead and fades out there.
// The text sits above it all.
// one-off: the offsets and fade stops were set by eye against the section paddings
const ribbonFrame =
  'absolute left-0 z-10 aspect-[2/3] -top-14 h-[calc(18.5rem*15/11)] lg:-top-26 lg:h-[calc((100%_+_9rem)*15/11)] [mask-image:linear-gradient(to_bottom,black_66.4%,transparent_73.3%)] lg:[mask-image:none]';

export function FinalCta() {
  return (
    <div className="relative">
      <section
        data-theme="dark"
        aria-labelledby="final-cta-title"
        className="relative overflow-hidden bg-page px-gutter pb-section-y text-text lg:min-h-125 lg:py-22"
      >
        <div className="h-60 lg:hidden" />
        <div className="relative z-20 mx-auto grid max-w-content pt-10 lg:grid-cols-2 lg:pt-0">
          <div className="flex flex-col items-start gap-6 lg:col-start-2 lg:gap-7">
            <Eyebrow>{finalCta.eyebrow}</Eyebrow>
            <h2
              id="final-cta-title"
              className="text-balance font-heading text-56 leading-display tracking-display lg:text-96"
            >
              <AccentText text={finalCta.title} />
            </h2>
            <p className="max-w-md text-pretty text-17 text-text-muted lg:text-20">
              {finalCta.lead}
            </p>
            <div className="flex flex-wrap items-center gap-5 pt-2">
              <ButtonLink href={finalCta.cta.href}>{finalCta.cta.label}</ButtonLink>
              <span className="font-label text-13 text-text-muted tracking-caption">
                {finalCta.priceNote}
              </span>
            </div>
          </div>
        </div>
      </section>
      <Ribbon variant="cta" className={ribbonFrame} />
    </div>
  );
}
