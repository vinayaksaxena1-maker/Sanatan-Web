import React from 'react';
import { PortalHeader } from './components/PortalHeader';
import { PortalHero } from './components/PortalHero';
import { PortalRightNow } from './components/PortalRightNow';
import { PortalKundli } from './components/PortalKundli';
import { PortalPanchang } from './components/PortalPanchang';
import { PortalRashifal } from './components/PortalRashifal';
import { PortalNavagraha } from './components/PortalNavagraha';
import { PortalUpayVrat } from './components/PortalUpayVrat';
import { PortalFooter } from './components/PortalFooter';

export const VedicPortalPage: React.FC = () => {
  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      {/* Ambient Saffron & Chandan Radial Luminous Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      {/* Top Header */}
      <PortalHeader />

      {/* Full-Bleed Edge-to-Edge Hero Section (Left-to-Right Screen Width) */}
      <div className="w-full pt-28">
        <PortalHero />
      </div>

      {/* Main Command Surface */}
      <main className="w-full py-10 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8" id="mukhya">
        {/* 1-Second Actionable Live Status Card */}
        <PortalRightNow />

        {/* Interactive Kundli Section */}
        <PortalKundli />

        {/* Dedicated Daily Panchang Section */}
        <PortalPanchang />

        {/* Aaj Ka Rashifal - 12 Rashis */}
        <PortalRashifal />

        {/* Navagraha Position Strip */}
        <PortalNavagraha />

        {/* Dual Section: Upay & Vrat */}
        <PortalUpayVrat />
      </main>

      {/* Scriptural Vedic Footer */}
      <PortalFooter />
    </div>
  );
};

export default VedicPortalPage;
