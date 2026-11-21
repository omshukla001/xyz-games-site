/* Floating gaming SVG icons — neon green on black */

const G  = '#00FF41';
const G2 = '#69FF8A';
const FILTER = `drop-shadow(0 0 8px ${G}) drop-shadow(0 0 20px rgba(0,255,65,.35))`;

function Controller({ size = 70 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.6} viewBox="0 0 70 42" fill="none"
      style={{ filter:FILTER, opacity:.32 }}>
      <path d="M8 10Q4 10 2 20L6 36Q8 42 14 42H18Q22 36 24 32H46Q49 36 53 42H57Q63 42 65 36L69 20Q67 10 62 10Z" fill={G}/>
      <rect x="14" y="18" width="4" height="12" rx="2" fill="#000"/>
      <rect x="10" y="22" width="12" height="4"  rx="2" fill="#000"/>
      <circle cx="48" cy="20" r="3.5" fill="#000"/>
      <circle cx="54" cy="25" r="3.5" fill="#000"/>
      <circle cx="48" cy="30" r="3.5" fill="#000"/>
      <circle cx="42" cy="25" r="3.5" fill="#000"/>
    </svg>
  );
}

function Joystick({ size = 52 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.2} viewBox="0 0 52 62" fill="none"
      style={{ filter:FILTER, opacity:.28 }}>
      <ellipse cx="26" cy="56" rx="22" ry="6" fill={G} opacity=".25"/>
      <rect x="22" y="22" width="8" height="34" rx="4" fill={G}/>
      <circle cx="26" cy="16" r="14" fill={G}/>
      <circle cx="21" cy="11" r="5" fill="#000" opacity=".5"/>
    </svg>
  );
}

function Star({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" fill="none"
      style={{ filter:FILTER, opacity:.33 }}>
      <polygon points="22,2 26,15 40,15 30,23 34,38 22,30 10,38 14,23 4,15 18,15" fill={G}/>
    </svg>
  );
}

function Trophy({ size = 50 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 50 55" fill="none"
      style={{ filter:FILTER, opacity:.28 }}>
      <path d="M10 4H40V24Q40 42 25 42Q10 42 10 24Z" fill={G}/>
      <path d="M10 8Q2 8 2 18Q2 28 10 28" stroke={G} strokeWidth="4" fill="none" opacity=".4"/>
      <path d="M40 8Q48 8 48 18Q48 28 40 28" stroke={G} strokeWidth="4" fill="none" opacity=".4"/>
      <rect x="20" y="42" width="10" height="8" fill={G}/>
      <rect x="12" y="50" width="26" height="4" rx="2" fill={G}/>
    </svg>
  );
}

function Lightning({ size = 32 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.5} viewBox="0 0 32 48" fill="none"
      style={{ filter:FILTER, opacity:.38 }}>
      <polygon points="18,2 2,28 15,28 14,46 30,20 17,20" fill={G}/>
    </svg>
  );
}

function Crown({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size * 0.75} viewBox="0 0 44 33" fill="none"
      style={{ filter:FILTER, opacity:.28 }}>
      <polygon points="4,32 4,14 14,26 22,4 30,26 40,14 40,32" fill={G}/>
      <circle cx="4"  cy="14" r="4" fill={G}/>
      <circle cx="22" cy="4"  r="4" fill={G}/>
      <circle cx="40" cy="14" r="4" fill={G}/>
      <rect x="4" y="30" width="36" height="3" rx="1.5" fill={G} opacity=".4"/>
    </svg>
  );
}

function Diamond({ size = 40 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none"
      style={{ filter:FILTER, opacity:.26 }}>
      <polygon points="20,2 38,14 30,38 10,38 2,14" fill={G}/>
      <polygon points="20,10 30,16 24,34 16,34 10,16" fill="#000" opacity=".35"/>
    </svg>
  );
}

function Shield({ size = 44 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 44 48" fill="none"
      style={{ filter:FILTER, opacity:.26 }}>
      <path d="M22 2L4 10V24Q4 38 22 46Q40 38 40 24V10Z" fill={G}/>
      <path d="M22 10L10 16V24Q10 34 22 42Q34 34 34 24V16Z" fill="#000" opacity=".35"/>
      <text x="22" y="30" textAnchor="middle" fontSize="16" fontWeight="900" fill={G} opacity=".9">✦</text>
    </svg>
  );
}

