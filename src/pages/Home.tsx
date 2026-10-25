/**
 * Sanatan Web (सनातन घड़ी)
 * Official Luxury Home Page (वेद ज्योतिष केंद्र)
 * Pure Web, React 19, Zero External NPM Bloat
 */

import React from 'react';
import { PortalHeader } from './vedic-portal/components/PortalHeader';
import { PortalHero } from './vedic-portal/components/PortalHero';
import { PortalRightNow } from './vedic-portal/components/PortalRightNow';
import { PortalKundli } from './vedic-portal/components/PortalKundli';
import { PortalPanchang } from './vedic-portal/components/PortalPanchang';
import { PortalRashifal } from './vedic-portal/components/PortalRashifal';
import { PortalNavagraha } from './vedic-portal/components/PortalNavagraha';
import { PortalUpayVrat } from './vedic-portal/components/PortalUpayVrat';
import { PortalFooter } from './vedic-portal/components/PortalFooter';

export const Home: React.FC = () => {
  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      {/* Ambient Saffron & Chandan Radial Luminous Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      {/* Top Header */}
      <PortalHeader />

      {/* Main Command Surface */}
      <main className="w-full pt-32 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8" id="mukhya">
        {/* Hero Section */}
        <PortalHero />

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

export default Home;
