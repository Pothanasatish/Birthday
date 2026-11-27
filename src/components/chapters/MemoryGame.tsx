import React, { useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { ArrowRight, RotateCcw, Sparkles, Star } from 'lucide-react';
import { useSound } from '../../hooks/useSound';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface MemoryGameProps {
  onComplete: (stars: number) => void;
}

type CardSymbol = 'heart' | 'star' | 'flower' | 'butterfly' | 'moon' | 'crown' | 'gift' | 'ribbon';

interface MemoryCard {
  uid: number;
  symbol: CardSymbol;
  label: string;
  isFlipped: boolean;
  isMatched: boolean;
}

const CARD_PAIRS: { symbol: CardSymbol; label: string }[] = [
  { symbol: 'heart', label: 'Sweet Heart' },
  { symbol: 'star', label: 'Wishing Star' },
  { symbol: 'flower', label: 'Pink Blossom' },
  { symbol: 'butterfly', label: 'Pastel Butterfly' },
  { symbol: 'moon', label: 'Dreamy Moon' },
  { symbol: 'crown', label: 'Little Crown' },
  { symbol: 'gift', label: 'Surprise Gift' },
  { symbol: 'ribbon', label: 'Silk Ribbon' },
];

function createDeck(): MemoryCard[] {
  const doubled = [...CARD_PAIRS, ...CARD_PAIRS].map((item, idx) => ({
    uid: idx,
    symbol: item.symbol,
    label: item.label,
    isFlipped: false,
    isMatched: false,
  }));
  for (let i = doubled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [doubled[i], doubled[j]] = [doubled[j], doubled[i]];
  }
  return doubled;
}

const CardIcon: React.FC<{ symbol: CardSymbol }> = ({ symbol }) => {
  switch (symbol) {
    case 'heart':
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
          <path
            d="M24 40 C24 40 7 29 7 17 C7 11.5 11.5 7.5 16.5 7.5 C19.8 7.5 22.5 9.3 24 12 C25.5 9.3 28.2 7.5 31.5 7.5 C36.5 7.5 41 11.5 41 17 C41 29 24 40 24 40 Z"
            fill="#EFA1B8"
            stroke="#D86B91"
            strokeWidth="2"
          />
        </svg>
      );
    case 'star':
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
          <path
            d="M24 6 L29.5 17.5 L42 19 L32.8 27.8 L35.2 40 L24 34 L12.8 40 L15.2 27.8 L6 19 L18.5 17.5 Z"
            fill="#FFF3B0"
            stroke="#D86B91"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      );
    case 'flower':
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
          {[0, 60, 120, 180, 240, 300].map((a) => (
            <ellipse
              key={a}
              cx="24"
              cy="14"
              rx="5"
              ry="8.5"
              fill="#F8BBD0"
              stroke="#D86B91"
              strokeWidth="1.5"
              transform={`rotate(${a} 24 24)`}
            />
          ))}
          <circle cx="24" cy="24" r="5" fill="#FFF3B0" stroke="#D86B91" strokeWidth="1.5" />
        </svg>
      );
    case 'butterfly':
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
          <ellipse cx="16" cy="18" rx="8.5" ry="6.5" transform="rotate(-20 16 18)" fill="#E8D9FF" stroke="#D86B91" strokeWidth="1.6" />
          <ellipse cx="32" cy="18" rx="8.5" ry="6.5" transform="rotate(20 32 18)" fill="#E8D9FF" stroke="#D86B91" strokeWidth="1.6" />
          <ellipse cx="17" cy="29" rx="6.5" ry="5" transform="rotate(15 17 29)" fill="#F8BBD0" stroke="#D86B91" strokeWidth="1.6" />
          <ellipse cx="31" cy="29" rx="6.5" ry="5" transform="rotate(-15 31 29)" fill="#F8BBD0" stroke="#D86B91" strokeWidth="1.6" />
          <rect x="22.5" y="13" width="3" height="22" rx="1.5" fill="#593D4B" />
        </svg>
      );
    case 'moon':
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
          <path
            d="M31 10 C22 11 16 18.5 16 27 C16 34.5 21.5 40 29 40 C33.5 40 37.5 38 40 34.5 C34.5 35.5 28.5 31.5 28.5 24 C28.5 18 31.5 13 36 10.5 C34.5 10.1 32.8 9.9 31 10 Z"
            fill="#E8D9FF"
            stroke="#D86B91"
            strokeWidth="2"
          />
        </svg>
      );
    case 'crown':
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
          <path
            d="M8 34 L11 16 L19 24 L24 12 L29 24 L37 16 L40 34 Z"
            fill="#FFE0B2"
            stroke="#D86B91"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <rect x="8" y="34" width="32" height="5" rx="2" fill="#F8BBD0" stroke="#D86B91" strokeWidth="1.6" />
        </svg>
      );
    case 'gift':
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
          <rect x="10" y="20" width="28" height="20" rx="3" fill="#F8BBD0" stroke="#D86B91" strokeWidth="2" />
          <rect x="8" y="15" width="32" height="6" rx="2" fill="#EFA1B8" stroke="#D86B91" strokeWidth="2" />
          <path d="M24 15 V40" stroke="#FFFFFF" strokeWidth="3" />
          <path d="M24 15 C20 9 14 11 16 15 M24 15 C28 9 34 11 32 15" stroke="#D86B91" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'ribbon':
      return (
        <svg viewBox="0 0 48 48" className="h-10 w-10" aria-hidden="true">
          <path d="M24 23 C14 14 8 18 10 25 C12 31 20 27 24 23 Z" fill="#EFA1B8" stroke="#D86B91" strokeWidth="1.8" />
          <path d="M24 23 C34 14 40 18 38 25 C36 31 28 27 24 23 Z" fill="#EFA1B8" stroke="#D86B91" strokeWidth="1.8" />
          <path d="M22 25 L16 39 M26 25 L32 39" stroke="#D86B91" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="24" cy="23" r="3.5" fill="#FFF0F5" stroke="#D86B91" strokeWidth="1.8" />
        </svg>
      );
  }
};

