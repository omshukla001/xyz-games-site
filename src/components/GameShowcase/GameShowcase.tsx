import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Pause, Play, ExternalLink, Monitor } from 'lucide-react';
import type { Game } from '../../data/games';

/* ══════════════════════════════════════════════════════════════
   SCREENSHOT PREVIEW — shows the real game screenshot with
   an animated overlay of live game elements on top.
   Falls back to pure CSS scene if screenshot not found.
══════════════════════════════════════════════════════════════ */

/* ── Chodu CID overlay elements ── */
function CIDOverlay() {
  return (
    <>
      {/* Score counter */}
      <motion.div className="absolute top-3 left-3 font-black text-xs px-3 py-1.5 rounded-lg"
        style={{ background:'rgba(0,0,0,.75)', color:'#00FF41', fontFamily:'monospace', border:'1px solid rgba(0,255,65,.4)', backdropFilter:'blur(4px)' }}>
        SCORE: <motion.span animate={{ opacity:[1,.4,1] }} transition={{ duration:.8, repeat:Infinity }}>4,20,069</motion.span>
      </motion.div>

      {/* Case tag */}
      <div className="absolute top-3 right-3 text-[10px] font-black px-2 py-1 rounded"
        style={{ background:'rgba(0,0,0,.7)', color:'#FFD600', border:'1px solid rgba(255,214,0,.35)' }}>
        CASE #402
      </div>

      {/* Animated jump indicator */}
      <motion.div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 rounded-full"
        style={{ background:'rgba(0,0,0,.7)', border:'1px solid rgba(0,255,65,.5)', backdropFilter:'blur(4px)' }}
        animate={{ opacity:[.6,1,.6], scale:[1,1.04,1] }} transition={{ duration:1.4, repeat:Infinity }}>
        <span className="text-sm">👆</span>
        <span className="text-xs font-black" style={{ color:'#00FF41' }}>TAP ANYWHERE TO JUMP</span>
      </motion.div>

      {/* Animated "DAYA" text burst */}
      <motion.div className="absolute text-xs font-black px-2 py-1 rounded"
        style={{ top:48, right:16, color:'#FFD600', background:'rgba(0,0,0,.6)', textShadow:'0 0 8px rgba(255,214,0,.8)' }}
        animate={{ opacity:[0,1,1,0], y:[8,0,0,-8] }}
        transition={{ duration:3, repeat:Infinity, delay:1.5 }}>
        😂 DAYA! DARWAZA TODO!
      </motion.div>
    </>
  );
}

/* ── Namma Auto overlay elements ── */
function NammaAutoOverlay() {
  return (
    <>
      {/* Passenger count */}
      <motion.div className="absolute top-3 left-3 font-black text-xs px-3 py-1.5 rounded-lg"
        style={{ background:'rgba(0,0,0,.75)', color:'#FFB347', fontFamily:'monospace', border:'1px solid rgba(255,179,71,.4)', backdropFilter:'blur(4px)' }}>
        🛺 5 PASSENGERS
      </motion.div>

      {/* Location */}
      <div className="absolute top-3 right-3 text-[10px] font-black px-2 py-1 rounded"
        style={{ background:'rgba(0,0,0,.7)', color:'#00E676', border:'1px solid rgba(0,230,118,.35)' }}>
        📍 INDIRANAGAR
      </div>

      {/* Destination pulse */}
      <motion.div className="absolute bottom-14 right-6"
        animate={{ scale:[1,1.3,1], opacity:[.6,1,.6] }}
        transition={{ duration:1.2, repeat:Infinity }}>
        <div className="w-8 h-8 rounded-full border-3 border-green-400 flex items-center justify-center text-xs"
          style={{ border:'3px solid #00E676', background:'rgba(0,230,118,.2)', boxShadow:'0 0 16px rgba(0,230,118,.6)', color:'#00E676', fontWeight:900 }}>
          ✓
        </div>
      </motion.div>

      {/* Route hint */}
      <motion.div className="absolute bottom-14 left-3 text-[10px] font-semibold px-2 py-1 rounded"
        style={{ background:'rgba(0,0,0,.7)', color:'#00E676', border:'1px solid rgba(0,230,118,.3)' }}
        animate={{ opacity:[.5,1,.5] }} transition={{ duration:2, repeat:Infinity }}>
        🗺 Follow the mint route
      </motion.div>

      {/* Vibe badge */}
      <motion.div className="absolute text-xs font-black px-2 py-1 rounded"
        style={{ top:48, left:'50%', transform:'translateX(-50%)', color:'#FFB347', background:'rgba(0,0,0,.65)', whiteSpace:'nowrap' }}
        animate={{ opacity:[0,1,1,0] }} transition={{ duration:3, repeat:Infinity, delay:2 }}>
        🛺 "Swalpa adjust maadi bhai!"
      </motion.div>
    </>
  );
}

