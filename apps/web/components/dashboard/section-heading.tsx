import type { ReactNode } from 'react';

// The title row of a Home section: a serif title, a lead line from md up and a link.
export function SectionHeading({
  id,
  title,
  lead,
  link,
}: {
  id: string;
  title: string;
  lead?: string;
  link?: ReactNode;
}) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <div className="flex flex-col gap-1">
        <h2 id={id} className="font-heading text-28 leading-display tracking-display md:text-32">
          {title}
        </h2>
        {lead ? <p className="text-text-muted max-md:hidden">{lead}</p> : null}
      </div>
      {link}
    </div>
  );
}
