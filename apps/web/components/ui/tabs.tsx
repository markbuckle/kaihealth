'use client';

import * as RadixTabs from '@radix-ui/react-tabs';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { chipClassName } from './chip';

export const tabsVariants = ['chips', 'underline', 'filter'] as const;
export type TabsVariant = (typeof tabsVariants)[number];

const variants: Record<TabsVariant, { root: string; list: string; trigger: string }> = {
  chips: {
    root: 'flex flex-col items-center gap-10 lg:gap-12',
    list: 'flex max-w-4xl flex-wrap justify-center gap-2',
    trigger: chipClassName('outline', 'cursor-pointer'),
  },
  // text tabs over a rule, the active one underlined
  underline: {
    root: 'flex flex-col',
    list: 'flex gap-5 border-border border-b',
    trigger:
      'inline-flex min-h-10 cursor-pointer items-center border-transparent border-b-2 px-0.5 text-14 text-text-muted data-[state=active]:border-text data-[state=active]:font-medium data-[state=active]:text-text',
  },
  // small chips that wrap on wide screens and scroll sideways on narrow ones
  filter: {
    root: 'flex flex-col gap-4',
    list: '-mr-4 flex gap-2 overflow-x-auto pr-4 md:mr-0 md:flex-wrap md:overflow-visible md:pr-0',
    trigger: chipClassName('filter', 'cursor-pointer'),
  },
};

export type TabEntry = { value: string; label: string; content: ReactNode };

type TabsProps = {
  // names the tab list for screen readers
  label: string;
  items: TabEntry[];
  defaultValue?: string;
  // shown under the tab list whichever tab is active
  belowList?: ReactNode;
  variant?: TabsVariant;
  className?: string;
};

export function Tabs({
  label,
  items,
  defaultValue,
  belowList,
  variant = 'chips',
  className,
}: TabsProps) {
  const styles = variants[variant];
  return (
    <RadixTabs.Root
      defaultValue={defaultValue ?? items[0]?.value}
      className={cn(styles.root, className)}
    >
      <RadixTabs.List aria-label={label} className={styles.list}>
        {items.map((item) => (
          <RadixTabs.Trigger key={item.value} value={item.value} className={styles.trigger}>
            {item.label}
          </RadixTabs.Trigger>
        ))}
      </RadixTabs.List>
      {belowList}
      {items.map((item) => (
        <RadixTabs.Content key={item.value} value={item.value} className="w-full">
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
