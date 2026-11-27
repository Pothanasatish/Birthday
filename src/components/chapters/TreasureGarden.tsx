import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Check, Sparkles, Star, X } from 'lucide-react';
import { TREASURE_ITEMS, TreasureItem } from '../../data/wonderlandData';
import { useSound } from '../../hooks/useSound';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface TreasureGardenProps {
  onComplete: (stars: number) => void;
}

const TreasureIcon: React.FC<{ kind: TreasureItem['kind'] }> = ({ kind }) => {
  switch (kind) {
    case 'box':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
          <rect x="12" y="26" width="40" height="26" rx="6" fill="#F8BBD0" stroke="#D86B91" strokeWidth="2" />
          <rect x="10" y="19" width="44" height="10" rx="4" fill="#EFA1B8" stroke="#D86B91" strokeWidth="2" />
          <path d="M32 19 V52" stroke="#FFFFFF" strokeWidth="3.5" />
          <circle cx="32" cy="17" r="4" fill="#FFF0F5" stroke="#D86B91" strokeWidth="2" />
        </svg>
      );
    case 'bottle':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
          <rect x="26" y="10" width="12" height="7" rx="2" fill="#EFA1B8" stroke="#D86B91" strokeWidth="1.8" />
          <path
            d="M25 17 H39 L46 30 V48 C46 51.5 43 54 39.5 54 H24.5 C21 54 18 51.5 18 48 V30 L25 17 Z"
            fill="#E8D9FF"
            stroke="#D86B91"
            strokeWidth="2"
          />
          <circle cx="28" cy="36" r="2.5" fill="#FFFFFF" />
          <circle cx="36" cy="43" r="3" fill="#FFF3B0" />
          <circle cx="33" cy="31" r="1.8" fill="#FFFFFF" />
        </svg>
      );
    case 'locket':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
          <path d="M22 10 Q32 22 42 10" stroke="#D86B91" strokeWidth="2" fill="none" />
          <circle cx="32" cy="36" r="17" fill="#FCE4EC" stroke="#D86B91" strokeWidth="2.2" />
          <path
            d="M32 43 C32 43 24 37.5 24 32.5 C24 29.8 26 28 28.5 28 C30 28 31.2 28.8 32 30 C32.8 28.8 34 28 35.5 28 C38 28 40 29.8 40 32.5 C40 37.5 32 43 32 43 Z"
            fill="#D86B91"
          />
        </svg>
      );
    case 'crane':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
          <polygon points="10,34 30,26 26,44" fill="#F8BBD0" stroke="#D86B91" strokeWidth="1.8" />
          <polygon points="30,26 52,18 40,38 26,44" fill="#EFA1B8" stroke="#D86B91" strokeWidth="1.8" />
          <polygon points="30,26 20,14 38,22" fill="#FFFFFF" stroke="#D86B91" strokeWidth="1.8" />
        </svg>
      );
    case 'blossom':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
          {[0, 72, 144, 216, 288].map((a) => (
            <ellipse
              key={a}
              cx="32"
              cy="18"
              rx="7.5"
              ry="12"
              fill="#F8BBD0"
              stroke="#D86B91"
              strokeWidth="1.6"
              transform={`rotate(${a} 32 32)`}
            />
          ))}
          <circle cx="32" cy="32" r="6" fill="#FFF3B0" stroke="#D86B91" strokeWidth="1.6" />
        </svg>
      );
    case 'scroll':
      return (
        <svg viewBox="0 0 64 64" className="h-14 w-14" aria-hidden="true">
          <rect x="16" y="14" width="32" height="36" rx="4" fill="#FFF8FA" stroke="#D86B91" strokeWidth="2" />
          <rect x="12" y="12" width="40" height="7" rx="3.5" fill="#F8BBD0" stroke="#D86B91" strokeWidth="1.8" />
          <rect x="12" y="45" width="40" height="7" rx="3.5" fill="#F8BBD0" stroke="#D86B91" strokeWidth="1.8" />
          <path d="M23 28 H41 M23 35 H37" stroke="#EFA1B8" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      );
  }
};

