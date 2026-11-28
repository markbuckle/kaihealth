import { cn } from '../../lib/cn';

// Each wave is drawn in the frame of the artwork it follows, so it scales and crops with it.
// The hero wave uses the ribbon camera's frame: the swirl artboard, 1440 wide, y from 100 to 660.
// Its curve stays below every band and line of the ribbon, allowing for the 3D perspective and
// the drift motion, but runs on its own rhythm so it never simply traces it. It sits as close as
// the drift allows: about 17 units under the ribbon at its nearest, 27 under the purple band.
// The hero's bottom edge sits at y 613.6 in this frame (set by the 91.71% lift in hero.tsx), and
// the curve is split where it crosses that edge:
// `carve` paints the next section's colour from the curve down to the hero's edge, so the hero's
// own background, glows included, ends in the wave;
// `tail` continues the hero's colour past its edge where the curve dips deeper, at the far left.
// Both overlap the edge by 2 units so no hairline shows.
const artwork = {
  hero: {
    viewBox: '0 100 1440 560',
    carve:
      'M149.4 613.6C175.2 603.6 202.1 594.1 230 586C318.3 560.3 440 527 530 524C620 521 693.3 557.5 770 568C846.7 578.5 915 591.3 990 587C1065 582.7 1145 559.8 1220 542C1295 524.2 1383.3 493 1440 480V615.6H149.4Z',
    tail: 'M0 611.6L0 678C43.3 659.5 93.7 635.3 149.4 613.6V611.6Z',
  },
} as const;

export type WaveVariant = keyof typeof artwork;

// Placed over the bottom edge of the section above, it turns that edge into the wave.
export function Wave({ variant, className }: { variant: WaveVariant; className?: string }) {
  const { viewBox, carve, tail } = artwork[variant];
  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden="true"
      className={cn('pointer-events-none block overflow-visible', className)}
    >
      <path d={carve} className="fill-page" />
      <path d={tail} data-theme="dark" className="fill-page" />
    </svg>
  );
}
