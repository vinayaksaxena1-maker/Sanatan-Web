import React, { useState, useMemo, useEffect } from 'react';
import { useLocationStore, majorCities } from '../../store/locationStore';
import type { CityLocation } from '../../types/location';
import { Search, MapPin, Navigation, Loader2, X, Check } from 'lucide-react';

interface CitySelectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const POPULAR_CITIES = [
  { name: 'Ujjain (Avantika)', nameHindi: 'उज्जैन (अवन्तिका)', id: 'ujjain' },
  { name: 'Varanasi (Kashi)', nameHindi: 'वाराणसी (काशी)', id: 'varanasi' },
  { name: 'Ayodhya', nameHindi: 'अयोध्या', id: 'ayodhya' },
  { name: 'Kanpur', nameHindi: 'कानपुर', id: 'kanpur' },
  { name: 'New Delhi', nameHindi: 'नई दिल्ली', id: 'delhi' },
  { name: 'Mathura', nameHindi: 'मथुरा', id: 'mathura' },
  { name: 'Haridwar', nameHindi: 'हरिद्वार', id: 'haridwar' },
  { name: 'Prayagraj', nameHindi: 'प्रयागराज', id: 'prayagraj' },
  { name: 'Jaipur', nameHindi: 'जयपुर', id: 'jaipur' },
  { name: 'Mumbai', nameHindi: 'मुंबई', id: 'mumbai' },
];

export const CitySelectModal: React.FC<CitySelectModalProps> = ({ isOpen, onClose }) => {
  const { currentCity, setCity, detectDeviceLocation, isLocating } = useLocationStore();
  const [searchQuery, setSearchQuery] = useState('');

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Filtered cities list
  const filteredCities = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) {
      return majorCities.slice(0, 40);
    }
    return majorCities
      .filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.nameHindi.includes(q) ||
          c.state.toLowerCase().includes(q) ||
          c.stateHindi.includes(q)
      )
      .slice(0, 50);
  }, [searchQuery]);

  if (!isOpen) return null;

  const handleSelectCity = (city: CityLocation) => {
    setCity(city);
    onClose();
  };

  const handleGpsClick = async () => {
    try {
      await detectDeviceLocation();
      onClose();
    } catch {
      // Handled gracefully in locationStore
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      {/* Backdrop click */}
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Card */}
      <div className="relative w-full max-w-lg bg-[#FAF6F0] rounded-3xl border border-[#E6DEC8] shadow-2xl overflow-hidden z-10 flex flex-col max-h-[85vh]">
        
        {/* Header */}
        <div className="px-6 pt-6 pb-4 border-b border-[#E6DEC8]/80 bg-white/80 backdrop-blur-sm flex items-center justify-between">
          <div className="flex items-center space-x-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#FAF2E6] border border-[#E6DEC8] flex items-center justify-center text-[#8B2612]">
              <MapPin className="w-5 h-5 text-[#8B2612]" />
            </div>
            <div>
              <h2 className="text-lg font-bold font-serif text-[#1E1B18]">स्थान / नगर चुनें</h2>
              <p className="text-xs text-[#6E6259]">पंचांग और मुहूर्त गणना के लिए अपना नगर चुनें</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-8 h-8 rounded-full hover:bg-stone-200/60 flex items-center justify-center text-[#6E6259] transition-colors"
            aria-label="बंद करें"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & GPS Action Bar */}
        <div className="p-5 pb-3 space-y-3 bg-[#FAF6F0]">
          {/* GPS Quick Button */}
          <button
            type="button"
            onClick={handleGpsClick}
            disabled={isLocating}
            className="w-full py-2.5 px-4 rounded-2xl bg-gradient-to-r from-[#EA6A2A]/10 to-[#8B2612]/10 border border-[#EA6A2A]/30 hover:border-[#EA6A2A] text-[#8B2612] font-semibold text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer active:scale-[0.98] disabled:opacity-60"
          >
            {isLocating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-[#8B2612]" />
                <span>स्थान का पता लगाया जा रहा है...</span>
              </>
            ) : (
              <>
                <Navigation className="w-4 h-4 text-[#EA6A2A]" />
                <span>📍 वर्तमान स्थान पहचानें (GPS Auto-Detect)</span>
              </>
            )}
          </button>

          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#6E6259]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="नगर का नाम खोजें (उदा. कानपुर, उज्जैन, Delhi...)"
              className="w-full pl-10 pr-4 py-2.5 bg-white border border-[#E6DEC8] rounded-xl text-xs sm:text-sm text-[#1E1B18] placeholder-[#9C8E82] focus:outline-hidden focus:ring-2 focus:ring-[#EA6A2A]/40 focus:border-[#EA6A2A] transition-all"
              autoFocus
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#6E6259] hover:text-[#1E1B18]"
              >
                ✕
              </button>
            )}
          </div>

          {/* Popular Vedic Cities Quick Chips */}
          <div className="space-y-1.5 pt-1">
            <p className="text-[11px] font-semibold text-[#8B2612] uppercase tracking-wider">प्रमुख तीर्थ व नगर:</p>
            <div className="flex flex-wrap gap-1.5 max-h-24 overflow-y-auto">
              {POPULAR_CITIES.map((pc) => {
                const matchCity = majorCities.find((c) => c.id === pc.id || c.name.toLowerCase().includes(pc.id));
                const isSelected = currentCity.nameHindi.includes(pc.nameHindi) || currentCity.name.toLowerCase().includes(pc.id);
                return (
                  <button
                    key={pc.id}
                    type="button"
                    onClick={() => {
                      if (matchCity) handleSelectCity(matchCity);
                    }}
                    className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-[#8B2612] text-white border-[#8B2612] font-bold shadow-2xs'
                        : 'bg-white text-[#4A3E36] border-[#E6DEC8] hover:border-[#EA6A2A] hover:bg-[#FAF2E6]'
                    }`}
                  >
                    {pc.nameHindi}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Cities List */}
        <div className="flex-1 overflow-y-auto px-5 py-2 divide-y divide-[#E6DEC8]/60 bg-white/60">
          {filteredCities.length === 0 ? (
            <div className="text-center py-10 text-xs text-[#6E6259]">
              कोई नगर नहीं मिला। कृपया दूसरा नाम खोजें।
            </div>
          ) : (
            filteredCities.map((city) => {
              const isSelected =
                city.id === currentCity.id ||
                (city.latitude === currentCity.latitude && city.longitude === currentCity.longitude);

              return (
                <div
                  key={`${city.id}-${city.latitude}-${city.longitude}`}
                  onClick={() => handleSelectCity(city)}
                  className={`py-3 px-3 flex items-center justify-between rounded-xl cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-[#FAF2E6] text-[#8B2612] font-semibold'
                      : 'hover:bg-stone-100/70 text-[#1E1B18]'
                  }`}
                >
                  <div className="space-y-0.5">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold">{city.nameHindi}</span>
                      <span className="text-xs text-[#6E6259]">({city.name})</span>
                    </div>
                    <p className="text-[11px] text-[#6E6259]">
                      {city.stateHindi} • {city.latitude.toFixed(2)}°N, {city.longitude.toFixed(2)}°E
                    </p>
                  </div>

                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#8B2612] text-white flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-[#FAF6F0] border-t border-[#E6DEC8] flex items-center justify-between text-xs text-[#6E6259]">
          <span>चयनित: <strong className="text-[#8B2612]">{currentCity.nameHindi}</strong></span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-stone-200/80 hover:bg-stone-300 text-stone-800 font-medium transition-colors"
          >
            पूर्ण
          </button>
        </div>

      </div>
    </div>
  );
};

export default CitySelectModal;
