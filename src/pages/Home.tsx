import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Gamepad2, ArrowRight, Flame, Zap, Trophy, Shield, Sparkles } from 'lucide-react';
import SEO from '../components/SEO/SEO';
import Hero from '../components/Hero/Hero';
import GameShowcase from '../components/GameShowcase/GameShowcase';
import AdBanner from '../components/Advertisement/AdBanner';
import CategoryCard from '../components/CategoryCard/CategoryCard';
import { publishedGames } from '../data/games';
import { categories } from '../data/categories';

function SectionHeader({ title, sub, href }: { title:string; sub?:string; href?:string }) {
  return (
    <div className="flex items-end justify-between mb-7">
      <div>
        <h2 className="section-title">{title}</h2>
        {sub && <p className="section-subtitle">{sub}</p>}
      </div>
      {href && (
        <Link to={href}
          className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold transition-colors hover:opacity-80"
          style={{ color:'#0088FF' }}>
          View all <ArrowRight className="w-4 h-4"/>
        </Link>
      )}
    </div>
  );
}

export default function Home() {
  const all = publishedGames();

  return (
    <>
      <SEO url="/"/>

      <Hero/>

      <main className="home-content max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16 sm:space-y-20">
        <DashboardIntro gamesCount={all.length}/>

        {all.length > 0 ? (
          <section>
            <SectionHeader
              title="The game lineup"
              sub="Original worlds, one click away. Pick a game and jump straight in."
              href="/games"
            />
            <GameShowcase games={all}/>
            <AdBanner slot="homepageBanner"/>
          </section>
        ) : (
          <ComingSoonSection/>
        )}

        <FeatureStrip/>

        <section>
          <SectionHeader title="Choose your vibe" sub="Find the kind of game you feel like playing." href="/categories"/>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => <CategoryCard key={cat.id} category={cat} index={i}/>)}
          </div>
        </section>

        <CtaBanner gamesCount={all.length}/>
      </main>
    </>
  );
}

