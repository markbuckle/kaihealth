'use client';

import * as RadixTabs from '@radix-ui/react-tabs';
import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import { chipClassName } from './chip';

export const tabsVariants = ['chips'] as const;
export type TabsVariant = (typeof tabsVariants)[number];

const variants: Record<TabsVariant, { root: string; list: string; trigger: string }> = {
  chips: {
    root: 'flex flex-col items-center gap-10 lg:gap-12',
    list: 'flex max-w-4xl flex-wrap justify-center gap-2',
    trigger: chipClassName('outline', 'cursor-pointer'),
  },
};

export type TabEntry = { value: string; label: string; content: ReactNode };

type TabsProps = {
  // names the tab list for screen readers
  label: string;
  items: TabEntry[];
  defaultValue?: string;
  variant?: TabsVariant;
  className?: string;
};

export function Tabs({ label, items, defaultValue, variant = 'chips', className }: TabsProps) {
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
      {items.map((item) => (
        <RadixTabs.Content key={item.value} value={item.value} className="w-full">
          {item.content}
        </RadixTabs.Content>
      ))}
    </RadixTabs.Root>
  );
}
