import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Heart, Sparkles } from 'lucide-react';
import { useSound } from '../../hooks/useSound';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface InvitationProps {
  onComplete: () => void;
}

export const Invitation: React.FC<InvitationProps> = ({ onComplete }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { playUnlock, playClick } = useSound();
  const reducedMotion = useReducedMotionPreference();

  const handleOpen = () => {
    if (isOpened) return;
    playClick();
    playUnlock();
    setIsOpened(true);
    window.setTimeout(() => {
      onComplete();
    }, reducedMotion ? 700 : 1850);
  };

  return (
    <section
      aria-label="Chapter One: The Secret Invitation"
      className="relative z-10 flex min-h-[calc(100vh-5rem)] w-full flex-col items-center justify-center px-4 py-8"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65 }}
        className="glass-card relative w-full max-w-xl rounded-3xl px-6 py-10 text-center sm:px-10 sm:py-12"
      >
        <p className="font-handwritten mb-2 text-xl text-[#D86B91]">Chapter One</p>

        {/* 3D Envelope with Pink Heart Seal */}
        <div className="perspective-1000 relative mx-auto my-6 h-48 w-72 sm:h-52 sm:w-80">
          {/* Rising hearts on open */}
          <AnimatePresence>
            {isOpened && !reducedMotion && (
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -top-6 z-30 flex justify-center">
                {[-48, -22, 0, 24, 50].map((offset, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ y: 30, x: offset * 0.4, opacity: 0, scale: 0.5 }}
                    animate={{ y: -95 - idx * 10, x: offset, opacity: [0, 1, 0], scale: [0.6, 1.15, 0.8] }}
                    transition={{ duration: 1.35, delay: idx * 0.09, ease: 'easeOut' }}
                    className="absolute text-[#D86B91]"
                  >
                    <Heart className="h-5 w-5 fill-[#F8BBD0]" />
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {/* Envelope Back */}
          <div className="relative h-full w-full rounded-2xl bg-gradient-to-br from-[#F8BBD0] to-[#EFA1B8] shadow-[0_18px_40px_rgba(216,107,145,0.28)]">
            {/* Rising Letter Inside */}
            <motion.div
              animate={isOpened ? { y: -56, scale: 1.02 } : { y: 8, scale: 0.96 }}
              transition={{ duration: 0.75, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-x-4 top-3 bottom-4 z-10 flex flex-col items-center justify-center rounded-xl border border-[#F8BBD0]/60 bg-white px-4 py-3 shadow-md"
            >
              <p className={`font-handwritten text-xl text-[#D86B91] transition-opacity duration-300 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
                Welcome to your wonderland ♡
              </p>
              <p className={`mt-1 text-xs text-[#7D5A6B] transition-opacity duration-300 ${isOpened ? 'opacity-100' : 'opacity-0'}`}>
                A thousand smiles await inside...
              </p>
            </motion.div>

            {/* Envelope Bottom/Side Flaps */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 overflow-hidden rounded-2xl"
            >
              <div
                className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-[#EFA1B8] to-[#F8BBD0]"
                style={{ clipPath: 'polygon(0 100%, 50% 18%, 100% 100%)' }}
              />
              <div
                className="absolute inset-y-0 left-0 w-1/2 bg-[#F8BBD0]/85"
                style={{ clipPath: 'polygon(0 0, 100% 52%, 0 100%)' }}
              />
              <div
                className="absolute inset-y-0 right-0 w-1/2 bg-[#F8BBD0]/85"
                style={{ clipPath: 'polygon(100% 0, 0 52%, 100% 100%)' }}
              />
            </div>

            {/* Top Flap */}
            <motion.div
              aria-hidden="true"
              animate={isOpened ? { rotateX: 175 } : { rotateX: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              style={{ transformOrigin: 'top center' }}
              className="pointer-events-none absolute inset-x-0 top-0 z-30 h-28"
            >
              <div
                className="h-full w-full rounded-t-2xl bg-gradient-to-b from-[#FCE4EC] to-[#F8BBD0] shadow-sm"
                style={{ clipPath: 'polygon(0 0, 100% 0, 50% 95%)' }}
              />
            </motion.div>

            {/* Pink Heart Wax Seal */}
            <motion.div
              aria-hidden="true"
              animate={isOpened ? { scale: 0, opacity: 0 } : { scale: 1, opacity: 1 }}
              transition={{ duration: 0.35 }}
              className="absolute top-[46%] left-1/2 z-40 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gradient-to-br from-[#EFA1B8] to-[#D86B91] text-white shadow-[0_6px_16px_rgba(216,107,145,0.45)] ring-4 ring-white/75"
            >
              <Heart className="h-5 w-5 fill-white" />
            </motion.div>
          </div>
        </div>

        {/* Invitation Copy */}
        <h1 className="font-display mt-4 text-3xl font-bold text-[#593D4B] sm:text-4xl">
          Hey, you! ♡
        </h1>
        <p className="mt-3 text-base leading-relaxed text-[#6E4D5D] sm:text-lg">
          Someone has created a little world full of surprises.
        </p>
        <p className="mt-1 text-sm font-medium text-[#8C6175] sm:text-base">
          Would you like to explore it?
        </p>

        <motion.button
          type="button"
          onClick={handleOpen}
          disabled={isOpened}
          whileHover={reducedMotion ? undefined : { scale: 1.03 }}
          whileTap={reducedMotion ? undefined : { scale: 0.97 }}
          className="mt-7 inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-[#EFA1B8] via-[#D86B91] to-[#EFA1B8] px-8 py-3.5 text-sm font-semibold tracking-wider text-white shadow-[0_10px_28px_rgba(216,107,145,0.35)] transition hover:brightness-105 disabled:opacity-80"
        >
          <Sparkles className="h-4 w-4" />
          <span>{isOpened ? 'OPENING YOUR WORLD...' : 'OPEN YOUR LITTLE WORLD'}</span>
        </motion.button>
      </motion.div>
    </section>
  );
};
