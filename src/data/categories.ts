// ─── Game categories ─────────────────────────────────────────────────────────

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;        // Lucide icon name string (resolved in component)
  color: string;       // Tailwind gradient classes
  count?: number;      // Computed dynamically from games list
}

export const categories: Category[] = [
  {
    id:          'action',
    name:        'Action',
    slug:        'action',
    description: 'Fast-paced games that test your reflexes and skill.',
    icon:        'Zap',
    color:       'from-red-500 to-orange-500',
  },
  {
    id:          'puzzle',
    name:        'Puzzle',
    slug:        'puzzle',
    description: 'Brain teasers and logic challenges for every level.',
    icon:        'Grid3x3',
    color:       'from-blue-500 to-cyan-500',
  },
  {
    id:          'arcade',
    name:        'Arcade',
    slug:        'arcade',
    description: 'Classic arcade gameplay with a modern twist.',
    icon:        'Gamepad2',
    color:       'from-purple-500 to-pink-500',
  },
  {
    id:          'adventure',
    name:        'Adventure',
    slug:        'adventure',
    description: 'Explore worlds, complete quests, and unravel stories.',
    icon:        'Map',
    color:       'from-green-500 to-teal-500',
  },
  {
    id:          'strategy',
    name:        'Strategy',
    slug:        'strategy',
    description: 'Outsmart opponents with cunning tactics and planning.',
    icon:        'Chess',
    color:       'from-yellow-500 to-amber-500',
  },
  {
    id:          'sports',
    name:        'Sports',
    slug:        'sports',
    description: 'Competitive sports and racing games.',
    icon:        'Trophy',
    color:       'from-sky-500 to-blue-500',
  },
  {
    id:          'rpg',
    name:        'RPG',
    slug:        'rpg',
    description: 'Level up characters and embark on epic quests.',
    icon:        'Sword',
    color:       'from-indigo-500 to-purple-500',
  },
  {
    id:          'casual',
    name:        'Casual',
    slug:        'casual',
    description: 'Easy to pick up, satisfying to master.',
    icon:        'Smile',
    color:       'from-pink-500 to-rose-500',
  },
];

export const getCategoryById = (id: string): Category | undefined =>
  categories.find(c => c.id === id);

export const getCategoryBySlug = (slug: string): Category | undefined =>
  categories.find(c => c.slug === slug);
