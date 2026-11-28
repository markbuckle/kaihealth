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
        {lead ? <p className="text-canvas-text max-md:hidden">{lead}</p> : null}
      </div>
      {/* the link sits on the canvas too: its muted (not ready) colour and its "Soon" note follow the canvas roles */}
      <div className="contents [--color-text-muted:var(--color-canvas-text)] **:data-soon:text-canvas-note">
        {link}
      </div>
    </div>
  );
}