function DashboardIntro({ gamesCount }: { gamesCount:number }) {
  const stats = [
    { value:String(gamesCount).padStart(2, '0'), label:'Games to play', icon:<Gamepad2 className="w-4 h-4"/> },
    { value:'FREE', label:'Always free', icon:<Sparkles className="w-4 h-4"/> },
    { value:'0', label:'No downloads', icon:<Zap className="w-4 h-4"/> },
  ];

  return (
    <section className="dashboard-panel relative overflow-hidden rounded-3xl p-6 sm:p-9 lg:p-10"
      style={{ background:'linear-gradient(120deg,#101827 0%,#101521 52%,#121a29 100%)', border:'1px solid rgba(133,157,196,.16)' }}>
      <div className="absolute -top-32 -right-16 w-96 h-96 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(0,136,255,.18),transparent 68%)', filter:'blur(8px)' }}/>
      <div className="relative z-10 grid lg:grid-cols-[1fr_auto] items-end gap-8">
        <div>
          <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[.22em] mb-4"
            style={{ color:'#73B9FF' }}>
            <span className="live-dot"/> XYZ Games · Player dashboard
          </p>
          <h2 className="font-display font-black leading-[1.02] tracking-tight text-3xl sm:text-4xl lg:text-5xl max-w-2xl" style={{ textWrap:'balance' }}>
            Big game energy.<br className="hidden sm:block"/>
            <span className="gradient-text"> Zero barriers.</span>
          </h2>
          <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed" style={{ color:'#9BAAC0' }}>
            Discover original games made in India. No installs, no sign-ups — just pick your next adventure and play.
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 sm:gap-3">
          {stats.map(stat => (
            <div key={stat.label} className="dashboard-stat min-w-0 rounded-2xl px-3 py-4 sm:px-5 sm:py-5"
              style={{ background:'rgba(255,255,255,.035)', border:'1px solid rgba(255,255,255,.08)' }}>
              <span className="flex items-center gap-1.5 text-[10px] sm:text-xs font-semibold whitespace-nowrap"
                style={{ color:'#8090A7' }}>
                <span style={{ color:'#56A8FF' }}>{stat.icon}</span>{stat.label}
              </span>
              <strong className="block mt-3 font-display text-xl sm:text-2xl font-black text-white">{stat.value}</strong>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureStrip() {
  const items = [
    { icon:<Zap className="w-6 h-6"/>,    title:'Instant Play',   desc:'No install. Click and play in seconds.',      c:'#0066FF' },
    { icon:<Shield className="w-6 h-6"/>, title:'No Account',     desc:'No sign-up. Just pure gaming.',               c:'#00D4FF' },
    { icon:<Flame className="w-6 h-6"/>,  title:'Always Free',    desc:'Every game free forever.',                    c:'#FF6B00' },
    { icon:<Trophy className="w-6 h-6"/>, title:'Made in India',  desc:'Original games by Indian developers.',        c:'#00E676' },
  ];
  return (
    <section className="relative overflow-hidden rounded-2xl p-8 sm:p-10"
      style={{ background:'linear-gradient(135deg,#0E1420,#131B2A)', border:'1px solid #1E2A3E' }}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none"
        style={{ background:'radial-gradient(circle,rgba(0,102,255,.08) 0%,transparent 65%)', filter:'blur(40px)' }}/>
      <div className="relative z-10">
        <h2 className="section-title text-center mb-2">Why Play on <span className="gradient-text">XYZ Games?</span></h2>
        <p className="section-subtitle text-center mb-10">The home for original Indian browser games</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {items.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity:0, y:20 }}
              whileInView={{ opacity:1, y:0 }}
              viewport={{ once:true }}
              transition={{ delay:i*.1 }}
              className="rounded-xl p-5"
              style={{ background:`${f.c}0D`, border:`1px solid ${f.c}25` }}>
              <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                style={{ background:`${f.c}18`, border:`1px solid ${f.c}35` }}>
                <span style={{ color:f.c }}>{f.icon}</span>
              </div>
              <h3 className="font-display font-bold text-white text-sm mb-1">{f.title}</h3>
              <p className="text-xs leading-relaxed" style={{ color:'#8899BB' }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner({ gamesCount }: { gamesCount:number }) {
  return (
    <motion.section
      initial={{ opacity:0, y:28 }}
      whileInView={{ opacity:1, y:0 }}
      viewport={{ once:true }}
      transition={{ duration:.5 }}
      className="relative overflow-hidden rounded-2xl text-center py-16 px-8"
      style={{ background:'linear-gradient(135deg,#0E1420,#0A0F1E)', border:'1px solid rgba(0,102,255,.25)' }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background:'radial-gradient(ellipse 60% 50% at 50% 100%,rgba(0,102,255,.15) 0%,transparent 70%)' }}/>
      <div className="relative z-10">
        <Gamepad2 className="w-14 h-14 mx-auto mb-5"
          style={{ color:'#0066FF', filter:'drop-shadow(0 0 16px rgba(0,102,255,.7))' }}/>
        <h2 className="font-display text-3xl sm:text-5xl font-black mb-3">
          {gamesCount > 0
            ? <><span>{gamesCount} Game{gamesCount!==1?'s':''} </span><span className="gradient-text">Ready to Play</span></>
            : <>Ready to <span className="gradient-text">Play?</span></>
          }
        </h2>
        <p className="max-w-md mx-auto mb-8 text-lg leading-relaxed" style={{ color:'#8899BB' }}>
          No account. No download. Jump straight into the action.
        </p>
        <div className="flex flex-wrap gap-3 justify-center">
          <Link to="/games" className="btn-primary px-10 py-4 text-base">
            <Gamepad2 className="w-5 h-5"/> Browse All Games
          </Link>
          <Link to="/discover" className="btn-secondary px-10 py-4 text-base">Discover More</Link>
        </div>
      </div>
    </motion.section>
  );
}

function ComingSoonSection() {
  return (
    <motion.section initial={{ opacity:0, y:24 }} animate={{ opacity:1, y:0 }}
      className="relative text-center py-20 rounded-2xl overflow-hidden"
      style={{ background:'#0E1420', border:'1px dashed rgba(0,102,255,.2)' }}>
      <div className="relative z-10">
        <Gamepad2 className="w-16 h-16 mx-auto mb-5" style={{ color:'#0066FF', filter:'drop-shadow(0 0 12px rgba(0,102,255,.7))' }}/>
        <h2 className="font-display text-4xl font-black mb-3">Games <span className="gradient-text">Coming Soon</span></h2>
        <p className="max-w-sm mx-auto text-sm mb-6" style={{ color:'#8899BB' }}>
          Add your games to <code className="font-mono text-xs rounded px-1.5 py-0.5"
            style={{ background:'#131B2A', color:'#00D4FF' }}>src/data/games.ts</code> and set <code
            className="font-mono text-xs rounded px-1.5 py-0.5" style={{ background:'#131B2A', color:'#0066FF' }}>published: true</code>.
        </p>
        <Link to="/about" className="btn-secondary text-sm">Learn More</Link>
      </div>
    </motion.section>
  );
}
