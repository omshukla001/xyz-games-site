import AdUnit from './AdUnit';
import type { AdUnitKey } from '../../data/adConfig';

interface AdBannerProps {
  className?: string;
  slot?: AdUnitKey;
}

/** 728×90 leaderboard banner. Collapses to responsive on mobile. */
export default function AdBanner({ className = '', slot = 'homepageBanner' }: AdBannerProps) {
  return (
    <div className={`w-full flex justify-center my-6 ${className}`}>
      <AdUnit slot={slot} width={728} height={90} label="Banner" responsive />
    </div>
  );
}
