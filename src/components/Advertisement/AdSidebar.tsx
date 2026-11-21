import AdUnit from './AdUnit';

interface AdSidebarProps { className?: string }

/** 300×600 half-page sidebar ad. */
export default function AdSidebar({ className = '' }: AdSidebarProps) {
  return (
    <div className={`flex justify-center ${className}`}>
      <AdUnit slot="gameDetailsSidebar" width={300} height={600} label="Sidebar" />
    </div>
  );
}
