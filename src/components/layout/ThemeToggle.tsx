/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Theme Toggle Component
 * Toggles between daylight Chandan Light (#faf7f2) and Ratri Dark (#1a1614)
 */

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTranslation } from '../../i18n/i18nContext';

const STORAGE_KEY = 'sanatan_theme_pref';

export interface ThemeToggleProps {
  className?: string;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ className = '' }) => {
  const { t } = useTranslation();
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return saved === 'dark';
      // Default to Chandan Light
      return false;
    }
    return false;
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      if (isDark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem(STORAGE_KEY, 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem(STORAGE_KEY, 'light');
      }
    }
  }, [isDark]);

  const toggleTheme = () => {
    setIsDark((prev) => !prev);
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? t('common.themeLight') : t('common.themeDark')}
      title={isDark ? 'चन्दन लाइट थीम चुनें' : 'रात्रि डार्क थीम चुनें'}
      className={`p-2 rounded-full border transition-all duration-200 cursor-pointer flex items-center justify-center select-none shadow-xs ${
        isDark
          ? 'bg-stone-800 border-amber-900/60 text-amber-300 hover:bg-stone-700 hover:border-amber-500'
          : 'bg-amber-100/80 border-amber-300/80 text-amber-900 hover:bg-amber-200 hover:text-amber-950'
      } ${className}`}
    >
      {isDark ? (
        <Moon className="w-4 h-4 transition-transform duration-300 rotate-0 hover:-rotate-12 text-amber-400" />
      ) : (
        <Sun className="w-4 h-4 transition-transform duration-300 rotate-0 hover:rotate-45 text-amber-600" />
      )}
    </button>
  );
};

export default ThemeToggle;
