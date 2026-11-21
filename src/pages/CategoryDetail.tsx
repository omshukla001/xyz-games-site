import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import GameGrid from '../components/GameGrid/GameGrid';
import { getCategoryBySlug } from '../data/categories';
import { gamesByCategory } from '../data/games';

export default function CategoryDetail() {
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getCategoryBySlug(slug) : undefined;
  const games    = category ? gamesByCategory(category.id) : [];

  if (!category) {
    return (
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-20 text-center">
        <h1 className="font-display text-3xl font-bold mb-4">Category not found</h1>
        <Link to="/categories" className="btn-primary">Back to Categories</Link>
      </main>
    );
  }

  return (
    <>
      <SEO
        title={`${category.name} Games`}
        description={`Play free ${category.name.toLowerCase()} games online. ${category.description}`}
        url={`/categories/${category.slug}`}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Back */}
        <Link to="/categories" className="btn-ghost mb-6 inline-flex items-center gap-2 text-brand-muted">
          <ArrowLeft className="w-4 h-4" /> All Categories
        </Link>

        {/* Header */}
        <div className="mb-10">
          <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${category.color} text-white mb-3`}>
            {category.name}
          </span>
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3">
            {category.name} <span className="gradient-text">Games</span>
          </h1>
          <p className="text-brand-muted text-lg">{category.description}</p>
        </div>

        <GameGrid
          games={games}
          columns={4}
          emptyMessage={`No ${category.name.toLowerCase()} games yet. Check back soon!`}
        />
      </main>
    </>
  );
}
