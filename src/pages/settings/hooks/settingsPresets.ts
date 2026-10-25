/**
 * Sanatan Web (सनातन घड़ी)
 * Presets: Settings, Ephemeris Ayanamsha, House Systems & Chart Styles
 * Strict < 300 lines modular standard
 */

import type { AyanamshaSystem } from '../../../engine/core/sanatan_jpl_bridge';

export interface AyanamshaPreset {
  id: AyanamshaSystem;
  nameHindi: string;
  nameEnglish: string;
  authorityHindi: string;
  descriptionHindi: string;
  isGovernmentStandard: boolean;
  offsetFormula: string;
}

export const AYANAMSHA_PRESETS: AyanamshaPreset[] = [
  {
    id: 'Lahiri',
    nameHindi: 'लाहिड़ी (चित्रपक्ष अयनांश)',
    nameEnglish: 'Lahiri (Chitra Paksha)',
    authorityHindi: 'भारत सरकार पंचांग सुधार समिति एवं राष्ट्रीय पंचांग मानक',
    descriptionHindi: 'चित्रा नक्षत्र के ठीक सम्मुख (१८०°) तारा स्पिका (Spica) को आधार मानकर निर्धारित। भारत में सर्वाधिक मान्य एवं शास्त्रीय मानक।',
    isGovernmentStandard: true,
    offsetFormula: 'चित्रपक्ष आधार: २४° ११\' ४२" (वर्ष २०२४-२०२६)',
  },
  {
    id: 'KP',
    nameHindi: 'के. पी. अयनांश (कृष्णमूर्ति पद्धति)',
    nameEnglish: 'Krishnamurti (KP)',
    authorityHindi: 'प्रो. के. एस. कृष्णमूर्ति एवं स्टेलर एस्ट्रोलॉजी',
    descriptionHindi: 'कृष्णमूर्ति पद्धति में उप-स्वामी (Sub-Lord) एवं सटीक घटना समय निर्धारण हेतु प्रयुक्त। लाहिड़ी से लगभग ५ मिनट ५४ सेकंड कम।',
    isGovernmentStandard: false,
    offsetFormula: 'लाहिड़ी - ००° ०५\' ५४"',
  },
  {
    id: 'Raman',
    nameHindi: 'रमन अयनांश (बी. वी. रमन)',
    nameEnglish: 'B. V. Raman',
    authorityHindi: 'डॉ. बी. वी. रमन (द एस्ट्रोलॉजिकल मैगज़ीन)',
    descriptionHindi: 'पारंपरिक दक्षिण भारतीय विद्वानों एवं डॉ. बी. वी. रमन की शोध गणनाओं पर आधारित। ऐतिहासिक कुण्डली विश्लेषण में प्रयुक्त।',
    isGovernmentStandard: false,
    offsetFormula: '२१° ००\' १५" (आधार वर्ष २०००)',
  },
];

export interface HouseSystemPreset {
  id: 'Sripati' | 'Placidus' | 'EqualHouse';
  nameHindi: string;
  nameEnglish: string;
  descriptionHindi: string;
  usageHindi: string;
}

export const HOUSE_SYSTEM_PRESETS: HouseSystemPreset[] = [
  {
    id: 'Sripati',
    nameHindi: 'श्रीपति भाव पद्धति (पारंपरिक वैदिक)',
    nameEnglish: 'Sripati (Porphyry/Bhava Sandhi)',
    descriptionHindi: 'भाव मध्य (Bhava Madhya) एवं भाव संधि (Bhava Sandhi) की त्रैभागीय सममित गणना। महर्षि पराशर एवं वैदिक ज्योतिष का प्रधान मानक।',
    usageHindi: 'वैदिक फलित, ग्रह बल, षड्बल एवं पारंपरिक जन्म कुण्डली हेतु सर्वोत्तम।',
  },
  {
    id: 'Placidus',
    nameHindi: 'प्लेसिडस पद्धति (कस्प आधारित)',
    nameEnglish: 'Placidus (Semi-Arc)',
    descriptionHindi: 'दिन व रात्रि के अर्द्ध-चापों का समविभाजन। प्रत्येक भाव का कस्प उसकी प्रारंभिक सीमा होता है।',
    usageHindi: 'के. पी. (KP) पद्धति एवं उप-स्वामी (Sub-Lord) गणना में अनिवार्य रूप से प्रयुक्त।',
  },
  {
    id: 'EqualHouse',
    nameHindi: 'समान भाव पद्धति (३०° प्रति भाव)',
    nameEnglish: 'Equal House',
    descriptionHindi: 'लग्न बिंदु से प्रत्येक भाव ठीक ३० अंश का होता है। इसमें भाव संधि की जटिलता नहीं होती।',
    usageHindi: 'सरल दृष्टि गणना एवं पाश्चात्य साइडरियल अध्ययन में सहायक।',
  },
];

export interface ChartStylePreset {
  id: 'north' | 'south' | 'east';
  nameHindi: string;
  nameEnglish: string;
  descriptionHindi: string;
}

export const CHART_STYLE_PRESETS: ChartStylePreset[] = [
  {
    id: 'north',
    nameHindi: 'उत्तर भारतीय शैली (हीरक / चौकोर)',
    nameEnglish: 'North Indian (Diamond)',
    descriptionHindi: 'भाव स्थिर रहते हैं (लग्न सदा ऊपर केंद्र में) और राशियाँ गतिमान रहती हैं।',
  },
  {
    id: 'south',
    nameHindi: 'दक्षिण भारतीय शैली (पेटी / बॉक्स)',
    nameEnglish: 'South Indian (Box)',
    descriptionHindi: 'राशियाँ स्थिर रहती हैं (मेष सदा द्वितीय पेटी में) और लग्न/ग्रह गतिमान रहते हैं।',
  },
  {
    id: 'east',
    nameHindi: 'पूर्व भारतीय शैली (बंगला / असम)',
    nameEnglish: 'East Indian (Sunburst)',
    descriptionHindi: 'बंगाल, ओडिशा और असम में प्रचलित पारंपरिक रूप, जिसमें राशियाँ वामावर्त (Anticlockwise) रहती हैं।',
  },
];