export const TreasureGarden: React.FC<TreasureGardenProps> = ({ onComplete }) => {
  const [openedIds, setOpenedIds] = useState<string[]>([]);
  const [selectedTreasure, setSelectedTreasure] = useState<TreasureItem | null>(null);
  const { playSparkle, playClick } = useSound();
  const reducedMotion = useReducedMotionPreference();

  const handleOpenTreasure = (item: TreasureItem) => {
    playSparkle();
    setSelectedTreasure(item);
    setOpenedIds((prev) => (prev.includes(item.id) ? prev : [...prev, item.id]));
  };

  const earnedStars = openedIds.length >= TREASURE_ITEMS.length ? 3 : openedIds.length >= 3 ? 2 : 1;

  return (
    <section
      aria-label="Chapter Five: The Secret Treasure Garden"
      className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-5xl flex-col items-center justify-center px-4 py-6"
    >
      <div className="text-center">
        <p className="font-handwritten text-xl text-[#D86B91]">Chapter Five · The Secret Treasure Garden</p>
        <h1 className="font-display mt-1 text-3xl font-bold text-[#593D4B] sm:text-4xl">
          Six Little Mystery Treasures
        </h1>
        <p className="mt-2 text-sm text-[#7D5A6B] sm:text-base">
          Each keepsake holds a small wish. Open them at your own pace.
        </p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1.5 text-xs font-semibold text-[#593D4B] shadow-sm">
          <Sparkles className="h-3.5 w-3.5 text-[#D86B91]" />
          <span>
            {openedIds.length} / {TREASURE_ITEMS.length} treasures opened
          </span>
        </div>
      </div>

      {/* 6 Visually Distinct Mystery Cards */}
      <div className="mt-6 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TREASURE_ITEMS.map((item, idx) => {
          const isOpened = openedIds.includes(item.id);
          return (
            <motion.button
              key={item.id}
              type="button"
              onClick={() => handleOpenTreasure(item)}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.06 }}
              whileHover={reducedMotion ? undefined : { y: -4, scale: 1.02 }}
              whileTap={reducedMotion ? undefined : { scale: 0.98 }}
              className={`glass-card group relative flex flex-col items-center rounded-3xl p-6 text-center transition ${
                isOpened ? 'ring-2 ring-[#F8BBD0]' : ''
              }`}
            >
              {isOpened && (
                <span className="absolute top-3.5 right-3.5 flex h-6 w-6 items-center justify-center rounded-full bg-[#F8BBD0] text-[#593D4B]">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}
              <div
                className={`flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} shadow-inner`}
              >
                <TreasureIcon kind={item.kind} />
              </div>
              <h2 className="font-display mt-4 text-xl font-bold text-[#593D4B]">
                {item.subtitle}
              </h2>
              <p className="mt-1 text-xs font-medium text-[#8C6175]">
                {isOpened ? item.title : 'Tap to open mystery'}
              </p>
            </motion.button>
          );
        })}
      </div>

      {/* Animated Modal for Selected Treasure */}
      <AnimatePresence>
        {selectedTreasure && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#593D4B]/35 p-4 backdrop-blur-sm"
            onClick={() => {
              playClick();
              setSelectedTreasure(null);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="treasure-modal-title"
              initial={{ opacity: 0, scale: 0.88, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 12 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card relative w-full max-w-md rounded-3xl bg-white/95 p-7 text-center shadow-2xl"
            >
              <button
                type="button"
                onClick={() => {
                  playClick();
                  setSelectedTreasure(null);
                }}
                aria-label="Close treasure message"
                className="absolute top-4 right-4 rounded-full p-1.5 text-[#8C6175] transition hover:bg-[#FFF0F5] hover:text-[#D86B91]"
              >
                <X className="h-5 w-5" />
              </button>

              <div
                className={`mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${selectedTreasure.accent}`}
              >
                <TreasureIcon kind={selectedTreasure.kind} />
              </div>

              <p className="font-handwritten mt-4 text-xl text-[#D86B91]">
                {selectedTreasure.title}
              </p>
              <h3 id="treasure-modal-title" className="font-display mt-1 text-2xl font-bold text-[#593D4B]">
                “{selectedTreasure.message}”
              </h3>

              <button
                type="button"
                onClick={() => {
                  playClick();
                  setSelectedTreasure(null);
                }}
                className="mt-6 rounded-full bg-gradient-to-r from-[#EFA1B8] to-[#D86B91] px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:brightness-105"
              >
                Keep This Wish ♡
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Continue Button */}
      <div className="mt-7 flex flex-col items-center gap-2">
        <button
          type="button"
          onClick={() => {
            playClick();
            onComplete(earnedStars);
          }}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EFA1B8] via-[#D86B91] to-[#EFA1B8] px-7 py-3.5 text-sm font-semibold text-white shadow-md transition hover:brightness-105"
        >
          <span>Continue to Chapter Six</span>
          <ArrowRight className="h-4 w-4" />
        </button>
        {openedIds.length < TREASURE_ITEMS.length && (
          <p className="flex items-center gap-1 text-xs text-[#8C6175]">
            <Star className="h-3 w-3 fill-[#F8BBD0] text-[#D86B91]" />
            <span>Open all 6 treasures to collect all 3 stars!</span>
          </p>
        )}
      </div>
    </section>
  );
};
