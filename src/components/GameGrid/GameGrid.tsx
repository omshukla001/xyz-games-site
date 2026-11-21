import { motion } from 'framer-motion';
import { Gamepad2 } from 'lucide-react';
import type { Game } from '../../data/games';
import GameCard from '../GameCard/GameCard';
import { Link } from 'react-router-dom';

interface GameGridProps {
  games:        Game[];
  title?:       string;
  subtitle?:    string;
  viewAllHref?: string;
  emptyMessage?: string;
  columns?:     2 | 3 | 4;
  className?:   string;
}

const colClasses: Record<number, string> = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

export default function GameGrid({
  games,
  title,
  subtitle,
  viewAllHref,
  emptyMessage = 'No games found.',
  columns = 3,
  className = '',
}: GameGridProps) {
  return (
    <section className={className}>
      {(title || viewAllHref) && (
        <div className="flex items-end justify-between mb-6">
          <div>
            {title && <h2 className="section-title">{title}</h2>}
            {subtitle && <p className="section-subtitle">{subtitle}</p>}
          </div>
          {viewAllHref && (
            <Link
              to={viewAllHref}
              className="text-sm font-medium text-brand-purple hover:text-brand-blue transition-colors flex items-center gap-1"
            >
              View all
              <span aria-hidden>→</span>
            </Link>
          )}
        </div>
      )}

      {games.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex flex-col items-center justify-center py-20 text-center"
        >
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
            style={{ background: 'rgba(0,255,136,.08)', border: '1px solid rgba(0,255,136,.3)', boxShadow: '0 0 20px rgba(0,255,136,.1)' }}>
            <Gamepad2 className="w-8 h-8 text-brand-green" />
          </div>
          <p className="text-brand-muted text-sm">{emptyMessage}</p>
        </motion.div>
      ) : (
        <div className={`grid ${colClasses[columns]} gap-5`}>
          {games.map((game, i) => (
            <GameCard key={game.id} game={game} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
