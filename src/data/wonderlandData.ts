export type ChapterId =
  | 'gate'
  | 'invitation'
  | 'wonderworld'
  | 'memory'
  | 'bubbles'
  | 'treasure'
  | 'compliments'
  | 'letter'
  | 'reveal';

export interface ChapterMeta {
  id: ChapterId;
  number: number;
  title: string;
  shortTitle: string;
}

export const CHAPTERS: ChapterMeta[] = [
  { id: 'invitation', number: 1, title: 'The Secret Invitation', shortTitle: 'Invitation' },
  { id: 'wonderworld', number: 2, title: 'The Magical Wonderland', shortTitle: 'Wonderland' },
  { id: 'memory', number: 3, title: 'Memory Match', shortTitle: 'Memory' },
  { id: 'bubbles', number: 4, title: 'Bubble Pop Challenge', shortTitle: 'Bubbles' },
  { id: 'treasure', number: 5, title: 'Secret Treasure Garden', shortTitle: 'Treasures' },
  { id: 'compliments', number: 6, title: 'The Compliment Machine', shortTitle: 'Magic' },
  { id: 'letter', number: 7, title: 'The Secret Letter', shortTitle: 'Letter' },
  { id: 'reveal', number: 8, title: 'The Grand Birthday Reveal', shortTitle: 'Surprise' },
];

export interface WonderObject {
  id: string;
  label: string;
  title: string;
  message: string;
  kind: 'star' | 'flower' | 'heart' | 'butterfly' | 'lantern' | 'cloud';
}

export const WONDER_OBJECTS: WonderObject[] = [
  {
    id: 'star',
    label: 'Glowing Star',
    title: 'A Wishing Star',
    message: 'Keep shining, just the way you do.',
    kind: 'star',
  },
  {
    id: 'flower',
    label: 'Blooming Rose',
    title: 'A Blooming Petals Wish',
    message: 'Beautiful things deserve to bloom.',
    kind: 'flower',
  },
  {
    id: 'heart',
    label: 'Floating Heart',
    title: 'A Warm Heartbeat',
    message: 'Sending a little happiness your way.',
    kind: 'heart',
  },
  {
    id: 'butterfly',
    label: 'Pastel Butterfly',
    title: 'A Gentle Flutter',
    message: 'May life always bring you beautiful new beginnings.',
    kind: 'butterfly',
  },
  {
    id: 'lantern',
    label: 'Glowing Light',
    title: 'A Soft Firefly Glow',
    message: 'Never underestimate the happiness you bring.',
    kind: 'lantern',
  },
  {
    id: 'cloud',
    label: 'Dreamy Cloud',
    title: 'A Cotton-Candy Sky',
    message: 'May your days always feel light, gentle, and full of wonder.',
    kind: 'cloud',
  },
];

export interface TreasureItem {
  id: string;
  title: string;
  subtitle: string;
  message: string;
  accent: string;
  kind: 'box' | 'bottle' | 'locket' | 'crane' | 'blossom' | 'scroll';
}

export const TREASURE_ITEMS: TreasureItem[] = [
  {
    id: 'reason-to-smile',
    title: 'A Little Reason to Smile',
    subtitle: 'Velvet Keepsake Box',
    message: 'Some people make ordinary days feel a little brighter.',
    accent: 'from-[#F8BBD0] to-[#EFA1B8]',
    kind: 'box',
  },
  {
    id: 'pocket-positivity',
    title: 'A Pocket Full of Positivity',
    subtitle: 'Starlight Glass Bottle',
    message: 'May you always find happiness in the smallest moments.',
    accent: 'from-[#E8D9FF] to-[#F8BBD0]',
    kind: 'bottle',
  },
  {
    id: 'wonderful-life',
    title: 'A Tiny Reminder',
    subtitle: 'Rose Pearl Locket',
    message: 'You deserve beautiful opportunities and countless reasons to smile.',
    accent: 'from-[#FCE4EC] to-[#E8D9FF]',
    kind: 'locket',
  },
  {
    id: 'affirmation',
    title: 'A Beautiful Affirmation',
    subtitle: 'Origami Wish Crane',
    message: 'Keep growing, keep glowing, and keep being yourself.',
    accent: 'from-[#F8BBD0] to-[#D86B91]',
    kind: 'crane',
  },
  {
    id: 'magical-flower',
    title: 'A Magical Flower',
    subtitle: 'Enchanted Pink Blossom',
    message: 'Every season has its own beauty, and yours is just beginning to bloom.',
    accent: 'from-[#EFA1B8] to-[#E8D9FF]',
    kind: 'blossom',
  },
  {
    id: 'heartfelt-note',
    title: 'A Secret Heartfelt Note',
    subtitle: 'Ribbon-Tied Scroll',
    message: 'The world feels a little gentler and brighter whenever you are smiling.',
    accent: 'from-[#E8D9FF] to-[#EFA1B8]',
    kind: 'scroll',
  },
];

export const COMPLIMENTS: string[] = [
  'Your smile deserves its own sunshine.',
  'Never stop being wonderfully you.',
  'The world needs more beautiful energy like yours.',
  'May your confidence grow as beautifully as your dreams.',
  'Some moments become special simply because of the people in them.',
  'You carry a warmth that makes everything around you feel softer.',
  'Little by little, you make ordinary days feel magical.',
  'Your kindness is one of the rarest and prettiest things in this world.',
  'May your heart always stay as bright and gentle as it is.',
  'You have a way of making even quiet moments feel meaningful.',
  'Every dream you chase is lucky to have someone like you chasing it.',
  'You deserve mornings filled with peace and evenings filled with laughter.',
  'There is something effortlessly lovely about the way you brighten a room.',
  'May you always see in yourself the wonder that others see in you.',
  'Your presence feels like a soft pastel sky after the rain.',
  'Keep shining gently—your light reaches further than you know.',
  'You deserve surprises that make your eyes light up.',
  'Everything good feels a little closer when you smile.',
  'Your authenticity is your prettiest magic.',
  'May every step ahead lead you to joy, calm, and genuine laughter.',
  'You are a quiet reminder that good things exist in this world.',
  'Never doubt how much warmth your presence brings.',
  'May your days be filled with soft music, sweet moments, and happy surprises.',
  'Here is a tiny sparkle of positivity, saved just for you.',
];

export const SECRET_LETTER_PARAGRAPHS: string[] = [
  'Hey,',
  'I wanted to make something a little different for your special day.',
  'Not just a simple birthday message, but a small experience filled with surprises, smiles, and happiness.',
  'Sometimes, there are people who make life feel a little more interesting just by being themselves.',
  'I hope you always find reasons to smile, courage to chase your dreams, and happiness in every little thing.',
  'You deserve beautiful things, wonderful opportunities, and all the happiness that life can bring.',
  'I hope this little surprise makes your day a bit more special.',
  'With lots of good wishes,\nSomeone who wishes you the very best ♡',
];

export const BIRTHDAY_MESSAGE_PARAGRAPHS: string[] = [
  'May your life always be filled with beautiful surprises, genuine smiles, wonderful opportunities, and unforgettable moments.',
  'May every new chapter bring you closer to your dreams.',
  'May you always have the courage to shine, the strength to grow, and countless reasons to smile.',
  'Never stop believing in yourself.',
  'Keep being wonderful, keep shining, and remember that you deserve all the happiness this world has to offer.',
  'Wishing you the most beautiful birthday and an amazing year ahead.',
  'HAPPY BIRTHDAY! ♡',
];
