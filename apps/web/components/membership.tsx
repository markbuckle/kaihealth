import { membership } from '../content/landing';
import { sectionIds } from '../lib/config';
import { ButtonLink } from './ui/button';
import { Card } from './ui/card';
import { Eyebrow } from './ui/eyebrow';
import { Icon } from './ui/icon';
import { Section, SectionHeading } from './ui/section';

// one-off: the 5 to 6 column split matches the wireframe
const planColumns = 'lg:grid-cols-[5fr_6fr]';

export function Membership() {
  return (
    <Section id={sectionIds.membership} labelledBy="membership-title">
      <SectionHeading
        id="membership-title"
        variant="wide"
        eyebrow={membership.eyebrow}
        title={membership.title}
      />
      <Card className={`mx-auto mt-12 grid max-w-list lg:mt-14 ${planColumns}`}>
        <div className="flex flex-col gap-6 border-border border-b p-8 lg:border-r lg:border-b-0 lg:p-12">
          <Eyebrow>{membership.planLabel}</Eyebrow>
          <p className="flex items-baseline gap-3">
            <span className="font-heading text-96 leading-tight">{membership.price}</span>
            <span className="text-20 text-text-muted">{membership.period}</span>
          </p>
          <ButtonLink href={membership.cta.href} size="lg" className="mt-2 w-full">
            {membership.cta.label}
          </ButtonLink>
          <Eyebrow>{membership.terms}</Eyebrow>
        </div>
        <div className="flex flex-col gap-6 p-8 lg:p-12">
          <Eyebrow>{membership.includedLabel}</Eyebrow>
          <ul className="flex flex-col gap-3.5">
            {membership.included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-18 leading-list">
                <Icon name="check" className="mt-0.5 text-accent" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </Card>
    </Section>
  );
}
