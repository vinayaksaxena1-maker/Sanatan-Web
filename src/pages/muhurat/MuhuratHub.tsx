/**
 * Sanatan Web (सनातन घड़ी)
 * Hub 04: Shubh Muhurat Hub (शुभ मुहूर्त एवं संस्कार काल निर्णय)
 * Standardized Sacred Vedic Design matching Panchang & Choghadiya Hubs
 * Spacing: space-y-[22px], GoldenCornerBrackets, Swastika/Shree Yantra Watermarks
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React, { useState } from 'react';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import CitySelectModal from '../../components/common/CitySelectModal';
import { useMuhuratData } from './hooks/useMuhuratData';
import { MuhuratTopBar } from './components/MuhuratTopBar';
import { MuhuratInstantCards } from './components/MuhuratInstantCards';
import { MuhuratCautionAlerts } from './components/MuhuratCautionAlerts';
import { MuhuratCategoryCards } from './components/MuhuratCategoryCards';
import { MuhuratSanskarTable } from './components/MuhuratSanskarTable';
import { MuhuratJigyasa } from './components/MuhuratJigyasa';

export const MuhuratHub: React.FC = () => {
  const muhuratData = useMuhuratData();
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);

  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      {/* Ambient Saffron & Chandan Radial Luminous Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      {/* Top Header */}
      <PortalHeader />

      {/* Main Command Surface with Standardized 22px Vertical Spacing */}
      <main className="w-full pt-32 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-[22px]" id="muhurat-hub">
        {/* 1. Standardized Heritage TopBar with Compact Calendar Date Picker */}
        <MuhuratTopBar
          data={muhuratData}
          onOpenCityModal={() => setIsCityModalOpen(true)}
        />

        {/* 2. Today's Instant & Actionable Muhurats (Abhijit, Vijaya, Godhuli, Brahma) */}
        <MuhuratInstantCards data={muhuratData} />

        {/* 3. Caution Periods & Inauspicious Alerts (Panchak, Bhadra, Kharmas, Rahu Kaal) */}
        <MuhuratCautionAlerts data={muhuratData} />

        {/* 4. Ceremony & Activity Category Selection with Integrated Tabs (8 Categories) */}
        <MuhuratCategoryCards data={muhuratData} />

        {/* 5. High-Density Responsive Table for All 16 Major Vedic Ceremonies */}
        <MuhuratSanskarTable data={muhuratData} />

        {/* 6. Scriptural Wisdom & FAQ Accordion (सनातन जिज्ञासा एवं शंका समाधान) */}
        <MuhuratJigyasa />
      </main>

      {/* 7. City Selector Modal */}
      <CitySelectModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
      />

      {/* Scriptural Vedic Footer */}
      <PortalFooter />
    </div>
  );
};

export default MuhuratHub;
