import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Star } from 'lucide-react';
import { WONDER_OBJECTS, WonderObject } from '../../data/wonderlandData';
import { useSound } from '../../hooks/useSound';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface WonderWorldProps {
  onComplete: (stars: number) => void;
}

const WonderIllustration: React.FC<{ kind: WonderObject['kind'] }> = ({ kind }) => {
  switch (kind) {
    case 'star':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14 drop-shadow-[0_4px_12px_rgba(255,215,130,0.6)]" aria-hidden="true">
          <path
            d="M32 6 L39.5 22.5 L57 24.5 L44 37 L47.5 54.5 L32 45.8 L16.5 54.5 L20 37 L7 24.5 L24.5 22.5 Z"
            fill="#FFF3B0"
            stroke="#D86B91"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          <circle cx="32" cy="32" r="5" fill="#FFFFFF" opacity="0.8" />
        </svg>
      );
    case 'flower':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14 drop-shadow-[0_4px_12px_rgba(216,107,145,0.3)]" aria-hidden="true">
          <path d="M32 34 V56" stroke="#8EB897" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M32 46 Q42 40 44 46 Q38 52 32 46 Z" fill="#A8D5B2" />
          {[0, 60, 120, 180, 240, 300].map((angle) => (
            <ellipse
              key={angle}
              cx="32"
              cy="19"
              rx="7"
              ry="11"
              fill="#F8BBD0"
              stroke="#D86B91"
              strokeWidth="1.5"
              transform={`rotate(${angle} 32 28)`}
            />
          ))}
          <circle cx="32" cy="28" r="6.5" fill="#FFF3B0" stroke="#D86B91" strokeWidth="1.5" />
        </svg>
      );
    case 'heart':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14 drop-shadow-[0_4px_12px_rgba(216,107,145,0.4)]" aria-hidden="true">
          <path
            d="M32 52 C32 52 10 38 10 22.5 C10 15.5 15.5 10.5 22 10.5 C26.4 10.5 30 12.9 32 16.4 C34 12.9 37.6 10.5 42 10.5 C48.5 10.5 54 15.5 54 22.5 C54 38 32 52 32 52 Z"
            fill="#EFA1B8"
            stroke="#FFFFFF"
            strokeWidth="2.5"
          />
          <path d="M20 20 C20 17.5 22 16 24.5 16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'butterfly':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14 drop-shadow-[0_4px_12px_rgba(232,217,255,0.7)]" aria-hidden="true">
          <ellipse cx="21" cy="24" rx="12" ry="9" transform="rotate(-20 21 24)" fill="#E8D9FF" stroke="#D86B91" strokeWidth="1.8" />
          <ellipse cx="43" cy="24" rx="12" ry="9" transform="rotate(20 43 24)" fill="#E8D9FF" stroke="#D86B91" strokeWidth="1.8" />
          <ellipse cx="23" cy="39" rx="9" ry="7" transform="rotate(15 23 39)" fill="#F8BBD0" stroke="#D86B91" strokeWidth="1.8" />
          <ellipse cx="41" cy="39" rx="9" ry="7" transform="rotate(-15 41 39)" fill="#F8BBD0" stroke="#D86B91" strokeWidth="1.8" />
          <rect x="30" y="18" width="4" height="28" rx="2" fill="#593D4B" />
          <path d="M31 18 Q26 11 23 13 M33 18 Q38 11 41 13" stroke="#593D4B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
        </svg>
      );
    case 'lantern':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14 drop-shadow-[0_4px_16px_rgba(255,220,150,0.7)]" aria-hidden="true">
          <path d="M24 16 C24 10 40 10 40 16" stroke="#D86B91" strokeWidth="2.5" fill="none" />
          <rect x="20" y="16" width="24" height="32" rx="10" fill="#FFF8E7" stroke="#D86B91" strokeWidth="2.2" />
          <circle cx="32" cy="32" r="7" fill="#FFE082" opacity="0.9" />
          <circle cx="32" cy="32" r="3" fill="#FFFFFF" />
          <rect x="24" y="48" width="16" height="4" rx="2" fill="#EFA1B8" />
        </svg>
      );
    case 'cloud':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14 drop-shadow-[0_4px_12px_rgba(255,255,255,0.85)]" aria-hidden="true">
          <path
            d="M18 44 H47 C52 44 55 40.5 55 36 C55 31.8 51.8 28.4 47.6 28 C46.4 21.5 40.8 17 34 17 C27.8 17 22.5 21 20.8 26.7 C15.2 27.2 11 31.7 11 37 C11 41 14.2 44 18 44 Z"
            fill="#FFFFFF"
            stroke="#EFA1B8"
            strokeWidth="2.2"
          />
          <circle cx="28" cy="33" r="1.6" fill="#593D4B" />
          <circle cx="38" cy="33" r="1.6" fill="#593D4B" />
          <path d="M31 36 Q33 38.5 35 36" stroke="#D86B91" strokeWidth="1.8" strokeLinecap="round" fill="none" />
        </svg>
      );
  }
};

