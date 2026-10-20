import React, { useEffect, useState } from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import type { PanchangInfo } from '../../engine/types';
import { computeRangePanchangAsync } from '../../engine/workerBridge';
import { useLocationStore } from '../../store/locationStore';
import { WatchDial } from './WatchDial';
import { WatchView, WatchViewToggle } from './WatchViewToggle';
import { makeWatchSegment, parseWatchTime, type WatchRingSegment } from './watchRingTypes';

export interface AnalogWatchProps {
  initialView?: WatchView;
  status?: { title: string; description: string; auspicious?: boolean };
}

const CHOGHADIYA_COLORS: Record<string, string> = {
  Amrit: '#16a34a', Shubh: '#22c55e', Labh: '#84cc16', Chal: '#3b82f6',
  Kaal: '#78716c', Rog: '#ef4444', Udveg: '#f97316',
};
const HORA_COLORS: Record<string, string> = {
  Sun: '#f59e0b', Moon: '#38bdf8', Mars: '#ef4444', Mercury: '#10b981',
  Jupiter: '#d97706', Venus: '#ec4899', Saturn: '#64748b',
};

function getZonedParts(date: Date, timeZone: string) {
  const parts = new Intl.DateTimeFormat('en-GB', {
    timeZone, year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
  }).formatToParts(date);
  const values = Object.fromEntries(parts.map(({ type, value }) => [type, value]));
  return {
    year: Number(values.year), month: Number(values.month), day: Number(values.day),
    hour: Number(values.hour), minute: Number(values.minute),
  };
}

function buildSegments(panchang: PanchangInfo | null, currentMinute: number) {
  const choghadiya: WatchRingSegment[] = (panchang?.choghadiya ?? []).flatMap((item) => {
    const segment = makeWatchSegment(
      item.hindiName || item.name, item.type, item.startTime, item.endTime,
      CHOGHADIYA_COLORS[item.type] ?? '#a8a29e', currentMinute,
    );
    return segment ? [segment] : [];
  });
  const hora: WatchRingSegment[] = (panchang?.hora ?? []).flatMap((item) => {
    const segment = makeWatchSegment(
      item.lordHindi, item.lord, item.startTime, item.endTime,
      HORA_COLORS[item.lord] ?? '#a8a29e', currentMinute,
    );
    return segment ? [segment] : [];
  });
  return { choghadiya, hora };
}

export const AnalogWatch: React.FC<AnalogWatchProps> = ({
  initialView = 'simple',
  status = { title: 'वर्तमान समय', description: 'स्थानीय समय के अनुसार घड़ी चल रही है।', auspicious: true },
}) => {
  const [date, setDate] = useState(() => new Date());
  const [view, setView] = useState<WatchView>(initialView);
  const [showStatus, setShowStatus] = useState(false);
  const { currentCity } = useLocationStore();
  const [panchangDays, setPanchangDays] = useState<{ previous: PanchangInfo; today: PanchangInfo } | null>(null);
  const [panchangError, setPanchangError] = useState(false);

  const zonedClock = (() => {
    try { return getZonedParts(date, currentCity.timezone); }
    catch { return { year: date.getFullYear(), month: date.getMonth() + 1, day: date.getDate(), hour: date.getHours(), minute: date.getMinutes() }; }
  })();
  const dateKey = `${zonedClock.year}-${String(zonedClock.month).padStart(2, '0')}-${String(zonedClock.day).padStart(2, '0')}`;
  const currentMinute = zonedClock.hour * 60 + zonedClock.minute;

  useEffect(() => {
    const timer = window.setInterval(() => setDate(new Date()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    const today = new Date(zonedClock.year, zonedClock.month - 1, zonedClock.day, 12);
    const previous = new Date(today);
    previous.setDate(previous.getDate() - 1);
    setPanchangDays(null);
    setPanchangError(false);
    computeRangePanchangAsync(previous.toISOString(), today.toISOString(), currentCity.latitude, currentCity.longitude)
      .then((days) => {
        if (!cancelled && days.length >= 2) setPanchangDays({ previous: days[0], today: days[1] });
        else if (!cancelled) setPanchangError(true);
      })
      .catch(() => { if (!cancelled) setPanchangError(true); });
    return () => { cancelled = true; };
  }, [currentCity.id, currentCity.latitude, currentCity.longitude, dateKey]);

  const todaySunrise = panchangDays ? parseWatchTime(panchangDays.today.sunrise) : null;
  const activePanchang = panchangDays
    ? (todaySunrise !== null && currentMinute < todaySunrise ? panchangDays.previous : panchangDays.today)
    : null;
  const ringSegments = buildSegments(activePanchang, currentMinute);
  const activeChoghadiya = ringSegments.choghadiya.find((segment) => segment.isActive);
  const activeHora = ringSegments.hora.find((segment) => segment.isActive);

  const dynamicStatus = activeChoghadiya || activeHora
    ? {
        title: `${activeChoghadiya?.name ?? 'चौघड़िया'} · ${activeHora?.label ?? 'होरा'}`,
        description: `${activeChoghadiya?.name ?? 'चौघड़िया'} चौघड़िया सक्रिय है। वर्तमान होरा स्वामी ${activeHora?.name ?? 'उपलब्ध नहीं'} हैं।`,
        auspicious: !['Kaal', 'Rog', 'Udveg'].includes(activeChoghadiya?.label ?? ''),
      }
    : panchangError
      ? { title: 'काल गणना उपलब्ध नहीं', description: 'इस स्थान का चौघड़िया और होरा डेटा अभी प्राप्त नहीं हो सका।', auspicious: false }
      : status;

  return (
    <section className="watch-panel" aria-labelledby="watch-heading">
      <div className="watch-panel-copy">
        <p className="watch-eyebrow">सनातन घड़ी · लाइव स्थानीय समय</p>
        <h2 id="watch-heading">समय को सरलता से जानें</h2>
        <p>घड़ी को छूकर वर्तमान समय की जानकारी देखें।</p>
        <WatchViewToggle value={view} onChange={setView} />
        <div className="watch-digital-time" aria-live="off">
          <span>{date.toLocaleTimeString('hi-IN', { timeZone: currentCity.timezone, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}</span>
          <span>{date.toLocaleDateString('hi-IN', { timeZone: currentCity.timezone, weekday: 'long', day: 'numeric', month: 'long' })}</span>
        </div>
        {view === 'vedic' && <p className="watch-ring-caption" aria-live="polite">{panchangDays ? `चौघड़िया: ${activeChoghadiya?.name ?? '—'} · होरा: ${activeHora?.name ?? '—'}` : 'चौघड़िया और होरा की गणना हो रही है…'}</p>}
      </div>

      <button type="button" className="watch-button" onClick={() => setShowStatus((current) => !current)} aria-expanded={showStatus} aria-label="वर्तमान समय की जानकारी खोलें">
        <span className="watch-crown" aria-hidden="true" />
        <span className="watch-bezel"><WatchDial date={date} view={view} choghadiya={ringSegments.choghadiya} hora={ringSegments.hora} currentMinute={currentMinute} /></span>
      </button>

      {showStatus && (
        <div className="watch-status" role="status">
          {dynamicStatus.auspicious ? <CheckCircle2 size={20} aria-hidden="true" /> : <Info size={20} aria-hidden="true" />}
          <div><strong>{dynamicStatus.title}</strong><p>{dynamicStatus.description}</p></div>
          <button type="button" onClick={() => setShowStatus(false)} className="watch-status-close" aria-label="जानकारी बंद करें">×</button>
        </div>
      )}
    </section>
  );
};

export default AnalogWatch;
