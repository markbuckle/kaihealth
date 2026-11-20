import { demoClinicianNote } from '../content/demo/clinician-note';
import { showcaseSeries } from '../content/demo/showcase';
import { dashboardPreview, hero } from '../content/landing';
import { BiomarkerCard } from './ui/biomarker-card';
import { Card } from './ui/card';
import { Eyebrow } from './ui/eyebrow';
import { Placeholder } from './ui/placeholder';
import { Section, SectionHeading } from './ui/section';

const sampleLabel = hero.dashboard.sampleLabel;

export function DashboardPreview() {
  return (
    <Section variant="surface" labelledBy="dashboard-preview-title">
      <SectionHeading
        id="dashboard-preview-title"
        variant="wide"
        title={dashboardPreview.title}
        lead={dashboardPreview.lead}
      />
      <div className="mt-12 grid items-start gap-6 md:grid-cols-2 lg:mt-16 lg:grid-cols-3">
        {showcaseSeries.map((series) => (
          <BiomarkerCard key={series.biomarker.id} series={series} sampleLabel={sampleLabel} />
        ))}
      </div>
      <Card className="mt-6 flex flex-col gap-5 px-6 py-7 sm:flex-row sm:items-center sm:gap-6 lg:mt-16 lg:px-8">
        <Placeholder className="size-18" />
        <div className="flex flex-col gap-1.5">
          <Eyebrow>{`${dashboardPreview.noteLabel} · ${sampleLabel}`}</Eyebrow>
          <p className="text-17">{demoClinicianNote.body}</p>
        </div>
      </Card>
    </Section>
  );
}
