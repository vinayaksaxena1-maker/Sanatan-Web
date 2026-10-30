/**
 * Sanatan Web (सनातन घड़ी)
 * Official Luxury Home Page (वेद ज्योतिष केंद्र)
 * Pure Web, React 19, Zero External NPM Bloat
 */

import React from 'react';
import { PortalHeader } from './vedic-portal/components/PortalHeader';
import { PortalHero } from './vedic-portal/components/PortalHero';
import { PortalQuickServices } from './vedic-portal/components/PortalQuickServices';
import { PortalKundli } from './vedic-portal/components/PortalKundli';
import { PortalRashifal } from './vedic-portal/components/PortalRashifal';
import { PortalUpayVrat } from './vedic-portal/components/PortalUpayVrat';
import { PortalPanchang } from './vedic-portal/components/PortalPanchang';
import { PortalNavagraha } from './vedic-portal/components/PortalNavagraha';
import { PortalFooter } from './vedic-portal/components/PortalFooter';

export const Home: React.FC = () => {
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

      {/* Main Command Surface - Standardized 1320px Master Container */}
      <main className="w-full py-8 lg:py-10 px-4 sm:px-6 lg:px-8 max-w-[1320px] mx-auto space-y-8 lg:space-y-10" id="mukhya">
        {/* 1. 8-Card Quick Services Bento Grid */}
        <PortalQuickServices />

        {/* 2. Interactive Kundli & 36 Guna Milan Desk */}
        <PortalKundli />

        {/* 3. Aaj Ka Rashifal - 12 Rashis with Name Letters */}
        <PortalRashifal />

        {/* 4. Dual Section: Daily Vedic Upay, Japa Counter & Vrats */}
        <PortalUpayVrat />

        {/* 5. Advanced Shastriya Panchang Desk (No Duplicate Basic Cards) */}
        <PortalPanchang />

        {/* 6. Navagraha Position Strip & Transit */}
        <PortalNavagraha />
      </main>

      {/* Scriptural Vedic Footer */}
      <PortalFooter />
    </div>
  );
};

export default Home;
