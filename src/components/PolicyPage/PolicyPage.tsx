import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PolicyPageProps {
  title:       string;
  lastUpdated?: string;
  children:    ReactNode;
}

export default function PolicyPage({ title, lastUpdated, children }: PolicyPageProps) {
  return (
    <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        {lastUpdated && (
          <p className="text-xs text-brand-dim mb-3 uppercase tracking-widest font-mono">
            Last updated: {lastUpdated}
          </p>
        )}
        <h1 className="font-display text-4xl sm:text-5xl font-black mb-10">
          {title.split(' ').map((word, i) => (
            <span key={i}>
              {i === 0 ? word : <span className="gradient-text"> {word}</span>}
              {' '}
            </span>
          ))}
        </h1>

        {/* Policy content */}
        <div className="prose prose-invert prose-sm max-w-none
                        [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-brand-text
                        [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:border-b [&_h2]:border-brand-border [&_h2]:pb-2
                        [&_p]:text-brand-muted [&_p]:leading-relaxed [&_p]:mb-4
                        [&_ul]:text-brand-muted [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:list-disc [&_ul]:mb-4
                        [&_li]:leading-relaxed
                        [&_a]:text-brand-purple [&_a]:hover:text-brand-blue [&_a]:transition-colors
                        [&_strong]:text-brand-text">
          {children}
        </div>
      </motion.div>
    </main>
  );
}
