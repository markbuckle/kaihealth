import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import type { CSSProperties, ReactNode } from 'react';
import { AccentText } from '../../components/ui/accent-text';
import { Accordion } from '../../components/ui/accordion';
import { BiomarkerCard, biomarkerCardVariants } from '../../components/ui/biomarker-card';
import { Button, ButtonLink, buttonSizes, buttonVariants } from '../../components/ui/button';
import { Card, cardVariants } from '../../components/ui/card';
import { Chip, chipVariants } from '../../components/ui/chip';
import { Eyebrow, eyebrowVariants } from '../../components/ui/eyebrow';
import { Icon, iconNames } from '../../components/ui/icon';
import { Logo } from '../../components/ui/logo';
import { MobileMenu } from '../../components/ui/mobile-menu';
import { Placeholder } from '../../components/ui/placeholder';
import { RangeBar } from '../../components/ui/range-bar';
import { SectionHeading, sectionHeadingVariants } from '../../components/ui/section';
import { StatusPill } from '../../components/ui/status-pill';
import { Swirl } from '../../components/ui/swirl';
import { Tabs } from '../../components/ui/tabs';
import { TrendChart } from '../../components/ui/trend-chart';
import { type Status, sampleBiomarkers } from '../../content/sample-results';
import { primaryNav } from '../../content/site';
import { featureFlags, routes } from '../../lib/config';
import { cssVariable, type TokenGroup, type TokenKind, tokenGroups } from './token-list';
import { TokenValue } from './token-value';

export const metadata: Metadata = {
  title: 'Styleguide',
  robots: { index: false, follow: false },
};

const statuses: Status[] = ['good', 'warn', 'flag'];
const themes = ['light', 'dark'] as const;

export default function StyleguidePage() {
  if (!featureFlags.styleguide) notFound();
  const [biomarker] = sampleBiomarkers;

  return (
    <>
      <section className="px-gutter py-section-y">
        <div className="mx-auto flex max-w-content flex-col gap-4">
          <Eyebrow>Development only</Eyebrow>
          <h1 className="font-heading text-56 leading-display tracking-display lg:text-64">
            <AccentText text="*Styleguide*" />
          </h1>
          <p className="max-w-lead text-17 text-text-muted">
            Every token in design/tokens/tokens.css and every component in components/ui, in the
            light and dark themes. Values are read from the page, so edits to the tokens show here
            straight away.
          </p>
        </div>
      </section>

      {themes.map((theme) => (
        <section
          key={theme}
          data-theme={theme}
          className="border-border border-t bg-page px-gutter py-section-y text-text"
        >
          <div className="mx-auto flex max-w-content flex-col gap-16">
            <h2 className="font-heading text-40 leading-display">
              {theme === 'light' ? 'Light theme' : 'Dark theme'}
            </h2>

            <Block title="Tokens">
              <div className="flex flex-col gap-10">
                {tokenGroups.map((group) => (
                  <TokenGroupView key={group.title} group={group} />
                ))}
              </div>
            </Block>

            <Block title="Button">
              {buttonVariants.map((variant) => (
                <Row key={variant} label={`variant="${variant}"`}>
                  {buttonSizes.map((size) => (
                    <Button key={size} variant={variant} size={size}>
                      {`Size ${size}`}
                    </Button>
                  ))}
                  <Button variant={variant} disabled>
                    Disabled
                  </Button>
                  <ButtonLink variant={variant} href={routes.comingSoon}>
                    As a link
                  </ButtonLink>
                </Row>
              ))}
            </Block>

            <Block title="Chip">
              {chipVariants.map((variant) => (
                <Row key={variant} label={`variant="${variant}"`}>
                  <Chip variant={variant} selected>
                    Selected
                  </Chip>
                  <Chip variant={variant}>Not selected</Chip>
                </Row>
              ))}
            </Block>

            <Block title="Card">
              <div className="grid gap-4 md:grid-cols-3">
                {cardVariants.map((variant) => (
                  <Card key={variant} variant={variant} className="p-6">
                    <Eyebrow variant="card">{`variant="${variant}"`}</Eyebrow>
                  </Card>
                ))}
              </div>
            </Block>

            <Block title="Eyebrow">
              {eyebrowVariants.map((variant) => (
                <Row key={variant} label={`variant="${variant}"`}>
                  <Eyebrow variant={variant}>Eyebrow label</Eyebrow>
                </Row>
              ))}
            </Block>

            <Block title="Section heading">
              {sectionHeadingVariants.map((variant) => (
                <SectionHeading
                  key={variant}
                  id={`styleguide-heading-${theme}-${variant}`}
                  variant={variant}
                  eyebrow={`variant="${variant}"`}
                  title="A heading with an *accent* word in it"
                  lead="An optional lead paragraph under the heading."
                />
              ))}
            </Block>

            <Block title="Status pill, range bar and trend chart">
              <Row label="status">
                {statuses.map((status) => (
                  <StatusPill key={status} status={status} />
                ))}
              </Row>
              {biomarker ? (
                <div className="grid max-w-md gap-6">
                  <RangeBar
                    bands={biomarker.range.bands}
                    status={biomarker.status}
                    markerPercent={biomarker.range.markerPercent}
                    showLabels
                  />
                  <TrendChart biomarker={biomarker} />
                </div>
              ) : null}
            </Block>

            <Block title="Biomarker card">
              <div className="grid items-start gap-6 md:grid-cols-2">
                {biomarker
                  ? biomarkerCardVariants.map((variant) => (
                      <BiomarkerCard
                        key={variant}
                        biomarker={biomarker}
                        variant={variant}
                        sampleLabel="Sample data"
                      />
                    ))
                  : null}
              </div>
            </Block>

            <Block title="Accordion and tabs">
              <Accordion
                className="max-w-reading"
                defaultValue="one"
                items={[
                  { value: 'one', title: 'An open item', content: 'Panel content.' },
                  { value: 'two', title: 'A closed item', content: 'Panel content.' },
                ]}
              />
              <Tabs
                label="Example tabs"
                items={[
                  {
                    value: 'one',
                    label: 'First',
                    content: <p className="text-center">First panel</p>,
                  },
                  {
                    value: 'two',
                    label: 'Second',
                    content: <p className="text-center">Second panel</p>,
                  },
                ]}
              />
            </Block>

            <Block title="Logo, placeholder, icons and menu">
              <Row label="logo">
                <Logo />
              </Row>
              <Row label="placeholder">
                <Placeholder className="size-16" />
              </Row>
              <Row label="icons">
                {iconNames.map((name) => (
                  <span key={name} className="flex flex-col items-center gap-2">
                    <Icon name={name} className="size-6" />
                    <span className="font-label text-10 text-text-muted">{name}</span>
                  </span>
                ))}
              </Row>
              <Row label="mobile menu">
                <MobileMenu
                  links={primaryNav}
                  cta={{ label: 'Start testing', href: routes.comingSoon }}
                />
              </Row>
            </Block>

            <Block title="Swirl artwork">
              <div className="grid items-end gap-6 md:grid-cols-2">
                <Swirl variant="hero" className="w-full" />
                <Swirl variant="cta" className="mx-auto w-2/3" />
              </div>
            </Block>
          </div>
        </section>
      ))}
    </>
  );
}

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="border-border border-b pb-3 font-medium text-20">{title}</h3>
      {children}
    </div>
  );
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
      <span className="w-40 shrink-0 font-label text-12 text-text-muted">{label}</span>
      <div className="flex flex-wrap items-center gap-3">{children}</div>
    </div>
  );
}

