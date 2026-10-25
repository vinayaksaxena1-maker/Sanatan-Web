/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Main Application Layout Container
 * Provides Global Mobile 5-Tab Bottom Bar & Mega-Drawer Modal Overlay
 */

import React, { useState, useCallback, type ReactNode } from 'react';
import { BottomTabBar } from './BottomTabBar';
import { MegaDrawer } from './MegaDrawer';

export interface LayoutProps {
  children: ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMegaDrawerOpen, setIsMegaDrawerOpen] = useState<boolean>(false);

  const handleOpenMegaDrawer = useCallback(() => {
    setIsMegaDrawerOpen(true);
  }, []);

  const handleCloseMegaDrawer = useCallback(() => {
    setIsMegaDrawerOpen(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#faf7f2] dark:bg-[#1a1614] text-stone-900 dark:text-stone-100 transition-colors duration-200">
      {/* Main Viewport Content with mobile bottom bar clearance */}
      <div className="flex-1 w-full pb-16 sm:pb-0">
        {children}
      </div>

      {/* Mobile 5-Tab Floating Bottom Bar */}
      <BottomTabBar onOpenMegaDrawer={handleOpenMegaDrawer} isMegaDrawerOpen={isMegaDrawerOpen} />

      {/* Mega Drawer Modal Overlay */}
      <MegaDrawer isOpen={isMegaDrawerOpen} onClose={handleCloseMegaDrawer} />
    </div>
  );
};

export default Layout;
