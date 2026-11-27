import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Heart, MailOpen } from 'lucide-react';
import { SECRET_LETTER_PARAGRAPHS } from '../../data/wonderlandData';
import { useSound } from '../../hooks/useSound';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface SecretLetterProps {
  onComplete: () => void;
}

export const SecretLetter: React.FC<SecretLetterProps> = ({ onComplete }) => {
  const [isOpened, setIsOpened] = useState(false);
  const { playUnlock, playClick } = useSound();
  const reducedMotion = useReducedMotionPreference();

  const handleOpenLetter = () => {
    if (isOpened) return;
    playUnlock();
    setIsOpened(true);
  };

  return (
    <section
      aria-label="Chapter Seven: The Secret Letter"
      className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-3xl flex-col items-center justify-center px-4 py-6"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="glass-card w-full rounded-3xl p-6 sm:p-10"
      >
        <div className="text-center">
          <p className="font-handwritten text-xl text-[#D86B91]">Chapter Seven</p>
          <h1 className="font-display mt-1 text-3xl font-bold text-[#593D4B] sm:text-4xl">
            Something From The Heart...
          </h1>
        </div>

        <AnimatePresence mode="wait">
          {!isOpened ? (
            <motion.div
              key="sealed"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              transition={{ duration: 0.35 }}
              className="mt-8 flex flex-col items-center text-center"
            >
              {/* Sealed Letter Illustration */}
              <div className="relative flex h-44 w-68 items-center justify-center rounded-2xl border-2 border-[#F8BBD0] bg-gradient-to-br from-[#FFF0F5] to-[#FCE4EC] shadow-[0_14px_32px_rgba(216,107,145,0.2)] sm:w-76">
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#F8BBD0]/75 to-transparent"
                  style={{ clipPath: 'polygon(0 0, 100% 0, 50% 90%)' }}
                />
                <motion.div
                  animate={reducedMotion ? undefined : { scale: [1, 1.07, 1] }}
                  transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#EFA1B8] to-[#D86B91] text-white shadow-lg ring-4 ring-white"
                >
                  <Heart className="h-6 w-6 fill-white" />
                </motion.div>
              </div>

              <button
                type="button"
                onClick={handleOpenLetter}
                className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EFA1B8] via-[#D86B91] to-[#EFA1B8] px-8 py-3.5 text-sm font-semibold tracking-wider text-white shadow-[0_10px_26px_rgba(216,107,145,0.34)] transition hover:brightness-105"
              >
                <MailOpen className="h-4 w-4" />
                <span>OPEN THE LITTLE LETTER</span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-7"
            >
              <div className="rounded-2xl border border-[#F8BBD0]/80 bg-white/92 p-6 shadow-inner sm:p-9">
                <div className="space-y-4 text-left text-base leading-relaxed text-[#593D4B] sm:text-lg">
                  {SECRET_LETTER_PARAGRAPHS.map((para, idx) => (
                    <motion.p
                      key={idx}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reducedMotion ? 0.15 : 0.5,
                        delay: reducedMotion ? 0 : idx * 0.28,
                      }}
                      className={
                        idx === 0 || idx === SECRET_LETTER_PARAGRAPHS.length - 1
                          ? 'font-handwritten whitespace-pre-line text-2xl text-[#D86B91]'
                          : ''
                      }
                    >
                      {para}
                    </motion.p>
                  ))}
                </div>
              </div>

              <div className="mt-7 flex justify-center">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    onComplete();
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EFA1B8] via-[#D86B91] to-[#EFA1B8] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:brightness-105"
                >
                  <span>Continue to the Final Chapter</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
