/**
 * Sanatan Ghadi (सनातन घड़ी)
 * 5-Tab Mobile Bottom Navigation Bar
 * [ 📅 पंचांग | 🔮 कुंडली | ⏱️ मुहूर्त | 🪔 व्रत/त्योहार | ☰ अधिक ]
 */

import React from 'react';
import { useRouter } from '../../routes/AppRoutes';
import { useTranslation } from '../../i18n/i18nContext';
import {
  Calendar,
  Shield,
  Sparkles,
  Flame,
  Menu,
} from 'lucide-react';

export interface BottomTabBarProps {
  onOpenMegaDrawer: () => void;
  isMegaDrawerOpen?: boolean;
}

export const BottomTabBar: React.FC<BottomTabBarProps> = ({
  onOpenMegaDrawer,
  isMegaDrawerOpen = false,
}) => {
  const { currentPath, navigate } = useRouter();
  const { t } = useTranslation();

  const tabs = [
    {
      id: 'panchang',
      path: '/panchang',
      label: t('bottomNav.panchang'),
      icon: Calendar,
      symbol: '📅',
    },
    {
      id: 'kundli',
      path: '/kundli',
      label: t('bottomNav.kundli'),
      icon: Shield,
      symbol: '🔮',
    },
    {
      id: 'muhurat',
      path: '/muhurat',
      label: t('bottomNav.muhurat'),
      icon: Sparkles,
      symbol: '⏱️',
    },
    {
      id: 'festivals',
      path: '/calendar',
      label: t('bottomNav.festivals'),
      icon: Flame,
      symbol: '🪔',
    },
  ];

  return (
    <nav
      aria-label="मुख्य मोबाइल नेविगेशन"
      className="fixed bottom-0 left-0 right-0 z-40 bg-[#faf7f2]/95 dark:bg-[#1a1614]/95 backdrop-blur-md border-t border-amber-200/80 dark:border-amber-900/60 shadow-lg px-2 py-1.5 safe-area-pb sm:hidden"
    >
      <div className="grid grid-cols-5 items-center justify-items-center max-w-md mx-auto">
        {tabs.map((tab) => {
          const isActive = currentPath === tab.path && !isMegaDrawerOpen;
          const Icon = tab.icon;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => navigate(tab.path)}
              aria-current={isActive ? 'page' : undefined}
              className={`w-full flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-150 cursor-pointer select-none ${
                isActive
                  ? 'text-amber-700 dark:text-amber-400 font-bold scale-105'
                  : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <Icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5]' : 'stroke-2'}`} />
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 bg-amber-600 dark:bg-amber-400 rounded-full" />
                )}
              </div>
              <span className="text-[11px] tracking-tight mt-1 truncate max-w-[62px]">
                {tab.label}
              </span>
            </button>
          );
        })}

        {/* 5th Tab: Mega-Drawer Trigger (अधिक) */}
        <button
          type="button"
          onClick={onOpenMegaDrawer}
          aria-expanded={isMegaDrawerOpen}
          aria-label="संपूर्ण हब एवं अन्य सुविधाएं खोलें"
          className={`w-full flex flex-col items-center justify-center py-1 px-1 rounded-xl transition-all duration-150 cursor-pointer select-none ${
            isMegaDrawerOpen
              ? 'text-amber-700 dark:text-amber-400 font-bold scale-105'
              : 'text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-200'
          }`}
        >
          <div className="relative flex items-center justify-center">
            <Menu className="w-5 h-5 stroke-2" />
            {isMegaDrawerOpen && (
              <span className="absolute -bottom-1 w-1.5 h-1.5 bg-amber-600 dark:bg-amber-400 rounded-full" />
            )}
          </div>
          <span className="text-[11px] tracking-tight mt-1 truncate max-w-[62px]">
            {t('bottomNav.more')}
          </span>
        </button>
      </div>
    </nav>
  );
};

export default BottomTabBar;
