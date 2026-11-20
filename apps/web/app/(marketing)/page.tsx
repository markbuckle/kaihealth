import { DashboardPreview } from '../../components/dashboard-preview';
import { Faq } from '../../components/faq';
import { FinalCta } from '../../components/final-cta';
import { Hero } from '../../components/hero';
import { HowItWorks } from '../../components/how-it-works';
import { Membership } from '../../components/membership';
import { Trust } from '../../components/trust';
import { WhatWeTest } from '../../components/what-we-test';

export default function HomePage() {
  return (
    <>
      <Hero />
      <HowItWorks />
      <DashboardPreview />
      <WhatWeTest />
      <Trust />
      <Membership />
      <Faq />
      <FinalCta />
    </>
  );
}
