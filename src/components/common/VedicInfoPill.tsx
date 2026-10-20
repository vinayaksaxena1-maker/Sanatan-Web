/**
 * Sanatan Ghadi (सनातन घड़ी)
 * VedicInfoPill Component
 * Elder-Friendly 'ⓘ' Popover for Explaining Vedic Astronomical & Astrological Terms
 */

import React, { useState, useRef, useEffect, type ReactNode } from 'react';
import { HelpCircle, X, Sparkles, AlertCircle } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface VedicInfoPillProps {
  term: string;
  title: string;
  description: string;
  significance?: string;
  isAuspicious?: boolean | null; // true: shubh, false: varjya/ashubh, null: neutral/informative
  placement?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  children?: ReactNode;
}

export const VedicInfoPill: React.FC<VedicInfoPillProps> = ({
  term,
  title,
  description,
  significance,
  isAuspicious = null,
  placement = 'bottom',
  className,
  children,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close popover on outside click
  useEffect(() => {
    if (!isOpen) return;

    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handlePointerDown);
    document.addEventListener('touchstart', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handlePointerDown);
      document.removeEventListener('touchstart', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const placementStyles: Record<string, string> = {
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2',
  };

  return (
    <div
      ref={containerRef}
      className={cn('relative inline-flex items-center gap-1.5', className)}
    >
      {/* Label or optional custom children */}
      {children ? (
        children
      ) : (
        <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
          {term}
        </span>
      )}

      {/* Info Icon Button */}
      <button
        type="button"
        aria-label={`About ${term}`}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
        onClick={() => setIsOpen((prev) => !prev)}
        className={cn(
          'p-0.5 rounded-full text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors focus:outline-hidden focus:ring-2 focus:ring-amber-500/50',
          isOpen && 'text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50'
        )}
      >
        <HelpCircle className="w-3.5 h-3.5" />
      </button>

      {/* Popover Card */}
      {isOpen && (
        <div
          role="dialog"
          aria-label={title}
          className={cn(
            'absolute z-50 w-72 sm:w-80 rounded-2xl p-4 shadow-xl border',
            'bg-white dark:bg-stone-900 border-amber-200/90 dark:border-amber-900/60',
            'text-stone-800 dark:text-stone-100 animate-in fade-in zoom-in-95 duration-150',
            placementStyles[placement]
          )}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-stone-100 dark:border-stone-800">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <h4 className="font-bold text-sm text-stone-900 dark:text-stone-100">
                {title}
              </h4>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-md text-stone-400 hover:text-stone-600 dark:hover:text-stone-200 transition-colors"
              aria-label="बंद करें (Close)"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Description */}
          <div className="py-2.5 text-xs text-stone-600 dark:text-stone-300 leading-relaxed">
            {description}
          </div>

          {/* Vedic Significance */}
          {significance && (
            <div
              className={cn(
                'mt-1 p-2 rounded-xl text-[11px] leading-snug flex items-start gap-1.5 font-medium',
                isAuspicious === true &&
                  'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200/60 dark:border-emerald-800/40',
                isAuspicious === false &&
                  'bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 border border-rose-200/60 dark:border-rose-800/40',
                isAuspicious === null &&
                  'bg-amber-50 dark:bg-amber-950/40 text-amber-900 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/40'
              )}
            >
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{significance}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
