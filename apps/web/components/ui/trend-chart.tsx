import { type Biomarker, formatValue, type Status } from '../../content/sample-results';
import { cn } from '../../lib/cn';

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
  good: { outer: 'fill-status-good/14', inner: 'fill-status-good/26', dot: 'fill-status-good' },
  warn: { outer: 'fill-status-warn/14', inner: 'fill-status-warn/26', dot: 'fill-status-warn' },
  flag: { outer: 'fill-status-flag/14', inner: 'fill-status-flag/26', dot: 'fill-status-flag' },
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

export function TrendChart({
  biomarker,
  variant = 'default',
  className,
}: {
  biomarker: Biomarker;
  variant?: TrendChartVariant;
  className?: string;
}) {
  const { history, reference, status, unit, name } = biomarker;
  const toY = yScale([...history.map((point) => point.value), reference.value]);
  const step = (frame.right - frame.left) / Math.max(history.length - 1, 1);
  const points = history.map((point, index) => ({
    ...point,
    x: frame.left + index * step,
    y: toY(point.value),
  }));
  const latest = points.at(-1);
  const referenceY = toY(reference.value);
  // the reference label sits under its line unless that would push it off the chart
  const labelY = referenceY + 13 > frame.bottom ? referenceY - 5 : referenceY + 13;
  const line = points.map((point) => `${point.x},${point.y}`).join(' ');
  const area = `${frame.left},${frame.bottom} ${line} ${latest?.x ?? frame.right},${frame.bottom}`;
  const description = `${name} across ${history.length} tests: ${history
    .map((point) => `${point.date} ${formatValue(biomarker, point.value)} ${unit}`)
    .join(', ')}. ${reference.label} is ${formatValue(biomarker, reference.value)} ${unit}.`;
  const tone = latestTones[status];

  return (
    <svg
      viewBox={`0 0 ${frame.width} ${frame.height}`}
      role="img"
      aria-label={description}
      className={cn(variants[variant], className)}
    >
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
        y={labelY}
        fontSize={labelSize}
        className="fill-status-good font-label uppercase tracking-tag"
      >
        {reference.label}
      </text>
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
                className={cn('stroke-page', tone.dot)}
              />
            </>
          ) : (
            <circle
              cx={point.x}
              cy={point.y}
              r="4"
              strokeWidth="2"
              className="fill-page stroke-accent"
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
