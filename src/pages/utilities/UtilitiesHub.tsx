/**
 * Sanatan Web (सनातन घड़ी)
 * Hub 07: Sanatan Kaalganana & Vedic Utilities Hub (सनातन कालगणना एवं वैदिक टूल्स हब)
 * Official Luxury Redesign based on Stitch Screen a95b0eb6852d4bde8f8cda293121691b
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import { useUtilitiesData } from './hooks/useUtilitiesData';
import { UtilitiesTopBar } from './components/UtilitiesTopBar';
import { SadeSatiCalculator } from './components/SadeSatiCalculator';
import { VedicTimeConverter } from './components/VedicTimeConverter';
import { GemstoneRudrakshaAdvisor } from './components/GemstoneRudrakshaAdvisor';
import { VastuCompassSection } from './components/VastuCompassSection';

export const UtilitiesHub: React.FC = () => {
  const utilitiesData = useUtilitiesData();
  const { activeTab, setActiveTab } = utilitiesData;

  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      {/* Ambient Saffron & Chandan Radial Luminous Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      {/* Top Header */}
      <PortalHeader />

      {/* Main Command Surface */}
      <main className="w-full pt-32 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8" id="utilities-hub">
        {/* 1. Header Hero Banner, Breadcrumb & 4 Suite Switcher Navigation */}
        <UtilitiesTopBar
          activeTab={activeTab}
          onSelectTab={setActiveTab}
        />

        {/* 2. Active Specialized Suite Surface */}
        <div className="transition-all duration-300">
          {activeTab === 'sade_sati' && (
            <SadeSatiCalculator data={utilitiesData} />
          )}

          {activeTab === 'time_converter' && (
            <VedicTimeConverter data={utilitiesData} />
          )}

          {activeTab === 'gemstone_rudraksha' && (
            <GemstoneRudrakshaAdvisor data={utilitiesData} />
          )}

          {activeTab === 'vastu_compass' && (
            <VastuCompassSection data={utilitiesData} />
          )}
        </div>
      </main>

      {/* Global Footer */}
      <PortalFooter />
    </div>
  );
};

export default UtilitiesHub;
