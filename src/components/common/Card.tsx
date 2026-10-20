/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Production-Grade Resilient 5-State Card Component
 * States: Default, Hover/Active, Loading Skeleton, Error/Fallback, Empty Data
 */

import React, { type ReactNode, forwardRef } from 'react';
import { AlertTriangle, RefreshCw, Inbox } from 'lucide-react';
import { cn } from '../../utils/cn';
import { CardSkeleton } from './LoadingSkeleton';

export type CardState = 'default' | 'hover' | 'loading' | 'error' | 'empty';
export type CardVariant = 'default' | 'sacred' | 'outline' | 'flat';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  state?: CardState;
  loading?: boolean;
  error?: string | Error | null;
  empty?: boolean;
  onRetry?: () => void;
  emptyTitle?: string;
  emptyDescription?: string;
  emptyAction?: ReactNode;
  customSkeleton?: ReactNode;
  variant?: CardVariant;
  interactive?: boolean;
  children?: ReactNode;
  className?: string;
}

const variantStyles: Record<CardVariant, string> = {
  default:
    'bg-white dark:bg-stone-900/90 border-stone-200/90 dark:border-stone-800 shadow-xs text-stone-900 dark:text-stone-100',
  sacred:
    'bg-gradient-to-br from-amber-50/60 via-white to-orange-50/40 dark:from-stone-900/95 dark:via-stone-900/80 dark:to-amber-950/20 border-amber-200/80 dark:border-amber-900/50 shadow-xs text-stone-900 dark:text-stone-100',
  outline:
    'bg-transparent border-stone-300 dark:border-stone-700 text-stone-900 dark:text-stone-100',
  flat:
    'bg-stone-50 dark:bg-stone-900/50 border-transparent text-stone-900 dark:text-stone-100',
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      state: explicitState,
      loading = false,
      error = null,
      empty = false,
      onRetry,
      emptyTitle = 'कोई विवरण उपलब्ध नहीं है (No Data Available)',
      emptyDescription = 'वर्तमान चयन के लिए कोई डेटा प्राप्त नहीं हुआ। कृपया पुनः प्रयास करें।',
      emptyAction,
      customSkeleton,
      variant = 'default',
      interactive = false,
      children,
      className,
      ...props
    },
    ref
  ) => {
    // Determine effective state
    let effectiveState: CardState = 'default';
    if (explicitState) {
      effectiveState = explicitState;
    } else if (loading) {
      effectiveState = 'loading';
    } else if (error) {
      effectiveState = 'error';
    } else if (empty) {
      effectiveState = 'empty';
    }

    // 1. STATE: LOADING
    if (effectiveState === 'loading') {
      if (customSkeleton) {
        return <div ref={ref} aria-busy="true">{customSkeleton}</div>;
      }
      return <CardSkeleton className={className} />;
    }

    // 2. STATE: ERROR
    if (effectiveState === 'error') {
      const errorMessage =
        typeof error === 'string'
          ? error
          : error?.message || 'डेटा लोड करने में त्रुटि हुई (Unable to load data)';

      return (
        <div
          ref={ref}
          role="alert"
          aria-live="assertive"
          className={cn(
            'p-6 rounded-2xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/60 dark:bg-rose-950/30 text-rose-950 dark:text-rose-200 text-center space-y-3 shadow-xs',
            className
          )}
          {...props}
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center text-rose-600 dark:text-rose-400">
            <AlertTriangle className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-base text-rose-900 dark:text-rose-100">
              त्रुटि उत्पन्न हुई (An Error Occurred)
            </h4>
            <p className="text-sm text-rose-700 dark:text-rose-300 max-w-md mx-auto">
              {errorMessage}
            </p>
          </div>
          {onRetry && (
            <div className="pt-2">
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-medium transition-colors shadow-xs focus:outline-hidden focus:ring-2 focus:ring-rose-500 focus:ring-offset-2"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>पुनः प्रयास करें (Retry)</span>
              </button>
            </div>
          )}
        </div>
      );
    }

    // 3. STATE: EMPTY
    if (effectiveState === 'empty') {
      return (
        <div
          ref={ref}
          className={cn(
            'p-8 rounded-2xl border border-dashed border-stone-300 dark:border-stone-800 bg-stone-50/50 dark:bg-stone-900/30 text-center space-y-3 shadow-xs',
            className
          )}
          {...props}
        >
          <div className="w-12 h-12 mx-auto rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center text-stone-400 dark:text-stone-500">
            <Inbox className="w-6 h-6" aria-hidden="true" />
          </div>
          <div className="space-y-1">
            <h4 className="font-semibold text-base text-stone-800 dark:text-stone-200">
              {emptyTitle}
            </h4>
            <p className="text-xs text-stone-500 dark:text-stone-400 max-w-sm mx-auto">
              {emptyDescription}
            </p>
          </div>
          {emptyAction && <div className="pt-2">{emptyAction}</div>}
        </div>
      );
    }

    // 4 & 5. STATES: DEFAULT / HOVER
    const isInteractive = interactive || effectiveState === 'hover';

    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl border p-5 transition-all duration-200 backdrop-blur-xs',
          variantStyles[variant],
          isInteractive &&
            'cursor-pointer hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-md hover:-translate-y-0.5 active:translate-y-0',
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = 'Card';

/**
 * Card Subcomponents for structured layout
 */

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn('flex items-center justify-between gap-3 pb-3 border-b border-stone-100 dark:border-stone-800/80 mb-4', className)}
    {...props}
  >
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...props
}) => (
  <h3
    className={cn('text-base sm:text-lg font-bold tracking-tight text-stone-900 dark:text-stone-100', className)}
    {...props}
  >
    {children}
  </h3>
);

export const CardDescription: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...props
}) => (
  <p
    className={cn('text-xs text-stone-500 dark:text-stone-400 mt-0.5 leading-relaxed', className)}
    {...props}
  >
    {children}
  </p>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div className={cn('space-y-3', className)} {...props}>
    {children}
  </div>
);

export const CardFooter: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...props
}) => (
  <div
    className={cn('pt-4 mt-4 border-t border-stone-100 dark:border-stone-800/80 flex items-center justify-between gap-3', className)}
    {...props}
  >
    {children}
  </div>
);
