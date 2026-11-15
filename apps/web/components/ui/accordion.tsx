'use client';

import * as RadixAccordion from '@radix-ui/react-accordion';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { Icon } from './icon';

export const accordionVariants = ['divided'] as const;
export type AccordionVariant = (typeof accordionVariants)[number];

const variants: Record<
  AccordionVariant,
  { root: string; item: string; trigger: string; content: string }
> = {
  divided: {
    root: 'border-b border-border',
    item: 'border-t border-border',
    trigger: 'py-6.5 text-18 font-medium leading-snug lg:text-20',
    content: 'max-w-160 pb-6.5 text-pretty text-17 text-text-muted',
  },
};

export type AccordionEntry = { value: string; title: string; content: ReactNode };

type AccordionProps = {
  items: AccordionEntry[];
  defaultValue?: string;
  variant?: AccordionVariant;
  className?: string;
};

// One panel open at a time. Each title is an h3 so the questions sit under the section heading.
export function Accordion({ items, defaultValue, variant = 'divided', className }: AccordionProps) {
  const styles = variants[variant];
  return (
    <RadixAccordion.Root
      type="single"
      collapsible
      defaultValue={defaultValue}
      className={cn(styles.root, className)}
    >
      {items.map((item) => (
        <RadixAccordion.Item key={item.value} value={item.value} className={styles.item}>
          <RadixAccordion.Header className="m-0">
            <RadixAccordion.Trigger
              className={cn(
                'group flex w-full cursor-pointer items-center justify-between gap-6 text-left',
                styles.trigger,
              )}
            >
              {item.title}
              <Icon name="plus" className="size-5.5 group-data-[state=open]:hidden" />
              <Icon name="minus" className="hidden size-5.5 group-data-[state=open]:block" />
            </RadixAccordion.Trigger>
          </RadixAccordion.Header>
          <RadixAccordion.Content className={styles.content}>{item.content}</RadixAccordion.Content>
        </RadixAccordion.Item>
      ))}
    </RadixAccordion.Root>
  );
}
