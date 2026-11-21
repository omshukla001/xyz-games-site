import SEO from '../components/SEO/SEO';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import { categories } from '../data/categories';

export default function Categories() {
  return (
    <>
      <SEO
        title="Game Categories"
        description="Browse games by category — action, puzzle, arcade, adventure, strategy and more."
        url="/categories"
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="mb-10">
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-3">
            Game <span className="gradient-text">Categories</span>
          </h1>
          <p className="text-brand-muted text-lg">Find exactly the type of game you're looking for.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id} category={cat} index={i} />
          ))}
        </div>
      </main>
    </>
  );
}
