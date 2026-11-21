import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Play, ExternalLink, ArrowLeft, Tag, Gamepad2, Info, Keyboard,
} from 'lucide-react';
import SEO from '../components/SEO/SEO';
import AdSidebar from '../components/Advertisement/AdSidebar';
import AdBanner from '../components/Advertisement/AdBanner';
import { getGameBySlug, resolveLaunchUrl } from '../data/games';
import { getCategoryById } from '../data/categories';

export default function GameDetails() {
  const { slug }  = useParams<{ slug: string }>();
  const game      = slug ? getGameBySlug(slug) : undefined;

  if (!game || !game.published) {
    return (
      <main className="max-w-7xl mx-auto px-4 pt-24 pb-20 text-center">
        <Gamepad2 className="w-12 h-12 text-brand-muted mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold mb-4">Game not found</h1>
        <p className="text-brand-muted mb-6">This game doesn't exist or isn't published yet.</p>
        <Link to="/games" className="btn-primary">Browse All Games</Link>
      </main>
    );
  }

  const launchUrl = resolveLaunchUrl(game);
  const isEmbed   = game.launchMode === 'embed';
  const category  = getCategoryById(game.category);

  return (
    <>
      <SEO
        title={game.name}
        description={game.description}
        image={game.banner || game.thumbnail}
        url={`/game/${game.slug}`}
      />

      {/* Banner */}
      {game.banner && (
        <div className="relative h-72 sm:h-96 overflow-hidden">
          <img src={game.banner} alt={`${game.name} banner`} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-bg via-brand-bg/60 to-transparent" />
        </div>
      )}

      <main className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20 ${game.banner ? '-mt-32 relative' : 'pt-24'}`}>
        {/* Back */}
        <Link to="/games" className="btn-ghost mb-6 inline-flex items-center gap-2 text-brand-muted">
          <ArrowLeft className="w-4 h-4" /> All Games
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Game header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-brand-card border border-brand-border rounded-2xl p-6 sm:p-8"
            >
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Thumbnail */}
                <div className="flex-shrink-0 w-full sm:w-48 aspect-video sm:aspect-square rounded-xl overflow-hidden bg-brand-bg border border-brand-border">
                  {game.thumbnail ? (
                    <img src={game.thumbnail} alt={game.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Gamepad2 className="w-10 h-10 text-brand-dim" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  {game.featured && (
                    <span className="inline-block text-[10px] font-semibold px-2 py-1 rounded-full bg-brand-purple text-white mb-2">
                      ⭐ Featured
                    </span>
                  )}
                  <h1 className="font-display text-3xl sm:text-4xl font-black mb-2">{game.name}</h1>

                  {category && (
                    <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${category.color} text-white mb-4`}>
                      {category.name}
                    </span>
                  )}

                  <p className="text-brand-muted text-sm leading-relaxed mb-5">
                    {game.longDescription ?? game.description}
                  </p>

                  {/* Play buttons */}
                  <div className="flex flex-wrap gap-3">
                    <Link to={`/play/${game.slug}`} className="btn-primary">
                      <Play className="w-4 h-4 fill-white" />
                      Play Now
                    </Link>
                    <a href={launchUrl} target="_blank" rel="noopener noreferrer" className="btn-secondary text-sm">
                      <ExternalLink className="w-4 h-4" />
                      Open Game Site
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Instructions */}
            {game.instructions && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-brand-card border border-brand-border rounded-2xl p-6"
              >
                <h2 className="font-display font-semibold flex items-center gap-2 mb-3">
                  <Info className="w-4 h-4 text-brand-blue" />
                  How to Play
                </h2>
                <p className="text-brand-muted text-sm leading-relaxed">{game.instructions}</p>
              </motion.div>
            )}

            {/* Controls */}
            {game.controls && game.controls.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="bg-brand-card border border-brand-border rounded-2xl p-6"
              >
                <h2 className="font-display font-semibold flex items-center gap-2 mb-4">
                  <Keyboard className="w-4 h-4 text-brand-purple" />
                  Controls
                </h2>
                <ul className="space-y-2">
                  {game.controls.map((ctrl, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-brand-muted">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-purple flex-shrink-0" />
                      {ctrl}
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}

            {/* Tags */}
            {game.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 items-center">
                <Tag className="w-3.5 h-3.5 text-brand-dim" />
                {game.tags.map(tag => (
                  <Link
                    key={tag}
                    to={`/discover?q=${encodeURIComponent(tag)}`}
                    className="text-xs px-2.5 py-1 rounded-full bg-brand-card border border-brand-border
                               text-brand-muted hover:border-brand-purple/50 hover:text-brand-purple transition-colors"
                  >
                    {tag}
                  </Link>
                ))}
              </div>
            )}

            {/* Ad below game details */}
            <AdBanner slot="gameDetailsBottom" />
          </div>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Meta info card */}
            <div className="bg-brand-card border border-brand-border rounded-2xl p-5 text-sm space-y-3">
              {game.developer && (
                <MetaRow label="Developer" value={game.developer} />
              )}
              {game.version && (
                <MetaRow label="Version" value={game.version} />
              )}
              {game.releaseDate && (
                <MetaRow label="Released" value={new Date(game.releaseDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
              )}
              <MetaRow label="Platform" value="Browser (HTML5)" />
              <MetaRow label="Price" value="Free to Play" />
            </div>

            {/* Sidebar ad */}
            <AdSidebar />
          </aside>
        </div>
      </main>
    </>
  );
}

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between items-center border-b border-brand-border/50 pb-2 last:border-0 last:pb-0">
      <span className="text-brand-dim">{label}</span>
      <span className="text-brand-muted font-medium text-right">{value}</span>
    </div>
  );
}
