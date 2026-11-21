// ─── Game Registry ────────────────────────────────────────────────────────────

export type LaunchMode = 'direct' | 'subdomain' | 'embed';

export interface Game {
  id:              string;
  name:            string;
  slug:            string;
  description:     string;
  longDescription?: string;
  thumbnail:       string;
  banner:          string;
  gameplayVideo?:  string;
  category:        string;
  tags:            string[];
  originalUrl:     string;
  customDomain?:   string;
  launchMode:      LaunchMode;
  featured:        boolean;
  published:       boolean;
  instructions?:   string;
  controls?:       string[];
  releaseDate?:    string;
  developer?:      string;
  version?:        string;
}

export const games: Game[] = [
  {
    id:              'game-001',
    name:            'Cho*du CID',
    slug:            'chodu-cid',
    description:     'ACP Pradyuman ka investigation run! Tap karo jump karo — case solve karo bhai 😂',
    longDescription: "ACP Pradyuman is on the run! This endless runner puts you in the shoes of CID's greatest detective. Jump over clues, dodge obstacles, and shout \"DAYA DARWAZA TODO\" as you sprint through the case! Tap to jump, survive as long as possible. Case #402: The Runaway awaits!",
    thumbnail:       '/games/chodu-cid-gameplay.jpg',
    banner:          '/games/chodu-cid-gameplay.jpg',
    gameplayVideo:   '/games/chodu-cid-gameplay.mp4',
    category:        'arcade',
    tags:            ['endless-run', 'cid', 'arcade', 'india', 'comedy', 'tap'],
    originalUrl:     'https://chor-police-run.vercel.app',
    launchMode:      'embed',
    featured:        true,
    published:       true,
    instructions:    'Tap anywhere to jump and avoid obstacles. Survive as long as possible! Case #402: The Runaway.',
    controls:        ['Tap / Click — Jump', 'Double tap — Double Jump', 'P — Pause'],
    releaseDate:     '2024-01-01',
    developer:       'XYZ Games',
  },
  {
    id:              'game-002',
    name:            'Namma Auto',
    slug:            'namma-auto',
    description:     'Real Indiranagar streets, 3D auto-rickshaw, 5 passengers — no timer, full chill vibes 🛺',
    longDescription: "Namma Auto is a gorgeous 3D driving experience set in real Indiranagar streets using OpenStreetMap data. Pick up 5 passengers, follow the mint route on your map, and stop in the glowing circle to finish each trip. Real roads, illustrated city, chill vibes. Desktop keyboard required!",
    thumbnail:       '/games/namma-auto-gameplay.jpg',
    banner:          '/games/namma-auto-gameplay.jpg',
    gameplayVideo:   '/games/namma-auto-gameplay.mp4',
    category:        'action',
    tags:            ['driving', '3d', 'india', 'bangalore', 'indiranagar', 'openstreetmap'],
    originalUrl:     'https://namma-auto-three.vercel.app',
    launchMode:      'embed',
    featured:        true,
    published:       true,
    instructions:    'Take 5 passengers around Indiranagar. Follow the mint route on your map and stop in the glowing circle.',
    controls:        ['W — Accelerate', 'S — Brake / Reverse', 'A D — Steer', 'Back to road — if stuck'],
    releaseDate:     '2024-02-01',
    developer:       'XYZ Games',
  },
  {
    id:              'game-003',
    name:            'Poli Fight',
    slug:            'poli-fight',
    description:     'Chai Wala chases Pappu across India! Change lanes, jump, grab votes — Bharat Daud 🗳️🏃',
    longDescription: "BHARAT DAUD — You are Chai Wala. Chase Pappu through Delhi, UP, Bihar, Mumbai, Bengaluru, Rajasthan & Uttarakhand! Every state throws its own obstacles on the road. Grab votes, answer quizzes and run through the right answer gate to close the gap! Change lanes, jump, slide!",
    thumbnail:       '/games/poli-fight-gameplay.jpg',
    banner:          '/games/poli-fight-gameplay.jpg',
    gameplayVideo:   '/games/poli-fight-gameplay.mp4',
    category:        'action',
    tags:            ['runner', 'politics', 'india', 'lane-runner', 'quiz', 'bharat'],
    originalUrl:     'https://poli-fight.vercel.app',
    launchMode:      'embed',
    featured:        true,
    published:       true,
    instructions:    'Change lanes, jump and slide to collect votes. Answer quiz gates to close the gap on Pappu!',
    controls:        ['A D / Arrow keys — Change lane', 'W / Space — Jump', 'S / Down — Slide', 'P / M — Pause / Mute'],
    releaseDate:     '2024-03-01',
    developer:       'Om Shukla',
    version:         '2.1',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

export const publishedGames = (): Game[] =>
  games.filter(g => g.published);

export const featuredGames = (): Game[] =>
  publishedGames().filter(g => g.featured);

export const newestGames = (): Game[] =>
  [...publishedGames()].sort((a, b) => {
    if (!a.releaseDate || !b.releaseDate) return 0;
    return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
  });

export const gamesByCategory = (categoryId: string): Game[] =>
  publishedGames().filter(g => g.category === categoryId);

export const getGameBySlug = (slug: string): Game | undefined =>
  games.find(g => g.slug === slug);

export const searchGames = (query: string): Game[] => {
  const q = query.toLowerCase().trim();
  if (!q) return publishedGames();
  return publishedGames().filter(
    g =>
      g.name.toLowerCase().includes(q) ||
      g.description.toLowerCase().includes(q) ||
      g.tags.some(t => t.toLowerCase().includes(q)) ||
      g.category.toLowerCase().includes(q)
  );
};

export const resolveLaunchUrl = (game: Game): string => {
  if (game.launchMode === 'subdomain' && game.customDomain) {
    return game.customDomain;
  }
  return game.originalUrl;
};