export const WonderWorld: React.FC<WonderWorldProps> = ({ onComplete }) => {
  const [discoveredIds, setDiscoveredIds] = useState<string[]>([]);
  const [activeObject, setActiveObject] = useState<WonderObject | null>(null);
  const { playSparkle, playClick } = useSound();
  const reducedMotion = useReducedMotionPreference();

  const handleSelectObject = (obj: WonderObject) => {
    playSparkle();
    setActiveObject(obj);
    setDiscoveredIds((prev) => (prev.includes(obj.id) ? prev : [...prev, obj.id]));
  };

  const discoveredCount = discoveredIds.length;
  const totalCount = WONDER_OBJECTS.length;
  const earnedStars = discoveredCount >= totalCount ? 3 : discoveredCount >= 3 ? 2 : 1;

  return (
    <section
      aria-label="Chapter Two: The Magical Wonderland"
      className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-5xl flex-col items-center justify-center px-4 py-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full text-center"
      >
        <p className="font-handwritten text-xl text-[#D86B91]">Chapter Two · The Magical Wonderland</p>
        <h1 className="font-display mt-1 text-3xl font-bold text-[#593D4B] sm:text-4xl">
          A Pastel Fantasy Garden
        </h1>
        <p className="mt-2 text-sm text-[#7D5A6B] sm:text-base">
          Take your time... this little world has surprises.
        </p>

        {/* Discovery Pill */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#593D4B] shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-[#D86B91]" />
          <span>
            {discoveredCount} / {totalCount} surprises discovered
          </span>
        </div>
      </motion.div>

      {/* Interactive Garden Scene */}
      <div className="glass-card relative mt-6 w-full overflow-hidden rounded-3xl p-5 sm:p-8">
        {/* Decorative Pastel Hills & Magical Trees SVG Backdrop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-65">
          <svg viewBox="0 0 1200 180" preserveAspectRatio="none" className="h-full w-full">
            <path
              d="M0 110 Q240 40 520 105 T1200 85 L1200 180 L0 180 Z"
              fill="#F8BBD0"
              opacity="0.45"
            />
            <path
              d="M0 135 Q360 75 720 130 T1200 115 L1200 180 L0 180 Z"
              fill="#E8D9FF"
              opacity="0.55"
            />
          </svg>
        </div>

        {/* Clickable Interactive Objects Grid */}
        <div className="relative z-10 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
          {WONDER_OBJECTS.map((obj, idx) => {
            const isDiscovered = discoveredIds.includes(obj.id);
            const isActive = activeObject?.id === obj.id;
            return (
              <motion.button
                key={obj.id}
                type="button"
                onClick={() => handleSelectObject(obj)}
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        y: [0, -6, 0],
                      }
                }
                transition={{
                  duration: 3.4 + (idx % 3) * 0.6,
                  repeat: Infinity,
                  delay: idx * 0.25,
                  ease: 'easeInOut',
                }}
                whileHover={reducedMotion ? undefined : { scale: 1.05 }}
                whileTap={reducedMotion ? undefined : { scale: 0.96 }}
                aria-label={`Discover ${obj.label}`}
                className={`group relative flex flex-col items-center justify-center rounded-2xl border p-5 transition-all ${
                  isActive
                    ? 'border-[#D86B91] bg-white/95 shadow-[0_12px_30px_rgba(216,107,145,0.25)]'
                    : isDiscovered
                      ? 'border-[#F8BBD0] bg-white/80 shadow-sm hover:bg-white/95'
                      : 'border-white/90 bg-white/65 shadow-sm hover:border-[#F8BBD0] hover:bg-white/90'
                }`}
              >
                {isDiscovered && (
                  <span
                    aria-hidden="true"
                    className="absolute top-2.5 right-2.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#F8BBD0] text-[#593D4B]"
                  >
                    <Check className="h-3 w-3" />
                  </span>
                )}
                <WonderIllustration kind={obj.kind} />
                <span className="mt-3 text-sm font-semibold text-[#593D4B]">{obj.label}</span>
                <span className="mt-0.5 text-[11px] text-[#8C6175]">
                  {isDiscovered ? 'Discovered ♡' : 'Tap to reveal'}
                </span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Surprise Message Card */}
        <AnimatePresence mode="wait">
          {activeObject ? (
            <motion.div
              key={activeObject.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35 }}
              className="relative z-10 mt-6 rounded-2xl border border-[#F8BBD0] bg-white/90 px-5 py-4 text-center shadow-md"
            >
              <p className="font-handwritten text-lg text-[#D86B91]">{activeObject.title}</p>
              <p className="mt-1 font-display text-xl font-semibold text-[#593D4B] sm:text-2xl">
                “{activeObject.message}”
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="prompt"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative z-10 mt-6 rounded-2xl border border-dashed border-[#EFA1B8]/70 bg-white/55 px-5 py-4 text-center"
            >
              <p className="text-sm text-[#7D5A6B]">
                Tap any star, flower, heart, butterfly, light, or cloud to uncover its message.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Continue Button */}
      <div className="mt-6 flex flex-col items-center gap-2">
        <motion.button
          type="button"
          onClick={() => {
            playClick();
            onComplete(earnedStars);
          }}
          whileHover={reducedMotion ? undefined : { scale: 1.03 }}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EFA1B8] via-[#D86B91] to-[#EFA1B8] px-7 py-3.5 text-sm font-semibold tracking-wide text-white shadow-[0_10px_24px_rgba(216,107,145,0.32)] transition hover:brightness-105"
        >
          <span>Continue to Chapter Three</span>
          <ArrowRight className="h-4 w-4" />
        </motion.button>
        {discoveredCount < totalCount && (
          <p className="flex items-center gap-1 text-xs text-[#8C6175]">
            <Star className="h-3 w-3 fill-[#F8BBD0] text-[#D86B91]" />
            <span>Discover all {totalCount} objects to earn all 3 stars!</span>
          </p>
        )}
      </div>
    </section>
  );
};
