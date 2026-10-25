/**
 * Sanatan Web (सनातन घड़ी)
 * Hub 08: Ephemeris Settings, Ayanamsha & System Preferences Hub (स्थान, अयनांश एवं सिस्टम सेटिंग्स)
 * Official Luxury Redesign based on Stitch Screen ddb3a1e254a44d7e95e9a6fe10323c6e
 * Pure Web, React 19, Strict < 300 lines modular standard
 */

import React from 'react';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import CitySelectModal from '../../components/common/CitySelectModal';
import { useSettingsData } from './hooks/useSettingsData';
import { SettingsTopBar } from './components/SettingsTopBar';
import { AyanamshaSelectorSection } from './components/AyanamshaSelectorSection';
import { HouseSystemSection } from './components/HouseSystemSection';
import { LocationSettingsSection } from './components/LocationSettingsSection';
import { DisplayPreferencesSection } from './components/DisplayPreferencesSection';
import { DiagnosticsStorageSection } from './components/DiagnosticsStorageSection';

export const SettingsHub: React.FC = () => {
  const settingsData = useSettingsData();

  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      {/* Ambient Saffron & Chandan Radial Luminous Glows */}
      <div className="fixed top-0 left-1/4 w-[700px] h-[700px] ambient-glow-saffron pointer-events-none -z-10 blur-3xl opacity-75"></div>
      <div className="fixed top-1/3 right-[-100px] w-[600px] h-[600px] ambient-glow-gold pointer-events-none -z-10 blur-3xl opacity-60"></div>

      {/* Top Header */}
      <PortalHeader />

      {/* Main Command Surface */}
      <main className="w-full pt-32 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8" id="settings-hub">
        {/* 1. Top Heritage Scrim, Breadcrumb, Authority Ribbon & Factory Reset */}
        <SettingsTopBar
          onResetAll={settingsData.handleResetAll}
          toastMessage={settingsData.toastMessage}
        />

        {/* 2. Ephemeris Ayanamsha System Selector (Lahiri, KP, Raman) */}
        <AyanamshaSelectorSection data={settingsData} />

        {/* 3. House Cusps Calculation System (Sripati, Placidus, Equal House) */}
        <HouseSystemSection data={settingsData} />

        {/* 4. Location, Geographic Coordinates & Timezone Management */}
        <LocationSettingsSection data={settingsData} />

        {/* 5. Language, Devanagari Numerals & Regional Kundli Chart Styles */}
        <DisplayPreferencesSection data={settingsData} />

        {/* 6. Offline Panchang Engine Cache, Diagnostics & Backup */}
        <DiagnosticsStorageSection data={settingsData} />
      </main>

      {/* 5,000+ Town City Selection Modal */}
      <CitySelectModal
        isOpen={settingsData.isCityModalOpen}
        onClose={() => settingsData.setIsCityModalOpen(false)}
      />

      {/* Global Footer */}
      <PortalFooter />
    </div>
  );
};

export default SettingsHub;
