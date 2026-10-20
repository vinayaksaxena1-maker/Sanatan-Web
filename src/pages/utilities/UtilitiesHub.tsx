/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 08: 19 Vedic Astrology & Life Utilities Suite
 */

import React from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import { Wrench, Compass, Shield, Gem, Users, Star } from 'lucide-react';

export const UtilitiesHub: React.FC = () => {
  const { t } = useTranslation();

  const utilitiesList = [
    { id: 'sade-sati', title: 'साढ़े साती गणक', icon: Star, desc: 'शनि की साढ़े साती के चरण व वैदिक शांति उपाय' },
    { id: 'guna-milan', title: '36 गुण मिलान', icon: Users, desc: 'वर-वधू की कुंडली का अष्टकूट मिलान व नाड़ी दोष जांच' },
    { id: 'ratna', title: 'रत्न परामर्श', icon: Gem, desc: 'लग्न व भाग्येश अनुसार धारण योग्य रत्न एवं विधि' },
    { id: 'vastu', title: 'वास्तु कंपास', icon: Compass, desc: 'अष्टदिशा दिशाशूल, ऊर्जा संतुलन व गृह वास्तु' },
    { id: 'manglik', title: 'मांगलिक दोष', icon: Shield, desc: 'मंगल दोष तीव्रता, परिहार व विवाह मार्गदर्शन' },
  ];

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <Wrench className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            {t('nav.utilities')}
          </h1>
        </div>
        <p className="text-sm text-stone-600">
          19 वैदिक ज्योतिषीय एवं आध्यात्मिक जीवन सुविधाएं (साढ़े साती, 36 गुण मिलान, रत्न, वास्तु आदि)
        </p>
      </header>

      {/* Utilities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {utilitiesList.map((util) => {
          const Icon = util.icon;
          return (
            <div
              key={util.id}
              className="p-4 rounded-2xl bg-white border border-amber-200/80 hover:border-amber-400 hover:shadow-xs transition-all space-y-2"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center text-amber-800">
                  <Icon className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-sm text-stone-900">{util.title}</h3>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed">{util.desc}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UtilitiesHub;
