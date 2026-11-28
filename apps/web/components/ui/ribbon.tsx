'use client';

import type { Application } from '@splinetool/runtime';
import dynamic from 'next/dynamic';
import { useEffect, useRef, useState } from 'react';
import { cn } from '../../lib/cn';

// The runtime is large and needs the browser, so it loads after the page and never on the server
const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false });

// one-off: the ribbon colours are baked into the scene file as the swirl palette hex values,
// so a palette change also needs a re-export from Spline
const scenes = {
  hero: '/spline/hero-ribbon.splinecode',
  cta: '/spline/cta-ribbon.splinecode',
} as const;

export type RibbonVariant = keyof typeof scenes;

// The scene file is served from our own public folder, so no request goes to Spline's servers.
export function Ribbon({ variant, className }: { variant: RibbonVariant; className?: string }) {
  const frame = useRef<HTMLDivElement>(null);
  const [app, setApp] = useState<Application | null>(null);

  useEffect(() => {
    if (!app || !frame.current) return;
    return startDrift(app, frame.current);
  }, [app]);

  return (
    <div
      ref={frame}
      aria-hidden="true"
      className={cn(
        'pointer-events-none transition-opacity duration-(--duration-base) ease-standard motion-reduce:transition-none',
        app ? 'opacity-100' : 'opacity-0',
        className,
      )}
    >
      <Spline
        scene={scenes[variant]}
        htmlContentMode="none"
        onLoad={(loaded) => {
          // The scene keeps its editor background, so the page shows through only once it is cleared
          loaded.setBackgroundColor('transparent');
          setApp(loaded);
        }}
      />
    </div>
  );
}

// one-off: motion amplitudes and speeds were tuned by eye; rotations are in radians
const drift = { tilt: 0.05, fan: 0.006, rise: 3, phase: 0.55, lightSweep: 900, lightLift: 200 };

// Each band drifts on its own phase so the sheet ripples, and the key light sweeps slowly so the
// lightness shifts along the ribbon. It stays still for reduced motion and pauses off screen.
function startDrift(app: Application, element: HTMLElement): () => void {
  const bands = app
    .getAllObjects()
    .filter((object) => object.name.startsWith('Swirl '))
    .map((object) => ({
      object,
      tilt: object.rotation.x,
      fan: object.rotation.z,
      rise: object.position.y,
    }));
  const light = app.findObjectByName('Directional Light');
  const lightHome = light ? { x: light.position.x, y: light.position.y } : null;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let onScreen = false;
  let request = 0;

  const tick = (now: number) => {
    const t = now / 1000;
    bands.forEach((band, index) => {
      const phase = index * drift.phase;
      band.object.rotation.x = band.tilt + drift.tilt * Math.sin(t * 0.3 + phase * 0.7);
      band.object.rotation.z = band.fan + drift.fan * Math.sin(t * 0.45 + phase);
      band.object.position.y = band.rise + drift.rise * Math.sin(t * 0.6 + phase);
    });
    if (light && lightHome) {
      light.position.x = lightHome.x + drift.lightSweep * Math.sin(t * 0.15);
      light.position.y = lightHome.y + drift.lightLift * Math.cos(t * 0.2);
    }
    app.requestRender();
    request = requestAnimationFrame(tick);
  };

  const update = () => {
    cancelAnimationFrame(request);
    if (onScreen && !reducedMotion.matches) request = requestAnimationFrame(tick);
  };

  const observer = new IntersectionObserver(([entry]) => {
    onScreen = entry?.isIntersecting ?? false;
    update();
  });
  observer.observe(element);
  reducedMotion.addEventListener('change', update);

  return () => {
    cancelAnimationFrame(request);
    observer.disconnect();
    reducedMotion.removeEventListener('change', update);
  };
}
