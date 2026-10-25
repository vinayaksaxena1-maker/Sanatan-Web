/**
 * Sanatan Web (सनातन घड़ी)
 * Component: MatchmakingManglikCard
 * Manglik (Kuja) Dosha Analysis & 14 Classical Cancellation Rules
 * Strict < 300 lines modular standard
 */

import React, { useState } from 'react';
import type { UseMatchmakingDataResult } from '../hooks/useMatchmakingData';
import { VedicIcon3D } from '../../vedic-portal/components/VedicIcon3D';
import { ShieldCheck, AlertCircle, CheckCircle, Info, ChevronDown, ChevronUp } from 'lucide-react';

interface MatchmakingManglikCardProps {
  data: UseMatchmakingDataResult;
}

export const MatchmakingManglikCard: React.FC<MatchmakingManglikCardProps> = ({ data }) => {
  const { groom, bride, manglikHarmony } = data;
  const [showRules, setShowRules] = useState<boolean>(false);

  return (
    <section className="bg-white/95 dark:bg-stone-900/95 rounded-2xl p-5 sm:p-6 border border-amber-200/70 dark:border-amber-900/40 shadow-xs space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-amber-100 dark:border-amber-900/40 pb-3">
        <div className="flex items-center gap-2">
          <VedicIcon3D name="kalash" size={20} className="text-amber-600" />
          <h3 className="text-base sm:text-lg font-bold font-serif text-stone-900 dark:text-stone-100">
            मांगलिक (भौम) दोष एवं शास्त्रीय सामंजस्य
          </h3>
        </div>
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold ${
          manglikHarmony.isCompatible
            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/70 dark:text-amber-300'
        }`}>
          {manglikHarmony.isCompatible ? (
            <CheckCircle className="w-3.5 h-3.5" />
          ) : (
            <AlertCircle className="w-3.5 h-3.5" />
          )}
          <span>{manglikHarmony.status}</span>
        </span>
      </div>

      {/* Side-by-Side Status & Verdict */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Groom Manglik Status */}
        <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-stone-800/50 border border-amber-200/40 space-y-1">
          <span className="text-[11px] font-semibold text-stone-500 uppercase">
            वर (Groom) मांगलिक स्थिति
          </span>
          <div className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            {groom.isManglik ? (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>मांगलिक उपस्थित (भौम योग)</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>मांगलिक दोष मुक्त (अमांगलिक)</span>
              </>
            )}
          </div>
          <p className="text-[10px] text-stone-500">
            {groom.isManglik ? 'लग्न, चंद्र अथवा शुक्र से १, ४, ७, ८, १२वें भाव में मंगल।' : 'मंगल की स्थिति शुभ व अनुकूल भावों में है।'}
          </p>
        </div>

        {/* Bride Manglik Status */}
        <div className="p-4 rounded-xl bg-rose-50/40 dark:bg-stone-800/50 border border-rose-200/40 space-y-1">
          <span className="text-[11px] font-semibold text-stone-500 uppercase">
            कन्या (Bride) मांगलिक स्थिति
          </span>
          <div className="text-sm font-bold text-stone-900 dark:text-stone-100 flex items-center gap-1.5">
            {bride.isManglik ? (
              <>
                <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                <span>मांगलिक उपस्थित (भौम योग)</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>मांगलिक दोष मुक्त (अमांगलिक)</span>
              </>
            )}
          </div>
          <p className="text-[10px] text-stone-500">
            {bride.isManglik ? 'लग्न, चंद्र अथवा शुक्र से १, ४, ७, ८, १२वें भाव में मंगल।' : 'मंगल की स्थिति शुभ व अनुकूल भावों में है।'}
          </p>
        </div>

        {/* Mutual Decision */}
        <div className="p-4 rounded-xl bg-stone-50 dark:bg-stone-800/80 border border-stone-200 dark:border-stone-700 space-y-1">
          <span className="text-[11px] font-semibold text-stone-500 uppercase">
            पारस्परिक दांपत्य निर्णय
          </span>
          <div className="text-sm font-bold text-stone-900 dark:text-stone-100">
            {manglikHarmony.status}
          </div>
          <p className="text-[10px] text-stone-600 dark:text-stone-300 leading-snug">
            {manglikHarmony.description}
          </p>
        </div>
      </div>

      {/* Classical 14 Cancellation Rules Accordion */}
      <div>
        <button
          type="button"
          onClick={() => setShowRules(!showRules)}
          className="w-full flex items-center justify-between p-3 rounded-xl bg-amber-50/70 dark:bg-stone-800/60 hover:bg-amber-100/70 text-xs font-semibold text-amber-900 dark:text-amber-200 cursor-pointer transition-colors"
        >
          <div className="flex items-center gap-2">
            <Info className="w-4 h-4 text-amber-600" />
            <span>महर्षि पराशर अनुसार मांगलिक दोष के प्रमुख शास्त्रीय परिहार नियम</span>
          </div>
          {showRules ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showRules && (
          <div className="mt-3 p-4 rounded-xl bg-white dark:bg-stone-900 border border-amber-200/50 dark:border-stone-700 text-xs space-y-2 font-serif text-stone-700 dark:text-stone-300">
            <p className="font-bold text-stone-900 dark:text-stone-100">
              शास्त्रोक्त परिहार सूत्र (बृहत्पाराशर होराशास्त्र एवं नारद संहिता):
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-[11px] leading-relaxed">
              <li><strong>स्थान विशेष परिहार:</strong> मेष का मंगल लग्न में, वृश्चिक का चतुर्थ में, मकर का सप्तम में, सिंह या धनु का अष्टम में, एवं कुंभ या मीन का द्वादश भाव में होने पर भौम दोष स्वतः निष्प्रभावी हो जाता है।</li>
              <li><strong>गुरु-चंद्र युति:</strong> मंगल के साथ बृहस्पति की युति हो अथवा मंगल पर देवगुरु बृहस्पति की पूर्ण दृष्टि हो, तो मांगलिक दोष समाप्त हो जाता है।</li>
              <li><strong>उभय साम्य:</strong> यदि वर और कन्या दोनों मांगलिक हों, तो दोनों का भौम दोष एक-दूसरे को संतुलित (Neutralize) कर देता है।</li>
              <li><strong>शनि-मंगल संतुलन:</strong> यदि एक की कुण्डली में मंगल १, ४, ७, ८, १२वें भाव में हो और दूसरे की कुण्डली में इन्हीं भावों में शनि, राहु या केतु स्थित हो तो परिहार सिद्ध होता है।</li>
              <li><strong>आयु परिहार:</strong> २८ वर्ष की आयु पूर्ण होने के पश्चात मंगल का क्रूर प्रभाव स्वाभाविक रूप से शांत हो जाता है।</li>
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
