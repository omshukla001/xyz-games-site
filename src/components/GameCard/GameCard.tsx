import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Play, Star, Info, ExternalLink } from 'lucide-react';
import type { Game } from '../../data/games';
import { resolveLaunchUrl } from '../../data/games';
import { getCategoryById } from '../../data/categories';

interface GameCardProps { game:Game; variant?:'default'|'wide'; className?:string; index?:number }

export default function GameCard({ game, variant='default', className='', index=0 }: GameCardProps) {
  const launchUrl = resolveLaunchUrl(game);
  const isEmbed   = game.launchMode === 'embed';
  const path      = `/game/${game.slug}`;
  const cat       = getCategoryById(game.category);
  const isWide    = variant === 'wide';

  return (
    <motion.article
      initial={{ opacity:0, y:28 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:.45, delay:index*.08 }}
      className={`card group relative ${isWide ? 'flex gap-0' : 'flex flex-col'} ${className}`}
    >
      {/* Top blue glow line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] z-10 rounded-t-[1rem]"
        style={{ background:'linear-gradient(90deg,transparent,#0066FF 40%,#00D4FF 60%,transparent)' }}/>

      {/* Thumbnail */}
      <Link to={path} className={`block flex-shrink-0 ${isWide ? 'w-56' : 'w-full'}`}>
        <div className={`relative overflow-hidden ${isWide ? 'h-full min-h-[160px]' : 'aspect-video'}`}
          style={{ background:'#0E1420' }}>
          {game.thumbnail ? (
            <img src={game.thumbnail} alt={game.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy" decoding="async"/>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-3"
              style={{ background:'linear-gradient(135deg,#0E1420,#131B2A)' }}>
              <Play className="w-10 h-10" style={{ color:'#0066FF', filter:'drop-shadow(0 0 10px rgba(0,102,255,.7))' }}/>
              <span className="text-xs font-semibold text-center px-4 line-clamp-1" style={{ color:'#445566' }}>{game.name}</span>
            </div>
          )}

          {/* Featured badge */}
          {game.featured && (
            <div className="absolute top-2 left-2 z-10">
              <span className="inline-flex items-center gap-1 text-[9px] font-black px-2 py-1 rounded-full text-white uppercase tracking-widest"
                style={{ background:'linear-gradient(90deg,#0055DD,#00AAFF)', boxShadow:'0 0 10px rgba(0,102,255,.6)' }}>
                <Star className="w-2.5 h-2.5 fill-white"/> Featured
              </span>
            </div>
          )}

          {/* Hover play overlay */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center"
            style={{ background:'rgba(8,12,20,.75)' }}>
            <div className="w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ background:'linear-gradient(135deg,#0055DD,#0088FF)', boxShadow:'0 0 30px rgba(0,102,255,.8), 0 0 60px rgba(0,102,255,.3)' }}>
              <Play className="w-8 h-8 fill-white text-white translate-x-0.5"/>
            </div>
          </div>
        </div>
      </Link>

      {/* Body */}
      <div className="flex-1 flex flex-col p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <Link to={path} className="font-display font-bold text-sm text-white line-clamp-1 flex-1 hover:text-gl-cyan transition-colors">
            {game.name}
          </Link>
          {cat && (
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0"
              style={{ background:'rgba(0,102,255,.15)', color:'#00D4FF', border:'1px solid rgba(0,102,255,.3)' }}>
              {cat.name}
            </span>
          )}
        </div>

        <p className="text-xs line-clamp-2 mb-4 leading-relaxed flex-1" style={{ color:'#8899BB' }}>
          {game.description}
        </p>

        <div className="flex gap-2 mt-auto">
          {isEmbed ? (
            <Link to={`/play/${game.slug}`} className="btn-primary flex-1 justify-center text-xs py-2.5">
              <Play className="w-3.5 h-3.5 fill-white"/> Play Now
            </Link>
          ) : (
            <a href={launchUrl} target="_blank" rel="noopener noreferrer"
              className="btn-primary flex-1 justify-center text-xs py-2.5">
              <Play className="w-3.5 h-3.5 fill-white"/> Play Now
            </a>
          )}
          <Link to={path} className="btn-secondary text-xs py-2.5 px-3 border-gl-border">
            <Info className="w-3.5 h-3.5"/>
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

/* Wide "featured spotlight" card used on homepage */
export function GameSpotlight({ game, index=0 }: { game:Game; index?:number }) {
  const launchUrl = resolveLaunchUrl(game);
  const cat       = getCategoryById(game.category);

  return (
    <motion.div
      initial={{ opacity:0, y:32 }}
      animate={{ opacity:1, y:0 }}
      transition={{ duration:.5, delay:index*.12 }}
      className="relative group overflow-hidden rounded-2xl"
      style={{ background:'#131B2A', border:'1px solid #1E2A3E' }}
    >
      {/* Poster */}
      <div className="relative aspect-[16/9] overflow-hidden">
        <img src={game.thumbnail} alt={game.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"/>
        {/* Gradient overlay */}
        <div className="absolute inset-0"
          style={{ background:'linear-gradient(to top, rgba(8,12,20,1) 0%, rgba(8,12,20,.4) 50%, transparent 100%)' }}/>

        {/* Category pill on image */}
        {cat && (
          <div className="absolute top-3 left-3">
            <span className="text-[10px] font-black px-2.5 py-1 rounded-full text-white uppercase tracking-widest"
              style={{ background:'rgba(8,12,20,.75)', border:'1px solid rgba(255,255,255,.2)', backdropFilter:'blur(8px)' }}>
              {cat.name}
            </span>
          </div>
        )}

        {/* Hover play button */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-18 h-18 rounded-full flex items-center justify-center"
            style={{ background:'linear-gradient(135deg,#0055DD,#0088FF)', boxShadow:'0 0 40px rgba(0,102,255,.9)', width:72, height:72 }}>
            <Play className="w-9 h-9 fill-white text-white translate-x-0.5"/>
          </div>
        </div>
      </div>

      {/* Info row */}
      <div className="p-4 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display font-bold text-white text-base mb-0.5 truncate">{game.name}</h3>
          <p className="text-xs line-clamp-1" style={{ color:'#8899BB' }}>{game.description}</p>
        </div>
        <a href={launchUrl} target="_blank" rel="noopener noreferrer"
          className="flex-shrink-0 btn-primary text-xs px-5 py-2.5">
          <Play className="w-3.5 h-3.5 fill-white"/> Play
        </a>
      </div>
    </motion.div>
  );
}
