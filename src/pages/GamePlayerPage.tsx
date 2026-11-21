import { useParams, Link } from 'react-router-dom';
import { Gamepad2 } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import GamePlayer from '../components/GamePlayer/GamePlayer';
import AdBanner from '../components/Advertisement/AdBanner';
import { getGameBySlug } from '../data/games';

export default function GamePlayerPage() {
  const { slug } = useParams<{ slug: string }>();
  const game     = slug ? getGameBySlug(slug) : undefined;

  if (!game || !game.published) {
    return (
      <main className="max-w-5xl mx-auto px-4 pt-24 pb-20 text-center">
        <Gamepad2 className="w-12 h-12 text-brand-muted mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold mb-4">Game not found</h1>
        <Link to="/games" className="btn-primary">Browse All Games</Link>
      </main>
    );
  }

  return (
    <>
      <SEO
        title={`Play ${game.name}`}
        description={`Play ${game.name} free online. ${game.description}`}
        url={`/play/${game.slug}`}
      />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pt-20 pb-16">
        {/* Ad above game */}
        <AdBanner slot="gamePlayerAbove" className="mb-6" />

        <GamePlayer game={game} />

        {/* Ad below game */}
        <AdBanner slot="gamePlayerBelow" className="mt-6" />
      </main>
    </>
  );
}
