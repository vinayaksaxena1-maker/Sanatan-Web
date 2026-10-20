/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Language Toggle Pill Component
 * Top Navbar Switcher for Hindi / English / Hinglish
 */

import React from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import type { LanguageCode } from '../../types/i18n';
import { Globe } from 'lucide-react';

export interface LanguageToggleProps {
  className?: string;
  showIcon?: boolean;
}

export const LanguageToggle: React.FC<LanguageToggleProps> = ({
  className = '',
  showIcon = true,
}) => {
  const { language, setLanguage } = useTranslation();

  const handleLanguageSwitch = (newLang: LanguageCode) => {
    if (newLang !== language) {
      setLanguage(newLang);
    }
  };

  return (
    <div
      role="group"
      aria-label="भाषा चयन / Select Language"
      className={`inline-flex items-center rounded-full bg-amber-100/70 p-1 border border-amber-200/80 shadow-xs backdrop-blur-xs ${className}`}
    >
      {showIcon && (
        <span className="pl-2 pr-1 text-amber-800 flex items-center justify-center" aria-hidden="true">
          <Globe className="w-3.5 h-3.5" />
        </span>
      )}

      {/* Hindi Pill */}
      <button
        type="button"
        role="radio"
        aria-checked={language === 'hi'}
        onClick={() => handleLanguageSwitch('hi')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer select-none ${
          language === 'hi'
            ? 'bg-amber-600 text-white shadow-xs font-bold'
            : 'text-amber-950 hover:bg-amber-200/50'
        }`}
      >
        हिन्दी
      </button>

      {/* English Pill */}
      <button
        type="button"
        role="radio"
        aria-checked={language === 'en'}
        onClick={() => handleLanguageSwitch('en')}
        className={`px-3 py-1 text-xs font-semibold rounded-full transition-all duration-200 cursor-pointer select-none ${
          language === 'en'
            ? 'bg-amber-600 text-white shadow-xs font-bold'
            : 'text-amber-950 hover:bg-amber-200/50'
        }`}
      >
        English
      </button>
    </div>
  );
};

export default LanguageToggle;
