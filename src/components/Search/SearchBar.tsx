import { Search, X } from 'lucide-react';
import { categories } from '../../data/categories';
import type { SortOption } from '../../hooks/useSearch';

interface SearchBarProps {
  query:       string;
  onQuery:     (q: string) => void;
  category:    string;
  onCategory:  (c: string) => void;
  sort:        SortOption;
  onSort:      (s: SortOption) => void;
  onReset:     () => void;
  resultCount: number;
  className?:  string;
}

export default function SearchBar({
  query, onQuery, category, onCategory, sort, onSort, onReset, resultCount, className = '',
}: SearchBarProps) {
  const hasFilters = !!(query || category || sort !== 'newest');

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-dim pointer-events-none" />
        <input
          type="search"
          value={query}
          onChange={e => onQuery(e.target.value)}
          placeholder="Search games, tags, categories…"
          className="w-full bg-brand-card border border-brand-border rounded-xl
                     pl-10 pr-4 py-3 text-sm text-brand-text placeholder-brand-dim
                     focus:outline-none focus:border-brand-purple transition-colors"
          aria-label="Search games"
        />
      </div>

      {/* Filters row */}
      <div className="flex flex-wrap gap-3 items-center">
        {/* Category filter */}
        <select
          value={category}
          onChange={e => onCategory(e.target.value)}
          className="bg-brand-card border border-brand-border rounded-lg px-3 py-2 text-sm text-brand-text
                     focus:outline-none focus:border-brand-purple transition-colors cursor-pointer"
          aria-label="Filter by category"
        >
          <option value="">All Categories</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sort}
          onChange={e => onSort(e.target.value as SortOption)}
          className="bg-brand-card border border-brand-border rounded-lg px-3 py-2 text-sm text-brand-text
                     focus:outline-none focus:border-brand-purple transition-colors cursor-pointer"
          aria-label="Sort games"
        >
          <option value="newest">Newest First</option>
          <option value="alpha">A–Z</option>
          <option value="featured">Featured</option>
        </select>

        {/* Reset */}
        {hasFilters && (
          <button
            onClick={onReset}
            className="btn-ghost text-xs flex items-center gap-1 text-brand-dim hover:text-brand-muted"
          >
            <X className="w-3.5 h-3.5" />
            Clear filters
          </button>
        )}

        {/* Result count */}
        <span className="ml-auto text-xs text-brand-dim">
          {resultCount} game{resultCount !== 1 ? 's' : ''}
        </span>
      </div>
    </div>
  );
}
