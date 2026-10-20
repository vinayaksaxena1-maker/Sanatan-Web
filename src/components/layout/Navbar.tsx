/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Top Navbar Component
 * Desktop Nav Links, Brand Logo, Language Toggle, Theme Toggle & MegaDrawer Trigger
 */

import React from 'react';
import { useRouter, Link } from '../../routes/AppRoutes';
import { useTranslation } from '../../i18n/i18nContext';
import { LanguageToggle } from './LanguageToggle';
import { ThemeToggle } from './ThemeToggle';
import { LocationPill } from '../common/LocationPill';
import { Menu } from 'lucide-react';

export interface NavbarProps {
  onOpenMegaDrawer: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenMegaDrawer }) => {
  const { currentPath } = useRouter();
  const { t } = useTranslation();

  const desktopNavLinks = [
    { path: '/panchang', label: t('nav.panchang') },
    { path: '/choghadiya', label: t('nav.choghadiya') },
    { path: '/hora', label: t('nav.hora') },
    { path: '/muhurat', label: t('nav.muhurat') },
    { path: '/kundli', label: t('nav.kundli') },
    { path: '/calendar', label: t('nav.calendar') },
    { path: '/utilities', label: t('nav.utilities') },
  ];

  return (
    <header className="sticky top-0 z-30 bg-[#faf7f2]/90 dark:bg-[#1a1614]/90 backdrop-blur-md border-b border-amber-200/60 dark:border-amber-900/40 transition-colors duration-200">
      <div className="max-w-6xl mx-auto px-4 py-2.5 flex items-center justify-between">
        {/* Brand Identity */}
        <Link
          href="/"
          className="flex items-center gap-2.5 group cursor-pointer no-underline select-none"
        >
          <span className="text-2xl transform group-hover:scale-110 transition-transform duration-200" aria-hidden="true">
            🕉️
          </span>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-serif font-bold text-lg sm:text-xl text-amber-950 dark:text-amber-100 group-hover:text-red-900 dark:group-hover:text-amber-400 transition-colors">
                {t('brand.name')}
              </span>
              <span className="hidden lg:inline-flex text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
                वैदिक
              </span>
            </div>
            <p className="text-[10px] text-stone-500 dark:text-stone-400 -mt-0.5 hidden sm:block">
              {t('brand.tagline')}
            </p>
          </div>
        </Link>

        {/* Desktop Quick Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {desktopNavLinks.map((link) => {
            const isActive = currentPath === link.path;
            return (
              <Link
                key={link.path}
                href={link.path}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 no-underline cursor-pointer ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'text-stone-700 dark:text-stone-300 hover:bg-amber-100/70 dark:hover:bg-amber-950/40 hover:text-amber-900 dark:hover:text-amber-200'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <button
            type="button"
            onClick={onOpenMegaDrawer}
            className="flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold text-stone-700 dark:text-stone-300 hover:bg-amber-100/70 dark:hover:bg-amber-950/40 hover:text-amber-900 dark:hover:text-amber-200 transition-all cursor-pointer"
          >
            <Menu className="w-3.5 h-3.5" />
            <span>{t('nav.more')}</span>
          </button>
        </nav>

        {/* Right Actions: Location Pill, Language Toggle & Theme Toggle */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <LocationPill />
          <LanguageToggle />
          <ThemeToggle />

          {/* Desktop Mega-Drawer Open Pill */}
          <button
            type="button"
            onClick={onOpenMegaDrawer}
            aria-label="संपूर्ण हब मेनू"
            className="hidden sm:flex md:hidden items-center justify-center p-2 rounded-full border border-amber-200 dark:border-amber-800 bg-amber-100/60 dark:bg-stone-800 text-amber-950 dark:text-amber-200 hover:bg-amber-200 cursor-pointer transition-colors shadow-xs"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
