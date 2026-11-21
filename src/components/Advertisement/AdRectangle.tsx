import AdUnit from './AdUnit';

interface AdRectangleProps { slot?: 'homepageMidSection'; className?: string }

/** 300×250 medium rectangle. */
export default function AdRectangle({ slot = 'homepageMidSection', className = '' }: AdRectangleProps) {
  return (
    <div className={`flex justify-center my-4 ${className}`}>
      <AdUnit slot={slot} width={300} height={250} label="Rectangle" />
    </div>
  );
}