function PixelMan({ size = 42 }: { size?: number }) {
  return (
    <svg width={size} height={size * 1.3} viewBox="0 0 42 54" fill="none"
      style={{ filter:`drop-shadow(0 0 6px ${G2}) drop-shadow(0 0 16px rgba(105,255,138,.3))`, opacity:.28 }}>
      <rect x="13" y="2"  width="16" height="13" rx="3" fill={G}/>
      <rect x="16" y="7"  width="4"  height="4"  fill="#000"/>
      <rect x="22" y="7"  width="4"  height="4"  fill="#000"/>
      <rect x="10" y="17" width="22" height="15" rx="2" fill={G}/>
      <rect x="2"  y="17" width="8"  height="10" rx="2" fill={G} opacity=".7"/>
      <rect x="32" y="17" width="8"  height="10" rx="2" fill={G} opacity=".7"/>
      <rect x="12" y="34" width="8"  height="18" rx="2" fill={G}/>
      <rect x="22" y="34" width="8"  height="18" rx="2" fill={G}/>
    </svg>
  );
}

const ITEMS = [
  { id:1,  x:'2%',  y:'4%',   a:'animate-float',  r:-12, el:<Controller size={82}/> },
  { id:2,  x:'84%', y:'3%',   a:'animate-float2', r:10,  el:<Joystick   size={60}/> },
  { id:3,  x:'88%', y:'47%',  a:'animate-float3', r:16,  el:<Controller size={66}/> },
  { id:4,  x:'1%',  y:'57%',  a:'animate-float2', r:-7,  el:<Trophy     size={58}/> },
  { id:5,  x:'74%', y:'74%',  a:'animate-float',  r:5,   el:<Crown      size={52}/> },
  { id:6,  x:'11%', y:'79%',  a:'animate-float3', r:-16, el:<Star       size={48}/> },
  { id:7,  x:'46%', y:'2%',   a:'animate-float2', r:0,   el:<Lightning  size={36}/> },
  { id:8,  x:'60%', y:'84%',  a:'animate-float',  r:12,  el:<Diamond    size={46}/> },
  { id:9,  x:'24%', y:'7%',   a:'animate-float3', r:-5,  el:<Shield     size={44}/> },
  { id:10, x:'36%', y:'87%',  a:'animate-float2', r:14,  el:<PixelMan   size={42}/> },
  { id:11, x:'68%', y:'13%',  a:'animate-float',  r:-10, el:<Lightning  size={30}/> },
  { id:12, x:'6%',  y:'34%',  a:'animate-float3', r:7,   el:<Diamond    size={38}/> },
  { id:13, x:'80%', y:'30%',  a:'animate-float2', r:-15, el:<Star       size={34}/> },
  { id:14, x:'42%', y:'64%',  a:'animate-float',  r:0,   el:<Crown      size={38}/> },
];

const LIGHT = [
  { id:1, x:'2%',  y:'9%',  a:'animate-float',  r:-10, el:<Controller size={58}/> },
  { id:2, x:'87%', y:'7%',  a:'animate-float2', r:12,  el:<Star       size={38}/> },
  { id:3, x:'85%', y:'57%', a:'animate-float3', r:8,   el:<Joystick   size={48}/> },
  { id:4, x:'3%',  y:'67%', a:'animate-float2', r:-8,  el:<Lightning  size={30}/> },
  { id:5, x:'47%', y:'3%',  a:'animate-float',  r:0,   el:<Crown      size={40}/> },
  { id:6, x:'68%', y:'81%', a:'animate-float3', r:15,  el:<Diamond    size={34}/> },
];

interface Props { density?: 'full'|'half'|'light'; className?: string }

export default function GameBackground({ density = 'full', className = '' }: Props) {
  const items = density === 'half' ? ITEMS.slice(0,8) : ITEMS;
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {items.map(item => (
        <div key={item.id} className={`absolute ${item.a}`}
          style={{ left:item.x, top:item.y, transform:`rotate(${item.r}deg)` }}>
          {item.el}
        </div>
      ))}
    </div>
  );
}

export function GameBackgroundLight({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden className={`absolute inset-0 overflow-hidden pointer-events-none select-none ${className}`}>
      {LIGHT.map(item => (
        <div key={item.id} className={`absolute ${item.a}`}
          style={{ left:item.x, top:item.y, transform:`rotate(${item.r}deg)` }}>
          {item.el}
        </div>
      ))}
    </div>
  );
}
