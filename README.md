# THE PINK WONDERLAND

**A Little World, A Thousand Smiles.**

An interactive, pastel-pink birthday surprise web experience built with React, TypeScript, Vite, Tailwind CSS, Framer Motion, Lucide React, and Canvas Confetti.

## Features

- **Secret Entry Gate**: Dreamy glassmorphism password screen (`nuvvu nenu`, case-sensitive) with an animated lock, heart-shaped particle burst, show/hide toggle, and gentle error shake. *(Note: This is a playful client-side gate, not cryptographic authentication.)*
- **Chapter 1 — The Secret Invitation**: 3D animated envelope with a pink heart seal, rising letter, and floating hearts.
- **Chapter 2 — The Magical Wonderland**: Interactive pastel fantasy garden with 6 clickable objects (star, flower, heart, butterfly, glowing light, dreamy cloud) and star rewards.
- **Chapter 3 — Memory Match**: 4×4 pastel illustration memory game with 3D card flips, move counter, timer, restart, confetti victory, and 3-star rating.
- **Chapter 4 — Bubble Pop Challenge**: 30-second floating bubble game with pink, lavender, heart (+2), and star (+3) bubbles.
- **Chapter 5 — The Secret Treasure Garden**: 6 visually distinct mystery keepsakes, each opening an animated wish modal.
- **Chapter 6 — The Compliment Machine**: Magical pink machine with 24 unique compliments, sparkle bursts, and no immediate repetition.
- **Chapter 7 — The Secret Letter**: Sealed envelope that opens to reveal a heartfelt letter with staggered fade-in animations.
- **Chapter 8 — The Grand Birthday Reveal**: Glowing pink door that opens into a full-screen celebration with confetti, floating balloons, falling petals, and the birthday message.
- **Global Experience**:
  - Optional Web Audio API music-box chime & sound effects (never autoplays, instant mute/unmute).
  - LocalStorage journey progress tracking, star counter, chapter navigation, and clean replay/reset.
  - Mouse-only cursor sparkle trail and full `prefers-reduced-motion` support.

## Project Structure

```text
src/
├── components/
│   ├── AmbientBackground.tsx
│   ├── CursorSparkles.tsx
│   ├── JourneyProgress.tsx
│   └── chapters/
│       ├── PasswordGate.tsx
│       ├── Invitation.tsx
│       ├── WonderWorld.tsx
│       ├── MemoryGame.tsx
│       ├── BubbleGame.tsx
│       ├── TreasureGarden.tsx
│       ├── ComplimentMachine.tsx
│       ├── SecretLetter.tsx
│       └── FinalReveal.tsx
├── data/
│   └── wonderlandData.ts
├── hooks/
│   ├── useJourneyProgress.ts
│   ├── useReducedMotionPreference.ts
│   └── useSound.tsx
├── styles/
│   └── index.css
├── App.tsx
├── main.tsx
└── vite-env.d.ts
```

## Setup & Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Typecheck
npm run typecheck

# Build for production
npm run build

# Preview production build
npm run preview
```