/* ── Poli Fight overlay elements ── */
function PoliFightOverlay() {
  return (
    <>
      {/* Votes counter */}
      <motion.div className="absolute top-3 left-3 font-black text-xs px-3 py-1.5 rounded-lg"
        style={{ background:'rgba(0,0,0,.75)', color:'#FF9933', fontFamily:'monospace', border:'1px solid rgba(255,153,51,.4)', backdropFilter:'blur(4px)' }}>
        🗳️ VOTES: <motion.span animate={{ opacity:[1,.4,1] }} transition={{ duration:.9, repeat:Infinity }}>1,40,000</motion.span>
      </motion.div>

      {/* State label */}
      <motion.div className="absolute top-3 right-3 text-[10px] font-black px-2 py-1 rounded"
        style={{ background:'rgba(0,0,0,.7)', color:'#138808', border:'1px solid rgba(19,136,8,.4)' }}
        animate={{ opacity:[.7,1,.7] }} transition={{ duration:1.8, repeat:Infinity }}>
        📍 BHARAT DAUD
      </motion.div>

      {/* Gap meter */}
      <motion.div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ width:120 }}>
        <div className="text-[10px] font-black" style={{ color:'rgba(255,255,255,.7)' }}>GAP TO RAHUL</div>
        <div className="w-full h-2 rounded-full" style={{ background:'rgba(255,255,255,.15)' }}>
          <motion.div className="h-full rounded-full"
            style={{ background:'linear-gradient(90deg,#FF9933,#138808)' }}
            animate={{ width:['35%','55%','35%'] }} transition={{ duration:2.5, repeat:Infinity }}/>
        </div>
      </motion.div>

      {/* Slang pop */}
      <motion.div className="absolute text-xs font-black px-2 py-1 rounded"
        style={{ top:48, left:'50%', transform:'translateX(-50%)', color:'#FFD600', background:'rgba(0,0,0,.65)', whiteSpace:'nowrap', textShadow:'0 0 8px rgba(255,214,0,.7)' }}
        animate={{ opacity:[0,1,1,0] }} transition={{ duration:3, repeat:Infinity, delay:1 }}>
        🇮🇳 "Vote loot karo bhai!"
      </motion.div>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   GAME THUMBNAIL with screenshot + overlay
