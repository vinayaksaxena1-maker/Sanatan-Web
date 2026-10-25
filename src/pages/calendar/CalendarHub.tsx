/**
 * Sanatan Web (सनातन घड़ी)
 * Hub 05: Hindu & Regional Calendar Hub (हिन्दू कैलेंडर, सम्पूर्ण व्रत निर्णय एवं A4 वॉल कैलेंडर)
 * Official Luxury Redesign based on Stitch Screens 3d6cdc605d334ebdbd7da24b738d7867 & af8f5397cba344409cc0ea0c0a5d0af7
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React, { useState } from 'react';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import CitySelectModal from '../../components/common/CitySelectModal';
import { useCalendarData } from './hooks/useCalendarData';
import { CalendarTopBar } from './components/CalendarTopBar';
import { CalendarMonthSwitcher } from './components/CalendarMonthSwitcher';
import { CalendarFilterChips } from './components/CalendarFilterChips';
import { CalendarMonthlyGrid } from './components/CalendarMonthlyGrid';
import { CalendarDayDrawer } from './components/CalendarDayDrawer';
import { WallCalendarA4Modal } from './components/WallCalendarA4Modal';

export const CalendarHub: React.FC = () => {
  const calendarData = useCalendarData();
  const [isCityModalOpen, setIsCityModalOpen] = useState<boolean>(false);

  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      {/* Ambient Saffron & Chandan Radial Luminous Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      {/* Top Header */}
      <PortalHeader />

      {/* Main Command Surface */}
      <main className="w-full pt-32 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8" id="calendar-hub">
        {/* 1. Header Banner, Breadcrumb & A4 Wall Calendar Action */}
        <CalendarTopBar
          data={calendarData}
          onOpenA4Modal={() => calendarData.setIsA4ModalOpen(true)}
          onOpenCityModal={() => setIsCityModalOpen(true)}
        />

        {/* 2. Interactive Month Switcher & Samvat Metadata Metrics */}
        <CalendarMonthSwitcher data={calendarData} />

        {/* 3. Fast Filter Chips for Vrat Categories */}
        <CalendarFilterChips
          selectedFilter={calendarData.selectedFilter}
          onSelectFilter={calendarData.setSelectedFilter}
        />

        {/* 4. 2-Column Responsive Matrix (Left 8 Cols Grid + Right 4 Cols Day Drawer) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Monthly 7-Column Grid (8 Columns on desktop) */}
          <div className="lg:col-span-8 w-full">
            <CalendarMonthlyGrid
              gridCells={calendarData.calendarGrid}
              selectedDayNumber={calendarData.selectedDayNumber}
              onSelectDay={calendarData.setSelectedDayNumber}
              selectedFilter={calendarData.selectedFilter}
            />
          </div>

          {/* Right Inspector Drawer (4 Columns on desktop) */}
          <div className="lg:col-span-4 w-full">
            <CalendarDayDrawer
              selectedDayDetails={calendarData.selectedDayDetails}
              onSelectDay={calendarData.setSelectedDayNumber}
              onOpenA4Modal={() => calendarData.setIsA4ModalOpen(true)}
            />
          </div>
        </div>
      </main>

      {/* Global Modals */}
      <WallCalendarA4Modal
        isOpen={calendarData.isA4ModalOpen}
        onClose={() => calendarData.setIsA4ModalOpen(false)}
      />

      <CitySelectModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
      />

      {/* Global Footer */}
      <PortalFooter />
    </div>
  );
};

export default CalendarHub;
