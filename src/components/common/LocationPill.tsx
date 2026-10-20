/**
 * Sanatan Ghadi (सनातन घड़ी)
 * LocationPill Component
 * Top Banner / Pill showing active city, GPS detection trigger & Ujjain Prime Meridian status
 */

import React from 'react';
import { useLocationStore } from '../../store/locationStore';
import { useTranslation } from '../../i18n/i18nContext';
import { useRouter } from '../../routes/AppRoutes';
import { MapPin, Navigation, Loader2 } from 'lucide-react';

export interface LocationPillProps {
  className?: string;
  showCoordinates?: boolean;
}

export const LocationPill: React.FC<LocationPillProps> = ({
  className = '',
  showCoordinates = false,
}) => {
  const { currentCity, isLocating, detectDeviceLocation } = useLocationStore();
  const { isHindi } = useTranslation();
  const { navigate } = useRouter();

  const handleGpsClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    detectDeviceLocation();
  };

  const handlePillClick = () => {
    navigate('/cities');
  };

  const displayName = isHindi ? currentCity.nameHindi : currentCity.name;
  const displayState = isHindi ? currentCity.stateHindi : currentCity.state;

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handlePillClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handlePillClick();
        }
      }}
      aria-label={`वर्तमान स्थान: ${displayName}, ${displayState}. स्थान बदलने के लिए क्लिक करें.`}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-[#26201b]/80 border border-amber-200/90 dark:border-amber-900/60 shadow-2xs hover:border-amber-400 dark:hover:border-amber-700 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 transition-all duration-200 cursor-pointer select-none text-xs ${className}`}
    >
      <div className="flex items-center gap-1.5 text-amber-800 dark:text-amber-400 font-semibold">
        <MapPin className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
        <span className="truncate max-w-[120px] sm:max-w-[180px] text-stone-900 dark:text-stone-100">
          {displayName}
        </span>
        <span className="text-[11px] text-stone-500 dark:text-stone-400 hidden sm:inline">
          ({displayState})
        </span>
      </div>

      {currentCity.isDefaultFallback && (
        <span
          title="प्राचीन सनातन याम्योत्तर मानक (Ujjain Prime Meridian)"
          className="text-[10px] px-1.5 py-0.2 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-300 font-bold border border-amber-300 dark:border-amber-800 hidden xs:inline"
        >
          अवन्तिका
        </span>
      )}

      {showCoordinates && (
        <span className="text-[10px] text-stone-400 tabular-nums hidden md:inline">
          {currentCity.latitude.toFixed(2)}°N, {currentCity.longitude.toFixed(2)}°E
        </span>
      )}

      {/* GPS Locate Button */}
      <button
        type="button"
        onClick={handleGpsClick}
        disabled={isLocating}
        title="जीपीएस द्वारा निकटतम शहर खोजें"
        aria-label="जीपीएस द्वारा स्थान पहचानें"
        className="p-1 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/50 text-amber-700 dark:text-amber-400 transition-colors cursor-pointer disabled:opacity-50"
      >
        {isLocating ? (
          <Loader2 className="w-3 h-3 animate-spin text-amber-600" />
        ) : (
          <Navigation className="w-3 h-3 hover:scale-110 transition-transform" />
        )}
      </button>
    </div>
  );
};

export default LocationPill;
