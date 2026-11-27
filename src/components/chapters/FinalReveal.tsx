import React, { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Gift, RotateCcw, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { BIRTHDAY_MESSAGE_PARAGRAPHS } from '../../data/wonderlandData';
import { useSound } from '../../hooks/useSound';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import floralArchImg from '../../assets/floral-arch.jpg';

interface FinalRevealProps {
  onCompleteReveal: () => void;
  onReplay: () => void;
  onDimChange: (dimmed: boolean) => void;
}

const BALLOONS = [
  { left: '8%', color: '#F8BBD0', delay: 0, duration: 9 },
  { left: '22%', color: '#E8D9FF', delay: 1.4, duration: 10.5 },
  { left: '38%', color: '#EFA1B8', delay: 0.7, duration: 8.8 },
  { left: '64%', color: '#F8BBD0', delay: 1.9, duration: 10 },
  { left: '79%', color: '#E8D9FF', delay: 0.4, duration: 9.4 },
  { left: '91%', color: '#EFA1B8', delay: 1.1, duration: 11 },
];

export const FinalReveal: React.FC<FinalRevealProps> = ({
  onCompleteReveal,
  onReplay,
  onDimChange,
}) => {
  const [stage, setStage] = useState<'door' | 'opening' | 'celebration'>('door');
  const { isSoundOn, toggleSound, playCelebration, playClick } = useSound();
  const reducedMotion = useReducedMotionPreference();

  const launchConfetti = useCallback(() => {
    if (reducedMotion) return;
    const colors = ['#F8BBD0', '#EFA1B8', '#D86B91', '#E8D9FF', '#FFFFFF', '#FFD166'];
    void confetti({
      particleCount: 95,
      spread: 85,
      origin: { y: 0.6 },
      colors,
    });
    window.setTimeout(() => {
      void confetti({
        particleCount: 55,
        angle: 60,
        spread: 60,
        origin: { x: 0.1, y: 0.7 },
        colors,
      });
      void confetti({
        particleCount: 55,
        angle: 120,
        spread: 60,
        origin: { x: 0.9, y: 0.7 },
        colors,
      });
    }, 320);
  }, [reducedMotion]);

  useEffect(() => {
    return () => {
      onDimChange(false);
    };
  }, [onDimChange]);

  const handleOpenGift = () => {
    if (stage !== 'door') return;
    playClick();
    onDimChange(true);
    setStage('opening');

    window.setTimeout(() => {
      onDimChange(false);
      setStage('celebration');
      onCompleteReveal();
      playCelebration();
      launchConfetti();
    }, reducedMotion ? 400 : 1250);
  };

  return (
    <section
      aria-label="Chapter Eight: The Grand Birthday Reveal"
      className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-4xl flex-col items-center justify-center px-4 py-6"
    >
      <AnimatePresence mode="wait">
        {stage !== 'celebration' ? (
          <motion.div
            key="door-stage"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 1.06 }}
            transition={{ duration: 0.55 }}
            className="glass-card relative flex w-full max-w-lg flex-col items-center rounded-3xl px-6 py-10 text-center sm:px-10"
          >
            <p className="font-handwritten text-xl text-[#D86B91]">Chapter Eight</p>
            <h1 className="font-display mt-1 text-3xl font-bold text-[#593D4B] sm:text-4xl">
              One Last Surprise...
            </h1>

            {/* Glowing Pink Door */}
            <div className="perspective-1000 relative mx-auto my-8 h-64 w-44">
              {/* Warm golden-pink light behind the door */}
              <div className="animate-soft-glow absolute inset-0 rounded-t-full bg-gradient-to-b from-[#FFF3B0] via-[#F8BBD0] to-[#FFF0F5]" />

              {/* Door Frame */}
              <div className="relative h-full w-full overflow-hidden rounded-t-full border-4 border-white/90 bg-gradient-to-b from-[#FFF8FA] to-[#FCE4EC] shadow-inner">
                {/* Inner Light */}
                <motion.div
                  animate={stage === 'opening' ? { opacity: 1, scale: 1.15 } : { opacity: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-[#F8BBD0]/60 to-[#FFFDE7]"
                >
                  <Sparkles className="h-10 w-10 text-[#D86B91]" />
                </motion.div>

                {/* Animated Door Leaf */}
                <motion.div
                  animate={stage === 'opening' ? { rotateY: -105 } : { rotateY: 0 }}
                  transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
                  style={{ transformOrigin: 'left center' }}
                  className="relative z-10 flex h-full w-full flex-col items-center justify-center rounded-t-full bg-gradient-to-b from-[#F8BBD0] via-[#EFA1B8] to-[#D86B91] shadow-lg"
                >
                  <div className="h-24 w-20 rounded-t-full border-2 border-white/55 bg-white/15" />
                  <div className="absolute top-1/2 right-4 h-3.5 w-3.5 rounded-full bg-[#FFF3B0] shadow-sm" />
                </motion.div>
              </div>
            </div>

            <motion.button
              type="button"
              onClick={handleOpenGift}
              disabled={stage === 'opening'}
              whileHover={reducedMotion ? undefined : { scale: 1.04 }}
              whileTap={reducedMotion ? undefined : { scale: 0.97 }}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EFA1B8] via-[#D86B91] to-[#EFA1B8] px-8 py-4 text-sm font-semibold tracking-wider text-white shadow-[0_12px_30px_rgba(216,107,145,0.4)] transition hover:brightness-105 disabled:opacity-80"
            >
              <Gift className="h-4 w-4" />
              <span>{stage === 'opening' ? 'OPENING YOUR GIFT...' : 'OPEN THE FINAL GIFT'}</span>
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            key="celebration-stage"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="relative w-full"
          >
            {/* Floating Celebration Balloons */}
            {!reducedMotion && (
              <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
                {BALLOONS.map((b, idx) => (
                  <motion.div
                    key={idx}
                    style={{ left: b.left }}
                    initial={{ y: '105vh', opacity: 0.85 }}
                    animate={{ y: '-25vh', x: [0, 14, -14, 0] }}
                    transition={{
                      y: { duration: b.duration, repeat: Infinity, delay: b.delay, ease: 'linear' },
                      x: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    }}
                    className="absolute flex flex-col items-center"
                  >
                    <div
                      className="h-14 w-11 rounded-full border border-white/70 shadow-md"
                      style={{ backgroundColor: b.color }}
                    />
                    <div className="h-12 w-px bg-[#D86B91]/45" />
                  </motion.div>
                ))}
              </div>
            )}

            <div className="glass-card relative z-10 mx-auto w-full max-w-3xl rounded-3xl px-6 py-9 text-center sm:px-12 sm:py-12">
              <motion.h1
                initial={{ opacity: 0, y: -12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="font-display text-4xl font-bold tracking-tight text-[#D86B91] sm:text-5xl"
              >
                HAPPY BIRTHDAY! 💗
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="font-handwritten mt-2 text-2xl text-[#593D4B] sm:text-3xl"
              >
                Today is all about celebrating YOU.
              </motion.p>

              <div className="mt-7 space-y-4 rounded-2xl border border-[#F8BBD0]/80 bg-white/90 p-6 text-base leading-relaxed text-[#593D4B] shadow-inner sm:p-8 sm:text-lg">
                {BIRTHDAY_MESSAGE_PARAGRAPHS.map((line, idx) => (
                  <motion.p
                    key={idx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: reducedMotion ? 0.15 : 0.55,
                      delay: reducedMotion ? 0 : 0.35 + idx * 0.25,
                    }}
                    className={
                      idx === BIRTHDAY_MESSAGE_PARAGRAPHS.length - 1
                        ? 'font-display pt-2 text-2xl font-bold text-[#D86B91]'
                        : ''
                    }
                  >
                    {line}
                  </motion.p>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: reducedMotion ? 0.2 : 2.2 }}
                className="font-handwritten mt-6 text-xl text-[#8C6175]"
              >
                Made with a little extra magic, just for your special day.
              </motion.p>

              {/* Celebration Controls */}
              <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    launchConfetti();
                  }}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EFA1B8] via-[#D86B91] to-[#EFA1B8] px-6 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-105"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>Replay Confetti</span>
                </button>

                <button
                  type="button"
                  onClick={toggleSound}
                  className="inline-flex items-center gap-2 rounded-full border border-[#F8BBD0] bg-white px-5 py-3 text-sm font-semibold text-[#593D4B] shadow-sm transition hover:bg-[#FFF0F5]"
                >
                  {isSoundOn ? (
                    <>
                      <Volume2 className="h-4 w-4 text-[#D86B91]" />
                      <span>Sound On</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="h-4 w-4 text-[#D86B91]" />
                      <span>Sound Off</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    playClick();
                    confetti.reset();
                    onReplay();
                  }}
                  className="inline-flex items-center gap-2 rounded-full border border-[#F8BBD0] bg-white px-5 py-3 text-sm font-semibold text-[#593D4B] shadow-sm transition hover:bg-[#FFF0F5]"
                >
                  <RotateCcw className="h-4 w-4 text-[#D86B91]" />
                  <span>Replay Experience</span>
                </button>
              </div>
            </div>

            {/* Special Final Section at the Very End */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: reducedMotion ? 0.25 : 2.5 }}
              className="glass-card relative z-10 mx-auto mt-8 w-full max-w-3xl overflow-hidden rounded-3xl p-4 text-center sm:p-6"
            >
              <div className="relative overflow-hidden rounded-2xl border border-[#F8BBD0]/80 shadow-[0_14px_36px_rgba(216,107,145,0.22)]">
                <img
                  src={floralArchImg}
                  alt="Pink floral and balloon arch glowing with butterflies and candles"
                  className="h-auto w-full object-cover"
                  loading="lazy"
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#3C2231]/55 via-transparent to-transparent"
                />
              </div>

              <div className="px-3 pt-5 pb-2">
                <p className="font-handwritten text-3xl font-bold text-[#D86B91] sm:text-4xl">
                  Once again happy birthday ra pottoda...
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
