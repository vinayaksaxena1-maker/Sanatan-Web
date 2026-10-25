/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Main Application Layout Container
 * Integrates Navbar, 5-Tab Bottom Bar, Mega-Drawer & Responsive Viewport Boundaries
 */

import React, { useState, useCallback, type ReactNode } from 'react';
import { Navbar } from './Navbar';
import { BottomTabBar } from './BottomTabBar';
import { MegaDrawer } from './MegaDrawer';
import { useRouter, Link } from '../../routes/AppRoutes';
import { useTranslation } from '../../i18n/i18nContext';

export interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { currentPath } = useRouter();
  const [isMegaDrawerOpen, setIsMegaDrawerOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleOpenMegaDrawer = useCallback(() => {
    setIsMegaDrawerOpen(true);
  }, []);

  const handleCloseMegaDrawer = useCallback(() => {
    setIsMegaDrawerOpen(false);
  }, []);

  // For home, portal and luxury hubs, they provide their own full-width luxury editorial layouts
  if (
    currentPath === '/' ||
    currentPath === '/portal' ||
    currentPath === '/vedic-portal' ||
    currentPath === '/panchang' ||
    currentPath === '/choghadiya' ||
    currentPath === '/choghadiya-hora' ||
    currentPath === '/hora'
  ) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] dark:bg-[#1a1614] text-stone-900 dark:text-stone-100 transition-colors duration-200">
      {/* Top Navbar */}
      <Navbar onOpenMegaDrawer={handleOpenMegaDrawer} />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 py-6 pb-24 sm:pb-12">
        {children}
      </main>

      {/* Desktop / Tablet Minimalist Footer */}
      <footer className="hidden sm:block border-t border-amber-200/50 dark:border-amber-900/30 py-6 px-4 bg-amber-50/30 dark:bg-stone-950/20 text-xs text-stone-500 dark:text-stone-400">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span>🕉️</span>
            <span className="font-semibold text-stone-700 dark:text-stone-300">सनातन घड़ी</span>
            <span>— {t('brand.subTitle')}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <Link href="/about-us" className="hover:text-amber-800 dark:hover:text-amber-300 no-underline">
              {t('nav.about')}
            </Link>
            <Link href="/privacy-policy" className="hover:text-amber-800 dark:hover:text-amber-300 no-underline">
              {t('nav.privacy')}
            </Link>
            <Link href="/terms" className="hover:text-amber-800 dark:hover:text-amber-300 no-underline">
              {t('nav.terms')}
            </Link>
          </div>
        </div>
      </footer>

      {/* Mobile 5-Tab Floating Bottom Bar */}
      <BottomTabBar onOpenMegaDrawer={handleOpenMegaDrawer} />

      {/* Mega Drawer Modal Overlay */}
      <MegaDrawer isOpen={isMegaDrawerOpen} onClose={handleCloseMegaDrawer} />
    </div>
  );
};

export default Layout;
