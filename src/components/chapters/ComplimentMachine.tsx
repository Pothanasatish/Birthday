import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Heart, Sparkles, Wand2 } from 'lucide-react';
import { COMPLIMENTS } from '../../data/wonderlandData';
import { useSound } from '../../hooks/useSound';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface ComplimentMachineProps {
  onComplete: (stars: number) => void;
}

export const ComplimentMachine: React.FC<ComplimentMachineProps> = ({ onComplete }) => {
  const [currentIndex, setCurrentIndex] = useState<number | null>(null);
  const [collectedCount, setCollectedCount] = useState(0);
  const [sparkleBurstKey, setSparkleBurstKey] = useState(0);
  const { playSparkle, playClick } = useSound();
  const reducedMotion = useReducedMotionPreference();

  const handleGenerate = () => {
    playSparkle();
    let nextIdx = Math.floor(Math.random() * COMPLIMENTS.length);
    if (COMPLIMENTS.length > 1 && nextIdx === currentIndex) {
      nextIdx = (nextIdx + 1 + Math.floor(Math.random() * (COMPLIMENTS.length - 1))) % COMPLIMENTS.length;
    }
    setCurrentIndex(nextIdx);
    setCollectedCount((c) => c + 1);
    setSparkleBurstKey((k) => k + 1);
  };

  const earnedStars = collectedCount >= 5 ? 3 : collectedCount >= 2 ? 2 : 1;

  return (
    <section
      aria-label="Chapter Six: The Compliment Machine"
      className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-2xl flex-col items-center justify-center px-4 py-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
        className="glass-card relative w-full overflow-hidden rounded-3xl p-6 text-center sm:p-10"
      >
        <p className="font-handwritten text-xl text-[#D86B91]">Chapter Six</p>
        <h1 className="font-display mt-1 text-3xl font-bold text-[#593D4B] sm:text-4xl">
          A Little Happiness Machine
        </h1>
        <p className="mt-2 text-sm text-[#7D5A6B] sm:text-base">
          Press the button and collect a little positivity.
        </p>

        {/* Magical Pink Machine Display */}
        <div className="relative mt-7 rounded-3xl border-2 border-[#F8BBD0] bg-gradient-to-b from-[#FFF0F5] to-white p-6 shadow-inner sm:p-8">
          {/* Decorative Machine Lights */}
          <div aria-hidden="true" className="mb-4 flex items-center justify-center gap-2">
            {[0, 1, 2, 3, 4].map((dot) => (
              <span
                key={dot}
                className={`h-2.5 w-2.5 rounded-full ${
                  dot % 2 === 0 ? 'bg-[#F8BBD0]' : 'bg-[#E8D9FF]'
                }`}
              />
            ))}
          </div>

          {/* Sparkle Burst */}
          <AnimatePresence>
            {sparkleBurstKey > 0 && !reducedMotion && (
              <motion.div
                key={sparkleBurstKey}
                aria-hidden="true"
                initial={{ opacity: 1, scale: 0.7 }}
                animate={{ opacity: 0, scale: 1.4 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
                className="pointer-events-none absolute inset-0 flex items-center justify-center"
              >
                <Sparkles className="h-16 w-16 text-[#EFA1B8]" />
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex min-h-[110px] items-center justify-center">
            <AnimatePresence mode="wait">
              {currentIndex !== null ? (
                <motion.p
                  key={`${currentIndex}-${collectedCount}`}
                  initial={{ opacity: 0, y: 12, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.35 }}
                  className="font-display text-2xl font-semibold leading-snug text-[#593D4B] sm:text-3xl"
                >
                  “{COMPLIMENTS[currentIndex]}”
                </motion.p>
              ) : (
                <motion.p
                  key="idle"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-sm text-[#9B6E82] sm:text-base"
                >
                  Your first sparkle of positivity is waiting inside... ♡
                </motion.p>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Action Button */}
        <motion.button
          type="button"
          onClick={handleGenerate}
          whileHover={reducedMotion ? undefined : { scale: 1.03 }}
          whileTap={reducedMotion ? undefined : { scale: 0.96 }}
          className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#EFA1B8] via-[#D86B91] to-[#EFA1B8] px-8 py-4 text-sm font-semibold tracking-wider text-white shadow-[0_12px_28px_rgba(216,107,145,0.35)] transition hover:brightness-105"
        >
          <Wand2 className="h-4 w-4" />
          <span>MAKE SOME MAGIC</span>
        </motion.button>

        <div className="mt-4 flex items-center justify-center gap-1.5 text-xs font-medium text-[#8C6175]">
          <Heart className="h-3.5 w-3.5 fill-[#F8BBD0] text-[#D86B91]" />
          <span>{collectedCount} positivity notes collected</span>
        </div>
      </motion.div>

      <button
        type="button"
        onClick={() => {
          playClick();
          onComplete(earnedStars);
        }}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-[#F8BBD0] bg-white/85 px-7 py-3 text-sm font-semibold text-[#593D4B] shadow-sm transition hover:bg-[#FFF0F5]"
      >
        <span>Continue to Chapter Seven</span>
        <ArrowRight className="h-4 w-4 text-[#D86B91]" />
      </button>
    </section>
  );
};
