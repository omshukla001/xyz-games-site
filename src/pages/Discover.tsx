import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SEO from '../components/SEO/SEO';
import SearchBar from '../components/Search/SearchBar';
import GameGrid from '../components/GameGrid/GameGrid';
import AdBanner from '../components/Advertisement/AdBanner';
import { useSearch } from '../hooks/useSearch';

export default function Discover() {
  const [params] = useSearchParams();
  const { query, setQuery, category, setCategory, sort, setSort, results, total, reset } = useSearch();

  // Sync URL params on mount
  useEffect(() => {
    const q   = params.get('q')        ?? '';
    const cat = params.get('category') ?? '';
    const s   = params.get('sort')     ?? 'newest';
    if (q)   setQuery(q);
    if (cat) setCategory(cat);
    if (s)   setSort(s as 'newest' | 'alpha' | 'featured');
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <SEO
        title="Discover Games"
        description="Search and filter through our complete library of free browser games."
        url="/discover"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="mb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3">
            Discover <span className="gradient-text">Games</span>
          </h1>
          <p className="text-brand-muted text-lg">Search, filter and find your next favourite game.</p>
        </div>

        <SearchBar
          query={query}       onQuery={setQuery}
          category={category} onCategory={setCategory}
          sort={sort}         onSort={setSort}
          onReset={reset}
          resultCount={total}
          className="mb-10"
        />

        <AdBanner slot="discoverBanner" />

        <GameGrid
          games={results}
          columns={4}
          emptyMessage="No games match your search. Try different keywords or clear the filters."
          className="mt-8"
        />
      </main>
    </>
  );
}
