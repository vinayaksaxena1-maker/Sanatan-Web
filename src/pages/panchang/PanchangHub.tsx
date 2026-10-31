/**
 * Sanatan Web (सनातन घड़ी)
 * Hub 02: Vedic Dainik Panchang Hub (दैनिक पंचांग हब)
 * Official Luxury Redesign based on Stitch Screen b09a8eec & 5f90956d
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React, { useState } from 'react';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import CitySelectModal from '../../components/common/CitySelectModal';
import { usePanchangData } from './hooks/usePanchangData';
import { PanchangTopBar } from './components/PanchangTopBar';
import { PanchangFiveAngas } from './components/PanchangFiveAngas';
import { PanchangSolarLunar } from './components/PanchangSolarLunar';
import { PanchangShubhAshubh } from './components/PanchangShubhAshubh';
import { PanchangRitualShuddhi } from './components/PanchangRitualShuddhi';
import { PanchangLagnaShuddhi } from './components/PanchangLagnaShuddhi';
import { PanchangExtendedYogas } from './components/PanchangExtendedYogas';
import { PanchangSamvatsaraMandala } from './components/PanchangSamvatsaraMandala';
import { PanchangAstronomicalEpochs } from './components/PanchangAstronomicalEpochs';
import { PanchangSocialCardModal } from './components/PanchangSocialCardModal';

export const PanchangHub: React.FC = () => {
  const panchangData = usePanchangData();
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);
  const [isSocialModalOpen, setIsSocialModalOpen] = useState<boolean>(false);

  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      {/* Ambient Saffron & Chandan Radial Luminous Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      {/* Top Header */}
      <PortalHeader />

      {/* Main Command Surface */}
      <main className="w-full pt-32 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8" id="panchang-hub">
        {/* 1. Header Banner, Location Chips, Date Controller & Samvat Strip */}
        <PanchangTopBar
          data={panchangData}
          onOpenCityModal={() => setIsCityModalOpen(true)}
          onOpenSocialModal={() => setIsSocialModalOpen(true)}
        />

        {/* 2. The 5 Sacred Pillars (तिथि, वार, नक्षत्र, योग, करण) Bento Grid */}
        <PanchangFiveAngas data={panchangData} />

        {/* 3. Astronomical Dual Bento: Surya Dev (Solar Arc) & Chandra Dev (Lunar Phase) */}
        <PanchangSolarLunar data={panchangData} />

        {/* 4. Auspicious (शुभ मुहूर्त) & Inauspicious (राहुकाल) Timing Matrix + Disha Shool */}
        <PanchangShubhAshubh data={panchangData} />

        {/* 5. निवास, चक्र एवं अनुष्ठान विचार (Ritual Shuddhi: शिववास, अग्निवास, भद्रा, दिशा शूल, दिशा वास) */}
        <PanchangRitualShuddhi data={panchangData} />

        {/* 6. मुहूर्त व लग्न शुद्धि (Lagna & Muhurta Depth: १२ उदय लग्न, पंचक रहित मुहूर्त, चन्द्रबल, ताराबल) */}
        <PanchangLagnaShuddhi data={panchangData} />

        {/* 7. अतिरिक्त योग व सूक्ष्म काल (आनन्दादि २८ योग, रवि/सिद्धि/पुष्कर योग, निशीथ, सन्ध्या, वर्ज्यम्, गंडमूल) */}
        <PanchangExtendedYogas data={panchangData} />

        {/* 8. संवत्सर व मन्त्री मण्डल (६० बृहस्पति संवत्सर चक्र, वर्ष का राजा/मन्त्री/सेनापति मण्डल) */}
        <PanchangSamvatsaraMandala data={panchangData} />

        {/* 9. खगोलीय मान व पंचांग प्रणालियां (दिनमान, रात्रिमान, मध्याह्न, कलि संवत्, अहर्गण, JD, राष्ट्रीय सिविल, व्रत) */}
        <PanchangAstronomicalEpochs data={panchangData} />
      </main>

      {/* 5. Modals */}
      <CitySelectModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
      />

      <PanchangSocialCardModal
        isOpen={isSocialModalOpen}
        onClose={() => setIsSocialModalOpen(false)}
        data={panchangData}
      />

      {/* Scriptural Vedic Footer */}
      <PortalFooter />
    </div>
  );
};

export default PanchangHub;
