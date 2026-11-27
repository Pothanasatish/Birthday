import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotionPreference } from '../hooks/useReducedMotionPreference';

interface Particle {
  id: number;
  left: string;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  kind: 'petal' | 'star' | 'heart';
}

export const AmbientBackground: React.FC<{ dimmed?: boolean }> = ({ dimmed = false }) => {
  const reducedMotion = useReducedMotionPreference();

  const particles = useMemo<Particle[]>(() => {
    const items: Particle[] = [];
    for (let i = 0; i < 20; i += 1) {
      const kind: Particle['kind'] = i % 3 === 0 ? 'petal' : i % 3 === 1 ? 'star' : 'heart';
      items.push({
        id: i,
        left: `${(i * 5.1 + 3) % 96}%`,
        size: kind === 'star' ? 8 + (i % 4) * 3 : 11 + (i % 4) * 4,
        duration: 11 + (i % 6) * 2.5,
        delay: (i % 7) * 1.1,
        drift: (i % 2 === 0 ? 1 : -1) * (14 + (i % 4) * 8),
        kind,
      });
    }
    return items;
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden transition-colors duration-700"
    >
      <div
        className={`absolute inset-0 transition-opacity duration-700 ${
          dimmed ? 'bg-[#3C2231]/90 opacity-100' : 'wonder-gradient opacity-100'
        }`}
      />

      {/* Soft ambient light orbs */}
      <div
        className={`absolute -top-24 -left-24 h-80 w-80 rounded-full blur-3xl transition-opacity duration-700 ${
          dimmed ? 'bg-[#D86B91]/25' : 'bg-white/55'
        }`}
      />
      <div
        className={`absolute top-1/3 -right-24 h-96 w-96 rounded-full blur-3xl transition-opacity duration-700 ${
          dimmed ? 'bg-[#E8D9FF]/20' : 'bg-[#E8D9FF]/45'
        }`}
      />
      <div
        className={`absolute -bottom-24 left-1/3 h-80 w-80 rounded-full blur-3xl transition-opacity duration-700 ${
          dimmed ? 'bg-[#F8BBD0]/15' : 'bg-[#F8BBD0]/50'
        }`}
      />

      {!reducedMotion &&
        particles.map((p) => {
          if (p.kind === 'star') {
            return (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-white/85 shadow-[0_0_10px_rgba(255,255,255,0.9)]"
                style={{
                  left: p.left,
                  top: `${(p.id * 11 + 8) % 88}%`,
                  width: p.size,
                  height: p.size,
                }}
                animate={{
                  opacity: [0.2, 0.9, 0.2],
                  scale: [0.8, 1.25, 0.8],
                }}
                transition={{
                  duration: 3 + (p.id % 4),
                  repeat: Infinity,
                  delay: p.delay * 0.5,
                  ease: 'easeInOut',
                }}
              />
            );
          }

          if (p.kind === 'petal') {
            return (
              <motion.div
                key={p.id}
                className="absolute -top-8 rounded-tl-[70%] rounded-tr-[20%] rounded-br-[70%] rounded-bl-[20%] bg-gradient-to-br from-[#F8BBD0]/85 to-[#EFA1B8]/70"
                style={{
                  left: p.left,
                  width: p.size,
                  height: p.size * 1.25,
                }}
                animate={{
                  y: ['0vh', '110vh'],
                  x: [0, p.drift, -p.drift * 0.5, p.drift * 0.4],
                  rotate: [0, 140, 280, 360],
                  opacity: [0, 0.75, 0.75, 0],
                }}
                transition={{
                  duration: p.duration,
                  repeat: Infinity,
                  delay: p.delay,
                  ease: 'linear',
                }}
              />
            );
          }

          return (
            <motion.svg
              key={p.id}
              viewBox="0 0 24 24"
              className="absolute -bottom-8 text-[#EFA1B8]/55"
              style={{
                left: p.left,
                width: p.size + 4,
                height: p.size + 4,
              }}
              fill="currentColor"
              animate={{
                y: ['0vh', '-112vh'],
                x: [0, p.drift * 0.6, -p.drift * 0.4],
                opacity: [0, 0.65, 0.65, 0],
              }}
              transition={{
                duration: p.duration + 2,
                repeat: Infinity,
                delay: p.delay,
                ease: 'linear',
              }}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </motion.svg>
          );
        })}
    </div>
  );
};
