/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 03: विस्तृत जन्म कुण्डली एवं पराशरीय ग्रह विश्लेषण (/kundli)
 * Stitch Screens: 9c7b3d8b44c2406193e1125fed7b8b2a & 9d061687a2514b508e50d8af42e4bbb1
 */

import React, { useEffect } from 'react';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';
import CitySelectModal from '../../components/common/CitySelectModal';
import { useLocationStore } from '../../store/locationStore';
import { useKundliData } from './hooks/useKundliData';
import { KundliTopBar } from './components/KundliTopBar';
import { KundliInputBar } from './components/KundliInputBar';
import { AvakahadaChakraSection } from './components/AvakahadaChakraSection';
import { KundliChakraViewerSection } from './components/KundliChakraViewerSection';
import { PlanetaryTableSection } from './components/PlanetaryTableSection';
import { VimshottariDashaSection } from './components/VimshottariDashaSection';
import { HousesAshtakavargaSection } from './components/HousesAshtakavargaSection';
import { PanditConsultationBanner } from './components/PanditConsultationBanner';
import { TraditionalA4PatrikaModal } from './components/TraditionalA4PatrikaModal';

export const KundliHub: React.FC = () => {
  const {
    input,
    handleInputChange,
    selectedVarga,
    setSelectedVarga,
    chartStyle,
    setChartStyle,
    isPrintModalOpen,
    setIsPrintModalOpen,
    isCityModalOpen,
    setIsCityModalOpen,
    horoscope,
    resetToSample
  } = useKundliData();

  const { selectedCity } = useLocationStore();

  // Sync city selection from modal
  useEffect(() => {
    if (selectedCity) {
      handleInputChange('cityName', selectedCity.nameHindi || selectedCity.name);
      handleInputChange('latitude', selectedCity.latitude);
      handleInputChange('longitude', selectedCity.longitude);
    }
  }, [selectedCity, handleInputChange]);

  return (
    <div className="min-h-screen bg-[#faf7f2] dark:bg-[#121826] text-stone-900 dark:text-stone-100 transition-colors duration-200">
      {/* Universal Luxury Navigation Header */}
      <PortalHeader />

      {/* Main Kundli Surface */}
      <main className="w-full pt-32 pb-16 px-4 sm:px-8 lg:px-12 max-w-7xl mx-auto space-y-8" id="kundli-hub">
        {/* 1. Breadcrumb, Ayanamsha Badge, Header & Actions */}
        <KundliTopBar
          horoscope={horoscope}
          onOpenPrintModal={() => setIsPrintModalOpen(true)}
          onReset={resetToSample}
        />

        {/* 2. Interactive Birth Details Input Bar */}
        <KundliInputBar
          input={input}
          onChange={handleInputChange}
          onOpenCityModal={() => setIsCityModalOpen(true)}
        />

        {/* 3. Avakahada Chakra & Birth Panchang 6-Card Bento Grid */}
        <AvakahadaChakraSection horoscope={horoscope} />

        {/* 4. Kundli Chakra Viewer (D1 to D60), Chart Style Switcher & Yogas */}
        <KundliChakraViewerSection
          horoscope={horoscope}
          selectedVarga={selectedVarga}
          onSelectVarga={setSelectedVarga}
          chartStyle={chartStyle}
          onSelectChartStyle={setChartStyle}
        />

        {/* 5. Comprehensive Planetary Longitude Table */}
        <PlanetaryTableSection horoscope={horoscope} />

        {/* 6. Vimshottari Mahadasha Timeline (120-Year Timeline) */}
        <VimshottariDashaSection horoscope={horoscope} />

        {/* 7. 12 Houses Analysis & Sarvashtakavarga 337 Invariant Grid */}
        <HousesAshtakavargaSection horoscope={horoscope} />

        {/* 8. Astrologer Consultation & A4 Print Banner */}
        <PanditConsultationBanner
          onOpenPrintModal={() => setIsPrintModalOpen(true)}
        />
      </main>

      {/* Traditional A4 Pandit Janampatrika Modal (Screen 9d061687) */}
      <TraditionalA4PatrikaModal
        isOpen={isPrintModalOpen}
        onClose={() => setIsPrintModalOpen(false)}
        input={input}
        horoscope={horoscope}
      />

      {/* 5,000+ Town City Selection Modal */}
      <CitySelectModal
        isOpen={isCityModalOpen}
        onClose={() => setIsCityModalOpen(false)}
      />

      {/* Universal Luxury Vedic Footer */}
      <PortalFooter />
    </div>
  );
};

export default KundliHub;
