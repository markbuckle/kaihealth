import { faqItems } from '../content/faq';
import { faq } from '../content/landing';
import { sectionIds } from '../lib/config';
import { Accordion } from './ui/accordion';
import { Section, SectionHeading } from './ui/section';

// z-20 keeps this section in front of the closing call to action's ribbon, which starts beneath it
export function Faq() {
  return (
    <Section id={sectionIds.faq} variant="surface" labelledBy="faq-title" className="relative z-20">
      <SectionHeading id="faq-title" variant="wide" eyebrow={faq.eyebrow} title={faq.title} />
      <Accordion
        className="mx-auto mt-12 max-w-reading lg:mt-14"
        defaultValue={faqItems[0]?.id}
        items={faqItems.map((item) => ({
          value: item.id,
          title: item.question,
          content: item.answer,
        }))}
      />
    </Section>
  );
}
