import React, { useMemo } from 'react';
import CosmicConstellationBackdrop from './CosmicConstellationBackdrop';
import HeroLiveStatusBadge from './HeroLiveStatusBadge';
import PanchangQuickLook from './PanchangQuickLook';
import { LiveMuhuratWatchCard } from '../watch';
import type { PanchangInfo, ChoghadiyaInterval, HoraInterval } from '../../engine/types';

interface CityInfo {
  name: string;
  nameHindi: string;
  latitude: number;
  longitude: number;
}

interface HomeHeroSectionProps {
  panchang: PanchangInfo;
  abhijitMuhurat: { startTime: string; endTime: string };
  clockTime: Date;
  currentCity: CityInfo;
  onOpenCityModal: () => void;
  detectDeviceLocation: () => void;
  isLocating: boolean;
  formattedDateHindi: string;
  currentDayName: string;
  currentDayRuler: string;
}

function parseTimeToMinutes(tStr?: string): number {
  if (!tStr) return 0;
  const parts = tStr.trim().split(' ');
  if (parts.length < 2) {
    const [h, m] = tStr.split(':').map(Number);
    return (h || 0) * 60 + (m || 0);
  }
  const [time, ampm] = parts;
  let [h, m] = time.split(':').map(Number);
  if (isNaN(h)) h = 0;
  if (isNaN(m)) m = 0;
  if (ampm?.toUpperCase() === 'PM' && h !== 12) h += 12;
  if (ampm?.toUpperCase() === 'AM' && h === 12) h = 0;
  return h * 60 + m;
}

function isTimeInInterval(curMin: number, startStr: string, endStr: string): boolean {
  const start = parseTimeToMinutes(startStr);
  const end = parseTimeToMinutes(endStr);
  if (end < start) {
    return curMin >= start || curMin < end;
  }
  return curMin >= start && curMin < end;
}

export const HomeHeroSection: React.FC<HomeHeroSectionProps> = ({
  panchang,
  abhijitMuhurat,
  clockTime,
  currentCity,
  onOpenCityModal,
  detectDeviceLocation,
  isLocating,
  formattedDateHindi,
  currentDayName,
  currentDayRuler,
}) => {
  const curMin = clockTime.getHours() * 60 + clockTime.getMinutes();

  // Active Choghadiya Calculation
  const activeChoghadiyaIndex = useMemo(() => {
    if (!panchang.choghadiya || panchang.choghadiya.length === 0) return 0;
    const idx = panchang.choghadiya.findIndex((ch: ChoghadiyaInterval) => isTimeInInterval(curMin, ch.startTime, ch.endTime));
    return idx !== -1 ? idx : 0;
  }, [panchang.choghadiya, curMin]);

  const currentChoghadiya = useMemo(() => {
    if (panchang.choghadiya && activeChoghadiyaIndex >= 0 && activeChoghadiyaIndex < panchang.choghadiya.length) {
      return panchang.choghadiya[activeChoghadiyaIndex];
    }
    return null;
  }, [panchang.choghadiya, activeChoghadiyaIndex]);

  // Active Hora Calculation
  const activeHora = useMemo(() => {
    if (!panchang.hora || panchang.hora.length === 0) return null;
    return panchang.hora.find((h: HoraInterval) => isTimeInInterval(curMin, h.startTime, h.endTime)) || panchang.hora[0];
  }, [panchang.hora, curMin]);

  return (
    <section className="relative w-full overflow-hidden border-b border-[#1e1b4b]/80 bg-[#060913] text-white selection:bg-[#fbbf24]/30">
      
      {/* 1. Deep Cosmic Celestial Geometry & Constellation Backdrop */}
      <CosmicConstellationBackdrop />

      {/* 2. Main Hero Content Grid (Full Width Container) */}
      <div className="relative max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 py-6 sm:py-10">
        
        {/* Top Centered Status Pill & Sacred Header */}
        <div className="flex flex-col items-center text-center space-y-2.5 mb-6 sm:mb-8">
          
          {/* Real-time Dynamic Live Status Pill */}
          <HeroLiveStatusBadge
            clockTime={clockTime}
            rahuKaal={panchang.rahuKaal}
            currentChoghadiya={currentChoghadiya}
            className="mb-1"
          />

          <p className="text-sm sm:text-base lg:text-lg font-serif font-bold tracking-widest text-amber-300 drop-shadow-sm">
            ॥ सनातन जीवन का डिजिटल साथी ॥
          </p>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif text-white tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)] leading-tight">
            आज का पंचांग
          </h1>

          <p className="text-xs sm:text-sm lg:text-base text-amber-200/80 font-serif tracking-wide font-medium max-w-xl">
            दिन की सही दिशा, शुभ समय और वैदिक कालचक्र के साथ
          </p>
        </div>

        {/* 2-Column Split: Action-Oriented Panchang (Left) vs Interactive Live Cockpit (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          
          {/* Left Column (Span 7): Sleek 5-Anga Strip, Solar Timeline Bar, CTAs */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <PanchangQuickLook
              panchang={panchang}
              abhijitMuhurat={abhijitMuhurat}
              clockTime={clockTime}
              currentCity={currentCity}
              onOpenCityModal={onOpenCityModal}
              detectDeviceLocation={detectDeviceLocation}
              isLocating={isLocating}
              formattedDateHindi={formattedDateHindi}
              currentDayName={currentDayName}
              currentDayRuler={currentDayRuler}
            />
          </div>

          {/* Right Column (Span 5): Master Vedic Live Cockpit Watch */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center">
            <LiveMuhuratWatchCard
              clockTime={clockTime}
              choghadiyaList={panchang.choghadiya}
              activeChoghadiyaIndex={activeChoghadiyaIndex}
              horaList={panchang.hora}
              activeHora={activeHora}
              sunriseTimeStr={panchang.sunrise}
              sunsetTimeStr={panchang.sunset}
              currentCity={currentCity}
            />
          </div>

        </div>

      </div>

    </section>
  );
};

export default HomeHeroSection;
