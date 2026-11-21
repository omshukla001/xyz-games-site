import { Link } from 'react-router-dom';

interface LogoProps { variant?:'horizontal'|'mark'|'navbar'; className?:string; linkTo?:string }

function XMark({ size=36 }: { size?:number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" aria-hidden>
      <defs>
        <linearGradient id="lg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0066FF"/>
          <stop offset="100%" stopColor="#00D4FF"/>
        </linearGradient>
        <filter id="gf"><feGaussianBlur stdDeviation="2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <rect width="60" height="60" rx="12" fill="#131B2A"/>
      <rect x="1" y="1" width="58" height="58" rx="11" fill="none" stroke="url(#lg)" strokeWidth="1.5" opacity=".8"/>
      <g filter="url(#gf)">
        <rect x="10" y="12" width="7" height="34" rx="3.5" transform="rotate(-45 30 30)" fill="url(#lg)"/>
        <rect x="22" y="12" width="7" height="34" rx="3.5" transform="rotate(45 30 30)"  fill="url(#lg)"/>
        <polygon points="23,21 41,30 23,39" fill="#00D4FF" opacity=".9"/>
      </g>
    </svg>
  );
}

export default function Logo({ variant='horizontal', className='', linkTo='/' }: LogoProps) {
  const gs: React.CSSProperties = {
    background:'linear-gradient(90deg,#0088FF,#00D4FF)',
    WebkitBackgroundClip:'text', WebkitTextFillColor:'transparent', backgroundClip:'text',
  };
  const content = (() => {
    if (variant==='mark') return <span className={`inline-flex ${className}`}><XMark size={42}/></span>;
    if (variant==='navbar') return (
      <span className={`inline-flex items-center gap-2.5 ${className}`} aria-label="XYZ Games">
        <XMark size={32}/>
        <span className="flex flex-col leading-none">
          <span className="font-display font-black text-[16px] tracking-tight" style={gs}>XYZ Games</span>
          <span className="text-[8px] font-mono tracking-[.3em]" style={{ color:'#00D4FF', opacity:.7 }}>.site</span>
        </span>
      </span>
    );
    return (
      <span className={`inline-flex items-center gap-3 ${className}`} aria-label="XYZ Games.site">
        <XMark size={50}/>
        <span className="flex flex-col leading-none gap-0.5">
          <span className="font-display font-black text-3xl" style={{ ...gs, letterSpacing:'-0.03em' }}>XYZ Games</span>
          <span className="text-xs font-mono tracking-[.4em]" style={{ color:'#00D4FF', opacity:.7 }}>.site</span>
        </span>
      </span>
    );
  })();
  if (!linkTo) return <>{content}</>;
  return <Link to={linkTo} className="focus:outline-none focus-visible:ring-2 focus-visible:ring-gl-blue rounded-lg">{content}</Link>;
}
