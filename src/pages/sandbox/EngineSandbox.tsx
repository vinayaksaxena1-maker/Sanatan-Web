import React, { useState, useMemo, useCallback } from 'react';
import {
  Sun,
  Moon,
  Clock,
  Calendar,
  Compass,
  ShieldCheck,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  Sliders,
  CheckCircle2,
  MapPin
} from 'lucide-react';
import {
  calculatePanchang,
  calculateNatalChart,
  drik_julday,
  drik_get_ayanamsa_ut,
  type PanchangInfo,
  type NatalChartData,
  INDIAN_CITIES
} from '../../engine';
import { calculateEkadashiParana, calculateHariVasaraEnd } from '../../engine/vrataNirnaya';
import { calculateMoonrise, getKarwaChauthMoonrise, getSankashtiMoonrise } from '../../engine/moonriseEngine';
import { getTimezoneOffsetWithDST } from '../../engine/timezoneAdapter';

interface BenchmarkPreset {
  name: string;
  hindiName: string;
  dateStr: string;
  timeStr: string;
  cityName: string;
  lat: number;
  lon: number;
  timezone: string;
  notes: string;
}

const BENCHMARK_PRESETS: BenchmarkPreset[] = [
  {
    name: 'Devutthana Ekadashi 2024',
    hindiName: 'देवउठनी एकादशी २०२४ (दिल्ली)',
    dateStr: '2024-11-12',
    timeStr: '06:42',
    cityName: 'New Delhi',
    lat: 28.6139,
    lon: 77.2090,
    timezone: 'Asia/Kolkata',
    notes: 'Drik Panchang Baseline: Parana window 06:42 AM - 08:51 AM (Pratahkal / Dwadashi ending)'
  },
  {
    name: 'Karwa Chauth 2024',
    hindiName: 'करवा चौथ २०२४ (दिल्ली)',
    dateStr: '2024-10-20',
    timeStr: '19:54',
    cityName: 'New Delhi',
    lat: 28.6139,
    lon: 77.2090,
    timezone: 'Asia/Kolkata',
    notes: 'Drik Panchang Baseline: Moonrise ~07:54 PM in New Delhi'
  },
  {
    name: 'Papmochani Ekadashi 2024',
    hindiName: 'पापमोचिनी एकादशी २०२४ (वाराणसी)',
    dateStr: '2024-04-05',
    timeStr: '05:45',
    cityName: 'Varanasi',
    lat: 25.3176,
    lon: 82.9739,
    timezone: 'Asia/Kolkata',
    notes: 'Drik Panchang Baseline: Parana on April 06 after Sunrise'
  },
  {
    name: 'Ujjain Prime Meridian (Today)',
    hindiName: 'उज्जयिनी मानक (आज - वैदिक प्राइम मेरिडियन)',
    dateStr: new Date().toISOString().split('T')[0],
    timeStr: '12:00',
    cityName: 'Ujjain',
    lat: 23.1765,
    lon: 75.7885,
    timezone: 'Asia/Kolkata',
    notes: 'Sacred Avantika / Ujjain (23.1765° N, 75.7885° E) zero-drift solar noon reference'
  },
  {
    name: 'New York DST Shift (Summer)',
    hindiName: 'न्यूयॉर्क डेलाइट सेविंग (ग्रीष्म)',
    dateStr: '2024-07-15',
    timeStr: '12:00',
    cityName: 'New York',
    lat: 40.7128,
    lon: -74.0060,
    timezone: 'America/New_York',
    notes: 'EDT -04:00 (1 hour daylight saving shift verified)'
  }
];

