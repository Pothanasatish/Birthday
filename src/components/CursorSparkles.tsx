import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

interface SparklePoint {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

const SPARKLE_COLORS = ['#D86B91', '#F8BBD0', '#E8D9FF', '#FFFFFF'];

export const CursorSparkles: React.FC = () => {
  const reducedMotion = useReducedMotionPreference();
  const [sparkles, setSparkles] = useState<SparklePoint[]>([]);
  const lastSpawnRef = useRef(0);
  const nextIdRef = useRef(1);

  useEffect(() => {
    if (reducedMotion || typeof window === 'undefined' || !window.matchMedia) return;
    const isFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!isFinePointer) return;

    const handleMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const now = performance.now();
      if (now - lastSpawnRef.current < 48) return;
      lastSpawnRef.current = now;

      const id = nextIdRef.current++;
      const color = SPARKLE_COLORS[id % SPARKLE_COLORS.length];
      const size = 6 + (id % 4) * 2;
      setSparkles((prev) => [...prev.slice(-14), { id, x: e.clientX, y: e.clientY, size, color }]);

      window.setTimeout(() => {
        setSparkles((prev) => prev.filter((item) => item.id !== id));
      }, 520);
    };

    window.addEventListener('pointermove', handleMove, { passive: true });
    return () => window.removeEventListener('pointermove', handleMove);
  }, [reducedMotion]);

  if (reducedMotion || sparkles.length === 0) return null;

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-500 ease-out"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            backgroundColor: s.color,
            boxShadow: `0 0 10px ${s.color}`,
            opacity: 0.75,
          }}
        />
      ))}
    </div>
  );
};
