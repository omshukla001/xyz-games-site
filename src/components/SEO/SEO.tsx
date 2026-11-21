import { useEffect } from 'react';
import { siteConfig } from '../../data/siteConfig';

interface SEOProps {
  title?:       string;
  description?: string;
  image?:       string;
  url?:         string;
  type?:        'website' | 'article';
  noIndex?:     boolean;
}

function setMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function setLink(rel: string, href: string) {
  let el = document.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

export default function SEO({
  title,
  description = siteConfig.description,
  image       = siteConfig.meta.ogImage,
  url,
  type        = 'website',
  noIndex     = false,
}: SEOProps) {
  useEffect(() => {
    const pageTitle = title
      ? `${title} – ${siteConfig.shortName}`
      : `${siteConfig.name} – ${siteConfig.tagline}`;

    const pageUrl = url ? `${siteConfig.url}${url}` : siteConfig.url;
    const absImage = image.startsWith('http') ? image : `${siteConfig.url}${image}`;

    document.title = pageTitle;

    setMeta('description',          description);
    setMeta('robots',               noIndex ? 'noindex,nofollow' : 'index,follow');

    // Open Graph
    setMeta('og:type',              type,        'property');
    setMeta('og:url',               pageUrl,     'property');
    setMeta('og:title',             pageTitle,   'property');
    setMeta('og:description',       description, 'property');
    setMeta('og:image',             absImage,    'property');
    setMeta('og:site_name',         siteConfig.name, 'property');

    // Twitter
    setMeta('twitter:card',         'summary_large_image');
    setMeta('twitter:title',        pageTitle);
    setMeta('twitter:description',  description);
    setMeta('twitter:image',        absImage);

    // Canonical
    setLink('canonical', pageUrl);
  }, [title, description, image, url, type, noIndex]);

  return null;
}
