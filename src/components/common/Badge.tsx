/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Reusable Badge Component
 * Sacred Color Palettes for Vedic Auspicious / Inauspicious Status
 */

import React, { type ReactNode } from 'react';
import { cn } from '../../utils/cn';

export type BadgeVariant =
  | 'shubh'
  | 'amrit'
  | 'labh'
  | 'ashubh'
  | 'ati-ashubh'
  | 'neutral'
  | 'sacred'
  | 'info';

export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, { container: string; dot: string }> = {
  shubh: {
    container: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    dot: 'bg-emerald-500',
  },
  amrit: {
    container: 'bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 border-teal-200 dark:border-teal-800 font-bold',
    dot: 'bg-teal-500 animate-pulse',
  },
  labh: {
    container: 'bg-amber-50 dark:bg-amber-950/50 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-800',
    dot: 'bg-amber-500',
  },
  ashubh: {
    container: 'bg-rose-50 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 border-rose-200 dark:border-rose-800',
    dot: 'bg-rose-500',
  },
  'ati-ashubh': {
    container: 'bg-red-100 dark:bg-red-950/70 text-red-900 dark:text-red-200 border-red-300 dark:border-red-700 font-bold',
    dot: 'bg-red-600 animate-ping',
  },
  neutral: {
    container: 'bg-stone-100 dark:bg-stone-800/60 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-700',
    dot: 'bg-stone-400',
  },
  sacred: {
    container: 'bg-amber-100/80 dark:bg-amber-950/60 text-amber-950 dark:text-amber-200 border-amber-300/80 dark:border-amber-700 font-semibold',
    dot: 'bg-amber-600',
  },
  info: {
    container: 'bg-sky-50 dark:bg-sky-950/50 text-sky-800 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    dot: 'bg-sky-500',
  },
};

const sizeStyles: Record<BadgeSize, string> = {
  sm: 'text-[10px] px-2 py-0.5 gap-1',
  md: 'text-xs px-2.5 py-1 gap-1.5',
  lg: 'text-sm px-3.5 py-1.5 gap-2',
};

export const Badge: React.FC<BadgeProps> = ({
  variant = 'neutral',
  size = 'md',
  dot = false,
  icon,
  children,
  className,
  ...props
}) => {
  const styles = variantStyles[variant] || variantStyles.neutral;

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border transition-colors select-none',
        styles.container,
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className={cn('w-1.5 h-1.5 rounded-full shrink-0', styles.dot)}
          aria-hidden="true"
        />
      )}
      {icon && <span className="shrink-0">{icon}</span>}
      <span className="truncate">{children}</span>
    </span>
  );
};

export default Badge;
