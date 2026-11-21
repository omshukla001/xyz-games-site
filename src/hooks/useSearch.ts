import { useState, useMemo, useCallback } from 'react';
import { type Game, publishedGames } from '../data/games';

export type SortOption = 'newest' | 'alpha' | 'featured';

export interface UseSearchResult {
  query:       string;
  setQuery:    (q: string) => void;
  category:    string;
  setCategory: (c: string) => void;
  sort:        SortOption;
  setSort:     (s: SortOption) => void;
  results:     Game[];
  total:       number;
  hasResults:  boolean;
  reset:       () => void;
}

export function useSearch(initialCategory = ''): UseSearchResult {
  const [query,    setQuery]    = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [sort,     setSort]     = useState<SortOption>('newest');

  const results = useMemo(() => {
    let games = publishedGames();

    // Filter by category
    if (category) {
      games = games.filter(g => g.category === category);
    }

    // Filter by search query
    if (query.trim()) {
      const q = query.toLowerCase().trim();
      games = games.filter(
        g =>
          g.name.toLowerCase().includes(q) ||
          g.description.toLowerCase().includes(q) ||
          g.tags.some(t => t.toLowerCase().includes(q))
      );
    }

    // Sort
    switch (sort) {
      case 'alpha':
        return [...games].sort((a, b) => a.name.localeCompare(b.name));
      case 'featured':
        return [...games].sort((a, b) => Number(b.featured) - Number(a.featured));
      case 'newest':
      default:
        return [...games].sort((a, b) => {
          if (!a.releaseDate || !b.releaseDate) return 0;
          return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
        });
    }
  }, [query, category, sort]);

  const reset = useCallback(() => {
    setQuery('');
    setCategory('');
    setSort('newest');
  }, []);

  return {
    query,    setQuery,
    category, setCategory,
    sort,     setSort,
    results,
    total:      results.length,
    hasResults: results.length > 0,
    reset,
  };
}
