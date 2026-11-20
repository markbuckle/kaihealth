import { cn } from '../../lib/cn';
import { formatShortMonthYear } from '../../lib/health/format';
import { formatValue, optimalEdge } from '../../lib/health/results';
import { statusLabels } from '../../lib/health/status';
import type { ResultSeries, Status } from '../../lib/health/types';

export const trendChartVariants = ['default'] as const;
export type TrendChartVariant = (typeof trendChartVariants)[number];

const variants: Record<TrendChartVariant, string> = {
  default: 'block h-auto w-full overflow-visible',
};

// drawing area in SVG units, matched to the wireframe
const frame = { width: 320, height: 124, left: 34, right: 286, top: 12, bottom: 102 } as const;
// one-off: chart labels are sized in SVG units so they scale with the chart
const labelSize = 8.5;

const latestTones: Record<Status, { outer: string; inner: string; dot: string }> = {
  optimal: { outer: 'fill-status-good/14', inner: 'fill-status-good/26', dot: 'fill-status-good' },
  'in-range': {
    outer: 'fill-status-neutral/14',
    inner: 'fill-status-neutral/26',
    dot: 'fill-status-neutral',
  },
  borderline: {
    outer: 'fill-status-warn/14',
    inner: 'fill-status-warn/26',
    dot: 'fill-status-warn',
  },
  'out-of-range': {
    outer: 'fill-status-flag/14',
    inner: 'fill-status-flag/26',
    dot: 'fill-status-flag',
  },
};

// Leaves more room below the lowest value than above the highest, as the wireframe does,
// so the area fill always has some height.
function yScale(values: number[]) {
  const low = Math.min(...values);
  const high = Math.max(...values);
  const span = high - low || 1;
  const min = low - span * 0.6;
  const max = high + span * 0.25;
  return (value: number) =>
    frame.top + (1 - (value - min) / (max - min)) * (frame.bottom - frame.top);
}

// The line through each test, with the edge of the optimal zone as a dashed target line.
export function TrendChart({
  series,
  variant = 'default',
  className,
}: {
  series: ResultSeries;
  variant?: TrendChartVariant;
  className?: string;
}) {
  const { biomarker, observations } = series;
  const history = observations.map((observation) => ({
    date: formatShortMonthYear(observation.effectiveDateTime),
    value: observation.valueQuantity.value,
  }));
  const latestObservation = observations.at(-1);
  if (!latestObservation) return null;

  const unit = biomarker.unit.display;
  const reference = optimalEdge(biomarker, latestObservation.valueQuantity.value);
  const toY = yScale([...history.map((point) => point.value), reference ?? 0]);
  const step = (frame.right - frame.left) / Math.max(history.length - 1, 1);
  const points = history.map((point, index) => ({
    ...point,
    x: frame.left + index * step,
    y: toY(point.value),
  }));
  const latest = points.at(-1);
  const referenceY = reference === null ? null : toY(reference);
  const line = points.map((point) => `${point.x},${point.y}`).join(' ');
  const area = `${frame.left},${frame.bottom} ${line} ${latest?.x ?? frame.right},${frame.bottom}`;
  const description = `${biomarker.name} across ${history.length} tests: ${history
    .map((point) => `${point.date} ${formatValue(biomarker, point.value)} ${unit}`)
    .join(', ')}.${
    reference === null
      ? ''
      : ` The edge of the ${statusLabels.optimal.toLowerCase()} range is ${formatValue(biomarker, reference)} ${unit}.`
  }`;
  const tone = latestTones[latestObservation.interpretation.status];

  return (
    <svg
      viewBox={`0 0 ${frame.width} ${frame.height}`}
      role="img"
      aria-label={description}
      className={cn(variants[variant], className)}
    >
      {referenceY === null ? null : (
        <>
          <line
            x1="0"
            x2={frame.width}
            y1={referenceY}
            y2={referenceY}
            strokeDasharray="3 4"
            className="stroke-status-good/55"
          />
          <text
            x="8"
            // the label sits under its line unless that would push it off the chart
            y={referenceY + 13 > frame.bottom ? referenceY - 5 : referenceY + 13}
            fontSize={labelSize}
            className="fill-text-muted font-label uppercase tracking-tag"
          >
            {statusLabels.optimal}
          </text>
        </>
      )}
      <polygon points={area} className="fill-accent/14" />
      {points.map((point) => (
        <line
          key={`drop-${point.date}`}
          x1={point.x}
          x2={point.x}
          y1={point.y}
          y2={frame.bottom}
          className="stroke-accent/35"
        />
      ))}
      <polyline
        points={line}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="fill-none stroke-accent"
      />
      {points.map((point) => (
        <g key={point.date}>
          {point === latest ? (
            <>
              <circle cx={point.x} cy={point.y} r="13" className={tone.outer} />
              <circle cx={point.x} cy={point.y} r="8.5" className={tone.inner} />
              <circle
                cx={point.x}
                cy={point.y}
                r="4.5"
                strokeWidth="2"
                className={cn('stroke-card', tone.dot)}
              />
            </>
          ) : (
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              strokeWidth="2"
              className="fill-card stroke-accent"
            />
          )}
          <text
            x={point.x}
            y={frame.height - 4}
            textAnchor="middle"
            fontSize={labelSize}
            className="fill-text-muted font-label tracking-tag"
          >
            {point.date}
          </text>
        </g>
      ))}
    </svg>
  );
}
