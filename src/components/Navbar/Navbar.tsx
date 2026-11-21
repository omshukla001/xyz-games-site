import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Menu, X, Gamepad2, ChevronDown, ArrowRight } from 'lucide-react';
import { searchGames } from '../../data/games';
import Logo from '../Logo/Logo';

const NAV = [
  { label: 'Home',       href: '/' },
  { label: 'All Games',  href: '/games' },
  { label: 'Discover',   href: '/discover' },
  { label: 'Categories', href: '/categories' },
  { label: 'About',      href: '/about' },
];

export default function Navbar() {
  const [menuOpen,    setMenuOpen]    = useState(false);
  const [searchOpen,  setSearchOpen]  = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSuggestion, setActiveSuggestion] = useState(-1);
  const [scrolled,    setScrolled]    = useState(false);
  const ref = useRef<HTMLInputElement>(null);
  const nav = useNavigate();
  const suggestions = searchQuery.trim() ? searchGames(searchQuery).slice(0, 4) : [];

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);
  useEffect(() => { setMenuOpen(false); }, [nav]);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setMenuOpen(false);
        setSearchOpen(true);
      } else if (event.key === 'Escape' && searchOpen) {
        setSearchOpen(false);
        setActiveSuggestion(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [searchOpen]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      nav(`/discover?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery(''); setSearchOpen(false);
    }
  };

  const selectSuggestion = (slug: string) => {
    nav(`/game/${slug}`);
    setSearchQuery('');
    setSearchOpen(false);
    setActiveSuggestion(-1);
  };

  const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'ArrowDown' && suggestions.length > 0) {
      event.preventDefault();
      setActiveSuggestion(index => (index + 1) % suggestions.length);
    } else if (event.key === 'ArrowUp' && suggestions.length > 0) {
      event.preventDefault();
      setActiveSuggestion(index => (index <= 0 ? suggestions.length - 1 : index - 1));
    } else if (event.key === 'Enter' && activeSuggestion >= 0 && suggestions[activeSuggestion]) {
      event.preventDefault();
      selectSuggestion(suggestions[activeSuggestion].slug);
    }
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-gaming"
      style={{
        background: scrolled ? 'rgba(8,12,20,.97)' : 'rgba(8,12,20,.85)',
        borderBottom: '1px solid rgba(0,102,255,.2)',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,.8)' : 'none',
      }}
    >
      {/* Top blue line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]"
        style={{ background: 'linear-gradient(90deg,#0066FF,#00D4FF,#0066FF)', backgroundSize:'200% auto', animation:'shimmerX 3s linear infinite' }}/>

      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Logo variant="navbar"/>

          {/* Desktop tabs — always visible */}
          <div className="hidden md:flex items-center">
            {NAV.map(l => (
              <NavLink key={l.href} to={l.href} end={l.href === '/'}
                className={({ isActive }) =>
                  `relative px-4 py-5 text-sm font-semibold transition-all duration-200 flex items-center gap-1 ${
                    isActive ? 'text-white' : 'text-gl-muted hover:text-white'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {/* Active underline tab indicator */}
                    {isActive && (
                      <motion.div
                        layoutId="tab-indicator"
                        className="absolute bottom-0 left-0 right-0 h-[3px]"
                        style={{ background: 'linear-gradient(90deg,#0066FF,#00D4FF)', boxShadow: '0 0 10px rgba(0,102,255,.7)' }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.form key="sf"
                  initial={{ opacity:0, width:0 }} animate={{ opacity:1, width:'auto' }}
                  exit={{ opacity:0, width:0 }} transition={{ duration:.2 }}
                  onSubmit={submit} className="relative flex items-center"
                >
                  <input ref={ref} autoFocus type="search" value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); setActiveSuggestion(-1); }}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="Search games…"
                    aria-label="Search games"
                    aria-autocomplete="list"
                    aria-expanded={searchQuery.trim().length > 0}
                    aria-controls={searchQuery.trim() ? 'navbar-search-suggestions' : undefined}
                    aria-activedescendant={activeSuggestion >= 0 ? `navbar-search-option-${activeSuggestion}` : undefined}
                    className="rounded-lg px-4 py-2 text-sm text-white placeholder-gl-dim w-52 sm:w-64 focus:outline-none"
                    style={{ background:'#131B2A', border:'1px solid rgba(0,102,255,.4)', boxShadow:'0 0 12px rgba(0,102,255,.2)' }}
                  />
                  <button type="button" aria-label="Close search" onClick={() => setSearchOpen(false)} className="btn-ghost ml-1 p-2">
                    <X className="w-4 h-4"/>
                  </button>
                  {searchQuery.trim() && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-72 max-w-[calc(100vw-2rem)] overflow-hidden rounded-xl border shadow-2xl sm:w-80"
                      style={{ background:'#0E1420', borderColor:'rgba(255,255,255,.12)', boxShadow:'0 18px 48px rgba(0,0,0,.55)' }}>
                      <div id="navbar-search-suggestions" role="listbox" aria-label="Game suggestions">
                        {suggestions.length > 0 ? suggestions.map((game, index) => (
                          <button key={game.id} id={`navbar-search-option-${index}`} type="button" role="option"
                            aria-selected={index === activeSuggestion}
                            onMouseEnter={() => setActiveSuggestion(index)}
                            onClick={() => selectSuggestion(game.slug)}
                            className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left transition-colors hover:bg-white/5"
                            style={{ background:index === activeSuggestion ? 'rgba(0,102,255,.12)' : 'transparent' }}>
                            <span className="min-w-0">
                              <span className="block truncate text-sm font-bold text-white">{game.name}</span>
                              <span className="mt-0.5 block truncate text-xs text-gl-muted">{game.description}</span>
                            </span>
                            <span className="flex-shrink-0 text-[10px] font-bold uppercase tracking-wider text-gl-cyan">
                              {game.category}
                            </span>
                          </button>
                        )) : (
                          <div role="option" aria-disabled="true" className="px-4 py-3 text-sm text-gl-muted">
                            No games match “{searchQuery.trim()}”.
                          </div>
                        )}
                      </div>
                      <button type="submit"
                        className="flex w-full items-center justify-between border-t px-4 py-3 text-xs font-semibold text-gl-cyan transition-colors hover:bg-white/5"
                        style={{ borderColor:'rgba(255,255,255,.08)' }}>
                        Search all games <ArrowRight className="h-4 w-4"/>
                      </button>
                    </div>
                  )}
                </motion.form>
              ) : (
                <motion.button key="sb" initial={{ opacity:0 }} animate={{ opacity:1 }} exit={{ opacity:0 }}
                  type="button" aria-label="Search games" title="Search games (Ctrl/⌘K)"
                  onClick={() => setSearchOpen(true)} className="btn-ghost p-2 hover:text-gl-cyan">
                  <Search className="w-5 h-5"/>
                </motion.button>
              )}
            </AnimatePresence>

            <Link to="/games" className="hidden sm:inline-flex btn-primary text-xs px-5 py-2.5">
              <Gamepad2 className="w-4 h-4"/> Play Now
            </Link>

            <button className="md:hidden btn-ghost p-2" onClick={() => setMenuOpen(v => !v)}>
              {menuOpen ? <X className="w-5 h-5"/> : <Menu className="w-5 h-5"/>}
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity:0, height:0 }} animate={{ opacity:1, height:'auto' }}
              exit={{ opacity:0, height:0 }} transition={{ duration:.25 }}
              className="md:hidden overflow-hidden"
              style={{ borderTop:'1px solid rgba(0,102,255,.15)' }}
            >
              <div className="py-3 flex flex-col gap-1">
                {NAV.map(l => (
                  <NavLink key={l.href} to={l.href} end={l.href === '/'}
                    className={({ isActive }) =>
                      `px-4 py-3 text-sm font-semibold rounded-xl transition-all flex items-center justify-between ${
                        isActive
                          ? 'text-white bg-gl-blue/10 border-l-2 border-gl-blue'
                          : 'text-gl-muted hover:text-white hover:bg-white/5'
                      }`
                    }
                    onClick={() => setMenuOpen(false)}
                  >
                    {l.label}
                    {l.label !== 'Home' && <ChevronDown className="w-3.5 h-3.5 -rotate-90 opacity-40"/>}
                  </NavLink>
                ))}
                <Link to="/games" className="btn-primary mx-4 mt-2 justify-center" onClick={() => setMenuOpen(false)}>
                  <Gamepad2 className="w-4 h-4"/> Play Now
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
