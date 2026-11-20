'use client';

import { useEffect, useRef, useState } from 'react';

// Reads the variable's computed value where it is rendered, so a token inside a
// data-theme="dark" block shows its dark value.
export function TokenValue({ name }: { name: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    if (ref.current) setValue(getComputedStyle(ref.current).getPropertyValue(name).trim());
  }, [name]);

  return (
    <span ref={ref} className="break-all font-label text-11 text-text-muted">
      {value || ' '}
    </span>
  );
}
