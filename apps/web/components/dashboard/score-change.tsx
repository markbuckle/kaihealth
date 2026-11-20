import { home } from '../../content/dashboard';

// "↑ 6 since April". The arrow is spelled out for screen readers.
export function ScoreChange({
  current,
  previous,
  since,
}: {
  current: number;
  previous: number | undefined;
  since: string | undefined;
}) {
  if (previous === undefined || since === undefined) return null;
  const change = current - previous;
  if (change === 0) return <>{home.change.none(since)}</>;
  const up = change > 0;
  return (
    <>
      <span aria-hidden="true">{up ? '↑' : '↓'} </span>
      <span className="sr-only">{up ? home.change.up : home.change.down} </span>
      {Math.abs(change)} {home.change.since(since)}
    </>
  );
}
