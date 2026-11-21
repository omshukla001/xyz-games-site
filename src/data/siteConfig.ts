// ─── Site-wide configuration ────────────────────────────────────────────────
// Edit this file to update global branding, metadata, and social links.

export const siteConfig = {
  name:        'XYZ Games.site',
  shortName:   'XYZ Games',
  tagline:     'Play Free Browser Games Online',
  description:
    'Discover and play the best free browser games. Action, puzzle, arcade and more. No download required, play instantly in your browser.',
  url:         'https://xyzgames.site',
  domain:      'xyzgames.site',

  social: {
    twitter:   'https://twitter.com/xyzgamessite',
    discord:   'https://discord.gg/xyzgames',
    youtube:   'https://youtube.com/@xyzgames',
  },

  contact: {
    email:     'hello@xyzgames.site',
    support:   'support@xyzgames.site',
  },

  meta: {
    ogImage:   '/assets/branding/og-image.png',
    twitterCard: 'summary_large_image',
  },

  // Copyright year auto-updates
  copyrightYear: new Date().getFullYear(),

  // Navigation links
  navLinks: [
    { label: 'Home',       href: '/' },
    { label: 'All Games',  href: '/games' },
    { label: 'Discover',   href: '/discover' },
    { label: 'Categories', href: '/categories' },
    { label: 'About',      href: '/about' },
    { label: 'Contact',    href: '/contact' },
  ],

  footerLinks: {
    games:  [
      { label: 'All Games',   href: '/games' },
      { label: 'Discover',    href: '/discover' },
      { label: 'Categories',  href: '/categories' },
      { label: 'New Games',   href: '/discover?sort=newest' },
    ],
    company: [
      { label: 'About Us',    href: '/about' },
      { label: 'Contact',     href: '/contact' },
    ],
    legal: [
      { label: 'Privacy Policy',         href: '/privacy' },
      { label: 'Terms & Conditions',     href: '/terms' },
      { label: 'Advertising Disclosure', href: '/advertising' },
      { label: 'Copyright Policy',       href: '/copyright' },
    ],
  },
} as const;
