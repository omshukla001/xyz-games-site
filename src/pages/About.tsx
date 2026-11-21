import { motion } from 'framer-motion';
import { Gamepad2, Globe, Shield, Zap } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import { siteConfig } from '../data/siteConfig';

const values = [
  {
    icon: Gamepad2,
    title: 'Passion for Gaming',
    desc:  'We love browser games and believe everyone deserves instant, barrier-free access to great gaming experiences.',
  },
  {
    icon: Zap,
    title: 'Instant Play',
    desc:  'No downloads, no installs, no accounts. Just click and play — from any device, any browser.',
  },
  {
    icon: Globe,
    title: 'Open to All',
    desc:  'XYZ Games.site is free for everyone. We want gaming to be accessible regardless of device or budget.',
  },
  {
    icon: Shield,
    title: 'Privacy First',
    desc:  'We do not collect personal data, require registration, or build user profiles. Your privacy matters.',
  },
];

export default function About() {
  return (
    <>
      <SEO
        title="About Us"
        description="Learn about XYZ Games.site — a free browser gaming portal with no downloads, no accounts required."
        url="/about"
      />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl sm:text-5xl font-black mb-4">
            About <span className="gradient-text">XYZ Games.site</span>
          </h1>
          <p className="text-brand-muted text-lg max-w-2xl mx-auto leading-relaxed">
            {siteConfig.description}
          </p>
        </motion.div>

        {/* Values */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          {values.map((v, i) => (
            <motion.div
              key={v.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card p-6"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-purple/15 border border-brand-purple/30
                              flex items-center justify-center mb-4">
                <v.icon className="w-5 h-5 text-brand-purple" />
              </div>
              <h2 className="font-display font-semibold text-brand-text mb-2">{v.title}</h2>
              <p className="text-brand-muted text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <div className="card p-8 text-center">
          <h2 className="font-display text-2xl font-bold mb-3">Get in Touch</h2>
          <p className="text-brand-muted text-sm mb-5">
            Questions, game submissions, advertising enquiries? We'd love to hear from you.
          </p>
          <a href={`mailto:${siteConfig.contact.email}`} className="btn-primary">
            {siteConfig.contact.email}
          </a>
        </div>
      </main>
    </>
  );
}
