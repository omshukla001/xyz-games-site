import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowDownRight, ArrowLeft, ArrowRight, Pause, Play, Sparkles } from 'lucide-react';
import { featuredGames } from '../../data/games';

export default function Hero() {
  const games = featuredGames();
  const [idx, setIdx] = useState(0);
  const [dir, setDir] = useState(1);
  const [previewPaused, setPreviewPaused] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const current = games[idx];

  useEffect(() => {
    if (games.length < 2 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const timer = window.setInterval(() => {
      setDir(1);
      setPreviewPaused(false);
      setIdx(index => (index + 1) % games.length);
    }, 6500);
    return () => window.clearInterval(timer);
  }, [games.length]);

  const go = (direction: number) => {
    setDir(direction);
    setPreviewPaused(false);
    setIdx(index => (index + direction + games.length) % games.length);
  };

  if (!current) return <EmptyHero />;

  return (
    <section className="home-hero relative overflow-hidden" style={{ background:'#080C14' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 48% 64% at 78% 40%,rgba(0,102,255,.17),transparent 72%),radial-gradient(ellipse 42% 42% at 8% 82%,rgba(255,107,0,.07),transparent 72%)' }}/>
      <div className="absolute top-0 right-0 w-[52vw] h-full pointer-events-none opacity-30"
        style={{ backgroundImage:'linear-gradient(rgba(255,255,255,.035) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.035) 1px,transparent 1px)', backgroundSize:'48px 48px', maskImage:'linear-gradient(90deg,transparent,#000)' }}/>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 lg:pt-36 pb-8 sm:pb-10">
        <div className="grid items-center gap-9 lg:grid-cols-[.86fr_1.14fr] lg:gap-14">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={current.id}
              custom={dir}
              initial={{ opacity:0, x:dir * 24 }}
              animate={{ opacity:1, x:0 }}
              exit={{ opacity:0, x:dir * -24 }}
              transition={{ duration:.38, ease:'easeOut' }}
              className="relative z-10 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2.5 mb-7 rounded-full px-3.5 py-2 text-[10px] sm:text-[11px] font-bold tracking-[.18em] uppercase"
                style={{ color:'#C2D3E8', background:'rgba(255,255,255,.045)', border:'1px solid rgba(255,255,255,.1)' }}>
                <Sparkles className="w-3.5 h-3.5" style={{ color:'#73B9FF' }}/>
                XYZ Games Originals
                <span className="h-1 w-1 rounded-full bg-white/30"/>
                <span style={{ color:'#73B9FF' }}>{current.category}</span>
              </div>

              <h1 className="font-display font-black tracking-[-.055em] leading-[.94] text-white"
                style={{ fontSize:'clamp(3.5rem,7.7vw,7.25rem)', textWrap:'balance' }}>
                {current.name}
              </h1>
              <p className="mt-6 max-w-lg text-base sm:text-lg leading-relaxed" style={{ color:'#B0BED1' }}>
                {current.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <Link to={`/play/${current.slug}`}
                  className="btn-orange hero-play-button px-7 py-4 text-sm sm:text-base">
                  <Play className="w-4 h-4 fill-white"/> Play this game
                </Link>
                <Link to={`/game/${current.slug}`} className="btn-secondary px-6 py-3.5 text-sm">
                  Discover <ArrowDownRight className="w-4 h-4"/>
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-bold uppercase tracking-[.15em]"
                style={{ color:'#8798AE' }}>
                <span className="flex items-center gap-2"><span className="live-dot"/> Ready to play</span>
                <span className="hidden h-4 w-px bg-white/10 sm:block"/>
                <span className="flex items-center gap-2"><Sparkles className="h-3.5 w-3.5" style={{ color:'#73B9FF' }}/> Made in India</span>
                <span className="hidden h-4 w-px bg-white/10 sm:block"/>
                <span>No download</span>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="relative order-1 lg:order-2">
            <div className="absolute -inset-4 rounded-[2rem] pointer-events-none"
              style={{ background:'radial-gradient(ellipse at 60% 50%,rgba(0,136,255,.22),transparent 70%)', filter:'blur(24px)' }}/>
            <div className="hero-preview-frame relative overflow-hidden rounded-2xl sm:rounded-3xl"
              style={{ background:'#121a29', border:'1px solid rgba(255,255,255,.15)', boxShadow:'0 30px 90px rgba(0,0,0,.5)' }}>
              <div className="relative aspect-[16/10]">
                <AnimatePresence initial={false} custom={dir}>
                  <motion.div key={current.id}
                    custom={dir}
                    initial={{ opacity:0, scale:1.04, x:dir * 20 }}
                    animate={{ opacity:1, scale:1, x:0 }}
                    exit={{ opacity:0, scale:.98, x:dir * -20 }}
                    transition={{ duration:.5, ease:'easeOut' }}
                    className="absolute inset-0">
                    {current.gameplayVideo ? (
                      <video ref={videoRef} key={current.gameplayVideo} autoPlay={!previewPaused} loop muted playsInline preload="metadata"
                        poster={current.banner || current.thumbnail}
                        aria-label={`${current.name} gameplay preview`}
                        className="homepage-gameplay-video w-full h-full object-cover">
                        <source src={current.gameplayVideo} type="video/mp4"/>
                      </video>
                    ) : (
                      <img src={current.banner || current.thumbnail} alt={`${current.name} game poster`}
                        className="w-full h-full object-cover"/>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
              <div className="absolute inset-0 pointer-events-none"
                style={{ background:'linear-gradient(180deg,rgba(5,9,16,.28),transparent 30%,transparent 62%,rgba(5,9,16,.65))' }}/>
              <div className="absolute top-4 left-4 sm:top-5 sm:left-5 flex items-center gap-2 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-[.14em] text-white backdrop-blur-md"
                style={{ background:'rgba(8,12,20,.72)', border:'1px solid rgba(255,255,255,.2)' }}>
                <span className="live-dot"/> Featured gameplay
              </div>
              {current.gameplayVideo && (
                <button type="button"
                  onClick={() => {
                    if (previewPaused) void videoRef.current?.play();
                    else videoRef.current?.pause();
                    setPreviewPaused(paused => !paused);
                  }}
                  aria-label={previewPaused ? 'Play muted gameplay preview' : 'Pause muted gameplay preview'}
                  aria-pressed={!previewPaused}
                  className="absolute top-4 right-4 sm:top-5 sm:right-5 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-all hover:bg-white/20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white"
                  style={{ background:'rgba(8,12,20,.68)', border:'1px solid rgba(255,255,255,.22)' }}>
                  {previewPaused ? <Play className="w-4 h-4 fill-current"/> : <Pause className="w-4 h-4 fill-current"/>}
                </button>
              )}
              <div className="absolute bottom-4 left-4 sm:bottom-5 sm:left-5 pointer-events-none">
                <div className="text-[9px] font-bold uppercase tracking-[.2em] text-white/65">Now featuring</div>
                <div className="mt-1 font-display text-lg sm:text-xl font-extrabold text-white drop-shadow-lg">{current.name}</div>
              </div>
              {games.length > 1 && (
                <div className="absolute bottom-4 right-4 sm:bottom-5 sm:right-5 flex items-center gap-2">
                  <button onClick={() => go(-1)} aria-label="Previous featured game"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors hover:bg-white/20"
                    style={{ background:'rgba(8,12,20,.6)', border:'1px solid rgba(255,255,255,.2)' }}>
                    <ArrowLeft className="w-4 h-4"/>
                  </button>
                  <button onClick={() => go(1)} aria-label="Next featured game"
                    className="w-10 h-10 rounded-full flex items-center justify-center text-white backdrop-blur-md transition-colors hover:bg-white/20"
                    style={{ background:'rgba(8,12,20,.6)', border:'1px solid rgba(255,255,255,.2)' }}>
                    <ArrowRight className="w-4 h-4"/>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {games.length > 1 && (
          <div className="mt-9 sm:mt-12">
            <div className="flex items-center justify-between mb-3">
              <p className="text-[10px] font-bold uppercase tracking-[.2em]" style={{ color:'#718198' }}>Featured collection</p>
              <p className="font-mono text-xs" style={{ color:'#718198' }}>
                <span className="text-white">{String(idx + 1).padStart(2, '0')}</span> / {String(games.length).padStart(2, '0')}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
              {games.map((game, i) => (
                <button key={game.id}
                  onClick={() => { setDir(i > idx ? 1 : -1); setPreviewPaused(false); setIdx(i); }}
                  aria-pressed={i === idx}
                  className="group flex items-center gap-2.5 rounded-xl p-2 text-left transition-all duration-200 hover:-translate-y-0.5 sm:gap-3 sm:p-2.5"
                  style={{
                    background:i === idx ? 'rgba(255,255,255,.09)' : 'rgba(255,255,255,.025)',
                    border:`1px solid ${i === idx ? 'rgba(115,185,255,.55)' : 'rgba(255,255,255,.08)'}`,
                  }}>
                  <img src={game.thumbnail || game.banner} alt=""
                    className="w-12 h-9 sm:w-14 sm:h-10 rounded-md object-cover"/>
                  <span className="min-w-0">
                    <span className="block truncate text-[11px] sm:text-xs font-bold text-white">{game.name}</span>
                    <span className="block mt-0.5 truncate text-[9px] sm:text-[10px] uppercase tracking-wider"
                      style={{ color:'#8291A7' }}>{game.category}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background:'linear-gradient(90deg,transparent,rgba(115,185,255,.28),transparent)' }}/>
    </section>
  );
}

function EmptyHero() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden" style={{ background:'#080C14' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 70% 55% at 50% 0%,rgba(0,102,255,.2),transparent 72%)' }}/>
      <div className="relative z-10 text-center px-4 pt-20">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 text-sm font-semibold"
          style={{ background:'rgba(0,102,255,.12)', border:'1px solid rgba(0,102,255,.4)', color:'#00D4FF' }}>
          <span className="live-dot"/> Free browser games · Play now
        </div>
        <h1 className="font-display font-black leading-none tracking-tight mb-5"
          style={{ fontSize:'clamp(3rem,10vw,8rem)' }}>
          <span className="text-white">XYZ </span><span className="gradient-text">GAMES</span>
        </h1>
        <p className="text-lg max-w-xl mx-auto mb-8" style={{ color:'#8899BB' }}>
          Discover original games made in India. No download, no account required.
        </p>
        <Link to="/games" className="btn-primary text-base px-10 py-4">
          <Play className="w-5 h-5 fill-white"/> Browse games
        </Link>
      </div>
    </section>
  );
}
