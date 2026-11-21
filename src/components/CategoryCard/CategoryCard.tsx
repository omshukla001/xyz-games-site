import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Grid3X3, Gamepad2, Map, Trophy, Sword, Smile, HelpCircle, type LucideIcon } from 'lucide-react';
import type { Category } from '../../data/categories';
import { gamesByCategory } from '../../data/games';

const ICONS: Record<string, LucideIcon> = { Zap, Grid3x3: Grid3X3, Gamepad2, Map, Chess: Trophy, Trophy, Sword, Smile };

const COLORS = ['#0066FF','#00D4FF','#FF6B00','#00E676','#9D5FFF','#FF3D71'];

export default function CategoryCard({ category, index = 0, className = '' }: { category: Category; index?: number; className?: string }) {
  const Icon  = ICONS[category.icon] ?? HelpCircle;
  const count = gamesByCategory(category.id).length;
  const c     = COLORS[index % COLORS.length];

  return (
    <motion.div
      initial={{ opacity: 0, scale: .94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: .35, delay: index * .05 }}
      whileHover={{ y: -4 }}
    >
      <Link to={`/categories/${category.slug}`}
        className={`group block rounded-xl p-5 transition-all duration-300 ${className}`}
        style={{ background: '#131B2A', border: `1px solid #1E2A3E` }}
        onMouseEnter={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = `${c}55`;
          el.style.boxShadow   = `0 12px 40px ${c}18, 0 0 0 1px ${c}30`;
        }}
        onMouseLeave={e => {
          const el = e.currentTarget as HTMLElement;
          el.style.borderColor = '#1E2A3E';
          el.style.boxShadow   = 'none';
        }}
      >
        <motion.div
          className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
          style={{ background: `${c}18`, border: `1px solid ${c}35` }}
          whileHover={{ scale: 1.12, rotate: 5 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          <Icon className="w-5 h-5" style={{ color: c }} aria-hidden/>
        </motion.div>
        <h3 className="font-display font-bold text-sm text-white mb-1 group-hover:text-gl-cyan transition-colors">{category.name}</h3>
        <p className="text-xs line-clamp-2 leading-relaxed mb-3" style={{ color: '#8899BB' }}>{category.description}</p>
        <span className="text-[10px] font-bold uppercase tracking-widest" style={{ color: `${c}99` }}>
          {count === 0 ? 'Coming soon' : `${count} game${count !== 1 ? 's' : ''}`}
        </span>
      </Link>
    </motion.div>
  );
}
