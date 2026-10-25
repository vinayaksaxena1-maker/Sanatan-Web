/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 09: 5,000+ Indian Towns Atlas & Dynamic Fuzzy Search Hub
 */

import React, { useState, useEffect, useTransition } from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import { MapPin, Search, Navigation, Check, Clock, Globe } from 'lucide-react';
import { useLocationStore } from '../../store/locationStore';
import { searchCitiesDatabase, getBundledMajorCities } from '../../engine/citiesDatabase';
import { getTimezoneOffsetWithDST } from '../../engine/timezoneAdapter';
import type { CityLocation } from '../../types/location';
import { PortalHeader } from '../vedic-portal/components/PortalHeader';
import { PortalFooter } from '../vedic-portal/components/PortalFooter';

export const CitiesHub: React.FC = () => {
  const { t } = useTranslation();
  const { currentCity, setCity } = useLocationStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<CityLocation[]>(() => getBundledMajorCities().slice(0, 15));
  const [searchLatencyMs, setSearchLatencyMs] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();
  const [selectedNotification, setSelectedNotification] = useState<string | null>(null);

  useEffect(() => {
    let isCancelled = false;
    const controller = new AbortController();
    const start = performance.now();

    const timer = setTimeout(() => {
      startTransition(() => {
        searchCitiesDatabase(query, {
          limit: 25,
          includeGlobalNominatim: true,
          signal: controller.signal,
        })
          .then((data) => {
            if (!isCancelled) {
              const latency = Math.round(performance.now() - start);
              setResults(data);
              setSearchLatencyMs(latency);
            }
          })
          .catch(() => {
            // Silently ignore aborted fetches
          });
      });
    }, 150);

    return () => {
      isCancelled = true;
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  const handleSelect = (city: CityLocation) => {
    setCity(city);
    setSelectedNotification(city.name);
    setTimeout(() => setSelectedNotification(null), 3000);
  };

  return (
    <div className="bg-[#f7f2e6] text-[#26150b] antialiased selection:bg-[#ea580c] selection:text-white relative min-h-screen overflow-x-hidden font-serif">
      <PortalHeader />

      <main className="w-full pt-32 pb-16 px-4 sm:px-8 lg:px-12 max-w-4xl mx-auto space-y-6">
        <header className="space-y-1">
        <div className="flex items-center gap-2">
          <MapPin className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 font-serif">
            {t('nav.cities')}
          </h1>
        </div>
        <p className="text-sm text-stone-600">
          5,000+ भारतीय नगरों, तहसीलों का एटलस, गतिशील लेज़ी-लोडिंग एवं उज्जैन (अवन्तिका) मुख्य याम्योत्तर
        </p>
      </header>

      {/* Ujjain Fallback Banner */}
      <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-start gap-2.5 shadow-2xs">
        <Navigation className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold block">प्राचीन सनातन याम्योत्तर (Prime Meridian of Avantika):</span>
          <span>
            जीपीएस अनुमति अस्वीकृत होने पर सनातन घड़ी स्वतः उज्जैन (23.1765° N, 75.7885° E) के अक्षांश-देशांतर पर सेट हो जाती है।
          </span>
        </div>
      </div>

      {/* Notification Toast */}
      {selectedNotification && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center gap-2 animate-fade-in">
          <Check className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>नगर सफलतापूर्वक चुना गया: <strong>{selectedNotification}</strong></span>
        </div>
      )}

      {/* Search Input Box */}
      <div className="relative">
        <Search className="w-5 h-5 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="नगर, तहसील या शहर खोजें (उदा: कन्नौज, उन्नाव, उज्जैन, New York)..."
          className="w-full pl-11 pr-24 py-3 rounded-2xl bg-white border border-stone-300 focus:outline-none focus:border-amber-600 text-sm shadow-xs transition-colors"
        />
        {searchLatencyMs !== null && (
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[11px] font-mono text-stone-400 bg-stone-100 px-2 py-0.5 rounded-md">
            <Clock className="w-3 h-3 text-stone-400" />
            <span>{searchLatencyMs} ms</span>
          </div>
        )}
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between text-xs text-stone-500 px-1">
        <span>
          {query.trim() ? `"${query}" के परिणाम` : 'प्रमुख तीर्थ एवं महानगर'} ({results.length})
        </span>
        {isPending && <span className="text-amber-600 font-medium animate-pulse">खोज जारी है...</span>}
      </div>

      {/* Cities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {results.map((city) => {
          const isCurrent = currentCity.id === city.id || currentCity.name === city.name;
          const tzDetails = getTimezoneOffsetWithDST(city);

          return (
            <div
              key={city.id}
              onClick={() => handleSelect(city)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                isCurrent
                  ? 'bg-amber-50/80 border-amber-300 shadow-xs'
                  : 'bg-white border-stone-200 hover:border-amber-400 hover:shadow-xs'
              }`}
            >
              <div className="min-w-0 space-y-0.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-medium text-stone-900 text-sm truncate">
                    {city.name}
                  </span>
                  {city.nameHindi && city.nameHindi !== city.name && (
                    <span className="text-xs text-amber-800 bg-amber-100/60 px-1.5 py-0.2 rounded font-serif">
                      {city.nameHindi}
                    </span>
                  )}
                  {city.isDefaultFallback && (
                    <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.2 rounded-full font-bold">
                      याम्योत्तर
                    </span>
                  )}
                </div>
                <div className="text-xs text-stone-500 truncate flex items-center gap-1.5">
                  <span>{city.state || city.country}</span>
                  <span>•</span>
                  <span className="font-mono text-[11px]">
                    {city.latitude.toFixed(2)}°N, {city.longitude.toFixed(2)}°E
                  </span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-stone-400 font-mono">
                  <Globe className="w-3 h-3" />
                  <span>{tzDetails.formattedOffset}</span>
                  {tzDetails.isDstActive && (
                    <span className="text-amber-700 font-semibold bg-amber-50 px-1 rounded">
                      DST (+{tzDetails.dstOffsetHours}h)
                    </span>
                  )}
                </div>
              </div>

              <button
                type="button"
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors shrink-0 ${
                  isCurrent
                    ? 'bg-amber-600 text-white'
                    : 'bg-stone-100 text-stone-700 hover:bg-amber-100 hover:text-amber-900'
                }`}
              >
                {isCurrent ? 'सक्रिय' : 'चुनें'}
              </button>
            </div>
          );
        })}
      </div>

      {results.length === 0 && !isPending && (
        <div className="p-8 text-center text-stone-500 bg-stone-50 rounded-2xl border border-stone-200">
          <p className="text-sm">कोई नगर या तहसील नहीं मिला। कृपया वर्तनी जांचें या ओपनस्ट्रीटमैप खोज का उपयोग करें।</p>
        </div>
      )}
      </main>

      <PortalFooter />
    </div>
  );
};

export default CitiesHub;
