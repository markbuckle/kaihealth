import { howItWorks } from '../content/landing';
import { cn } from '../lib/cn';
import { sectionIds } from '../lib/config';
import { Card } from './ui/card';
import { Icon } from './ui/icon';
import { Section, SectionHeading } from './ui/section';

type Illustration = (typeof howItWorks.steps)[number]['illustration'];

export function HowItWorks() {
  return (
    <Section id={sectionIds.howItWorks} labelledBy="how-it-works-title">
      <SectionHeading
        id="how-it-works-title"
        eyebrow={howItWorks.eyebrow}
        title={howItWorks.title}
      />
      <ol className="mt-12 grid gap-12 lg:mt-18 lg:grid-cols-3 lg:gap-10">
        {howItWorks.steps.map((step) => (
          <li key={step.number} className="flex flex-col gap-5">
            <div className="flex items-center gap-4">
              <span
                aria-hidden="true"
                className="flex size-14 shrink-0 items-center justify-center rounded-round border border-accent font-label text-15"
              >
                {step.number}
              </span>
              <span aria-hidden="true" className="h-px flex-1 bg-border" />
            </div>
            <Card variant="tile" className="flex h-44 items-center justify-center overflow-hidden">
              <StepIllustration kind={step.illustration} />
            </Card>
            <h3 className="font-heading text-36 leading-display tracking-display">{step.title}</h3>
            <p className="text-pretty text-16 text-text-muted">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

function StepIllustration({ kind }: { kind: Illustration }) {
  if (kind === 'schedule') return <ScheduleIllustration />;
  if (kind === 'results') return <ResultsIllustration />;
  return <PlanIllustration />;
}

function ScheduleIllustration() {
  const { days, selectedDay, times, selectedTime } = howItWorks.schedule;
  return (
    <div aria-hidden="true" className="flex flex-col items-center gap-3">
      <div className="flex gap-2">
        {days.map((day) => {
          const selected = day.day === selectedDay;
          return (
            <div
              key={day.day}
              className={cn(
                'flex h-15.5 w-13 flex-col items-center justify-center gap-1 rounded-inset border',
                selected ? 'border-button bg-button text-button-text' : 'border-border',
              )}
            >
              <span
                className={cn(
                  'font-label text-10 uppercase tracking-tag',
                  selected ? 'text-button-text' : 'text-text-muted',
                )}
              >
                {day.day}
              </span>
              <span className="font-label text-18 leading-flat">{day.date}</span>
            </div>
          );
        })}
      </div>
      <div className="flex gap-2">
        {times.map((time) => (
          <span
            key={time}
            className={cn(
              'flex h-7.5 w-15.5 items-center justify-center rounded-pill border font-label text-12',
              time === selectedTime ? 'border-text' : 'border-border',
            )}
          >
            {time}
          </span>
        ))}
      </div>
    </div>
  );
}

// one-off: marker position inside the results illustration
const resultsMarker = 'left-[58%]';

function ResultsIllustration() {
  return (
    <div aria-hidden="true" className="flex w-65 flex-col gap-3.5">
      <svg viewBox="0 0 260 72" aria-hidden="true" className="block h-auto w-full overflow-visible">
        <polygon points="12,72 12,54 90,40 170,45 248,16 248,72" className="fill-accent/14" />
        <polyline
          points="12,54 90,40 170,45 248,16"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="fill-none stroke-accent"
        />
        {[
          [12, 54],
          [90, 40],
          [170, 45],
        ].map(([cx, cy]) => (
          <circle
            key={`${cx}-${cy}`}
            cx={cx}
            cy={cy}
            r="4"
            strokeWidth="2"
            className="fill-page stroke-accent"
          />
        ))}
        <circle cx="248" cy="16" r="11" className="fill-accent/22" />
        <circle cx="248" cy="16" r="4.5" strokeWidth="2" className="fill-accent stroke-page" />
      </svg>
      <div className="relative flex h-4 items-center gap-1">
        <span className="h-1.5 flex-1 rounded-pill bg-text/14" />
        <span className="h-1.5 flex-2 rounded-pill bg-text/30" />
        <span className="h-1.5 flex-1 rounded-pill bg-text/14" />
        <span
          className={cn(
            'absolute top-px size-3.5 rounded-round border-3 border-page bg-accent',
            resultsMarker,
          )}
        />
      </div>
    </div>
  );
}

// one-off: placeholder bar widths inside the plan illustration
const planBarWidths = ['w-33', 'w-24', 'w-29'];

function PlanIllustration() {
  return (
    <ul aria-hidden="true" className="flex w-65 flex-col gap-2">
      {howItWorks.plan.map((item, index) => (
        <li
          key={item}
          className="flex items-center gap-3 rounded-inset border border-border px-3 py-2.5"
        >
          <span className="flex size-7 items-center justify-center rounded-xs border border-border text-accent">
            <Icon name="check" className="size-4" />
          </span>
          <span className="flex flex-col gap-1.5">
            <span className="font-medium text-13 leading-flat">{item}</span>
            <span className={cn('block h-1.5 rounded-pill bg-text/14', planBarWidths[index])} />
          </span>
        </li>
      ))}
    </ul>
  );
}
