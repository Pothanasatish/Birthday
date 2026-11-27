import React from 'react';
import { RotateCcw, Sparkles, Star, Volume2, VolumeX } from 'lucide-react';
import { CHAPTERS, ChapterId } from '../data/wonderlandData';
import { useSound } from '../hooks/useSound';

interface JourneyProgressProps {
  currentChapter: ChapterId;
  completedChapters: ChapterId[];
  totalStars: number;
  isJourneyComplete: boolean;
  onSelectChapter: (chapter: ChapterId) => void;
  onReset: () => void;
}

export const JourneyProgress: React.FC<JourneyProgressProps> = ({
  currentChapter,
  completedChapters,
  totalStars,
  isJourneyComplete,
  onSelectChapter,
  onReset,
}) => {
  const { isSoundOn, toggleSound, playClick } = useSound();

  const currentMeta = CHAPTERS.find((c) => c.id === currentChapter);
  const currentIndex = CHAPTERS.findIndex((c) => c.id === currentChapter);

  return (
    <header className="sticky top-0 z-40 w-full px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="glass-pill mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-2 rounded-2xl px-3 py-2 sm:rounded-full sm:px-5 sm:py-2.5">
        {/* Brand & Current Chapter */}
        <div className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-[#F8BBD0] to-[#D86B91] text-white shadow-sm">
            <Sparkles className="h-4 w-4" />
          </div>
          <div className="leading-tight">
            <p className="font-display text-sm font-bold tracking-wide text-[#593D4B] sm:text-base">
              The Pink Wonderland
            </p>
            <p className="text-[11px] font-medium text-[#8C6175]">
              {currentMeta ? `Chapter ${currentMeta.number} · ${currentMeta.title}` : 'A Little World'}
            </p>
          </div>
        </div>

        {/* Chapter Dots / Stepper */}
        <nav aria-label="Journey chapters" className="hidden items-center gap-1.5 md:flex">
          {CHAPTERS.map((ch, idx) => {
            const isCompleted = completedChapters.includes(ch.id);
            const isCurrent = ch.id === currentChapter;
            const isReachable = isCompleted || isCurrent || idx <= currentIndex;
            return (
              <button
                key={ch.id}
                type="button"
                disabled={!isReachable}
                onClick={() => {
                  playClick();
                  onSelectChapter(ch.id);
                }}
                title={`Chapter ${ch.number}: ${ch.title}`}
                aria-label={`Chapter ${ch.number}: ${ch.title}`}
                aria-current={isCurrent ? 'step' : undefined}
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold transition-all ${
                  isCurrent
                    ? 'scale-110 bg-[#D86B91] text-white shadow-md'
                    : isCompleted
                      ? 'bg-[#F8BBD0] text-[#593D4B] hover:bg-[#EFA1B8] hover:text-white'
                      : isReachable
                        ? 'bg-white/70 text-[#593D4B] hover:bg-[#FCE4EC]'
                        : 'cursor-not-allowed bg-white/40 text-[#593D4B]/35'
                }`}
              >
                {ch.number}
              </button>
            );
          })}
        </nav>

        {/* Stars, Completion, Sound & Reset */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div
            className="flex items-center gap-1 rounded-full bg-[#FFF0F5] px-2.5 py-1 text-xs font-semibold text-[#D86B91] shadow-inner"
            title="Collected Stars"
            aria-label={`Collected stars: ${totalStars}`}
          >
            <Star className="h-3.5 w-3.5 fill-[#D86B91] text-[#D86B91]" />
            <span>{totalStars}</span>
          </div>

          {isJourneyComplete && (
            <span className="hidden rounded-full bg-gradient-to-r from-[#F8BBD0] to-[#E8D9FF] px-2.5 py-1 text-[11px] font-semibold text-[#593D4B] sm:inline-flex">
              Complete ♡
            </span>
          )}

          <button
            type="button"
            onClick={toggleSound}
            aria-label={isSoundOn ? 'Mute sound effects and music' : 'Unmute sound effects and music'}
            title={isSoundOn ? 'Sound On' : 'Sound Off'}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#593D4B] transition hover:bg-[#FCE4EC]"
          >
            {isSoundOn ? <Volume2 className="h-4 w-4 text-[#D86B91]" /> : <VolumeX className="h-4 w-4" />}
          </button>

          <button
            type="button"
            onClick={() => {
              playClick();
              onReset();
            }}
            aria-label="Restart journey from Chapter 1"
            title="Restart Journey"
            className="flex h-8 w-8 items-center justify-center rounded-full bg-white/80 text-[#593D4B] transition hover:bg-[#FCE4EC]"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Mobile compact chapter indicator */}
      <div className="mx-auto mt-1.5 flex max-w-5xl items-center justify-center gap-1.5 md:hidden">
        {CHAPTERS.map((ch, idx) => {
          const isCompleted = completedChapters.includes(ch.id);
          const isCurrent = ch.id === currentChapter;
          const isReachable = isCompleted || isCurrent || idx <= currentIndex;
          return (
            <button
              key={ch.id}
              type="button"
              disabled={!isReachable}
              onClick={() => {
                playClick();
                onSelectChapter(ch.id);
              }}
              aria-label={`Chapter ${ch.number}: ${ch.title}`}
              className={`h-2 rounded-full transition-all ${
                isCurrent
                  ? 'w-6 bg-[#D86B91]'
                  : isCompleted
                    ? 'w-2.5 bg-[#EFA1B8]'
                    : 'w-2 bg-white/60'
              }`}
            />
          );
        })}
      </div>
    </header>
  );
};