══════════════════════════════════════════════════════════════ */
function GamePreview({ game, overlay }: { game: Game; overlay: React.ReactNode }) {
  const [imgError, setImgError] = useState(false);
  const [previewPlaying, setPreviewPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (previewPlaying) {
      void video.play().catch(() => setPreviewPlaying(false));
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [game.gameplayVideo, previewPlaying]);

  return (
    <div className="relative w-full overflow-hidden rounded-t-2xl"
      style={{ aspectRatio:'16/9', background:'#0E1420' }}
      onMouseEnter={event => {
        if (game.gameplayVideo && !(event.target instanceof Element && event.target.closest('button'))) {
          setPreviewPlaying(true);
        }
      }}
      onMouseLeave={() => setPreviewPlaying(false)}
      onFocusCapture={() => { if (game.gameplayVideo) setPreviewPlaying(true); }}
      onBlurCapture={event => {
        if (!(event.relatedTarget instanceof Node) || !event.currentTarget.contains(event.relatedTarget)) {
          setPreviewPlaying(false);
        }
      }}>

      {/* Keep the poster visible until the viewer previews the clip. */}
      {!imgError && game.thumbnail && (
        <img
          src={game.thumbnail}
          alt={game.name}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${previewPlaying ? 'opacity-0' : 'opacity-100'}`}
          onError={() => setImgError(true)}
        />
      )}

      {game.gameplayVideo && (
        <video ref={videoRef} src={game.gameplayVideo} poster={game.thumbnail}
          autoPlay={previewPlaying} loop muted playsInline preload="none"
          aria-label={`${game.name} silent gameplay preview`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${previewPlaying ? 'opacity-100' : 'opacity-0'}`}
          onError={() => setPreviewPlaying(false)}/>
      )}

      {/* Dark overlay so animated elements are readable */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: imgError
          ? 'linear-gradient(135deg,#0E1420,#131B2A)'
          : 'linear-gradient(to top,rgba(0,0,0,.55) 0%,rgba(0,0,0,.2) 60%,rgba(0,0,0,.35) 100%)' }}/>

      {/* Fallback icon when no screenshot */}
      {imgError && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
          <Monitor className="w-10 h-10" style={{ color:'#8899BB' }}/>
          <div className="text-xs text-center px-6" style={{ color:'#8899BB' }}>
            <div className="font-bold mb-1">Screenshot coming soon</div>
            <div className="opacity-60">Take a screenshot of the game and save to</div>
            <code className="text-[10px] opacity-80 block mt-1" style={{ color:'#00D4FF' }}>
              public/games/{game.slug}-screen.png
            </code>
          </div>
        </div>
      )}

      {/* Animated overlay elements */}
      {!game.gameplayVideo && overlay}

      {/* Play button center hover */}
      <div className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${previewPlaying ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
        <button type="button" aria-label={`${previewPlaying ? 'Pause' : 'Play'} muted ${game.name} preview`}
          aria-pressed={previewPlaying}
          onClick={() => setPreviewPlaying(playing => !playing)}
          className="pointer-events-auto w-16 h-16 rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
          style={{ background:'rgba(0,102,255,.9)', boxShadow:'0 0 30px rgba(0,102,255,.8)' }}>
          {previewPlaying
            ? <Pause className="w-7 h-7 fill-white text-white"/>
            : <Play className="w-8 h-8 fill-white text-white translate-x-0.5"/>}
        </button>
      </div>

      {game.gameplayVideo && (
        <span className="absolute bottom-3 right-3 z-10 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest text-white"
          style={{ background:'rgba(8,12,20,.72)', border:'1px solid rgba(255,255,255,.16)', backdropFilter:'blur(8px)' }}>
          {previewPlaying ? 'Muted preview' : 'Hover to preview · muted'}
        </span>
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   SHOWCASE CARD
══════════════════════════════════════════════════════════════ */
interface CardConfig {
  overlay:      React.ReactNode;
  accentColor:  string;
  accentColor2: string;
  badge:        string;
  slangs:       string[];
}

const CONFIGS: Record<string, CardConfig> = {
  'chodu-cid': {
    overlay:      <CIDOverlay/>,
    accentColor:  '#00FF41',
    accentColor2: '#00AAFF',
    badge:        '🕵️ ENDLESS RUNNER',
    slangs: [
      '😂 "DAYA! DARWAZA TODO!"',
      '🕵️ ACP Pradyuman on the case!',
      '👟 Tap to jump, bhai!',
    ],
  },
  'namma-auto': {
    overlay:      <NammaAutoOverlay/>,
    accentColor:  '#FFB347',
    accentColor2: '#00E676',
    badge:        '🛺 3D DRIVING',
    slangs: [
      '🛺 "Swalpa adjust maadi bhai!"',
      '🗺 Real Indiranagar streets!',
      '😎 No timer — chill vibes only!',
    ],
  },
  'poli-fight': {
    overlay:      <PoliFightOverlay/>,
    accentColor:  '#FF9933',
    accentColor2: '#138808',
    badge:        '🇮🇳 BHARAT DAUD',
    slangs: [
      '🗳️ "Vote loot karo bhai!"',
      '🏃 Modi chases Rahul pan India!',
      '🧠 Answer quiz gates to win!',
    ],
  },
};

function ShowcaseCard({ game, index }: { game: Game; index: number }) {
  const cfg = CONFIGS[game.slug] ?? {
    overlay: null,
    accentColor: '#0066FF',
    accentColor2: '#00D4FF',
    badge: '🎮 BROWSER GAME',
    slangs: ['🎮 Click to play!'],
  };

  const { accentColor, accentColor2, badge, slangs } = cfg;
  const [slangIndex, setSlangIndex] = useState(0);

  useEffect(() => {
    if (slangs.length < 2) return;
    const timer = window.setInterval(() => {
      setSlangIndex(index => (index + 1) % slangs.length);
    }, 3000);
    return () => window.clearInterval(timer);
  }, [slangs.length]);

  return (
    <motion.div
      initial={{ opacity:0, y:40 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true, margin:'-60px' }}
      transition={{ duration:.55, delay:index*.15 }}
      whileHover={{ y:-6 }}
      className="showcase-card group relative flex flex-col overflow-hidden rounded-2xl"
      style={{ background:'#0E1420', border:`1px solid ${accentColor}35`, '--card-accent':accentColor } as React.CSSProperties}
    >
      {/* Top glow bar */}
      <div className="absolute top-0 left-0 right-0 h-[3px] z-20 rounded-t-2xl"
        style={{ background:`linear-gradient(90deg,transparent,${accentColor},${accentColor2},transparent)`, boxShadow:`0 0 14px ${accentColor}` }}/>

      {/* Badge on preview */}
      <div className="absolute top-4 left-4 z-30">
        <span className="text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap"
          style={{ background:'rgba(0,0,0,.75)', border:`1px solid ${accentColor}60`, color:accentColor, backdropFilter:'blur(8px)' }}>
          {badge}
        </span>
      </div>

      {/* Game preview with real screenshot + animated overlay */}
      <div className="relative z-10">
        <GamePreview game={game} overlay={cfg.overlay}/>
      </div>

      {/* Info panel */}
      <div className="flex-1 flex flex-col p-5 sm:p-6 gap-3.5">

        {/* Title */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-black text-xl sm:text-2xl text-white tracking-tight">{game.name}</h3>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap flex-shrink-0 mt-1"
            style={{ background:`${accentColor}18`, color:accentColor, border:`1px solid ${accentColor}40` }}>
            {game.category.toUpperCase()}
          </span>
        </div>

        {/* Rotating slangs */}
        <div className="h-5 relative overflow-hidden">
          <AnimatePresence mode="wait" initial={false}>
            <motion.p key={slangs[slangIndex]} className="absolute text-sm font-semibold"
              style={{ color:accentColor }}
              initial={{ opacity:0, y:8 }}
              animate={{ opacity:1, y:0 }}
              exit={{ opacity:0, y:-8 }}
              transition={{ duration:.2 }}>
              {slangs[slangIndex]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Description */}
        <p className="text-[13px] leading-relaxed" style={{ color:'#A1B0C4' }}>{game.description}</p>

        {/* Quick controls */}
        {game.controls && (
          <div className="flex flex-wrap gap-1.5">
            {game.controls.slice(0,2).map((c,i) => (
              <span key={i} className="rounded-md px-2 py-1 text-[10px] font-mono"
                style={{ background:'rgba(255,255,255,.035)', border:'1px solid rgba(255,255,255,.08)', color:'#B5C4D7' }}>
                {c.split('—')[0].trim()}
              </span>
            ))}
          </div>
        )}

        {/* CTA buttons */}
        <div className="flex gap-2 mt-auto pt-1">
          <Link to={`/play/${game.slug}`}
            className="showcase-play-link flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-black text-sm uppercase tracking-widest text-white transition-all duration-200"
            style={{ background:`linear-gradient(100deg,${accentColor},${accentColor2})`, boxShadow:`0 8px 24px ${accentColor}25` }}>
            <Play className="w-4 h-4 fill-white"/> Play now <ArrowRight className="ml-1 w-4 h-4"/>
          </Link>
          <Link to={`/game/${game.slug}`}
            aria-label={`More details about ${game.name}`}
            className="flex items-center justify-center px-3 rounded-xl transition-all duration-200"
            style={{ background:`${accentColor}12`, border:`1px solid ${accentColor}35`, color:accentColor }}>
            <ExternalLink className="w-4 h-4"/>
          </Link>
        </div>
      </div>

      {/* Corner glows */}
      <div className="absolute top-0 right-0 w-40 h-40 pointer-events-none"
        style={{ background:`radial-gradient(circle at top right,${accentColor}10,transparent 65%)` }}/>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export default function GameShowcase({ games }: { games: Game[] }) {
  if (!games.length) return null;
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {games.map((game, i) => (
        <ShowcaseCard key={game.id} game={game} index={i}/>
      ))}
    </div>
  );
}
