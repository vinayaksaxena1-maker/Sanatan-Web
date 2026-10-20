import React, { useEffect, useMemo, useState } from 'react';
import { RefreshCw } from 'lucide-react';
import type { PanchangInfo } from '../../engine/types';
import { computeRangePanchangAsync } from '../../engine/workerBridge';
import { useLocationStore } from '../../store/locationStore';
import { OrbitalCanvas } from './OrbitalCanvas';
import type { TithiPaksha } from '../../data/tithiSpiritualData';

interface MoonPhaseVisualizerProps {
  selectedTithi: number;
  selectedPaksha: TithiPaksha;
  isTithiPreview: boolean;
  onLiveTithi: (day: number, paksha: TithiPaksha) => void;
  onReturnToLive: () => void;
}

interface MoonData {
  panchang: PanchangInfo;
  phaseAngleDeg: number;
  illumination: number;
}

function getMoonData(panchang: PanchangInfo): MoonData | null {
  const sun = panchang.planets?.find((planet) => planet.name.toLowerCase() === 'sun');
  const moon = panchang.planets?.find((planet) => planet.name.toLowerCase() === 'moon');
  if (!sun || !moon || !Number.isFinite(sun.longitude) || !Number.isFinite(moon.longitude)) return null;
  const phaseAngleDeg = ((moon.longitude - sun.longitude) % 360 + 360) % 360;
  const illumination = ((1 - Math.cos((phaseAngleDeg * Math.PI) / 180)) / 2) * 100;
  return { panchang, phaseAngleDeg, illumination };
}

export const MoonPhaseVisualizer: React.FC<MoonPhaseVisualizerProps> = ({ selectedTithi, selectedPaksha, isTithiPreview, onLiveTithi, onReturnToLive }) => {
  const { currentCity } = useLocationStore();
  const [moonData, setMoonData] = useState<MoonData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setRefreshKey((key) => key + 1), 10 * 60 * 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setHasError(false);
    const now = new Date();
    computeRangePanchangAsync(now.toISOString(), now.toISOString(), currentCity.latitude, currentCity.longitude)
      .then((days) => {
        const result = days[0] ? getMoonData(days[0]) : null;
        if (cancelled) return;
        if (!result) {
          setMoonData(null);
          setHasError(true);
          return;
        }
        setMoonData(result);
      })
      .catch(() => { if (!cancelled) { setMoonData(null); setHasError(true); } })
      .finally(() => { if (!cancelled) setIsLoading(false); });
    return () => { cancelled = true; };
  }, [currentCity.id, currentCity.latitude, currentCity.longitude, refreshKey]);

  useEffect(() => {
    if (!moonData || isTithiPreview) return;
    const tithiValue = moonData.panchang.hinduDate.tithi.value;
    onLiveTithi(tithiValue > 15 ? tithiValue - 15 : tithiValue, moonData.panchang.hinduDate.paksha);
  }, [moonData, isTithiPreview, onLiveTithi]);

  const tithiPhaseAngle = selectedPaksha === 'Shukla'
    ? ((selectedTithi - 1) / 14) * 180
    : 180 + ((selectedTithi - 1) / 14) * 180;
  const displayAngle = isTithiPreview ? tithiPhaseAngle : moonData?.phaseAngleDeg ?? 0;
  const illumination = useMemo(
    () => ((1 - Math.cos((displayAngle * Math.PI) / 180)) / 2) * 100,
    [displayAngle],
  );
  const paksha = isTithiPreview ? selectedPaksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष' : displayAngle <= 180 ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष';
  const phaseName = displayAngle < 8 || displayAngle > 352
    ? 'अमावस्या'
    : displayAngle >= 172 && displayAngle <= 188
      ? 'पूर्णिमा'
      : displayAngle < 180 ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष';
  const tithiLabel = moonData?.panchang.hinduDate.tithi.hindiName ?? 'चंद्र तिथि गणना जारी';

  return (
    <section className="moon-visualizer" aria-labelledby="moon-heading">
      <header className="moon-visualizer-header">
        <div>
          <p className="moon-eyebrow">खगोलीय स्थिति · {currentCity.nameHindi}</p>
          <h2 id="moon-heading">चंद्र कला एवं कक्षा</h2>
          <p>सूर्य और चंद्रमा के वास्तविक कोण से प्रकाशित भाग की गणना।</p>
        </div>
        {isTithiPreview && moonData && (
          <button type="button" className="moon-live-button" onClick={onReturnToLive}>
            <RefreshCw size={15} aria-hidden="true" /> आज की स्थिति
          </button>
        )}
      </header>

      {isLoading && !moonData ? (
        <div className="moon-state" role="status"><span className="moon-loading-orb" />चंद्र स्थिति की गणना हो रही है…</div>
      ) : hasError && !moonData ? (
        <div className="moon-state moon-state-error" role="alert">
          चंद्र स्थिति उपलब्ध नहीं हो सकी।
          <button type="button" onClick={() => setRefreshKey((key) => key + 1)}>पुनः प्रयास करें</button>
        </div>
      ) : (
        <>
          <div className="moon-visualizer-grid">
            <div className="moon-canvas-wrap"><OrbitalCanvas phaseAngleDeg={displayAngle} illumination={illumination} /></div>
            <div className="moon-facts">
              <span className="moon-live-pill"><span />{isTithiPreview ? 'पूर्वावलोकन' : 'अभी'}</span>
              <p className="moon-phase-title">{phaseName}</p>
              <p className="moon-paksha">{paksha} · {isTithiPreview ? `${selectedTithi}वीं तिथि का पूर्वावलोकन` : tithiLabel}</p>
              <div className="moon-illumination-value">{illumination.toFixed(1)}<small>%</small></div>
              <div className="moon-progress-track" role="meter" aria-label="चंद्रमा का प्रकाशित भाग" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(illumination)}>
                <span style={{ width: `${illumination}%` }} />
              </div>
              <p className="moon-angle-readout">सूर्य-चंद्र कोण <strong>{displayAngle.toFixed(0)}°</strong></p>
              {moonData && <p className="moon-time-note">गणना: {moonData.panchang.planets ? 'वैदिक पंचांग खगोलीय स्थिति' : 'उपलब्ध स्थिति'}</p>}
            </div>
          </div>

        </>
      )}
    </section>
  );
};

export default MoonPhaseVisualizer;
