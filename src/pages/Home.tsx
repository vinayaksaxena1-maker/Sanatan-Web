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

      {/* 1. Full-Bleed Edge-to-Edge Hero Section (Panchang Overview + Sanatan Watch) */}
      <div className="w-full pt-28">
        <PortalHero />
      </div>

      {/* Main Command Surface - Full-Bleed Section Bands with Standardized 1320px Inner Grid */}
      <main className="w-full" id="mukhya">
        {/* 2. 1-Tap Zero-Friction Daily Horoscope Slider (Personal Engagement Hook) */}
        <section className="w-full bg-[#fcf9f2] border-b border-[#dec9ab]/70 relative">
          <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 lg:py-10">
            <PortalRashifalSlider />
          </div>
        </section>

        {/* 3. Sacred Festivals, Upcoming Vrats & Ekadashi Parana Timings */}
        <section className="w-full bg-[#f8f3e8] border-b border-[#d4af37]/25 relative">
          <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 lg:py-10">
            <PortalVratFestival />
          </div>
        </section>

        {/* 4. Navagraha Real-Time Planetary Positions (Visual Cosmic Divider) */}
        <section className="w-full bg-gradient-to-b from-[#fcf9f2] via-[#f7f0e1]/70 to-[#fcf9f2] border-b border-[#dec9ab]/70 relative">
          <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 lg:py-10">
            <PortalNavagraha />
          </div>
        </section>

        {/* 5. Express Vedic Kundli & 36 Guna Milan Form + Quick Tools */}
        <section className="w-full bg-[#f8f3e8] border-b border-[#d4af37]/25 relative">
          <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 lg:py-10">
            <PortalKundli />
          </div>
        </section>

        {/* 6. Sanatan Jigyasa & Shanka Samadhan (Vedic FAQ & Myth-Busters) */}
        <section className="w-full bg-[#fcf9f2] border-b border-[#dec9ab]/70 relative">
          <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 lg:py-10">
            <PortalJigyasa />
          </div>
        </section>

        {/* 7. All Hidden Tools & Calculation Engines Quick Strip Box */}
        <section className="w-full bg-[#f8f3e8] border-b border-[#d4af37]/30 relative">
          <div className="w-full max-w-[1320px] mx-auto px-4 sm:px-6 lg:px-8 py-7 sm:py-8 lg:py-10">
            <PortalVedicToolsStrip />
          </div>
        </section>
      </main>

      {/* Scriptural Vedic Footer */}
      <PortalFooter />
    </div>
  );
};

export default Home;
