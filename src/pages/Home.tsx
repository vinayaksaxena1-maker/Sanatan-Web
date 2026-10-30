/**
 * Sanatan Web (सनातन घड़ी)
 * Official Luxury Home Page (वेद ज्योतिष केंद्र)
 * Pure Web, React 19, Zero External NPM Bloat
 */

import React from 'react';
import { PortalHeader } from './vedic-portal/components/PortalHeader';
import { PortalHero } from './vedic-portal/components/PortalHero';
import { PortalRashifalSlider } from './vedic-portal/components/PortalRashifalSlider';
import { PortalVratFestival } from './vedic-portal/components/PortalVratFestival';
import { PortalNavagraha } from './vedic-portal/components/PortalNavagraha';
import { PortalKundli } from './vedic-portal/components/PortalKundli';
import { PortalJigyasa } from './vedic-portal/components/PortalJigyasa';
import { PortalVedicToolsStrip } from './vedic-portal/components/PortalVedicToolsStrip';
import { PortalFooter } from './vedic-portal/components/PortalFooter';

export const Home: React.FC = () => {
  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      {/* Ambient Saffron & Chandan Radial Luminous Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      {/* Universal Top Header with Built-in Global Spotlight Search (Ctrl+K) */}
      <PortalHeader />

      {/* Unified Master Command Surface - Mathematically Calibrated 1520px Container */}
      <main className="responsive-portal-container pt-[126px] sm:pt-[132px] lg:pt-[146px] pb-12 space-y-[20px] sm:space-y-[25px]" id="mukhya">
        {/* 1. Contained Boxed Hero Section (Panchang Overview + Kaal Chakra Live Watch) */}
        <PortalHero />

        {/* 2. 1-Tap Zero-Friction Daily Horoscope Slider (Personal Engagement Hook) */}
        <PortalRashifalSlider />

        {/* 3. Sacred Festivals, Upcoming Vrats & Ekadashi Parana Timings */}
        <PortalVratFestival />

        {/* 4. Navagraha Real-Time Planetary Positions (Visual Cosmic Divider) */}
        <PortalNavagraha />

        {/* 5. Express Vedic Kundli & 36 Guna Milan Form + Quick Tools */}
        <PortalKundli />

        {/* 6. Sanatan Jigyasa & Shanka Samadhan (Vedic FAQ & Myth-Busters) */}
        <PortalJigyasa />

        {/* 7. All Hidden Tools & Calculation Engines Quick Strip Box */}
        <PortalVedicToolsStrip />
      </main>

      {/* Scriptural Vedic Footer */}
      <PortalFooter />
    </div>
  );
};

export default Home;
