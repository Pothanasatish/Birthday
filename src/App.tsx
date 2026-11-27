import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AmbientBackground } from './components/AmbientBackground';
import { CursorSparkles } from './components/CursorSparkles';
import { JourneyProgress } from './components/JourneyProgress';
import { PasswordGate } from './components/chapters/PasswordGate';
import { Invitation } from './components/chapters/Invitation';
import { WonderWorld } from './components/chapters/WonderWorld';
import { MemoryGame } from './components/chapters/MemoryGame';
import { BubbleGame } from './components/chapters/BubbleGame';
import { TreasureGarden } from './components/chapters/TreasureGarden';
import { ComplimentMachine } from './components/chapters/ComplimentMachine';
import { SecretLetter } from './components/chapters/SecretLetter';
import { FinalReveal } from './components/chapters/FinalReveal';
import { SoundProvider } from './hooks/useSound';
import { useJourneyProgress } from './hooks/useJourneyProgress';

const WonderlandApp: React.FC = () => {
  const {
    state,
    totalStars,
    isJourneyComplete,
    unlockGate,
    goToChapter,
    completeChapter,
    resetJourney,
  } = useJourneyProgress();

  const [isDimmed, setIsDimmed] = useState(false);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden">
      <AmbientBackground dimmed={isDimmed} />
      <CursorSparkles />

      {state.unlocked && state.currentChapter !== 'gate' && (
        <JourneyProgress
          currentChapter={state.currentChapter}
          completedChapters={state.completedChapters}
          totalStars={totalStars}
          isJourneyComplete={isJourneyComplete}
          onSelectChapter={goToChapter}
          onReset={() => resetJourney(true)}
        />
      )}

      <main className="relative z-10 w-full">
        <AnimatePresence mode="wait">
          {!state.unlocked || state.currentChapter === 'gate' ? (
            <motion.div
              key="gate"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
            >
              <PasswordGate onUnlock={unlockGate} />
            </motion.div>
          ) : state.currentChapter === 'invitation' ? (
            <motion.div
              key="invitation"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <Invitation onComplete={() => completeChapter('invitation', 1, 'wonderworld')} />
            </motion.div>
          ) : state.currentChapter === 'wonderworld' ? (
            <motion.div
              key="wonderworld"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <WonderWorld onComplete={(stars) => completeChapter('wonderworld', stars, 'memory')} />
            </motion.div>
          ) : state.currentChapter === 'memory' ? (
            <motion.div
              key="memory"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <MemoryGame onComplete={(stars) => completeChapter('memory', stars, 'bubbles')} />
            </motion.div>
          ) : state.currentChapter === 'bubbles' ? (
            <motion.div
              key="bubbles"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <BubbleGame onComplete={(stars) => completeChapter('bubbles', stars, 'treasure')} />
            </motion.div>
          ) : state.currentChapter === 'treasure' ? (
            <motion.div
              key="treasure"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <TreasureGarden onComplete={(stars) => completeChapter('treasure', stars, 'compliments')} />
            </motion.div>
          ) : state.currentChapter === 'compliments' ? (
            <motion.div
              key="compliments"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <ComplimentMachine onComplete={(stars) => completeChapter('compliments', stars, 'letter')} />
            </motion.div>
          ) : state.currentChapter === 'letter' ? (
            <motion.div
              key="letter"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <SecretLetter onComplete={() => completeChapter('letter', 2, 'reveal')} />
            </motion.div>
          ) : (
            <motion.div
              key="reveal"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
            >
              <FinalReveal
                onCompleteReveal={() => completeChapter('reveal', 3)}
                onReplay={() => resetJourney(true)}
                onDimChange={setIsDimmed}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
};

export function App() {
  return (
    <SoundProvider>
      <WonderlandApp />
    </SoundProvider>
  );
}

export default App;
