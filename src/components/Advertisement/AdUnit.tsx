import { useEffect } from 'react';
import { adConfig, isAdUnitEnabled, type AdUnitKey } from '../../data/adConfig';
import AdPlaceholder from './AdPlaceholder';

interface AdUnitProps {
  slot:       AdUnitKey;
  width:      number;
  height:     number;
  label?:     string;
  className?: string;
  responsive?: boolean;
}

declare global {
  interface Window {
    adsbygoogle?: Array<Record<string, unknown>>;
  }
}

const ADSENSE_SCRIPT_ID = 'google-adsense-script';

function loadAdSenseScript(publisherId: string): boolean {
  const src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(publisherId)}`;
  const existing = document.getElementById(ADSENSE_SCRIPT_ID) as HTMLScriptElement | null;

  if (existing) {
    if (existing.src !== src) {
      console.error('AdSense is already loaded with a different publisher ID.');
      return false;
    }
    return true;
  }

  const script = document.createElement('script');
  script.id = ADSENSE_SCRIPT_ID;
  script.async = true;
  script.crossOrigin = 'anonymous';
  script.src = src;
  script.addEventListener('error', () => {
    console.error('Failed to load the Google AdSense script.');
  }, { once: true });
  document.head.appendChild(script);
  return true;
}

export default function AdUnit({ slot, width, height, label, className = '', responsive = false }: AdUnitProps) {
  const enabled = isAdUnitEnabled(slot);

  useEffect(() => {
    if (!enabled || !loadAdSenseScript(adConfig.publisherId)) return;

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error(`Failed to initialize AdSense unit "${slot}".`, error);
    }
  }, [enabled, slot]);

  if (!enabled) {
    return <AdPlaceholder width={width} height={height} label={label} className={className} />;
  }

  return (
    <div className={`ad-container ${className}`} style={{ width:'100%', maxWidth:width || undefined, minHeight:height }}>
      <span className="block text-center text-xs text-brand-dim/50 py-1">Advertisement</span>
      <ins
        className="adsbygoogle"
        style={responsive ? { display:'block', width:'100%' } : { display:'inline-block', width, height }}
        data-ad-client={adConfig.publisherId}
        data-ad-slot={adConfig.units[slot]}
        data-ad-format={responsive ? 'auto' : undefined}
        data-full-width-responsive={responsive ? 'true' : undefined}
      />
    </div>
  );
}