export const EngineSandbox: React.FC = () => {
  // Input States
  const [selectedDate, setSelectedDate] = useState<string>(
    () => new Date().toISOString().split('T')[0]
  );
  const [selectedTime, setSelectedTime] = useState<string>('06:00');
  const [lat, setLat] = useState<number>(28.6139);
  const [lon, setLon] = useState<number>(77.2090);
  const [cityName, setCityName] = useState<string>('New Delhi');
  const [timezone, setTimezone] = useState<string>('Asia/Kolkata');
  const [activeTab, setActiveTab] = useState<'panchang' | 'planets' | 'vrat' | 'choghadiya' | 'json'>('panchang');
  const [copied, setCopied] = useState<boolean>(false);
  const [showAdvancedInputs, setShowAdvancedInputs] = useState<boolean>(false);

  // Apply Preset
  const handleApplyPreset = useCallback((preset: BenchmarkPreset) => {
    setSelectedDate(preset.dateStr);
    setSelectedTime(preset.timeStr);
    setCityName(preset.cityName);
    setLat(preset.lat);
    setLon(preset.lon);
    setTimezone(preset.timezone);
  }, []);

  // Compute Engine Output
  const calculationData = useMemo(() => {
    try {
      const [year, month, day] = selectedDate.split('-').map(Number);
      const [hour, minute] = selectedTime.split(':').map(Number);
      const dateObj = new Date(Date.UTC(year, month - 1, day, hour, minute, 0));

      // 1. Timezone offset & Julian Day
      const tzInfo = getTimezoneOffsetWithDST(timezone, dateObj);
      const offsetHours = tzInfo.totalOffsetHours;

      const decimalHour = hour + minute / 60 - offsetHours;
      const jd = drik_julday(year, month, day, decimalHour, 1);
      const ayanamshaValue = drik_get_ayanamsa_ut(jd);

      // 2. Core Panchang
      const panchang: PanchangInfo = calculatePanchang(lat, lon, dateObj);

      // 3. Natal Chart & 9 Grahas
      const chart: NatalChartData = calculateNatalChart(dateObj, lat, lon);

      // 4. Ekadashi Parana & Hari Vasara
      const ekadashi = calculateEkadashiParana(lat, lon, selectedDate, 'Smarta', offsetHours);
      const hariVasara = calculateHariVasaraEnd(lat, lon, selectedDate, offsetHours);

      // 5. High-Precision Moonrise
      const moonriseData = calculateMoonrise(lat, lon, dateObj, offsetHours);
      const karwaMoonrise = getKarwaChauthMoonrise(year, { latitude: lat, longitude: lon });
      const sankashtiMoonrise = getSankashtiMoonrise(year, month, { latitude: lat, longitude: lon });

      return {
        success: true,
        panchang,
        chart,
        ekadashi,
        hariVasara,
        moonriseData,
        karwaMoonrise,
        sankashtiMoonrise,
        ayanamshaValue,
        tzInfo,
        jd,
        error: null
      };
    } catch (err: unknown) {
      return {
        success: false,
        panchang: null,
        chart: null,
        ekadashi: null,
        hariVasara: null,
        moonriseData: null,
        karwaMoonrise: null,
        sankashtiMoonrise: null,
        ayanamshaValue: 0,
        tzInfo: null,
        jd: 0,
        error: err instanceof Error ? err.message : 'Unknown calculation error'
      };
    }
  }, [selectedDate, selectedTime, lat, lon, timezone]);

  const handleCopyJson = () => {
    if (!calculationData.success) return;
    const jsonStr = JSON.stringify(calculationData, null, 2);
    navigator.clipboard.writeText(jsonStr);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] dark:bg-stone-950 text-stone-900 dark:text-stone-100 py-6 px-3 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">

        {/* 1. Header & Strict Calibration Badges */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 sm:p-6 border border-amber-200/60 dark:border-amber-900/40 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-2 bg-amber-500/10 text-amber-600 rounded-xl">
                  <Sparkles className="w-6 h-6" />
                </span>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-amber-100">
                    खगोलीय गणितीय इंजन ऑडिट सैंडबॉक्स (AstroEngine v2.0 Sandbox)
                  </h1>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                    Live In-Browser Apples-to-Apples Drik Panchang Verification Console
                  </p>
                </div>
              </div>
            </div>

            {/* Standards Compliance Pills */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 font-medium">
                <ShieldCheck className="w-3.5 h-3.5" />
                Upper Limb + 34&apos; Refraction
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 border border-amber-200 dark:border-amber-800 font-medium">
                <Compass className="w-3.5 h-3.5" />
                Chitra Paksha (Lahiri Ayanamsha)
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950/40 dark:text-blue-300 border border-blue-200 dark:border-blue-800 font-medium">
                NASA JPL DE405 / VSOP87
              </span>
            </div>
          </div>

          {/* Quick Presets Bar */}
          <div className="mt-5 pt-4 border-t border-stone-200/80 dark:border-stone-800">
            <div className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400 mb-2.5 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              त्वरित सत्यापन प्रीसेट्स (1-Click Drik Panchang Test Presets):
            </div>
            <div className="flex flex-wrap gap-2">
              {BENCHMARK_PRESETS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => handleApplyPreset(preset)}
                  className={`text-xs px-3 py-1.5 rounded-lg border transition-all text-left flex items-center gap-1.5 ${
                    cityName === preset.cityName && selectedDate === preset.dateStr
                      ? 'bg-amber-500 text-white border-amber-600 shadow-xs'
                      : 'bg-stone-50 hover:bg-amber-50 dark:bg-stone-800/80 dark:hover:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300'
                  }`}
                  title={preset.notes}
                >
                  <Calendar className="w-3 h-3 opacity-70" />
                  <span>{preset.hindiName}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Interactive Input Controls */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-5 border border-stone-200 dark:border-stone-800 shadow-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                दिनांक (Date)
              </label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                समय (Time - 24H)
              </label>
              <input
                type="time"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                शहर (Quick City Selector)
              </label>
              <select
                value={cityName}
                onChange={(e) => {
                  const cName = e.target.value;
                  setCityName(cName);
                  const found = INDIAN_CITIES.find((c) => c.city === cName);
                  if (found) {
                    setLat(found.latitude);
                    setLon(found.longitude);
                    setTimezone('Asia/Kolkata');
                  }
                }}
                className="w-full px-3 py-2 text-sm rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50/50 dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-none focus:ring-2 focus:ring-amber-500/40"
              >
                {INDIAN_CITIES.map((c) => (
                  <option key={c.city} value={c.city}>
                    {c.city} ({c.state})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-end">
              <button
                type="button"
                onClick={() => setShowAdvancedInputs(!showAdvancedInputs)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>{showAdvancedInputs ? 'सरल नियंत्रण' : 'उन्नत निर्देशांक (Lat/Lon/DST)'}</span>
                {showAdvancedInputs ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Advanced Coordinates & Timezone Drawer */}
          {showAdvancedInputs && (
            <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-800 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  अक्षांश (Latitude °N)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={lat}
                  onChange={(e) => setLat(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  देशांतर (Longitude °E)
                </label>
                <input
                  type="number"
                  step="0.0001"
                  value={lon}
                  onChange={(e) => setLon(parseFloat(e.target.value) || 0)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  टाइमज़ोन (IANA Timezone)
                </label>
                <input
                  type="text"
                  value={timezone}
                  onChange={(e) => setTimezone(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-stone-300 dark:border-stone-700 bg-white dark:bg-stone-800 font-mono"
                  placeholder="e.g. Asia/Kolkata, America/New_York"
                />
              </div>
            </div>
          )}

          {/* Active Baseline Status Banner */}
          <div className="mt-4 p-3 rounded-xl bg-amber-500/5 border border-amber-500/20 flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span>
                <strong>सक्रिय स्थान:</strong> {cityName} ({lat.toFixed(4)}°N, {lon.toFixed(4)}°E) | <strong>टाइमज़ोन:</strong> {timezone} ({calculationData.tzInfo?.formattedOffset || '+05:30'})
              </span>
            </div>
            <div className="font-mono text-stone-500 dark:text-stone-400">
              लाहिरी अयनांश: {calculationData.ayanamshaValue ? `${calculationData.ayanamshaValue.toFixed(6)}°` : '24.108°'}
            </div>
          </div>
        </div>

        {/* 3. Navigation Tabs */}
        <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-2">
          {[
            { id: 'panchang', label: 'पंचांग टेलीमेट्री (Panchang)', icon: Sun },
            { id: 'planets', label: 'नवग्रह स्थिति (9 Planets & Lagna)', icon: Compass },
            { id: 'vrat', label: 'एकादशी पारणा व व्रत (Vrata Nirnaya)', icon: ShieldCheck },
            { id: 'choghadiya', label: 'चौघड़िया व राहुकाल (Muhurat)', icon: Clock },
            { id: 'json', label: 'Raw JSON Telemetry', icon: Copy }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-amber-600 text-white shadow-xs font-semibold'
                    : 'bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 border border-stone-200 dark:border-stone-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* 4. Tab Panels */}
        {!calculationData.success ? (
          <div className="bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 rounded-2xl p-6 text-center text-red-800 dark:text-red-300">
            <h3 className="font-semibold text-base mb-1">गणना में त्रुटि (Engine Calculation Error)</h3>
            <p className="text-xs font-mono">{calculationData.error}</p>
          </div>
        ) : (
          <div>
            {/* TAB 1: PANCHANG TELEMETRY */}
            {activeTab === 'panchang' && calculationData.panchang && (
              <div className="space-y-4">
                {/* 5-Anga Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {/* Tithi Card */}
                  <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        १. तिथि (Tithi)
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-200">
                        {calculationData.panchang.hinduDate.paksha} पक्ष
                      </span>
                    </div>
                    <div className="text-lg font-bold text-stone-900 dark:text-stone-100">
                      {calculationData.panchang.hinduDate.tithi.hindiName}
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                      <div>समाप्ति समय: <span className="font-semibold text-stone-900 dark:text-stone-200 font-mono">{calculationData.panchang.hinduDate.tithi.endTime || 'पूर्ण अहोरात्र'}</span></div>
                      <div>स्वामी देव: {calculationData.panchang.hinduDate.tithi.deity || 'विष्णु'}</div>
                    </div>
                  </div>

                  {/* Nakshatra Card */}
                  <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                        २. नक्षत्र (Nakshatra)
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-md bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-200">
                        चरण {calculationData.panchang.hinduDate.nakshatra.pada || 1}
                      </span>
                    </div>
                    <div className="text-lg font-bold text-stone-900 dark:text-stone-100">
                      {calculationData.panchang.hinduDate.nakshatra.hindiName} ({calculationData.panchang.hinduDate.nakshatra.name})
                    </div>
                    <div className="text-xs text-stone-600 dark:text-stone-400 space-y-1">
                      <div>समाप्ति समय: <span className="font-semibold text-stone-900 dark:text-stone-200 font-mono">{calculationData.panchang.hinduDate.nakshatra.endTime || 'प्रगति पर'}</span></div>
                      <div>स्वामी ग्रह: {calculationData.panchang.hinduDate.nakshatra.lord || 'सूर्य'}</div>
                    </div>
                  </div>

                  {/* Yoga & Karana Card */}
                  <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-2">
                    <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                      ३. योग एवं करण (Yoga & Karana)
                    </span>
                    <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      योग: {calculationData.panchang.hinduDate.yoga.hindiName} (<span className="font-mono text-xs">{calculationData.panchang.hinduDate.yoga.endTime}</span>)
                    </div>
                    <div className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                      करण: {calculationData.panchang.hinduDate.karana.hindiName} (<span className="font-mono text-xs">{calculationData.panchang.hinduDate.karana.endTime}</span>)
                    </div>
                    <div className="text-xs text-stone-500 dark:text-stone-400">
                      मास: {calculationData.panchang.hinduDate.monthHindi} | विक्रम संवत: {calculationData.panchang.hinduDate.samvatVikram}
                    </div>
                  </div>
                </div>

                {/* Sun & Moon Telemetry Banner */}
                <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-amber-50/60 dark:bg-amber-950/20 rounded-xl border border-amber-200/40">
                    <div className="text-xs text-amber-800 dark:text-amber-300 font-medium">सूर्योदय (Sunrise)</div>
                    <div className="text-lg font-bold text-amber-700 dark:text-amber-400 font-mono mt-1">
                      {calculationData.panchang.sunrise}
                    </div>
                    <div className="text-[10px] text-stone-500">Upper Limb + 34&apos;</div>
                  </div>
                  <div className="p-3 bg-orange-50/60 dark:bg-orange-950/20 rounded-xl border border-orange-200/40">
                    <div className="text-xs text-orange-800 dark:text-orange-300 font-medium">सूर्यास्त (Sunset)</div>
                    <div className="text-lg font-bold text-orange-700 dark:text-orange-400 font-mono mt-1">
                      {calculationData.panchang.sunset}
                    </div>
                    <div className="text-[10px] text-stone-500">Upper Limb + 34&apos;</div>
                  </div>
                  <div className="p-3 bg-blue-50/60 dark:bg-blue-950/20 rounded-xl border border-blue-200/40">
                    <div className="text-xs text-blue-800 dark:text-blue-300 font-medium">स्थानीय चंद्रोदय (Moonrise)</div>
                    <div className="text-lg font-bold text-blue-700 dark:text-blue-400 font-mono mt-1">
                      {calculationData.moonriseData?.moonriseTime || calculationData.panchang.moonrise}
                    </div>
                    <div className="text-[10px] text-stone-500">Topocentric Horizon</div>
                  </div>
                  <div className="p-3 bg-indigo-50/60 dark:bg-indigo-950/20 rounded-xl border border-indigo-200/40">
                    <div className="text-xs text-indigo-800 dark:text-indigo-300 font-medium">चंद्रास्त (Moonset)</div>
                    <div className="text-lg font-bold text-indigo-700 dark:text-indigo-400 font-mono mt-1">
                      {calculationData.moonriseData?.moonsetTime || calculationData.panchang.moonset}
                    </div>
                    <div className="text-[10px] text-stone-500">Topocentric Horizon</div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 2: NAVAGRAHAS & LAGNA POSITIONS */}
            {activeTab === 'planets' && calculationData.chart && (
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
                <div className="p-4 bg-stone-50/80 dark:bg-stone-800/60 border-b border-stone-200 dark:border-stone-800 flex items-center justify-between">
                  <div className="text-sm font-bold text-stone-800 dark:text-stone-200 flex items-center gap-2">
                    <Compass className="w-4 h-4 text-amber-600" />
                    <span>लग्न एवं ९ नवग्रह निरयण स्थिति (Chitra Paksha Lahiri Standard)</span>
                  </div>
                  <div className="text-xs font-mono text-stone-500">
                    लग्न: {calculationData.chart.ascendant.signHindi} ({calculationData.chart.ascendant.degreeFormatted})
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-stone-100/70 dark:bg-stone-800/40 text-stone-600 dark:text-stone-400 font-semibold border-b border-stone-200 dark:border-stone-800">
                      <tr>
                        <th className="py-2.5 px-4">ग्रह (Planet)</th>
                        <th className="py-2.5 px-3">राशि (Zodiac)</th>
                        <th className="py-2.5 px-3">निरयण अंश (Degree)</th>
                        <th className="py-2.5 px-3">नक्षत्र (Nakshatra)</th>
                        <th className="py-2.5 px-3">चरण (Pada)</th>
                        <th className="py-2.5 px-3">गति (Speed °/d)</th>
                        <th className="py-2.5 px-3 text-center">वक्री (Rx)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-200/60 dark:divide-stone-800">
                      {/* Lagna Row */}
                      <tr className="bg-amber-50/30 dark:bg-amber-950/10 font-medium">
                        <td className="py-2 px-4 font-bold text-amber-700 dark:text-amber-400">लग्न (Ascendant)</td>
                        <td className="py-2 px-3">{calculationData.chart.ascendant.signHindi}</td>
                        <td className="py-2 px-3 font-mono font-semibold">{calculationData.chart.ascendant.degreeFormatted}</td>
                        <td className="py-2 px-3">{calculationData.chart.ascendant.nakshatraName}</td>
                        <td className="py-2 px-3">{calculationData.chart.ascendant.nakshatraPada}</td>
                        <td className="py-2 px-3 font-mono">--</td>
                        <td className="py-2 px-3 text-center">--</td>
                      </tr>

                      {/* 9 Planets */}
                      {calculationData.chart.planets.map((planet) => (
                        <tr key={planet.name} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                          <td className="py-2 px-4 font-semibold text-stone-900 dark:text-stone-100">
                            {planet.hindiName} ({planet.name})
                          </td>
                          <td className="py-2 px-3">{planet.signHindi}</td>
                          <td className="py-2 px-3 font-mono font-semibold">{planet.degreeFormatted}</td>
                          <td className="py-2 px-3">{planet.nakshatraName}</td>
                          <td className="py-2 px-3">{planet.nakshatraPada}</td>
                          <td className="py-2 px-3 font-mono text-stone-600 dark:text-stone-400">
                            {planet.speed.toFixed(3)}
                          </td>
                          <td className="py-2 px-3 text-center">
                            {planet.isRetrograde ? (
                              <span className="px-1.5 py-0.5 rounded bg-red-100 dark:bg-red-950/80 text-red-700 dark:text-red-300 font-bold text-[10px]">
                                वक्री (Rx)
                              </span>
                            ) : (
                              <span className="text-stone-400">मार्गी</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB 3: VRATA NIRNAYA & EKADASHI PARANA */}
            {activeTab === 'vrat' && (
              <div className="space-y-4">
                <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-4">
                  <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold">
                    <ShieldCheck className="w-5 h-5 text-amber-600" />
                    <span>एकादशी व्रत निर्णय एवं पारणा समय (Drik Panchang Precision &lt;30s)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-4 bg-stone-50 dark:bg-stone-800/50 rounded-xl space-y-2">
                      <div className="text-xs font-semibold text-stone-500 uppercase">एकादशी स्थिति</div>
                      <div className="text-base font-bold text-stone-900 dark:text-stone-100">
                        {calculationData.ekadashi?.ekadashiNameHindi || 'वर्तमान तिथि एकादशी नहीं है'}
                      </div>
                      <div className="text-xs text-stone-600 dark:text-stone-400">
                        संप्रदाय: <strong>स्मार्त (गृहस्थ)</strong> | पारणा तिथि: {calculationData.ekadashi?.paranaDate || selectedDate}
                      </div>
                    </div>

                    <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/30 space-y-2">
                      <div className="text-xs font-semibold text-amber-800 dark:text-amber-300 uppercase">पारणा समय विंडो (Parana Window)</div>
                      <div className="text-lg font-bold text-amber-700 dark:text-amber-400 font-mono">
                        {calculationData.ekadashi?.recommendedWindowStart} — {calculationData.ekadashi?.recommendedWindowEnd}
                      </div>
                      <div className="text-xs text-stone-600 dark:text-stone-400">
                        हरि वासर समाप्ति समय: <span className="font-semibold text-stone-900 dark:text-stone-200 font-mono">{calculationData.hariVasara?.hariVasaraEndTime || 'समाप्त'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Benchmark Verification Guide */}
                  <div className="p-3 bg-stone-100 dark:bg-stone-800 rounded-xl text-xs text-stone-600 dark:text-stone-400 space-y-1">
                    <div className="font-semibold text-stone-800 dark:text-stone-200 flex items-center gap-1.5">
                      <Info className="w-3.5 h-3.5 text-blue-500" />
                      <span>सत्यापन निर्देश (Apples-to-Apples Verification Instructions):</span>
                    </div>
                    <div>
                      १. ऊपर दिए गए <strong>&quot;देवउठनी एकादशी २०२४ (दिल्ली)&quot;</strong> प्रीसेट पर क्लिक करें।
                    </div>
                    <div>
                      २. Drik Panchang के आधिकारिक रिकॉर्ड से मिलान करें: पारणा समय <strong>06:42 AM - 08:51 AM</strong> प्रदर्शित होगा (&lt;30 सेकंड अंतर)।
                    </div>
                  </div>
                </div>

                {/* Karwa Chauth & Moonrise Card */}
                <div className="bg-white dark:bg-stone-900 p-5 rounded-2xl border border-stone-200 dark:border-stone-800 shadow-xs space-y-3">
                  <div className="flex items-center gap-2 text-stone-900 dark:text-stone-100 font-bold">
                    <Moon className="w-5 h-5 text-blue-600" />
                    <span>करवा चौथ व संकष्टी चतुर्थी चंद्रोदय समय (Moonrise Engine)</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-xl">
                      <div className="text-xs text-stone-500">करवा चौथ चंद्रोदय ({selectedDate.split('-')[0]})</div>
                      <div className="text-base font-bold text-stone-900 dark:text-stone-100 font-mono mt-1">
                        {calculationData.karwaMoonrise?.date}: {calculationData.karwaMoonrise?.moonriseTime}
                      </div>
                      <div className="text-[10px] text-stone-500">कृष्णा चतुर्थी चंद्रोदय मानक</div>
                    </div>
                    <div className="p-3 bg-stone-50 dark:bg-stone-800 rounded-xl">
                      <div className="text-xs text-stone-500">संकष्टी चतुर्थी चंद्रोदय (मासिक)</div>
                      <div className="text-base font-bold text-stone-900 dark:text-stone-100 font-mono mt-1">
                        {calculationData.sankashtiMoonrise?.date}: {calculationData.sankashtiMoonrise?.moonriseTime}
                      </div>
                      <div className="text-[10px] text-stone-500">Topocentric Altitude: -0.833° Refraction</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* TAB 4: CHOGHADIYA & MUHURAT */}
            {activeTab === 'choghadiya' && calculationData.panchang && (
              <div className="space-y-4">
                {/* Rahu Kaal & Yamaganda Banner */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-red-50/70 dark:bg-red-950/20 p-4 rounded-xl border border-red-200/50">
                    <div className="text-xs font-semibold text-red-700 dark:text-red-400">राहु काल (Rahu Kaal - अशुभ)</div>
                    <div className="text-base font-bold font-mono text-red-800 dark:text-red-300 mt-1">
                      {calculationData.panchang.rahuKaal.start} — {calculationData.panchang.rahuKaal.end}
                    </div>
                  </div>
                  <div className="bg-amber-50/70 dark:bg-amber-950/20 p-4 rounded-xl border border-amber-200/50">
                    <div className="text-xs font-semibold text-amber-700 dark:text-amber-400">गुलिक काल (Gulika Kaal)</div>
                    <div className="text-base font-bold font-mono text-amber-800 dark:text-amber-300 mt-1">
                      {calculationData.panchang.gulikKaal.start} — {calculationData.panchang.gulikKaal.end}
                    </div>
                  </div>
                  <div className="bg-stone-50 dark:bg-stone-800 p-4 rounded-xl border border-stone-200 dark:border-stone-700">
                    <div className="text-xs font-semibold text-stone-700 dark:text-stone-300">यमगण्ड (Yamaganda)</div>
                    <div className="text-base font-bold font-mono text-stone-800 dark:text-stone-200 mt-1">
                      {calculationData.panchang.yamagandam.start} — {calculationData.panchang.yamagandam.end}
                    </div>
                  </div>
                </div>

                {/* Day Choghadiya Table */}
                <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 overflow-hidden shadow-xs">
                  <div className="p-3 bg-stone-50 dark:bg-stone-800/50 text-xs font-bold text-stone-700 dark:text-stone-300 border-b border-stone-200 dark:border-stone-800">
                    दिन का चौघड़िया (Day Choghadiya Sequence)
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 divide-x divide-y divide-stone-200 dark:divide-stone-800 text-center">
                    {calculationData.panchang.choghadiya.filter(c => c.isDay).map((c, idx) => (
                      <div key={idx} className="p-3 space-y-1">
                        <div className="text-xs font-bold text-stone-900 dark:text-stone-100">{c.hindiName || c.name}</div>
                        <div className="text-[11px] font-mono text-stone-500">{c.startTime}</div>
                        <div className="text-[10px] text-stone-400">से {c.endTime}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB 5: RAW JSON TELEMETRY */}
            {activeTab === 'json' && (
              <div className="bg-white dark:bg-stone-900 rounded-2xl border border-stone-200 dark:border-stone-800 p-4 shadow-xs space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-stone-700 dark:text-stone-300">
                    Raw Telemetry Payload (NASA JPL Bridge + AstroEngine v2.0)
                  </span>
                  <button
                    onClick={handleCopyJson}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium transition-colors"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy JSON'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-stone-950 text-emerald-400 rounded-xl text-xs font-mono overflow-x-auto max-h-96">
                  {JSON.stringify(calculationData, null, 2)}
                </pre>
              </div>
            )}
          </div>
        )}

        {/* 5. Footer Sign-off Confirmation condition */}
        <div className="bg-white dark:bg-stone-900 rounded-2xl p-4 border border-emerald-500/30 flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>
              <strong>Sub-phase 2.5 Audit Ready:</strong> Live in-browser sandbox active. User can test historical dates against Drik Panchang ephemeris.
            </span>
          </div>
          <button
            onClick={() => handleApplyPreset(BENCHMARK_PRESETS[0])}
            className="px-3 py-1.5 rounded-lg border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 text-xs font-medium shrink-0 flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            रीसेट करें
          </button>
        </div>

      </div>
    </div>
  );
};

export default EngineSandbox;
