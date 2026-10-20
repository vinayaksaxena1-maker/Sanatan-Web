import React from 'react';
import { Sparkles } from 'lucide-react';
import type { TithiPaksha } from '../../data/tithiSpiritualData';
import { getTithiSpiritualData } from '../../data/tithiSpiritualData';

interface TithiCardProps {
  day: number;
  paksha: TithiPaksha;
  isPreview: boolean;
}

export const TithiCard: React.FC<TithiCardProps> = ({ day, paksha, isPreview }) => {
  const tithi = getTithiSpiritualData(day);
  const pakshaHi = paksha === 'Shukla' ? 'शुक्ल पक्ष' : 'कृष्ण पक्ष';
  const isAmavasya = day === 15 && paksha === 'Krishna';
  const nameHi = isAmavasya ? 'अमावस्या' : tithi.nameHi;
  const nameEn = isAmavasya ? 'Amavasya' : tithi.nameEn;
  const deityHi = isAmavasya ? 'पितृगण' : tithi.deityHi;
  const deityEn = isAmavasya ? 'Ancestors' : tithi.deityEn;
  const elementHi = isAmavasya ? 'आकाश · मौन' : tithi.elementHi;
  const elementEn = isAmavasya ? 'Space · Stillness' : tithi.elementEn;
  const energyHi = isAmavasya ? 'स्मरण, आत्मचिंतन और अंतर्मुखता की ऊर्जा।' : tithi.energyHi;
  const energyEn = isAmavasya ? 'An energy for remembrance, reflection, and inwardness.' : tithi.energyEn;
  const meditationHi = isAmavasya ? 'शांत बैठें, पूर्वजों और अपने जीवन में मिले सहारे के प्रति कृतज्ञता रखें।' : tithi.meditationHi;
  const meditationEn = isAmavasya ? 'Sit quietly and offer gratitude for your ancestors and the support in your life.' : tithi.meditationEn;

  return (
    <article className="tithi-energy-card" aria-labelledby="tithi-card-title" aria-live="polite">
      <div className="tithi-card-topline">
        <span className="tithi-card-icon"><Sparkles size={18} aria-hidden="true" /></span>
        <span className="tithi-card-status">{isPreview ? 'पूर्वावलोकन · PREVIEW' : 'आज की तिथि · TODAY'}</span>
        <span className="tithi-card-count">{day.toString().padStart(2, '0')} / 15</span>
      </div>
      <div className="tithi-card-title-row">
        <div>
          <p className="tithi-card-paksha">{pakshaHi} · {paksha}</p>
          <h3 id="tithi-card-title">{nameHi}<span>{nameEn}</span></h3>
        </div>
        <div className="tithi-card-deity"><span>अधिष्ठाता · PRESIDING DEITY</span><strong>{deityHi}</strong><small>{deityEn}</small></div>
      </div>
      <div className="tithi-energy-meta">
        <span>ध्यान तत्व · REFLECTIVE ELEMENT</span><strong>{elementHi}<small>{elementEn}</small></strong>
        <span>ऊर्जा · ENERGY</span><strong>{energyHi}<small>{energyEn}</small></strong>
      </div>
      <div className="tithi-meditation-grid">
        <div><span>ध्यान मार्गदर्शन</span><p>{meditationHi}</p></div>
        <div><span>MEDITATION GUIDANCE</span><p>{meditationEn}</p></div>
      </div>
      <p className="tithi-tradition-note">ध्यान तत्व चिंतन हेतु हैं; तिथि-विधि और परंपराएं क्षेत्र/सम्प्रदाय के अनुसार भिन्न हो सकती हैं।</p>
    </article>
  );
};

export default TithiCard;
