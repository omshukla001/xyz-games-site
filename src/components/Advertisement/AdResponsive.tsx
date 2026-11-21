import AdUnit from './AdUnit';

interface AdResponsiveProps { className?: string }

/** Fully responsive auto-sized AdSense unit. */
export default function AdResponsive({ className = '' }: AdResponsiveProps) {
  return (
    <div className={`w-full my-6 ${className}`}>
      <AdUnit slot="responsive" width={728} height={90} label="Responsive" responsive />
    </div>
  );
}
