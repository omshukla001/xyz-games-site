import { useEffect } from 'react';
import { siteConfig } from '../data/siteConfig';

export function useDocumentTitle(title?: string): void {
  useEffect(() => {
    const prev = document.title;
    document.title = title
      ? `${title} – ${siteConfig.shortName}`
      : `${siteConfig.name} – ${siteConfig.tagline}`;
    return () => { document.title = prev; };
  }, [title]);
}