export const MemoryGame: React.FC<MemoryGameProps> = ({ onComplete }) => {
  const [cards, setCards] = useState<MemoryCard[]>(createDeck);
  const [flippedIndices, setFlippedIndices] = useState<number[]>([]);
  const [isLocked, setIsLocked] = useState(false);
  const [moves, setMoves] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [isWon, setIsWon] = useState(false);
  const [matchBanner, setMatchBanner] = useState('');

  const { playClick, playMatch, playCelebration } = useSound();
  const reducedMotion = useReducedMotionPreference();

  useEffect(() => {
    if (!hasStarted || isWon) return;
    const timer = window.setInterval(() => {
      setSeconds((s) => s + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [hasStarted, isWon]);

  const handleRestart = useCallback(() => {
    playClick();
    setCards(createDeck());
    setFlippedIndices([]);
    setIsLocked(false);
    setMoves(0);
    setSeconds(0);
    setHasStarted(false);
    setMatchedPairs(0);
    setIsWon(false);
    setMatchBanner('');
  }, [playClick]);

  const handleCardClick = (index: number) => {
    if (isLocked || isWon) return;
    const target = cards[index];
    if (!target || target.isFlipped || target.isMatched) return;

    if (!hasStarted) setHasStarted(true);
    playClick();

    const updatedCards = cards.map((card, i) =>
      i === index ? { ...card, isFlipped: true } : card
    );
    setCards(updatedCards);

    const nextFlipped = [...flippedIndices, index];
    setFlippedIndices(nextFlipped);

    if (nextFlipped.length === 2) {
      setIsLocked(true);
      setMoves((m) => m + 1);

      const [firstIdx, secondIdx] = nextFlipped;
      const firstCard = updatedCards[firstIdx];
      const secondCard = updatedCards[secondIdx];

      if (firstCard.symbol === secondCard.symbol) {
        playMatch();
        const nextMatchedCount = matchedPairs + 1;
        setMatchedPairs(nextMatchedCount);
        setMatchBanner(`Matched ${firstCard.label}! ♡`);

        window.setTimeout(() => {
          setCards((prev) =>
            prev.map((c, idx) =>
              idx === firstIdx || idx === secondIdx ? { ...c, isMatched: true } : c
            )
          );
          setFlippedIndices([]);
          setIsLocked(false);

          if (nextMatchedCount === CARD_PAIRS.length) {
            setIsWon(true);
            playCelebration();
            if (!reducedMotion) {
              void confetti({
                particleCount: 85,
                spread: 75,
                origin: { y: 0.65 },
                colors: ['#F8BBD0', '#EFA1B8', '#D86B91', '#E8D9FF', '#FFFFFF'],
              });
            }
          }
        }, 380);
      } else {
        window.setTimeout(() => {
          setCards((prev) =>
            prev.map((c, idx) =>
              idx === firstIdx || idx === secondIdx ? { ...c, isFlipped: false } : c
            )
          );
          setFlippedIndices([]);
          setIsLocked(false);
        }, 760);
      }
    }
  };

  const earnedStars = moves <= 12 ? 3 : moves <= 18 ? 2 : 1;

  const formatTime = (sec: number) => {
    const mins = Math.floor(sec / 60);
    const rem = sec % 60;
    return `${mins}:${rem.toString().padStart(2, '0')}`;
  };

  return (
    <section
      aria-label="Chapter Three: Memory Match Game"
      className="relative z-10 mx-auto flex min-h-[calc(100vh-5.5rem)] w-full max-w-3xl flex-col items-center justify-center px-4 py-6"
    >
      <div className="w-full text-center">
        <p className="font-handwritten text-xl text-[#D86B91]">Chapter Three · Memory Match</p>
        <h1 className="font-display mt-1 text-3xl font-bold text-[#593D4B] sm:text-4xl">
          Match the Little Wonders
        </h1>
      </div>

      {/* Stats Bar */}
      <div className="mt-4 flex flex-wrap items-center justify-center gap-2.5 sm:gap-4">
        <div className="glass-pill rounded-full px-4 py-1.5 text-xs font-semibold text-[#593D4B]">
          Pairs: <span className="text-[#D86B91]">{matchedPairs} / 8</span>
        </div>
        <div className="glass-pill rounded-full px-4 py-1.5 text-xs font-semibold text-[#593D4B]">
          Moves: <span className="text-[#D86B91]">{moves}</span>
        </div>
        <div className="glass-pill rounded-full px-4 py-1.5 text-xs font-semibold text-[#593D4B]">
          Time: <span className="text-[#D86B91]">{formatTime(seconds)}</span>
        </div>
        <button
          type="button"
          onClick={handleRestart}
          className="glass-pill inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold text-[#593D4B] transition hover:bg-[#FCE4EC]"
        >
          <RotateCcw className="h-3.5 w-3.5 text-[#D86B91]" />
          <span>Restart</span>
        </button>
      </div>

      {/* Live match feedback */}
      <div className="mt-2 h-6 text-center">
        {matchBanner && !isWon && (
          <p className="font-handwritten text-lg text-[#D86B91]">{matchBanner}</p>
        )}
      </div>

      {/* 4x4 Grid */}
      <div className="glass-card mt-2 w-full max-w-md rounded-3xl p-4 sm:p-6">
        <div className="grid grid-cols-4 gap-2.5 sm:gap-3.5">
          {cards.map((card, index) => {
            const revealed = card.isFlipped || card.isMatched;
            return (
              <button
                key={card.uid}
                type="button"
                onClick={() => handleCardClick(index)}
                disabled={revealed || isLocked}
                aria-label={revealed ? card.label : `Hidden card ${index + 1}`}
                className="perspective-1000 aspect-square w-full focus:outline-none"
              >
                <motion.div
                  animate={{ rotateY: revealed ? 180 : 0 }}
                  transition={{ duration: reducedMotion ? 0.1 : 0.42, ease: 'easeInOut' }}
                  className="preserve-3d relative h-full w-full"
                >
                  {/* Card Back */}
                  <div className="backface-hidden absolute inset-0 flex items-center justify-center rounded-2xl border border-white/80 bg-gradient-to-br from-[#F8BBD0] to-[#E8D9FF] shadow-sm transition hover:brightness-105">
                    <Sparkles className="h-5 w-5 text-white/90" />
                  </div>

                  {/* Card Front */}
                  <div
                    className={`backface-hidden rotate-y-180 absolute inset-0 flex items-center justify-center rounded-2xl border shadow-sm ${
                      card.isMatched
                        ? 'border-[#D86B91] bg-[#FFF0F5] ring-2 ring-[#F8BBD0]'
                        : 'border-[#F8BBD0] bg-white'
                    }`}
                  >
                    <CardIcon symbol={card.symbol} />
                  </div>
                </motion.div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Victory Banner */}
      {isWon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="glass-card mt-5 w-full max-w-md rounded-3xl p-6 text-center"
        >
          <div className="flex items-center justify-center gap-1.5">
            {[1, 2, 3].map((starNum) => (
              <Star
                key={starNum}
                className={`h-7 w-7 ${
                  starNum <= earnedStars
                    ? 'fill-[#FFD166] text-[#D86B91]'
                    : 'fill-white/60 text-[#EFA1B8]'
                }`}
              />
            ))}
          </div>
          <h2 className="font-display mt-2 text-2xl font-bold text-[#D86B91] sm:text-3xl">
            You&apos;re a little superstar!
          </h2>
          <p className="mt-1 text-sm text-[#7D5A6B]">
            Completed in {moves} moves and {formatTime(seconds)}.
          </p>
          <button
            type="button"
            onClick={() => {
              playClick();
              onComplete(earnedStars);
            }}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#EFA1B8] via-[#D86B91] to-[#EFA1B8] px-7 py-3 text-sm font-semibold text-white shadow-md transition hover:brightness-105"
          >
            <span>Continue to Chapter Four</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </section>
  );
};
