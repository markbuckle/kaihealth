import { cn } from '../../lib/cn';
import { areaLabel } from '../../lib/health/areas';
import { describeChange, formatValue, markerPercent, rangeBands } from '../../lib/health/results';
import type { ResultSeries } from '../../lib/health/types';
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
  series: ResultSeries;
  variant?: BiomarkerCardVariant;
  sampleLabel?: string;
  className?: string;
};

export function BiomarkerCard({
  series,
  variant = 'full',
  sampleLabel,
  className,
}: BiomarkerCardProps) {
  const { biomarker, observations } = series;
  const latest = observations.at(-1);
  if (!latest) return null;

  const styles = variants[variant];
  const value = latest.valueQuantity.value;
  const { status } = latest.interpretation;
  const area = areaLabel(biomarker.area);
  const change = styles.showDetail ? describeChange(series) : null;

  return (
    <Card as="article" className={cn('flex flex-col', styles.card, className)}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <Eyebrow variant="card">{sampleLabel ? `${area} · ${sampleLabel}` : area}</Eyebrow>
          <h3 className={cn('font-medium leading-title', styles.title)}>{biomarker.name}</h3>
        </div>
        {/* the status alone keeps the pill short; the range bar shows which way it leans */}
        <StatusPill status={status} />
      </div>
      <p className="flex flex-wrap items-baseline gap-2">
        <span className={cn('font-label leading-flat tracking-number', styles.value)}>
          {formatValue(biomarker, value)}
        </span>
        <span className="font-label text-13 text-text-muted">{biomarker.unit.display}</span>
        {change ? <span className="ml-auto text-13 text-text-muted">{change}</span> : null}
      </p>
      <RangeBar
        bands={rangeBands(biomarker)}
        status={status}
        markerPercent={markerPercent(biomarker, value)}
        showLabels={styles.showDetail}
      />
      {styles.showDetail ? <TrendChart series={series} /> : null}
    </Card>
  );
}
