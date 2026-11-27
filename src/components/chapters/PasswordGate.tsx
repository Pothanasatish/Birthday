import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Eye, EyeOff, Heart, Sparkles } from 'lucide-react';
import { useSound } from '../../hooks/useSound';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface PasswordGateProps {
  onUnlock: () => void;
}

const SECRET_KEY = 'nuvvu nenu';

export const PasswordGate: React.FC<PasswordGateProps> = ({ onUnlock }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [shakeKey, setShakeKey] = useState(0);
  const [isUnlocking, setIsUnlocking] = useState(false);
  const { playClick, playUnlock } = useSound();
  const reducedMotion = useReducedMotionPreference();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isUnlocking) return;

    if (password === SECRET_KEY) {
      setError('');
      setIsUnlocking(true);
      playUnlock();
      window.setTimeout(() => {
        onUnlock();
      }, reducedMotion ? 350 : 1200);
    } else {
      playClick();
      setError("Oops! That's not the magic key. Try again ♡");
      setShakeKey((k) => k + 1);
    }
  };

  // Heart-shaped particle coordinates for unlock burst
  const heartBurstParticles = Array.from({ length: 16 }, (_, i) => {
    const t = (i / 16) * Math.PI * 2;
    const x = 16 * Math.pow(Math.sin(t), 3);
    const y = -(13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t));
    return { id: i, x: x * 7.5, y: y * 7.5 };
  });

  return (
    <motion.section
      aria-label="Secret Entry Gate"
      initial={{ opacity: 0 }}
      animate={{ opacity: isUnlocking ? 0 : 1 }}
      transition={{ duration: isUnlocking ? 0.65 : 0.6, delay: isUnlocking ? 0.55 : 0 }}
      className="relative z-10 flex min-h-screen w-full items-center justify-center px-4 py-10"
    >
      <motion.div
        key={shakeKey}
        initial={shakeKey > 0 && !reducedMotion ? { x: -8 } : { opacity: 0, y: 24, scale: 0.96 }}
        animate={
          shakeKey > 0 && !reducedMotion
            ? { x: [0, -10, 10, -8, 8, -4, 4, 0] }
            : { opacity: 1, y: 0, scale: 1 }
        }
        transition={
          shakeKey > 0
            ? { duration: 0.42 }
            : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }
        }
        className="glass-card relative w-full max-w-md overflow-hidden rounded-3xl p-7 text-center sm:p-10"
      >
        {/* Soft inner glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-20 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-[#F8BBD0]/45 blur-3xl"
        />

        {/* Heart particle burst when unlocked */}
        <AnimatePresence>
          {isUnlocking && !reducedMotion && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
            >
              {heartBurstParticles.map((p) => (
                <motion.div
                  key={p.id}
                  initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
                  animate={{ x: p.x, y: p.y, scale: [0, 1.3, 0.6], opacity: [1, 1, 0] }}
                  transition={{ duration: 0.95, ease: 'easeOut' }}
                  className="absolute text-[#D86B91]"
                >
                  <Heart className="h-4 w-4 fill-[#F8BBD0]" />
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Cute glowing lock illustration */}
        <div className="relative mx-auto mb-5 flex h-24 w-24 items-center justify-center">
          <div className="animate-soft-glow absolute inset-2 rounded-full bg-gradient-to-br from-[#FFF0F5] to-[#F8BBD0]/70" />
          <svg
            viewBox="0 0 80 80"
            className="relative h-20 w-20 drop-shadow-[0_6px_14px_rgba(216,107,145,0.28)]"
            aria-hidden="true"
          >
            {/* Shackle */}
            <motion.path
              d="M26 36 V25 C26 16.5 32.5 11 40 11 C47.5 11 54 16.5 54 25 V36"
              fill="none"
              stroke="#D86B91"
              strokeWidth="5.5"
              strokeLinecap="round"
              animate={isUnlocking ? { y: -8, rotate: -18 } : { y: 0, rotate: 0 }}
              style={{ originX: '26px', originY: '36px' }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
            />
            {/* Lock Body */}
            <rect
              x="18"
              y="34"
              width="44"
              height="34"
              rx="12"
              fill="url(#lockGrad)"
              stroke="#FFFFFF"
              strokeWidth="2.5"
            />
            {/* Heart Keyhole */}
            <path
              d="M40 57.5 C40 57.5 32.5 52.2 32.5 47 C32.5 44.4 34.5 42.5 36.8 42.5 C38.3 42.5 39.4 43.3 40 44.4 C40.6 43.3 41.7 42.5 43.2 42.5 C45.5 42.5 47.5 44.4 47.5 47 C47.5 52.2 40 57.5 40 57.5 Z"
              fill="#FFFFFF"
            />
            <defs>
              <linearGradient id="lockGrad" x1="18" y1="34" x2="62" y2="68" gradientUnits="userSpaceOnUse">
                <stop stopColor="#F8BBD0" />
                <stop offset="1" stopColor="#D86B91" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        <p className="font-handwritten mb-1 text-lg text-[#D86B91]">The Pink Wonderland</p>
        <h1 className="font-display text-3xl font-bold tracking-tight text-[#593D4B] sm:text-4xl">
          A Little Secret Awaits...
        </h1>
        <p className="mt-2.5 text-sm leading-relaxed text-[#7D5A6B] sm:text-base">
          Some beautiful surprises begin with a little secret.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4" noValidate>
          <div className="relative">
            <label htmlFor="secret-key-input" className="sr-only">
              Secret key
            </label>
            <input
              id="secret-key-input"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (error) setError('');
              }}
              placeholder="Enter the secret key..."
              autoComplete="off"
              autoCapitalize="none"
              spellCheck={false}
              aria-invalid={Boolean(error)}
              aria-describedby={error ? 'password-error' : undefined}
              className="w-full rounded-2xl border border-[#F8BBD0] bg-white/85 py-3.5 pr-12 pl-4 text-center text-base text-[#593D4B] placeholder-[#B48A9D] shadow-inner transition focus:border-[#D86B91] focus:bg-white focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? 'Hide secret key' : 'Show secret key'}
              className="absolute top-1/2 right-3 -translate-y-1/2 rounded-full p-1.5 text-[#9B6E82] transition hover:bg-[#FFF0F5] hover:text-[#D86B91]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                id="password-error"
                role="alert"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-sm font-medium text-[#C84B76]"
              >
                {error}
              </motion.p>
            )}
          </AnimatePresence>

          <motion.button
            type="submit"
            disabled={isUnlocking}
            whileHover={reducedMotion ? undefined : { scale: 1.02 }}
            whileTap={reducedMotion ? undefined : { scale: 0.98 }}
            className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-[#EFA1B8] via-[#D86B91] to-[#EFA1B8] px-6 py-3.5 text-sm font-semibold tracking-wider text-white shadow-[0_10px_25px_rgba(216,107,145,0.35)] transition hover:brightness-105 disabled:opacity-70"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isUnlocking ? 'OPENING THE MAGIC...' : 'UNLOCK THE MAGIC'}</span>
          </motion.button>
        </form>
      </motion.div>
    </motion.section>
  );
};
