import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { TithiPaksha } from '../../data/tithiSpiritualData';
import { getTithiSpiritualData } from '../../data/tithiSpiritualData';

interface TithiSliderProps {
  day: number;
  paksha: TithiPaksha;
  onChange: (day: number) => void;
  onPakshaChange: (paksha: TithiPaksha) => void;
}

export const TithiSlider: React.FC<TithiSliderProps> = ({ day, paksha, onChange, onPakshaChange }) => {
  const tithi = getTithiSpiritualData(day);
  const isShukla = paksha === 'Shukla';
  const tithiName = day === 15 && !isShukla ? 'अमावस्या' : tithi.nameHi;

  return (
    <section className="tithi-slider-card" aria-labelledby="tithi-slider-title">
      <div className="tithi-slider-heading">
        <div>
          <p className="tithi-kicker">तिथि अन्वेषक · TITHI EXPLORER</p>
          <h3 id="tithi-slider-title">चंद्र चक्र में आगे बढ़ें</h3>
        </div>
        <div className="tithi-paksha-tabs" role="group" aria-label="पक्ष चुनें">
          {(['Shukla', 'Krishna'] as const).map((option) => (
            <button key={option} type="button" aria-pressed={paksha === option} onClick={() => onPakshaChange(option)}>
              {option === 'Shukla' ? 'शुक्ल' : 'कृष्ण'}
            </button>
          ))}
        </div>
      </div>
      <div className="tithi-selected-line" aria-live="polite">
        <span>{isShukla ? 'शुक्ल' : 'कृष्ण'} {tithiName}</span>
        <strong>{day} / 15</strong>
      </div>
      <div className="tithi-range-row">
        <button type="button" className="tithi-step-button" onClick={() => onChange(Math.max(1, day - 1))} disabled={day === 1} aria-label="पिछली तिथि">
          <ChevronLeft size={18} aria-hidden="true" />
        </button>
        <input
          id="tithi-day-slider"
          type="range"
          min="1"
          max="15"
          step="1"
          value={day}
          onChange={(event) => onChange(Number(event.target.value))}
          aria-label="तिथि 1 से 15 तक चुनें"
          aria-valuetext={`${tithiName}, ${day} में से 15`}
        />
        <button type="button" className="tithi-step-button" onClick={() => onChange(Math.min(15, day + 1))} disabled={day === 15} aria-label="अगली तिथि">
          <ChevronRight size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="tithi-ticks" aria-hidden="true"><span>प्रतिपदा</span><span>सप्तमी</span><span>{isShukla ? 'पूर्णिमा' : 'अमावस्या'}</span></div>
      <p className="tithi-slider-note">तिथि चुनने पर चंद्र कला और ऊर्जा कार्ड साथ-साथ बदलते हैं।</p>
    </section>
  );
};

export default TithiSlider;