function TokenGroupView({ group }: { group: TokenGroup }) {
  return (
    <div className="flex flex-col gap-4">
      <p className="flex items-baseline gap-3">
        <span className="font-medium text-16">{group.title}</span>
        <Eyebrow as="span" variant="card">
          {group.tier}
        </Eyebrow>
      </p>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {group.names.map((name) => {
          const variable = cssVariable(group.kind, name);
          return (
            <li key={name} className="flex min-w-0 flex-col gap-1.5">
              <TokenSample kind={group.kind} variable={variable} />
              <span className="break-all font-label text-12">{variable}</span>
              <TokenValue name={variable} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

// token values are only known at runtime, so samples are styled inline from the variable
function TokenSample({ kind, variable }: { kind: TokenKind; variable: string }) {
  const value = `var(${variable})`;
  const box = 'flex h-14 items-center justify-center overflow-hidden';
  const samples: Record<TokenKind, { style: CSSProperties; text?: string; className?: string }> = {
    color: { style: { background: value }, className: 'h-14 w-full rounded-inset border-card' },
    font: { style: { fontFamily: value }, text: 'Aa Que', className: 'text-28' },
    text: { style: { fontSize: value }, text: 'Aa', className: 'leading-flat' },
    leading: {
      style: { lineHeight: value },
      text: 'Two lines of sample text',
      className: 'w-24 text-13',
    },
    tracking: {
      style: { letterSpacing: value },
      text: 'TRACKING',
      className: 'font-label text-12',
    },
    spacing: { style: { width: value }, className: 'h-3 max-w-full rounded-pill bg-accent' },
    container: { style: { width: value }, className: 'h-3 max-w-full rounded-pill bg-accent' },
    radius: { style: { borderRadius: value }, className: 'size-14 border-strong' },
    border: { style: { border: `${value} var(--color-border)` }, className: 'size-14 rounded-xs' },
    shadow: { style: { boxShadow: value }, className: 'size-14 rounded-xs bg-surface' },
    blur: { style: { filter: `blur(${value})` }, className: 'size-8 rounded-round bg-accent' },
    duration: { style: {}, text: 'Motion' },
    ease: { style: {}, text: 'Motion' },
  };
  const sample = samples[kind];
  return (
    <div className={box}>
      <div style={sample.style} className={sample.className}>
        {sample.text}
      </div>
    </div>
  );
}
