/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Production-Grade Shimmer Loading Skeletons
 * Zero Cumulative Layout Shift (CLS = 0.00)
 */

import React from 'react';
import { cn } from '../../utils/cn';

export interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
}

const roundedStyles = {
  none: 'rounded-none',
  sm: 'rounded-sm',
  md: 'rounded-md',
  lg: 'rounded-lg',
  xl: 'rounded-xl',
  '2xl': 'rounded-2xl',
  full: 'rounded-full',
};

/**
 * Base Shimmer Skeleton
 */
export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  width,
  height,
  rounded = 'md',
  style,
  ...props
}) => {
  const dynamicStyle: React.CSSProperties = {
    ...(width !== undefined ? { width } : {}),
    ...(height !== undefined ? { height } : {}),
    ...style,
  };

  return (
    <div
      role="status"
      aria-label="Loading..."
      className={cn(
        'animate-pulse bg-stone-200/80 dark:bg-stone-800/80 relative overflow-hidden',
        'after:absolute after:inset-0 after:-translate-x-full after:animate-[shimmer_2s_infinite]',
        'after:bg-gradient-to-r after:from-transparent after:via-stone-100/40 dark:after:via-stone-700/40 after:to-transparent',
        roundedStyles[rounded],
        className
      )}
      style={dynamicStyle}
      {...props}
    >
      <span className="sr-only">सामग्री लोड हो रही है (Loading content...)</span>
    </div>
  );
};

/**
 * Text Skeleton for simulated paragraph/sentences
 */
export interface TextSkeletonProps {
  lines?: number;
  className?: string;
  lineHeight?: string;
  lastLineWidth?: string;
}

export const TextSkeleton: React.FC<TextSkeletonProps> = ({
  lines = 3,
  className,
  lineHeight = 'h-3.5',
  lastLineWidth = 'w-3/5',
}) => {
  return (
    <div className={cn('space-y-2 w-full', className)}>
      {Array.from({ length: lines }).map((_, idx) => {
        const isLast = idx === lines - 1;
        return (
          <Skeleton
            key={idx}
            className={cn(
              lineHeight,
              isLast ? lastLineWidth : 'w-full'
            )}
            rounded="sm"
          />
        );
      })}
    </div>
  );
};

/**
 * Circular Skeleton for icons, avatars, and planetary glyphs
 */
export interface CircleSkeletonProps {
  size?: number | string;
  className?: string;
}

export const CircleSkeleton: React.FC<CircleSkeletonProps> = ({
  size = 40,
  className,
}) => {
  return (
    <Skeleton
      width={size}
      height={size}
      rounded="full"
      className={cn('shrink-0', className)}
    />
  );
};

/**
 * Card Skeleton conforming to standard Sanatan card dimensions
 */
export interface CardSkeletonProps {
  className?: string;
  hasHeaderBadge?: boolean;
  contentLines?: number;
}

export const CardSkeleton: React.FC<CardSkeletonProps> = ({
  className,
  hasHeaderBadge = true,
  contentLines = 3,
}) => {
  return (
    <div
      className={cn(
        'p-5 rounded-2xl border border-stone-200/80 dark:border-stone-800/80 bg-white/70 dark:bg-stone-900/60 backdrop-blur-xs space-y-4 shadow-xs',
        className
      )}
      role="status"
      aria-label="Card content loading"
    >
      <div className="flex items-center justify-between gap-3">
        <Skeleton className="h-5 w-1/3" rounded="md" />
        {hasHeaderBadge && <Skeleton className="h-5 w-16" rounded="full" />}
      </div>
      <TextSkeleton lines={contentLines} />
      <div className="pt-2 flex items-center justify-between border-t border-stone-100 dark:border-stone-800/60">
        <Skeleton className="h-3 w-20" rounded="sm" />
        <Skeleton className="h-7 w-24" rounded="lg" />
      </div>
    </div>
  );
};

/**
 * Grid Skeleton for multi-card lists (Panchang elements, Choghadiya, Hora)
 */
export interface GridSkeletonProps {
  count?: number;
  columns?: string;
  className?: string;
}

export const GridSkeleton: React.FC<GridSkeletonProps> = ({
  count = 4,
  columns = 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  className,
}) => {
  return (
    <div className={cn('grid gap-4', columns, className)}>
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
};
