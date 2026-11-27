import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, Heart, Play, RotateCcw, Sparkles, Star } from 'lucide-react';
import { useSound } from '../../hooks/useSound';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface BubbleGameProps {
  onComplete: (stars: number) => void;
}

interface BubbleItem {
  id: number;
  x: number; // percentage 8..88
  size: number; // px
  duration: number;
  variant: 'pink' | 'lavender' | 'heart' | 'star';
  points: number;
}

const GAME_DURATION = 30;

export const BubbleGame: React.FC<BubbleGameProps> = ({ onComplete }) => {
  const [phase, setPhase] = useState<'ready' | 'playing' | 'finished'>('ready');
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [score, setScore] = useState(0);
  const [bubbles, setBubbles] = useState<BubbleItem[]>([]);
  const nextIdRef = useRef(1);

  const { playClick, playPop, playCelebration } = useSound();
  const reducedMotion = useReducedMotionPreference();

  const spawnBubble = useCallback(() => {
    const id = nextIdRef.current++;
    const roll = Math.random();
    let variant: BubbleItem['variant'] = 'pink';
    let points = 1;

    if (roll > 0.86) {
      variant = 'star';
      points = 3;
    } else if (roll > 0.7) {
      variant = 'heart';
      points = 2;
    } else if (roll > 0.36) {
      variant = 'lavender';
      points = 1;
    }

    const size = variant === 'star' || variant === 'heart' ? 56 : 46 + Math.floor(Math.random() * 26);
    const bubble: BubbleItem = {
      id,
      x: 8 + Math.random() * 78,
      size,
      duration: 3.4 + Math.random() * 2.1,
      variant,
      points,
    };

    setBubbles((prev) => [...prev.slice(-14), bubble]);
  }, []);

  const startGame = () => {
    playClick();
    setScore(0);
    setTimeLeft(GAME_DURATION);
    setBubbles([]);
    setPhase('playing');
  };

  useEffect(() => {
    if (phase !== 'playing') return;

    spawnBubble();
    const spawnInterval = window.setInterval(spawnBubble, 520);
    const countdownInterval = window.setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          window.clearInterval(spawnInterval);
          window.clearInterval(countdownInterval);
          setPhase('finished');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      window.clearInterval(spawnInterval);
      window.clearInterval(countdownInterval);
    };
  }, [phase, spawnBubble]);

  useEffect(() => {
    if (phase === 'finished') {
      playCelebration();
      if (!reducedMotion) {
        void confetti({
          particleCount: 65,
          spread: 70,
          origin: { y: 0.65 },
          colors: ['#F8BBD0', '#E8D9FF', '#D86B91', '#FFFFFF'],
        });
      }
    }
  }, [phase, playCelebration, reducedMotion]);

  const handlePopBubble = (bubble: BubbleItem) => {
    if (phase !== 'playing') return;
    playPop(bubble.points > 1);
    setScore((s) => s + bubble.points);
    setBubbles((prev) => prev.filter((b) => b.id !== bubble.id));
  };

  const earnedStars = score >= 25 ? 3 : score >= 12 ? 2 : 1;

  return (
    <section
      aria-label="Chapter Four: Bubble Pop Challenge"
      className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-4xl flex-col items-center justify-center px-4 py-6"
    >
      <div className="text-center">
        <p className="font-handwritten text-xl text-[#D86B91]">Chapter Four · Bubble Pop Challenge</p>
        <h1 className="font-display mt-1 text-3xl font-bold text-[#593D4B] sm:text-4xl">
          Let&apos;s collect a little happiness!
        </h1>
      </div>

      {/* Score & Timer */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
        <div className="glass-pill rounded-full px-4 py-1.5 text-sm font-semibold text-[#593D4B]">
          Score: <span className="text-[#D86B91]">{score}</span>
        </div>
        <div className="glass-pill rounded-full px-4 py-1.5 text-sm font-semibold text-[#593D4B]">
          Time: <span className="text-[#D86B91]">{timeLeft}s</span>
        </div>
      </div>

      {/* Playfield */}
      <div className="glass-card relative mt-4 h-[380px] w-full overflow-hidden rounded-3xl sm:h-[430px]">
        {phase === 'ready' && (
          <div className="flex h-full flex-col items-center justify-center p-6 text-center">
            <Sparkles className="h-10 w-10 text-[#D86B91]" />
            <h2 className="font-display mt-3 text-2xl font-bold text-[#593D4B]">
              Ready to Pop Some Joy?
            </h2>
            <p className="mt-2 max-w-md text-sm text-[#7D5A6B]">
              Tap the floating pink and lavender bubbles for 30 seconds! Heart bubbles give +2 and
              star bubbles give +3 bonus points.
            </p>
            <button
              type="button"
              onClick={startGame}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EFA1B8] via-[#D86B91] to-[#EFA1B8] px-8 py-3.5 text-sm font-semibold text-white shadow-md transition hover:brightness-105"
            >
              <Play className="h-4 w-4 fill-white" />
              <span>START CHALLENGE</span>
            </button>
          </div>
        )}

        {phase === 'playing' && (
          <div className="relative h-full w-full select-none">
            <AnimatePresence>
              {bubbles.map((b) => {
                const bgClass =
                  b.variant === 'lavender'
                    ? 'from-[#E8D9FF]/90 to-[#D3B8FF]/80 border-white/90'
                    : b.variant === 'star'
                      ? 'from-[#FFF3B0]/95 to-[#F8BBD0]/90 border-[#D86B91]/60'
                      : b.variant === 'heart'
                        ? 'from-[#F8BBD0]/95 to-[#EFA1B8]/90 border-white'
                        : 'from-[#FCE4EC]/90 to-[#F8BBD0]/85 border-white/90';

                return (
                  <motion.button
                    key={b.id}
                    type="button"
                    aria-label={
                      b.variant === 'heart'
                        ? 'Bonus heart bubble (+2)'
                        : b.variant === 'star'
                          ? 'Bonus star bubble (+3)'
                          : 'Pastel bubble (+1)'
                    }
                    onClick={() => handlePopBubble(b)}
                    initial={{ y: 420, opacity: 0.9, scale: 0.85 }}
                    animate={{ y: -90, opacity: 1, scale: 1 }}
                    exit={{ scale: 1.45, opacity: 0 }}
                    transition={{
                      y: { duration: reducedMotion ? 4.5 : b.duration, ease: 'linear' },
                      scale: { duration: 0.18 },
                      opacity: { duration: 0.18 },
                    }}
                    onAnimationComplete={() => {
                      setBubbles((prev) => prev.filter((item) => item.id !== b.id));
                    }}
                    style={{
                      left: `${b.x}%`,
                      width: b.size,
                      height: b.size,
                    }}
                    className={`absolute flex items-center justify-center rounded-full border-2 bg-gradient-to-br shadow-[inset_0_4px_10px_rgba(255,255,255,0.9),0_8px_18px_rgba(216,107,145,0.2)] ${bgClass}`}
                  >
                    {b.variant === 'heart' && <Heart className="h-5 w-5 fill-[#D86B91] text-[#D86B91]" />}
                    {b.variant === 'star' && <Star className="h-5 w-5 fill-[#D86B91] text-[#D86B91]" />}
                  </motion.button>
                );
              })}
            </AnimatePresence>
          </div>
        )}

        {phase === 'finished' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex h-full flex-col items-center justify-center p-6 text-center"
          >
            <div className="flex items-center gap-1.5">
              {[1, 2, 3].map((s) => (
                <Star
                  key={s}
                  className={`h-7 w-7 ${
                    s <= earnedStars ? 'fill-[#FFD166] text-[#D86B91]' : 'fill-white/60 text-[#EFA1B8]'
                  }`}
                />
              ))}
            </div>
            <h2 className="font-display mt-3 text-3xl font-bold text-[#D86B91]">
              Happiness Collected! ♡
            </h2>
            <p className="mt-1.5 text-base text-[#593D4B]">
              You popped your way to <span className="font-bold text-[#D86B91]">{score}</span> points!
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={startGame}
                className="inline-flex items-center gap-2 rounded-full border border-[#F8BBD0] bg-white px-5 py-2.5 text-sm font-semibold text-[#593D4B] shadow-sm transition hover:bg-[#FFF0F5]"
              >
                <RotateCcw className="h-4 w-4 text-[#D86B91]" />
                <span>Play Again</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  playClick();
                  onComplete(earnedStars);
                }}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EFA1B8] via-[#D86B91] to-[#EFA1B8] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:brightness-105"
              >
                <span>Continue to Chapter Five</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};
