import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

// Lazy-loaded pages for optimal bundle splitting
const Home          = lazy(() => import('./pages/Home'));
const Discover      = lazy(() => import('./pages/Discover'));
const Games         = lazy(() => import('./pages/Games'));
const Categories    = lazy(() => import('./pages/Categories'));
const CategoryDetail= lazy(() => import('./pages/CategoryDetail'));
const GameDetails   = lazy(() => import('./pages/GameDetails'));
const GamePlayerPage= lazy(() => import('./pages/GamePlayerPage'));
const About         = lazy(() => import('./pages/About'));
const Contact       = lazy(() => import('./pages/Contact'));
const Privacy       = lazy(() => import('./pages/Privacy'));
const Terms         = lazy(() => import('./pages/Terms'));
const Advertising   = lazy(() => import('./pages/Advertising'));
const Copyright     = lazy(() => import('./pages/Copyright'));
const NotFound      = lazy(() => import('./pages/NotFound'));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background:'#080C14' }}>
      <div className="w-10 h-10 rounded-full border-2 animate-spin"
        style={{ borderColor:'rgba(0,102,255,.3)', borderTopColor:'#0066FF' }}/>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col" style={{ background:'#080C14' }}>
      <Navbar />

      <div className="flex-1">
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/"                        element={<Home />} />
            <Route path="/discover"                element={<Discover />} />
            <Route path="/games"                   element={<Games />} />
            <Route path="/categories"              element={<Categories />} />
            <Route path="/categories/:slug"        element={<CategoryDetail />} />
            <Route path="/game/:slug"              element={<GameDetails />} />
            <Route path="/play/:slug"              element={<GamePlayerPage />} />
            <Route path="/about"                   element={<About />} />
            <Route path="/contact"                 element={<Contact />} />
            <Route path="/privacy"                 element={<Privacy />} />
            <Route path="/terms"                   element={<Terms />} />
            <Route path="/advertising"             element={<Advertising />} />
            <Route path="/copyright"               element={<Copyright />} />
            <Route path="*"                        element={<NotFound />} />
          </Routes>
        </Suspense>
      </div>

      <Footer />
    </div>
  );
}
