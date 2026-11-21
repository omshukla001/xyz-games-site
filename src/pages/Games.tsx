import SEO from '../components/SEO/SEO';
import SearchBar from '../components/Search/SearchBar';
import GameGrid from '../components/GameGrid/GameGrid';
import AdBanner from '../components/Advertisement/AdBanner';
import { useSearch } from '../hooks/useSearch';

export default function Games() {
  const { query, setQuery, category, setCategory, sort, setSort, results, total, reset } = useSearch();

  return (
    <>
      <SEO
        title="All Games"
        description="Browse the complete XYZ Games.site library of free browser games."
        url="/games"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="mb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3">
            All <span className="gradient-text">Games</span>
          </h1>
          <p className="text-brand-muted">Every game in the XYZ Games.site library.</p>
        </div>

        <SearchBar
          query={query}       onQuery={setQuery}
          category={category} onCategory={setCategory}
          sort={sort}         onSort={setSort}
          onReset={reset}
          resultCount={total}
          className="mb-8"
        />

        <AdBanner slot="gamesBanner" />

        <GameGrid
          games={results}
          columns={4}
          emptyMessage="No games found. Check back soon — new games are added regularly."
          className="mt-8"
        />
      </main>
    </>
  );
}
