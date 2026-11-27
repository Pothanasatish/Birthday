import { useCallback, useEffect, useState } from 'react';
import { CHAPTERS, ChapterId } from '../data/wonderlandData';

const STORAGE_KEY = 'pink_wonderland_progress_v1';

export interface JourneyState {
  unlocked: boolean;
  currentChapter: ChapterId;
  completedChapters: ChapterId[];
  chapterStars: Record<string, number>;
}

const DEFAULT_STATE: JourneyState = {
  unlocked: false,
  currentChapter: 'gate',
  completedChapters: [],
  chapterStars: {},
};

const VALID_CHAPTERS = new Set<ChapterId>(['gate', ...CHAPTERS.map((c) => c.id)]);

function loadSavedState(): JourneyState {
  if (typeof window === 'undefined') return DEFAULT_STATE;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<JourneyState>;
    const unlocked = Boolean(parsed.unlocked);
    const currentChapter: ChapterId =
      parsed.currentChapter && VALID_CHAPTERS.has(parsed.currentChapter)
        ? parsed.currentChapter
        : unlocked
          ? 'invitation'
          : 'gate';
    const completedChapters = Array.isArray(parsed.completedChapters)
      ? parsed.completedChapters.filter((id): id is ChapterId => VALID_CHAPTERS.has(id))
      : [];
    const chapterStars: Record<string, number> = {};
    if (parsed.chapterStars && typeof parsed.chapterStars === 'object') {
      for (const [key, val] of Object.entries(parsed.chapterStars)) {
        if (VALID_CHAPTERS.has(key as ChapterId) && typeof val === 'number' && val >= 0 && val <= 3) {
          chapterStars[key] = Math.floor(val);
        }
      }
    }
    return {
      unlocked,
      currentChapter: unlocked ? (currentChapter === 'gate' ? 'invitation' : currentChapter) : 'gate',
      completedChapters: Array.from(new Set(completedChapters)),
      chapterStars,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

export function useJourneyProgress() {
  const [state, setState] = useState<JourneyState>(loadSavedState);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota errors
    }
  }, [state]);

  const totalStars = Object.values(state.chapterStars).reduce((sum, count) => sum + count, 0);
  const completedCount = CHAPTERS.filter((c) => state.completedChapters.includes(c.id)).length;
  const isJourneyComplete = completedCount === CHAPTERS.length;

  const unlockGate = useCallback(() => {
    setState((prev) => ({
      ...prev,
      unlocked: true,
      currentChapter: 'invitation',
    }));
  }, []);

  const goToChapter = useCallback((chapter: ChapterId) => {
    setState((prev) => ({
      ...prev,
      currentChapter: chapter,
    }));
  }, []);

  const completeChapter = useCallback((chapter: ChapterId, earnedStars = 1, nextChapter?: ChapterId) => {
    setState((prev) => {
      const nextCompleted = prev.completedChapters.includes(chapter)
        ? prev.completedChapters
        : [...prev.completedChapters, chapter];
      const existingStars = prev.chapterStars[chapter] ?? 0;
      const clampedStars = Math.max(existingStars, Math.min(3, Math.max(0, earnedStars)));
      return {
        ...prev,
        completedChapters: nextCompleted,
        chapterStars: {
          ...prev.chapterStars,
          [chapter]: clampedStars,
        },
        currentChapter: nextChapter ?? prev.currentChapter,
      };
    });
  }, []);

  const resetJourney = useCallback((keepUnlocked = true) => {
    const nextState: JourneyState = keepUnlocked
      ? {
          unlocked: true,
          currentChapter: 'invitation',
          completedChapters: [],
          chapterStars: {},
        }
      : DEFAULT_STATE;
    setState(nextState);
  }, []);

  return {
    state,
    totalStars,
    completedCount,
    isJourneyComplete,
    unlockGate,
    goToChapter,
    completeChapter,
    resetJourney,
  };
}
