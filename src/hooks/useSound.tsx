import React, { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react';

interface SoundContextValue {
  isSoundOn: boolean;
  toggleSound: () => void;
  playClick: () => void;
  playMatch: () => void;
  playPop: (isBonus?: boolean) => void;
  playCelebration: () => void;
  playUnlock: () => void;
  playSparkle: () => void;
}

const SoundContext = createContext<SoundContextValue | null>(null);

const MUSIC_BOX_NOTES = [523.25, 659.25, 783.99, 987.77, 783.99, 659.25, 587.33, 698.46, 880.0, 698.46];

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSoundOn, setIsSoundOn] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const musicIntervalRef = useRef<number | null>(null);
  const noteIndexRef = useRef(0);

  const getContext = useCallback((): AudioContext | null => {
    if (typeof window === 'undefined') return null;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      if (audioCtxRef.current.state === 'suspended') {
        void audioCtxRef.current.resume().catch(() => undefined);
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  }, []);

  const playTone = useCallback(
    (
      freq: number,
      duration: number,
      type: OscillatorType = 'sine',
      volume = 0.08,
      delay = 0
    ) => {
      if (!isSoundOn) return;
      const ctx = getContext();
      if (!ctx) return;
      try {
        const now = ctx.currentTime + delay;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, now);

        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + duration + 0.02);
      } catch {
        // Gracefully ignore audio errors
      }
    },
    [getContext, isSoundOn]
  );

  useEffect(() => {
    if (!isSoundOn) {
      if (musicIntervalRef.current !== null) {
        window.clearInterval(musicIntervalRef.current);
        musicIntervalRef.current = null;
      }
      return;
    }

    const playAmbientNote = () => {
      const freq = MUSIC_BOX_NOTES[noteIndexRef.current % MUSIC_BOX_NOTES.length];
      noteIndexRef.current += 1;
      playTone(freq, 1.4, 'sine', 0.022);
    };

    playAmbientNote();
    musicIntervalRef.current = window.setInterval(playAmbientNote, 950);

    return () => {
      if (musicIntervalRef.current !== null) {
        window.clearInterval(musicIntervalRef.current);
        musicIntervalRef.current = null;
      }
    };
  }, [isSoundOn, playTone]);

  useEffect(() => {
    return () => {
      if (musicIntervalRef.current !== null) {
        window.clearInterval(musicIntervalRef.current);
      }
      if (audioCtxRef.current) {
        void audioCtxRef.current.close().catch(() => undefined);
      }
    };
  }, []);

  const toggleSound = useCallback(() => {
    setIsSoundOn((prev) => {
      const next = !prev;
      if (next) {
        getContext();
      }
      return next;
    });
  }, [getContext]);

  const playClick = useCallback(() => {
    playTone(660, 0.11, 'sine', 0.05);
  }, [playTone]);

  const playMatch = useCallback(() => {
    playTone(587.33, 0.22, 'triangle', 0.07, 0);
    playTone(880, 0.32, 'sine', 0.07, 0.09);
  }, [playTone]);

  const playPop = useCallback(
    (isBonus = false) => {
      if (isBonus) {
        playTone(784, 0.14, 'sine', 0.08, 0);
        playTone(1046.5, 0.22, 'sine', 0.07, 0.06);
      } else {
        playTone(520 + Math.random() * 180, 0.12, 'sine', 0.06);
      }
    },
    [playTone]
  );

  const playSparkle = useCallback(() => {
    playTone(880, 0.16, 'sine', 0.05, 0);
    playTone(1174.66, 0.2, 'sine', 0.05, 0.07);
    playTone(1396.91, 0.28, 'sine', 0.04, 0.14);
  }, [playTone]);

  const playUnlock = useCallback(() => {
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((n, idx) => playTone(n, 0.35, 'triangle', 0.07, idx * 0.08));
  }, [playTone]);

  const playCelebration = useCallback(() => {
    const chord = [523.25, 659.25, 783.99, 1046.5, 1318.51];
    chord.forEach((n, idx) => playTone(n, 0.55, 'triangle', 0.075, idx * 0.09));
  }, [playTone]);

  return (
    <SoundContext.Provider
      value={{
        isSoundOn,
        toggleSound,
        playClick,
        playMatch,
        playPop,
        playCelebration,
        playUnlock,
        playSparkle,
      }}
    >
      {children}
    </SoundContext.Provider>
  );
};

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) {
    throw new Error('useSound must be used inside SoundProvider');
  }
  return ctx;
}
