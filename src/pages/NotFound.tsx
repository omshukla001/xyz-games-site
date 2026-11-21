import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, Gamepad2 } from 'lucide-react';
import SEO from '../components/SEO/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="404 – Page Not Found" noIndex />

      <main className="min-h-screen flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="font-display text-[8rem] sm:text-[12rem] font-black leading-none gradient-text mb-6 select-none">
            404
          </div>
          <h1 className="font-display text-3xl font-bold mb-3">Game Over — Page Not Found</h1>
          <p className="text-brand-muted max-w-sm mx-auto mb-8 text-sm">
            The page you're looking for doesn't exist or was moved. Head back to the portal and keep playing.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/" className="btn-primary">
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <Link to="/games" className="btn-secondary">
              <Gamepad2 className="w-4 h-4" />
              Browse Games
            </Link>
          </div>
        </motion.div>
      </main>
    </>
  );
}
