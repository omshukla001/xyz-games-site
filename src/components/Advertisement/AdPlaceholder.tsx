import React from 'react';

interface AdPlaceholderProps {
  width:   number;
  height:  number;
  label?:  string;
  className?: string;
}

/** Visual placeholder rendered when ads are disabled (dev mode / pre-approval) */
export default function AdPlaceholder({ width, height, label, className = '' }: AdPlaceholderProps) {
  return (
    <div
      className={`ad-container ${className}`}
      style={{ width: '100%', maxWidth: width, minHeight: height }}
      aria-hidden="true"
      role="presentation"
    >
      <div className="text-center py-4 px-6">
        <span className="block text-xs font-mono text-brand-dim/60 uppercase tracking-widest mb-1">
          Advertisement
        </span>
        {label && (
          <span className="block text-xs text-brand-dim/40">{label}</span>
        )}
        <span className="block text-xs text-brand-dim/30 mt-1">
          {width}×{height}
        </span>
      </div>
    </div>
  );
}
