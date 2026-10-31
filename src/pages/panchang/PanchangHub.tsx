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
import { PanchangJigyasa } from './components/PanchangJigyasa';
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
      <main className="w-full pt-32 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-[22px]" id="panchang-hub">
        {/* Top Header Banner, Location Chips, Date Controller */}
        <PanchangTopBar
          data={panchangData}
          onOpenCityModal={() => setIsCityModalOpen(true)}
          onOpenSocialModal={() => setIsSocialModalOpen(true)}
        />

        {/* १. सूर्योदय एवं चन्द्रोदय (Sunrise and Moonrise) */}
        <PanchangSolarLunar data={panchangData} />

        {/* २. पंचांग के ५ मुख्य अंग (Panchang - Tithi, Vaar, Nakshatra, Yoga, Karana) */}
        <PanchangFiveAngas data={panchangData} />

        {/* ३. संवत्सर व मन्त्री मण्डल (Samvatsara & Governance Mandala) */}
        <PanchangSamvatsaraMandala data={panchangData} />

        {/* ४. खगोलीय मान, दिनमान व पंचांग प्रणालियां (Astronomical Epochs & Calendars) */}
        <PanchangAstronomicalEpochs data={panchangData} />

        {/* ५. शुभ मुहूर्त एवं अशुभ काल मैट्रिक्स (Auspicious & Inauspicious Timings) */}
        <PanchangShubhAshubh data={panchangData} />

        {/* ६. अतिरिक्त योग व सूक्ष्म काल (Anandadi, Aadal-Vidaal & Special Yogas) */}
        <PanchangExtendedYogas data={panchangData} />

        {/* ७. निवास, चक्र एवं अनुष्ठान विचार (Ritual Shuddhi: शिववास, अग्निवास, भद्रा, दिशा शूल) */}
        <PanchangRitualShuddhi data={panchangData} />

        {/* ८. मुहूर्त व लग्न शुद्धि (Lagna & Muhurta Depth: १२ उदय लग्न, पंचक, चन्द्रबल, ताराबल) */}
        <PanchangLagnaShuddhi data={panchangData} />

        {/* ९. सनातन जिज्ञासा एवं शंका समाधान (Panchang-Specific FAQ Accordion) */}
        <PanchangJigyasa />
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
