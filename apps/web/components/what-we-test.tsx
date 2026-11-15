import Link from 'next/link';
import { whatWeTest } from '../content/landing';
import { type TestCategory, testCategories, testListPlaceholder } from '../content/tests';
import { sectionIds } from '../lib/config';
import { Card } from './ui/card';
import { Eyebrow } from './ui/eyebrow';
import { Icon } from './ui/icon';
import { Section, SectionHeading } from './ui/section';
import { Tabs } from './ui/tabs';

export function WhatWeTest() {
  return (
    <Section id={sectionIds.whatWeTest} labelledBy="what-we-test-title">
      <SectionHeading
        id="what-we-test-title"
        eyebrow={whatWeTest.eyebrow}
        title={whatWeTest.title}
      />
      <Tabs
        label={whatWeTest.tabsLabel}
        className="mt-12"
        items={testCategories.map((category) => ({
          value: category.id,
          label: category.label,
          content: <TestList category={category} />,
        }))}
      />
      <p className="mt-12 flex justify-center">
        <Link
          href={whatWeTest.fullList.href}
          className="inline-flex min-h-11 items-center gap-2 font-medium text-16 text-link underline underline-offset-4"
        >
          {whatWeTest.fullList.label}
          <Icon name="arrow-right" className="size-4.5" />
        </Link>
      </p>
    </Section>
  );
}

function TestList({ category }: { category: TestCategory }) {
  if (category.tests.length === 0) {
    return <Eyebrow className="text-center">{testListPlaceholder}</Eyebrow>;
  }
  return (
    <ul className="mx-auto grid max-w-list gap-3 md:grid-cols-2">
      {category.tests.map((test) => (
        <Card as="li" variant="row" key={test} className="flex items-center gap-3.5 px-6 py-4">
          <Icon name="check" className="text-accent" />
          <span className="flex-1 text-17">{test}</span>
          <Eyebrow as="span" variant="card">
            {category.label}
          </Eyebrow>
        </Card>
      ))}
    </ul>
  );
}
