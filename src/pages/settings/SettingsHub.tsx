/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Hub 10: User Preferences, i18n & 1-Click JSON Backup Hub
 */

import React, { useState, useRef } from 'react';
import { useTranslation } from '../../i18n/i18nContext';
import { Settings, Globe, Database, Download, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { LanguageToggle } from '../../components/layout/LanguageToggle';
import { downloadBackupFile, importBackupJson } from '../../utils/backupRestore';

export const SettingsHub: React.FC = () => {
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const handleExport = async () => {
    try {
      setIsProcessing(true);
      const filename = await downloadBackupFile();
      setStatusMessage({
        type: 'success',
        text: `बैकअप फ़ाइल सफलतापूर्वक डाउनलोड हुई: ${filename}`,
      });
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `बैकअप निर्यात में त्रुटि: ${err?.message || err}`,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const text = await file.text();
      const result = await importBackupJson(text);

      if (result.success) {
        setStatusMessage({
          type: 'success',
          text: result.message,
        });
      } else {
        setStatusMessage({
          type: 'error',
          text: result.message,
        });
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: `फ़ाइल पढ़ने में त्रुटि: ${err?.message || err}`,
      });
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <div className="space-y-6">
      <header className="space-y-1">
        <div className="flex items-center gap-2">
          <Settings className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 font-serif">
            {t('nav.settings')}
          </h1>
        </div>
        <p className="text-sm text-stone-600 dark:text-stone-400">
          भाषा चयन, चन्दन/डार्क थीम एवं 1-क्लिक डेटा बैकअप व पुनर्प्राप्ति
        </p>
      </header>

      {statusMessage && (
        <div
          role="alert"
          className={`p-3.5 rounded-xl border text-xs flex items-center gap-2 transition-all ${
            statusMessage.type === 'success'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
              : 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
          }`}
        >
          {statusMessage.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          ) : (
            <AlertCircle className="w-4 h-4 shrink-0 text-red-600 dark:text-red-400" />
          )}
          <span>{statusMessage.text}</span>
        </div>
      )}

      {/* Settings Options Cards */}
      <div className="space-y-4">
        {/* Language Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#26201b] border border-amber-200/80 dark:border-amber-900/60 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Globe className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                {t('common.language')}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                हिन्दी / English / हिंग्लिश
              </p>
            </div>
          </div>
          <LanguageToggle />
        </div>

        {/* 1-Click Backup / Import Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#26201b] border border-amber-200/80 dark:border-amber-900/60 shadow-xs space-y-3">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-amber-600" />
            <div>
              <h3 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                उपयोगकर्ता डेटा संप्रभुता (Dexie IndexedDB)
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                आपकी सहेजी गई कुंडलियां आपके फोन में 100% सुरक्षित हैं। फोन बदलने पर 1-क्लिक बैकअप लें।
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 pt-2">
            <button
              type="button"
              onClick={handleExport}
              disabled={isProcessing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold cursor-pointer transition-colors shadow-xs disabled:opacity-50"
            >
              <Download className="w-4 h-4" />
              <span>1-क्लिक JSON बैकअप लें</span>
            </button>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isProcessing}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 text-stone-800 dark:text-stone-200 hover:bg-stone-200 dark:hover:bg-stone-700 text-xs font-semibold cursor-pointer transition-colors shadow-xs disabled:opacity-50"
            >
              <Upload className="w-4 h-4" />
              <span>बैकअप रिस्टोर करें</span>
            </button>

            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsHub;
