import { trust } from '../content/landing';
import { Card } from './ui/card';
import { Eyebrow } from './ui/eyebrow';
import { Icon } from './ui/icon';
import { Placeholder } from './ui/placeholder';
import { Section, SectionHeading } from './ui/section';

export function Trust() {
  return (
    <Section variant="surface" labelledBy="trust-title">
      <SectionHeading id="trust-title" eyebrow={trust.eyebrow} title={trust.title} />
      <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-16">
        {trust.cards.map((card) => (
          <Card key={card.title} className="flex flex-col gap-6 p-8 lg:p-10">
            <span className="flex size-14 items-center justify-center rounded-round border-hairline text-accent">
              <Icon name={card.icon} className="size-6" />
            </span>
            <div className="flex flex-col gap-3">
              <h3 className="text-balance font-heading text-36 leading-display tracking-display lg:text-40">
                {card.title}
              </h3>
              <p className="text-pretty text-17 text-text-muted">{card.body}</p>
            </div>
            <div className="mt-auto flex min-h-16 flex-wrap items-center gap-3">
              {Array.from(
                { length: card.photos },
                (_, index) => `${card.title}-photo-${index}`,
              ).map((key) => (
                <Placeholder key={key} className="size-16" />
              ))}
              <Eyebrow className={card.photos > 0 ? 'sm:ml-2' : undefined}>{card.caption}</Eyebrow>
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
