/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 01: Home Dashboard (Watch, Aaj Ka Haal, Surya Chakra, WhatsApp Status PNG)
 * Built with Resilient 5-State Components & Sacred HeroBanner
 */

import React, { useCallback, useState } from 'react';
import { useTranslation } from '../i18n/i18nContext';
import { Sun, Share2, Clock, CalendarDays, Compass } from 'lucide-react';
import {
  HeroBanner,
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
  Badge,
  VedicInfoPill,
} from '../components/common';
import { AnalogWatch } from '../components/watch/AnalogWatch';
import { MoonPhaseVisualizer } from '../components/moon/MoonPhaseVisualizer';
import { TithiCard } from '../components/moon/TithiCard';
import { TithiSlider } from '../components/moon/TithiSlider';
import type { TithiPaksha } from '../data/tithiSpiritualData';

export const Home: React.FC = () => {
  const { t } = useTranslation();
  const [tithiSelection, setTithiSelection] = useState<{ day: number; paksha: TithiPaksha; isPreview: boolean }>({ day: 1, paksha: 'Shukla', isPreview: false });
  const syncLiveTithi = useCallback((day: number, paksha: TithiPaksha) => {
    setTithiSelection((current) => current.isPreview ? current : { day, paksha, isPreview: false });
  }, []);
  const selectTithi = (day: number) => setTithiSelection((current) => ({ ...current, day, isPreview: true }));
  const selectPaksha = (paksha: TithiPaksha) => setTithiSelection((current) => ({ ...current, paksha, isPreview: true }));

  return (
    <div className="space-y-6">
      {/* Sacred Geometric Hero Banner */}
      <HeroBanner
        patternVariant="mandala"
        badge={
          <Badge variant="sacred" size="sm" dot>
            {t('brand.tagline')}
          </Badge>
        }
        title={t('brand.name')}
        subtitle={t('brand.subTitle')}
        description="ऋग्वेद और सूर्य सिद्धान्त सम्मत काल गणना, 100% ऑफलाइन, सूक्ष्म गणित और शुद्धातिशुद्ध वैदिक पंचांग।"
        highlights={[
          {
            label: t('panchang.tithi'),
            value: 'शुक्ल एकादशी',
            highlight: true,
          },
          {
            label: t('panchang.nakshatra'),
            value: 'रोहिणी',
          },
          {
            label: t('panchang.sunrise'),
            value: '06:24 AM',
            icon: <Sun className="w-3.5 h-3.5 text-amber-300" />,
          },
          {
            label: t('panchang.sunset'),
            value: '05:48 PM',
          },
        ]}
        actions={
          <>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-stone-900 text-xs sm:text-sm font-bold shadow-md hover:bg-amber-50 active:scale-95 transition-transform cursor-pointer"
            >
              <CalendarDays className="w-4 h-4 text-amber-600" />
              <span>आज का सम्पूर्ण पंचांग</span>
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-white border border-white/20 text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              <Compass className="w-4 h-4 text-amber-200" />
              <span>चौघड़िया चक्र</span>
            </button>
          </>
        }
      />

      <AnalogWatch status={{ title: 'वर्तमान समय', description: 'स्थानीय समय के अनुसार घड़ी चल रही है। वैदिक दृश्य में तारीख और सेकंड हैंड भी देखें।', auspicious: true }} />

      <MoonPhaseVisualizer
        selectedTithi={tithiSelection.day}
        selectedPaksha={tithiSelection.paksha}
        isTithiPreview={tithiSelection.isPreview}
        onLiveTithi={syncLiveTithi}
        onReturnToLive={() => setTithiSelection((current) => ({ ...current, isPreview: false }))}
      />

      <section className="tithi-explorer" aria-label="15 तिथियों का ऊर्जा अन्वेषक">
        <TithiSlider day={tithiSelection.day} paksha={tithiSelection.paksha} onChange={selectTithi} onPakshaChange={selectPaksha} />
        <TithiCard day={tithiSelection.day} paksha={tithiSelection.paksha} isPreview={tithiSelection.isPreview} />
      </section>

      {/* Aaj Ka Haal - Resilient 5-State Sacred Card */}
      <Card variant="sacred" interactive>
        <CardHeader>
          <div className="flex items-center gap-2.5">
            <span className="p-1.5 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
              <Sun className="w-5 h-5" />
            </span>
            <div>
              <CardTitle>{t('panchang.aajKaHaal')}</CardTitle>
              <CardDescription>उज्जैन अवंतिका रेखांश सम्मत वास्तविक काल</CardDescription>
            </div>
          </div>
          <Badge variant="shubh" dot>
            शुभ मुहूर्त सक्रिय
          </Badge>
        </CardHeader>

        <CardContent>
          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-stone-50 dark:bg-stone-800/50 rounded-xl p-3 border border-stone-200/70 dark:border-stone-700/60">
              <span className="text-xs text-stone-500 dark:text-stone-400 block">
                {t('panchang.tithi')}
              </span>
              <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                शुक्ल एकादशी
              </span>
            </div>
            <div className="bg-stone-50 dark:bg-stone-800/50 rounded-xl p-3 border border-stone-200/70 dark:border-stone-700/60">
              <span className="text-xs text-stone-500 dark:text-stone-400 block">
                {t('panchang.nakshatra')}
              </span>
              <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                रोहिणी
              </span>
            </div>
            <div className="bg-stone-50 dark:bg-stone-800/50 rounded-xl p-3 border border-stone-200/70 dark:border-stone-700/60">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {t('panchang.rahuKaal')}
                </span>
                <VedicInfoPill
                  term=""
                  title="राहुकाल (Rahu Kaal)"
                  description="प्रतिदिन लगभग 90 मिनट की अवधि जिसमें सूर्य के प्रकाश का आंशिक तम प्रभाव माना जाता है। इस काल में शुभ और नए कार्य आरम्भ नहीं किए जाते।"
                  significance="वर्ज्य काल: नवीन संकल्प अथवा यात्रा आरम्भ न करें।"
                  isAuspicious={false}
                />
              </div>
              <span className="text-sm font-bold text-rose-600 dark:text-rose-400 tabular-nums">
                04:30 - 06:00 PM
              </span>
            </div>
            <div className="bg-stone-50 dark:bg-stone-800/50 rounded-xl p-3 border border-stone-200/70 dark:border-stone-700/60">
              <div className="flex items-center justify-between">
                <span className="text-xs text-stone-500 dark:text-stone-400">
                  {t('panchang.abhijitMuhurat')}
                </span>
                <VedicInfoPill
                  term=""
                  title="अभिजीत मुहूर्त (Abhijit Muhurat)"
                  description="दोपहर के समय सूर्य के मध्याह्न का परम शुभ मुहूर्त जो समस्त दोषों का शमन करता है।"
                  significance="परम शुभ: किसी भी कार्य के लिए अत्यंत फलदायी।"
                  isAuspicious={true}
                />
              </div>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                11:52 AM - 12:44 PM
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <div className="flex items-center gap-1.5 text-xs text-stone-600 dark:text-stone-400">
            <Clock className="w-4 h-4 text-amber-600 dark:text-amber-400" />
            <span>लाइव सनातन कालगणना सक्रिय</span>
          </div>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold transition-colors cursor-pointer shadow-xs focus:ring-2 focus:ring-emerald-500/50 focus:outline-hidden"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{t('common.shareWhatsapp')}</span>
          </button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Home;
