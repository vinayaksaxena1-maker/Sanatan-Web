/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Sacred Hero Banner Component
 * Featuring Sacred Mandala Geometry, Saffron Radiant Gradients, and Responsive CTAs
 */

import React, { type ReactNode } from 'react';
import { Sparkles } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface HeroBannerProps {
  badge?: ReactNode;
  title: string;
  subtitle?: string;
  description?: string;
  actions?: ReactNode;
  highlights?: Array<{
    label: string;
    value: string;
    icon?: ReactNode;
    highlight?: boolean;
  }>;
  className?: string;
  patternVariant?: 'mandala' | 'surya' | 'minimal';
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  badge,
  title,
  subtitle,
  description,
  actions,
  highlights = [],
  className,
  patternVariant = 'mandala',
}) => {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl border border-amber-500/20 shadow-md',
        'bg-gradient-to-br from-amber-600 via-orange-600 to-amber-700 text-white',
        'dark:from-amber-950 dark:via-stone-900 dark:to-orange-950/80 dark:border-amber-500/30',
        'p-6 sm:p-8 md:p-10',
        className
      )}
    >
      {/* Sacred Background Geometry */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden opacity-10 dark:opacity-15 mix-blend-overlay"
        aria-hidden="true"
      >
        {patternVariant === 'mandala' && (
          <svg
            className="absolute -right-24 -top-24 w-96 h-96 sm:w-120 sm:h-120 text-white animate-[spin_120s_linear_infinite]"
            viewBox="0 0 200 200"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.8"
          >
            <circle cx="100" cy="100" r="90" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="75" />
            <circle cx="100" cy="100" r="60" strokeDasharray="2 2" />
            <circle cx="100" cy="100" r="45" />
            <circle cx="100" cy="100" r="30" strokeDasharray="4 2" />
            <circle cx="100" cy="100" r="15" />
            {/* 12 Sun Rays / Zodiac Divisions */}
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x1 = 100 + 30 * Math.cos(angle);
              const y1 = 100 + 30 * Math.sin(angle);
              const x2 = 100 + 88 * Math.cos(angle);
              const y2 = 100 + 88 * Math.sin(angle);
              return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
            })}
            {/* 8 Lotus Petal Curves */}
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i * 45 * Math.PI) / 180;
              const cx = 100 + 50 * Math.cos(angle);
              const cy = 100 + 50 * Math.sin(angle);
              return <circle key={`petal-${i}`} cx={cx} cy={cy} r="18" />;
            })}
          </svg>
        )}

        {patternVariant === 'surya' && (
          <svg
            className="absolute right-0 top-1/2 -translate-y-1/2 w-80 h-80 text-white opacity-20"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
          >
            <circle cx="50" cy="50" r="25" strokeWidth="1.5" />
            {Array.from({ length: 16 }).map((_, i) => {
              const rad = (i * 22.5 * Math.PI) / 180;
              return (
                <line
                  key={i}
                  x1={50 + 28 * Math.cos(rad)}
                  y1={50 + 28 * Math.sin(rad)}
                  x2={50 + 44 * Math.cos(rad)}
                  y2={50 + 44 * Math.sin(rad)}
                  strokeWidth="1.2"
                />
              );
            })}
          </svg>
        )}
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 max-w-3xl space-y-4">
        {/* Badge or Pill */}
        {badge && (
          <div className="inline-flex items-center gap-2">
            {badge}
          </div>
        )}

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <div className="flex items-center gap-2.5">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white drop-shadow-xs font-serif">
              {title}
            </h1>
            <Sparkles className="w-5 h-5 text-amber-200 shrink-0 hidden sm:inline-block animate-pulse" />
          </div>
          {subtitle && (
            <p className="text-sm sm:text-base font-medium text-amber-100/90 tracking-wide">
              {subtitle}
            </p>
          )}
        </div>

        {/* Description / Shloka */}
        {description && (
          <p className="text-xs sm:text-sm text-amber-50/80 leading-relaxed max-w-2xl">
            {description}
          </p>
        )}

        {/* Highlights / Quick Metric Chips */}
        {highlights.length > 0 && (
          <div className="pt-2 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 sm:gap-3">
            {highlights.map((h, i) => (
              <div
                key={i}
                className={cn(
                  'px-3.5 py-2 rounded-xl backdrop-blur-md transition-colors',
                  h.highlight
                    ? 'bg-amber-400/25 border border-amber-300/40 text-amber-100 font-semibold'
                    : 'bg-black/15 border border-white/10 text-white/90'
                )}
              >
                <div className="text-[10px] uppercase tracking-wider text-amber-200/80 font-medium">
                  {h.label}
                </div>
                <div className="text-xs sm:text-sm font-bold truncate mt-0.5 flex items-center gap-1.5">
                  {h.icon && <span className="shrink-0">{h.icon}</span>}
                  <span>{h.value}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Buttons Slot */}
        {actions && (
          <div className="pt-3 flex flex-wrap items-center gap-3">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
