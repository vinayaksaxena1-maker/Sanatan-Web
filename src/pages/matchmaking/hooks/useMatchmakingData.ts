/**
 * Sanatan Web (सनातन घड़ी)
 * Hook: useMatchmakingData
 * Orchestrates 36 Guna Ashtakoot Matching, Manglik Evaluation & A4 Certificate
 * Strict < 300 lines modular standard
 */

import { useState, useMemo, useCallback } from 'react';
import { calculateKundliMilan, type KundliMilanReport } from '../../../engine/synthesis/predictiveEngine';
import { RASHI_LIST, NAKSHATRA_LIST } from './matchmakingPresets';

export type InputMode = 'rashi_nakshatra' | 'birth_details';

export interface PersonProfile {
  name: string;
  birthDate: string;
  birthTime: string;
  cityName: string;
  rashiIndex: number; // 0 to 11
  nakshatraIndex: number; // 0 to 26
  nakshatraPada: number; // 1 to 4
  isManglik: boolean;
}

export function toDevanagariNumerals(num: number | string): string {
  const devanagariDigits = ['०', '१', '२', '३', '४', '५', '६', '७', '८', '९'];
  return String(num).replace(/[0-9]/g, (w) => devanagariDigits[+w]);
}

export function useMatchmakingData() {
  const [inputMode, setInputMode] = useState<InputMode>('rashi_nakshatra');
  const [isCertificateModalOpen, setIsCertificateModalOpen] = useState<boolean>(false);

  // Groom (वर) Profile
  const [groom, setGroom] = useState<PersonProfile>({
    name: 'आयुष्मान वर',
    birthDate: '1996-05-14',
    birthTime: '08:30',
    cityName: 'वाराणसी (काशी)',
    rashiIndex: 0, // मेष
    nakshatraIndex: 0, // अश्विनी
    nakshatraPada: 1,
    isManglik: false,
  });

  // Bride (कन्या) Profile
  const [bride, setBride] = useState<PersonProfile>({
    name: 'आयुष्मती कन्या',
    birthDate: '1998-11-22',
    birthTime: '14:15',
    cityName: 'प्रयागराज',
    rashiIndex: 3, // कर्क
    nakshatraIndex: 7, // पुष्य
    nakshatraPada: 2,
    isManglik: false,
  });

  // Updaters
  const updateGroom = useCallback((fields: Partial<PersonProfile>) => {
    setGroom((prev) => ({ ...prev, ...fields }));
  }, []);

  const updateBride = useCallback((fields: Partial<PersonProfile>) => {
    setBride((prev) => ({ ...prev, ...fields }));
  }, []);

  // Compute Moon Longitude for Ashtakoot Math
  const groomMoonLon = useMemo(() => {
    const nakSpan = 360 / 27;
    return groom.nakshatraIndex * nakSpan + (groom.nakshatraPada - 0.5) * (nakSpan / 4);
  }, [groom.nakshatraIndex, groom.nakshatraPada]);

  const brideMoonLon = useMemo(() => {
    const nakSpan = 360 / 27;
    return bride.nakshatraIndex * nakSpan + (bride.nakshatraPada - 0.5) * (nakSpan / 4);
  }, [bride.nakshatraIndex, bride.nakshatraPada]);

  // Master Engine Call: calculateKundliMilan
  const milanReport = useMemo<KundliMilanReport>(() => {
    return calculateKundliMilan(groomMoonLon, brideMoonLon);
  }, [groomMoonLon, brideMoonLon]);

  // Manglik Harmony Assessment
  const manglikHarmony = useMemo(() => {
    if (!groom.isManglik && !bride.isManglik) {
      return {
        status: 'दोष मुक्त (निर्दोष)',
        isCompatible: true,
        tone: 'emerald' as const,
        description: 'वर एवं कन्या दोनों मांगलिक दोष से मुक्त हैं। दांपत्य जीवन में मंगल की सौम्यता रहेगी।',
      };
    }
    if (groom.isManglik && bride.isManglik) {
      return {
        status: 'साम्य परिहार (परस्पर अनुकूल)',
        isCompatible: true,
        tone: 'emerald' as const,
        description: 'उभय मांगलिक योग। वर व कन्या दोनों के मांगलिक होने से शास्त्रोक्त रीति से भौम दोष का स्वतः शमन हो जाता है।',
      };
    }
    return {
      status: 'एकांगी मांगलिक (उपाय विचारणीय)',
      isCompatible: false,
      tone: 'amber' as const,
      description: 'केवल एक पक्ष मांगलिक है। विवाह पूर्व घट/कुंभ विवाह अथवा मंगल शांति अनुष्ठान का परामर्श दिया जाता है।',
    };
  }, [groom.isManglik, bride.isManglik]);

  // Hindi Verdict Formulation
  const hindiVerdict = useMemo(() => {
    const score = milanReport.totalScore;
    if (score >= 28) {
      return {
        grade: 'उत्कृष्ट / अति उत्तम मिलान',
        colorClass: 'text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border-emerald-300',
        badgeBg: 'bg-emerald-600',
        recommendationHindi: 'यह संबंध सर्वथा प्रशस्त एवं अत्यंत शुभ है। दांपत्य में सुख, संतति एवं समृद्धि योग हैं।',
        scorePercent: Math.round((score / 36) * 100),
      };
    }
    if (score >= 21) {
      return {
        grade: 'शुभ / मध्यम-उत्तम मिलान',
        colorClass: 'text-amber-800 dark:text-amber-300 bg-amber-50 dark:bg-amber-950/60 border-amber-300',
        badgeBg: 'bg-amber-600',
        recommendationHindi: 'विवाह हेतु पूर्णतः ग्राह्य एवं अनुकूल संबंध। परस्पर आदर व सामंजस्य से श्रेष्ठ दांपत्य संभव है।',
        scorePercent: Math.round((score / 36) * 100),
      };
    }
    if (score >= 18) {
      return {
        grade: 'साधारण / ग्राह्य मिलान',
        colorClass: 'text-orange-800 dark:text-orange-300 bg-orange-50 dark:bg-orange-950/60 border-orange-300',
        badgeBg: 'bg-orange-600',
        recommendationHindi: '१८ न्यूनतम गुणों की पूर्ति होती है। प्रमुख दोषों का परिहार देख कर ही अंतिम निर्णय लें।',
        scorePercent: Math.round((score / 36) * 100),
      };
    }
    return {
      grade: 'अशुभ / अपर्याप्त गुण',
      colorClass: 'text-rose-800 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/60 border-rose-300',
      badgeBg: 'bg-rose-600',
      recommendationHindi: '१८ से कम गुण प्राप्त हुए हैं। बिना विशिष्ट ग्रह-मैत्री व परिहार के यह संबंध अनुशंसित नहीं है।',
      scorePercent: Math.round((score / 36) * 100),
    };
  }, [milanReport.totalScore]);

  // Preset Pair Loader
  const loadPresetPair = useCallback((type: 'ideal' | 'average' | 'challenging') => {
    if (type === 'ideal') {
      setGroom({
        name: 'विनायक शर्मा',
        birthDate: '1996-05-14',
        birthTime: '08:30',
        cityName: 'वाराणसी (काशी)',
        rashiIndex: 3, // कर्क
        nakshatraIndex: 7, // पुष्य (देव, मध्य, मेष)
        nakshatraPada: 2,
        isManglik: false,
      });
      setBride({
        name: 'वैष्णवी मिश्रा',
        birthDate: '1998-11-22',
        birthTime: '14:15',
        cityName: 'प्रयागराज',
        rashiIndex: 3, // कर्क
        nakshatraIndex: 6, // पुनर्वसु (देव, आदि, मार्जार)
        nakshatraPada: 4,
        isManglik: false,
      });
    } else if (type === 'average') {
      setGroom({
        name: 'रोहित वर्मा',
        birthDate: '1994-08-10',
        birthTime: '11:00',
        cityName: 'दिल्ली',
        rashiIndex: 0, // मेष
        nakshatraIndex: 0, // अश्विनी
        nakshatraPada: 1,
        isManglik: true,
      });
      setBride({
        name: 'अंजलि गुप्ता',
        birthDate: '1996-12-05',
        birthTime: '16:45',
        cityName: 'जयपुर',
        rashiIndex: 6, // तुला
        nakshatraIndex: 14, // स्वाति
        nakshatraPada: 3,
        isManglik: true,
      });
    } else {
      setGroom({
        name: 'विकास सिंह',
        birthDate: '1995-02-18',
        birthTime: '06:15',
        cityName: 'लखनऊ',
        rashiIndex: 1, // वृषभ
        nakshatraIndex: 3, // रोहिणी (अंत्य)
        nakshatraPada: 1,
        isManglik: true,
      });
      setBride({
        name: 'पूजा यादव',
        birthDate: '1997-07-20',
        birthTime: '21:30',
        cityName: 'गोरखपुर',
        rashiIndex: 1, // वृषभ
        nakshatraIndex: 2, // कृत्तिका (अंत्य)
        nakshatraPada: 2,
        isManglik: false,
      });
    }
  }, []);

  // Selected Rashi & Nakshatra Meta
  const groomRashi = RASHI_LIST[groom.rashiIndex];
  const groomNakshatra = NAKSHATRA_LIST[groom.nakshatraIndex];
  const brideRashi = RASHI_LIST[bride.rashiIndex];
  const brideNakshatra = NAKSHATRA_LIST[bride.nakshatraIndex];

  return {
    inputMode,
    setInputMode,
    isCertificateModalOpen,
    setIsCertificateModalOpen,
    groom,
    updateGroom,
    bride,
    updateBride,
    groomRashi,
    groomNakshatra,
    brideRashi,
    brideNakshatra,
    milanReport,
    manglikHarmony,
    hindiVerdict,
    loadPresetPair,
  };
}

export type UseMatchmakingDataResult = ReturnType<typeof useMatchmakingData>;
