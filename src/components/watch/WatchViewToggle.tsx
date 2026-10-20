import React from 'react';
import { BookOpen, Clock3 } from 'lucide-react';

export type WatchView = 'simple' | 'vedic';

interface WatchViewToggleProps {
  value: WatchView;
  onChange: (view: WatchView) => void;
}

export const WatchViewToggle: React.FC<WatchViewToggleProps> = ({ value, onChange }) => (
  <div className="inline-flex max-w-full rounded-full border border-amber-200 bg-white/80 p-1 shadow-sm dark:border-amber-900 dark:bg-stone-900/80" role="group" aria-label="घड़ी का दृश्य चुनें">
    <button type="button" aria-pressed={value === 'simple'} onClick={() => onChange('simple')} className={`watch-toggle ${value === 'simple' ? 'watch-toggle-active' : ''}`}>
      <BookOpen size={16} aria-hidden="true" /><span>सरल दृश्य</span>
    </button>
    <button type="button" aria-pressed={value === 'vedic'} onClick={() => onChange('vedic')} className={`watch-toggle ${value === 'vedic' ? 'watch-toggle-active' : ''}`}>
      <Clock3 size={16} aria-hidden="true" /><span>वैदिक घड़ी</span>
    </button>
  </div>
);

export default WatchViewToggle;
