import { cn } from '../../lib/cn';
import { swirlArtwork } from './swirl-paths';

// each path is filled from a swirl colour role, so changing the palette recolours the artwork
const fills = {
  1: 'fill-swirl-1',
  2: 'fill-swirl-2',
  3: 'fill-swirl-3',
  4: 'fill-swirl-4',
  5: 'fill-swirl-5',
  6: 'fill-swirl-6',
} as const;

export type SwirlVariant = keyof typeof swirlArtwork;

export function Swirl({ variant, className }: { variant: SwirlVariant; className?: string }) {
  const artwork = swirlArtwork[variant];
  return (
    <svg viewBox={artwork.viewBox} aria-hidden="true" className={cn('block h-auto', className)}>
      {artwork.paths.map((path) => (
        <path key={path.d} d={path.d} className={fills[path.swirl]} />
      ))}
    </svg>
  );
}
