import AdUnit from './AdUnit';

interface AdFooterProps { className?: string }

export default function AdFooter({ className = '' }: AdFooterProps) {
  return (
    <div className={`w-full flex justify-center my-4 ${className}`}>
      <AdUnit slot="footerBanner" width={728} height={90} label="Footer Banner" responsive />
    </div>
  );
}
