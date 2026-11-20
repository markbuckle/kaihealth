import type { Metadata } from 'next';
import { AccentText } from '../../../components/ui/accent-text';
import { Button, ButtonLink } from '../../../components/ui/button';
import { Eyebrow } from '../../../components/ui/eyebrow';
import { Section } from '../../../components/ui/section';
import { comingSoon } from '../../../content/coming-soon';

export const metadata: Metadata = {
  title: 'Coming soon',
  description: comingSoon.lead,
};

// The waitlist form has no action and a disabled fieldset, so it cannot send anything.
export default function ComingSoonPage() {
  const { form } = comingSoon;
  return (
    <Section
      labelledBy="coming-soon-title"
      containerClassName="flex max-w-xl flex-col items-center gap-6 text-center"
    >
      <Eyebrow>{comingSoon.eyebrow}</Eyebrow>
      <h1
        id="coming-soon-title"
        className="text-balance font-heading text-56 leading-display tracking-display lg:text-64"
      >
        <AccentText text={comingSoon.title} />
      </h1>
      <p className="text-pretty text-17 text-text-muted lg:text-18">{comingSoon.lead}</p>
      <form className="w-full">
        <fieldset disabled className="flex flex-col gap-3 text-left">
          <legend className="sr-only">{form.legend}</legend>
          <label htmlFor="waitlist-email" className="font-medium text-15">
            {form.emailLabel}
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id="waitlist-email"
              type="email"
              autoComplete="off"
              placeholder={form.emailPlaceholder}
              aria-describedby="waitlist-note"
              className="h-13 flex-1 rounded-button border-hairline bg-page px-5 text-16 disabled:cursor-not-allowed disabled:opacity-60"
            />
            <Button type="submit">{form.submit}</Button>
          </div>
          <p id="waitlist-note" className="text-14 text-text-muted">
            {form.note}
          </p>
        </fieldset>
      </form>
      <ButtonLink href={comingSoon.back.href} variant="outline">
        {comingSoon.back.label}
      </ButtonLink>
    </Section>
  );
}
