import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Gamepad2, ArrowLeft, RefreshCw, Maximize2, Minimize2,
  AlertTriangle, Loader2,
} from 'lucide-react';
import SEO from '../components/SEO/SEO';
import { getGameBySlug, resolveLaunchUrl } from '../data/games';

type PlayerState = 'loading' | 'playing' | 'error';

export default function GamePlayerPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const game = slug ? getGameBySlug(slug) : undefined;

  const [playerState, setPlayerState] = useState<PlayerState>('loading');
  const [showControls, setShowControls] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  const launchUrl = game ? resolveLaunchUrl(game) : '';

  // Handle mobile back button — go back in history
  useEffect(() => {
    const handlePopState = () => {
      // Browser back button pressed — navigate back
      navigate(-1);
    };

    // Push a dummy state so back button triggers popstate instead of leaving the site
    window.history.pushState({ gamePlayer: true }, '');
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [navigate]);

  // Hide navbar & footer, lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  // Auto-hide controls after 3s of no interaction
  const resetHideTimer = useCallback(() => {
    setShowControls(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => setShowControls(false), 3000);
  }, []);

  useEffect(() => {
    resetHideTimer();
    return () => { if (hideTimer.current) clearTimeout(hideTimer.current); };
  }, [resetHideTimer]);

  // Listen for fullscreen changes
  useEffect(() => {
    const onFsChange = () => setIsFullscreen(!!document.fullscreenElement);
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  const handleLoad = useCallback(() => setPlayerState('playing'), []);
  const handleError = useCallback(() => setPlayerState('error'), []);

  const handleReload = () => {
    setPlayerState('loading');
    if (iframeRef.current) {
      const src = iframeRef.current.src;
      iframeRef.current.src = '';
      requestAnimationFrame(() => {
        if (iframeRef.current) iframeRef.current.src = src;
      });
    }
  };

  const toggleFullscreen = async () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      await containerRef.current.requestFullscreen().catch(() => null);
    } else {
      await document.exitFullscreen().catch(() => null);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  if (!game || !game.published) {
    return (
      <main className="fixed inset-0 z-50 flex flex-col items-center justify-center"
        style={{ background: '#080C14' }}>
        <Gamepad2 className="w-12 h-12 text-brand-muted mx-auto mb-4" />
        <h1 className="font-display text-3xl font-bold mb-4 text-white">Game not found</h1>
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

      <div
        ref={containerRef}
        className="fixed inset-0 z-50 bg-black"
        onMouseMove={resetHideTimer}
        onTouchStart={resetHideTimer}
      >
        {/* Loading overlay */}
        {playerState === 'loading' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30"
            style={{ background: '#080C14' }}
          >
            <Loader2 className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <p className="text-gray-400 text-sm">Loading {game.name}…</p>
          </motion.div>
        )}

        {/* Error state */}
        {playerState === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 flex flex-col items-center justify-center z-30 p-8 text-center"
            style={{ background: '#080C14' }}
          >
            <AlertTriangle className="w-14 h-14 text-amber-400 mb-4" />
            <h3 className="font-display font-semibold text-xl mb-2 text-white">Unable to load game</h3>
            <p className="text-gray-400 text-sm mb-6 max-w-md">
              This game may not support embedded play. Try reloading.
            </p>
            <div className="flex gap-3">
              <button onClick={handleReload} className="btn-secondary text-sm">
                <RefreshCw className="w-4 h-4" /> Try again
              </button>
              <button onClick={goBack} className="btn-primary text-sm">
                <ArrowLeft className="w-4 h-4" /> Go Back
              </button>
            </div>
          </motion.div>
        )}

        {/* Floating top controls — auto-hide */}
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: showControls ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute top-0 left-0 right-0 z-40 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, transparent 100%)',
            paddingBottom: '2rem',
          }}
        >
          <div className="flex items-center justify-between p-3 pointer-events-auto">
            {/* Back button */}
            <button
              onClick={goBack}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-white text-sm font-semibold transition-all"
              style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back</span>
            </button>

            {/* Game title */}
            <h1 className="text-white font-display font-bold text-sm sm:text-base truncate mx-3 flex-1 text-center">
              {game.name}
            </h1>

            {/* Action buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleReload}
                className="p-2 rounded-xl text-white transition-all"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
                aria-label="Reload game"
              >
                <RefreshCw className="w-4 h-4" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-xl text-white transition-all"
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid rgba(255,255,255,0.15)',
                }}
                aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </motion.div>

        {/* The game iframe — takes full screen */}
        <iframe
          ref={iframeRef}
          src={launchUrl}
          title={game.name}
          className="w-full h-full border-0"
          onLoad={handleLoad}
          onError={handleError}
          sandbox="allow-scripts allow-forms allow-pointer-lock allow-popups allow-same-origin"
          allow="fullscreen; autoplay"
          loading="eager"
        />
      </div>
    </>
  );
}
