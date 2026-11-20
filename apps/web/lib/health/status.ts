import type { Direction, Interpretation, ReferenceRange, Status } from './types';

export const statusLabels: Record<Status, string> = {
  optimal: 'Optimal',
  'in-range': 'In range',
  borderline: 'Borderline',
  'out-of-range': 'Out of range',
};

const directionLabels: Record<Direction, string> = { high: 'High', low: 'Low' };

// "Borderline · High", or just the status when the result does not lean either way
export function describeStatus(status: Status, direction?: Direction): string {
  return direction
    ? `${statusLabels[status]} · ${directionLabels[direction]}`
    : statusLabels[status];
}

// Builds a reference range from its statuses, low to high, and the values where one zone
// ends and the next begins. Bad input fails when the module loads, not on screen.
export function zones(order: readonly Status[], boundaries: readonly number[]): ReferenceRange[] {
  if (order.length !== boundaries.length + 1) {
    throw new Error('A reference range needs one more status than it has boundaries.');
  }
  return order.map((status, index) => ({
    status,
    low: boundaries[index - 1],
    high: boundaries[index],
  }));
}

// The status of a value is the status of the zone it falls in. Borderline and out-of-range
// results also say which side of the optimal zone they sit on.
export function interpret(value: number, range: readonly ReferenceRange[]): Interpretation {
  const index = range.findIndex(
    (zone) =>
      (zone.low === undefined || value >= zone.low) &&
      (zone.high === undefined || value < zone.high),
  );
  const zone = range[index];
  if (!zone) throw new Error(`No reference range zone holds the value ${value}.`);
  if (zone.status === 'optimal' || zone.status === 'in-range') {
    return { status: zone.status, code: 'N' };
  }
  const optimalIndex = range.findIndex((candidate) => candidate.status === 'optimal');
  const direction: Direction = index > optimalIndex ? 'high' : 'low';
  return { status: zone.status, direction, code: direction === 'high' ? 'H' : 'L' };
}
