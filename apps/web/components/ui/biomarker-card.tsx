import { type Biomarker, describeChange, formatValue } from '../../content/sample-results';
import { cn } from '../../lib/cn';
import { Card } from './card';
import { Eyebrow } from './eyebrow';
import { RangeBar } from './range-bar';
import { StatusPill } from './status-pill';
import { TrendChart } from './trend-chart';

export const biomarkerCardVariants = ['full', 'compact'] as const;
export type BiomarkerCardVariant = (typeof biomarkerCardVariants)[number];

const variants: Record<
  BiomarkerCardVariant,
  { card: string; title: string; value: string; showDetail: boolean }
> = {
  full: { card: 'gap-4.5 p-6', title: 'text-17', value: 'text-40', showDetail: true },
  compact: { card: 'gap-3.5 p-5', title: 'text-15', value: 'text-28', showDetail: false },
};

type BiomarkerCardProps = {
  biomarker: Biomarker;
  variant?: BiomarkerCardVariant;
  sampleLabel?: string;
  className?: string;
};

export function BiomarkerCard({
  biomarker,
  variant = 'full',
  sampleLabel,
  className,
}: BiomarkerCardProps) {
  const styles = variants[variant];
  const change = styles.showDetail ? describeChange(biomarker) : null;

  return (
    <Card as="article" className={cn('flex flex-col', styles.card, className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <Eyebrow variant="card">
            {sampleLabel ? `${biomarker.category} · ${sampleLabel}` : biomarker.category}
          </Eyebrow>
          <h3 className={cn('font-medium leading-title', styles.title)}>{biomarker.name}</h3>
        </div>
        <StatusPill status={biomarker.status} />
      </div>
      <p className="flex flex-wrap items-baseline gap-2">
        <span className={cn('font-label leading-flat tracking-number', styles.value)}>
          {formatValue(biomarker)}
        </span>
        <span className="font-label text-13 text-text-muted">{biomarker.unit}</span>
        {change ? <span className="ml-auto text-13 text-text-muted">{change}</span> : null}
      </p>
      <RangeBar
        bands={biomarker.range.bands}
        status={biomarker.status}
        markerPercent={biomarker.range.markerPercent}
        showLabels={styles.showDetail}
      />
      {styles.showDetail ? <TrendChart biomarker={biomarker} /> : null}
    </Card>
  );
}
