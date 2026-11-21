import { useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Maximize2, Minimize2, RefreshCw, ExternalLink, ArrowLeft,
  AlertTriangle, Loader2, ChevronLeft,
} from 'lucide-react';
import type { Game } from '../../data/games';
import { resolveLaunchUrl } from '../../data/games';

interface GamePlayerProps {
  game: Game;
}

type PlayerState = 'loading' | 'playing' | 'error';

export default function GamePlayer({ game }: GamePlayerProps) {
  const [playerState, setPlayerState] = useState<PlayerState>('loading');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef    = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const launchUrl    = resolveLaunchUrl(game);

  const handleLoad  = useCallback(() => setPlayerState('playing'), []);
  const handleError = useCallback(() => setPlayerState('error'),   []);

  const handleReload = () => {
    setPlayerState('loading');
    if (iframeRef.current) {
      // Re-trigger load by resetting src
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
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen().catch(() => null);
      setIsFullscreen(false);
    }
  };

  if (game.launchMode !== 'embed') {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center px-4">
        <div className="w-16 h-16 rounded-2xl bg-brand-card border border-brand-border flex items-center justify-center mb-4">
          <ExternalLink className="w-8 h-8 text-brand-muted" />
        </div>
        <h2 className="font-display text-xl font-semibold mb-2">Opens in new tab</h2>
        <p className="text-brand-muted text-sm mb-6 max-w-sm">
          This game launches in a new browser tab for the best experience.
        </p>
        <a
          href={launchUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary"
        >
          <ExternalLink className="w-4 h-4" />
          Launch {game.name}
        </a>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-3">
          <Link to={`/game/${game.slug}`} className="btn-ghost p-2">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <h1 className="font-display font-semibold text-brand-text">{game.name}</h1>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleReload} className="btn-ghost p-2" aria-label="Reload game">
            <RefreshCw className="w-4 h-4" />
          </button>
          <a
            href={launchUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-ghost p-2"
            aria-label="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button onClick={toggleFullscreen} className="btn-secondary p-2" aria-label={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}>
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
          <Link to="/" className="btn-ghost text-xs flex items-center gap-1.5">
            <ArrowLeft className="w-3.5 h-3.5" />
            XYZ Games
          </Link>
        </div>
      </div>

      {/* iframe container */}
      <div
        ref={containerRef}
        className="relative w-full bg-black rounded-2xl overflow-hidden border border-brand-border"
        style={{ aspectRatio: '16/9' }}
      >
        {/* Loading overlay */}
        {playerState === 'loading' && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-brand-bg flex flex-col items-center justify-center z-10"
          >
            <Loader2 className="w-10 h-10 text-brand-purple animate-spin mb-3" />
            <p className="text-brand-muted text-sm">Loading {game.name}…</p>
          </motion.div>
        )}

        {/* Error state */}
        {playerState === 'error' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 bg-brand-bg flex flex-col items-center justify-center z-10 p-8 text-center"
          >
            <AlertTriangle className="w-12 h-12 text-amber-400 mb-4" />
            <h3 className="font-display font-semibold text-lg mb-2">Unable to load game</h3>
            <p className="text-brand-muted text-sm mb-6 max-w-md">
              This game may not support embedded play due to browser security restrictions (X-Frame-Options).
              Try opening it directly instead.
            </p>
            <div className="flex gap-3 flex-wrap justify-center">
              <button onClick={handleReload} className="btn-secondary text-sm">
                <RefreshCw className="w-4 h-4" />
                Try again
              </button>
              <a
                href={launchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm"
              >
                <ExternalLink className="w-4 h-4" />
                Open directly
              </a>
            </div>
          </motion.div>
        )}

        {/* The iframe — never use allow-same-origin without allow-scripts, follow browser defaults */}
        <iframe
          ref={iframeRef}
          src={launchUrl}
          title={game.name}
          className="w-full h-full border-0"
          onLoad={handleLoad}
          onError={handleError}
          sandbox="allow-scripts allow-forms allow-pointer-lock allow-popups allow-same-origin"
          allow="fullscreen"
          loading="eager"
        />
      </div>
    </div>
  );
}
