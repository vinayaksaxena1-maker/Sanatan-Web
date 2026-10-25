/**
 * Sanatan Web (सनातन घड़ी)
 * Hub 06: 36 Guna Kundli Milan Hub (३६ गुण कुण्डली मिलान एवं विवाह निर्णय)
 * Official Luxury Redesign based on Stitch Screens 61e3219cdb7243f3bed3a589acfaa9c6 & b14c3990
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import { useMatchmakingData } from './hooks/useMatchmakingData';
import { MatchmakingTopBar } from './components/MatchmakingTopBar';
import { MatchmakingInputSection } from './components/MatchmakingInputSection';
import { MatchmakingScoreSummary } from './components/MatchmakingScoreSummary';
import { MatchmakingKootaList } from './components/MatchmakingKootaList';
import { MatchmakingManglikCard } from './components/MatchmakingManglikCard';
import { MatchmakingA4CertificateModal } from './components/MatchmakingA4CertificateModal';

export const MatchmakingHub: React.FC = () => {
  const matchmakingData = useMatchmakingData();

  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      {/* Ambient Saffron & Chandan Radial Luminous Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      {/* Top Header */}
      <PortalHeader />

      {/* Main Command Surface */}
      <main className="w-full pt-32 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8" id="matchmaking-hub">
        {/* 1. Header Hero Banner, Breadcrumb & Actions */}
        <MatchmakingTopBar
          onOpenCertificate={() => matchmakingData.setIsCertificateModalOpen(true)}
          onLoadPreset={matchmakingData.loadPresetPair}
        />

        {/* 2. Dual Profile Input (Groom & Bride) */}
        <MatchmakingInputSection data={matchmakingData} />

        {/* 3. 36-Guna Master Score Summary & Vital Dosha Badges */}
        <MatchmakingScoreSummary data={matchmakingData} />

        {/* 4. Ashtakoot 8-Pillars Granular Scorecard */}
        <MatchmakingKootaList data={matchmakingData} />

        {/* 5. Manglik (Kuja) Dosha Analysis & 14 Classical Cancellation Conditions */}
        <MatchmakingManglikCard data={matchmakingData} />
      </main>

      {/* Printable A4 Certificate Modal */}
      <MatchmakingA4CertificateModal
        isOpen={matchmakingData.isCertificateModalOpen}
        onClose={() => matchmakingData.setIsCertificateModalOpen(false)}
        data={matchmakingData}
      />

      {/* Global Footer */}
      <PortalFooter />
    </div>
  );
};

export default MatchmakingHub;
