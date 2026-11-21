import { Link } from 'react-router-dom';
import { ExternalLink, Tv, MessageCircle, Heart, Gamepad2 } from 'lucide-react';
import Logo from '../Logo/Logo';
import { siteConfig } from '../../data/siteConfig';

export default function Footer() {
  return (
    <footer className="mt-20" style={{ background:'#080C14', borderTop:'1px solid #1E2A3E' }}>
      <div className="h-[2px]" style={{ background:'linear-gradient(90deg,transparent,#0066FF 30%,#00D4FF 70%,transparent)' }}/>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Logo variant="navbar"/>
            <p className="mt-4 text-sm leading-relaxed max-w-xs" style={{ color:'#8899BB' }}>
              Original browser games built in India. No download, no account — click and play instantly.
            </p>
            <div className="mt-5 flex gap-3">
              {[
                { href:siteConfig.social.twitter, icon:<ExternalLink className="w-4 h-4"/>, label:'Twitter',  c:'#0066FF' },
                { href:siteConfig.social.discord, icon:<MessageCircle className="w-4 h-4"/>,label:'Discord',  c:'#00D4FF' },
                { href:siteConfig.social.youtube, icon:<Tv className="w-4 h-4"/>,           label:'YouTube',  c:'#FF6B00' },
              ].map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-200"
                  style={{ background:`${s.c}10`, border:`1px solid ${s.c}30`, color:`${s.c}88` }}
                  onMouseEnter={e => { const el=e.currentTarget as HTMLElement; el.style.background=`${s.c}18`; el.style.borderColor=`${s.c}70`; el.style.color=s.c; el.style.boxShadow=`0 0 12px ${s.c}40`; }}
                  onMouseLeave={e => { const el=e.currentTarget as HTMLElement; el.style.background=`${s.c}10`; el.style.borderColor=`${s.c}30`; el.style.color=`${s.c}88`; el.style.boxShadow='none'; }}
                  aria-label={s.label}>{s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {[
            { title:'Games',   c:'#0066FF', links:siteConfig.footerLinks.games   },
            { title:'Company', c:'#00D4FF', links:siteConfig.footerLinks.company },
            { title:'Legal',   c:'#FF6B00', links:siteConfig.footerLinks.legal   },
          ].map(col => (
            <div key={col.title}>
              <h3 className="text-xs font-black uppercase tracking-widest mb-4" style={{ color:col.c }}>{col.title}</h3>
              <ul className="flex flex-col gap-2.5">
                {col.links.map(l => (
                  <li key={l.href}>
                    <Link to={l.href} className="text-sm transition-colors hover:text-white" style={{ color:'#8899BB' }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs"
          style={{ borderColor:'#1E2A3E', color:'#445566' }}>
          <p className="flex items-center gap-1.5">
            <Gamepad2 className="w-3.5 h-3.5 text-gl-blue"/>
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="flex items-center gap-1.5">
            Made with <Heart className="w-3 h-3 fill-gl-orange text-gl-orange"/> in India
          </p>
          <a href={`mailto:${siteConfig.contact.email}`} className="transition-colors hover:text-gl-cyan" style={{ color:'#445566' }}>
            {siteConfig.contact.email}
          </a>
        </div>
      </div>
    </footer>
  );
}
