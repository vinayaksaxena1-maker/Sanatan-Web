/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 05: Shubh Muhurat Radar & Purpose Finder
 */

import React from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import { Sparkles, Car, Home, Heart, Briefcase, Baby } from 'lucide-react';

export const MuhuratHub: React.FC = () => {
  const { t } = useTranslation();

  const categories = [
    { id: 'vivah', label: t('muhurat.vivah'), icon: Heart },
    { id: 'grihaPravesh', label: t('muhurat.grihaPravesh'), icon: Home },
    { id: 'vehicle', label: t('muhurat.vehicle'), icon: Car },
    { id: 'vyapar', label: t('muhurat.vyapar'), icon: Briefcase },
    { id: 'namkaran', label: t('muhurat.namkaran'), icon: Baby },
  ];

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            {t('muhurat.title')}
          </h1>
        </div>
        <p className="text-sm text-stone-600">
          विवाह, गृह प्रवेश, वाहन क्रय, नामकरण व व्यापार शुभारंभ का वैदिक मुहूर्त स्कैनर
        </p>
      </header>

      {/* Purpose Filter Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {categories.map((cat) => {
          const Icon = cat.icon;
          return (
            <button
              key={cat.id}
              type="button"
              className="flex items-center gap-2 p-3 rounded-xl bg-white border border-amber-200/80 hover:border-amber-400 hover:bg-amber-50/50 transition-all text-left cursor-pointer shadow-xs"
            >
              <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                <Icon className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-stone-900">{cat.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MuhuratHub;
