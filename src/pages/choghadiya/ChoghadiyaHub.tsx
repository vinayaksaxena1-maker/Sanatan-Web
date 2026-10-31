/**
 * Sanatan Web (सनातन घड़ी)
 * Hub 03: Vedic Choghadiya & 24 Planetary Hora Hub (चौघड़िया एवं होरा हब)
 * Standardized Sacred Vedic Design in Parity with Panchang Hub
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React, { useState } from 'react';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import CitySelectModal from '../../components/common/CitySelectModal';
import { useChoghadiyaData } from './hooks/useChoghadiyaData';
import { ChoghadiyaTopBar } from './components/ChoghadiyaTopBar';
import { ChoghadiyaLiveHero } from './components/ChoghadiyaLiveHero';
import { ChoghadiyaDayNightGrid } from './components/ChoghadiyaDayNightGrid';
import { HoraLiveHero } from './components/HoraLiveHero';
import { HoraTable } from './components/HoraTable';
import { ChoghadiyaJigyasa } from './components/ChoghadiyaJigyasa';

export const ChoghadiyaHub: React.FC = () => {
  const choghadiyaData = useChoghadiyaData();
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);

  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      {/* Ambient Saffron & Chandan Radial Luminous Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      {/* Top Header */}
      <PortalHeader />

      {/* Main Command Surface */}
      <main className="w-full pt-32 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-[22px]" id="choghadiya-hub">
        {/* 1. Header Banner, Title, Interactive Date Selector */}
        <ChoghadiyaTopBar
          data={choghadiyaData}
          onOpenCityModal={() => setIsCityModalOpen(true)}
        />

        {/* 2. Live Active Choghadiya Hero & Radar Pulse with Live Countdown */}
        <ChoghadiyaLiveHero data={choghadiyaData} />

        {/* 3. 8 Day + 8 Night Choghadiya Bento Grid with Active Highlighting */}
        <ChoghadiyaDayNightGrid data={choghadiyaData} />

        {/* 5. Live Active & Upcoming Planetary Hora Hero */}
        <HoraLiveHero data={choghadiyaData} />

        {/* 6. 24 Planetary Hora Matrix with Beej Mantras & Real-time Indicator */}
        <HoraTable data={choghadiyaData} />

        {/* 6. सनातन जिज्ञासा एवं शंका समाधान (Choghadiya & Hora FAQ Accordion) */}
        <ChoghadiyaJigyasa />
      </main>

      {/* City Selector Modal */}
      <CitySelectModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
      />

      {/* Scriptural Vedic Footer */}
      <PortalFooter />
    </div>
  );
};

export default ChoghadiyaHub;
