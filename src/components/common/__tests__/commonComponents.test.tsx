/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Common Components Unit Test Suite
 * Verifying Resilient 5-State Card, Badge Variants, Loading Skeletons, HeroBanner, and VedicInfoPill
 */

import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { renderToString } from 'react-dom/server';
import {
  Badge,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  Skeleton,
  TextSkeleton,
  CircleSkeleton,
  CardSkeleton,
  HeroBanner,
  VedicInfoPill,
} from '../index';

describe('Common UI Components Suite', () => {
  describe('Badge Component', () => {
    it('renders with default neutral variant and custom label', () => {
      const html = renderToString(<Badge>सामान्य (Neutral)</Badge>);
      expect(html).toContain('सामान्य (Neutral)');
      expect(html).toContain('rounded-full');
    });

    it('renders auspicious shubh & amrit variants with dot indicator', () => {
      const html = renderToString(
        <Badge variant="shubh" dot>
          शुभ
        </Badge>
      );
      expect(html).toContain('bg-emerald-50');
      expect(html).toContain('bg-emerald-500');
      expect(html).toContain('शुभ');
    });

    it('renders ashubh and ati-ashubh variants', () => {
      const html = renderToString(
        <Badge variant="ati-ashubh" dot>
          अति-अशुभ
        </Badge>
      );
      expect(html).toContain('bg-red-100');
      expect(html).toContain('animate-ping');
      expect(html).toContain('अति-अशुभ');
    });
  });

  describe('LoadingSkeleton Components', () => {
    it('renders base Skeleton with status role and shimmer animation', () => {
      const html = renderToString(<Skeleton width={120} height={24} />);
      expect(html).toContain('role="status"');
      expect(html).toContain('animate-pulse');
      expect(html).toContain('width:120px');
      expect(html).toContain('height:24px');
    });

    it('renders TextSkeleton with accurate number of lines', () => {
      const html = renderToString(<TextSkeleton lines={4} />);
      // 4 status items
      const matches = html.match(/role="status"/g);
      expect(matches).not.toBeNull();
      expect(matches?.length).toBe(4);
    });

    it('renders CircleSkeleton with rounded-full', () => {
      const html = renderToString(<CircleSkeleton size={48} />);
      expect(html).toContain('rounded-full');
      expect(html).toContain('width:48px');
      expect(html).toContain('height:48px');
    });

    it('renders CardSkeleton with zero CLS layout structure', () => {
      const html = renderToString(<CardSkeleton contentLines={2} />);
      expect(html).toContain('Card content loading');
      expect(html).toContain('rounded-2xl');
    });
  });

  describe('Resilient 5-State Card Component', () => {
    it('STATE 1: Default State renders card content cleanly', () => {
      const html = renderToString(
        <Card variant="sacred">
          <CardHeader>
            <CardTitle>आज का पंचांग</CardTitle>
          </CardHeader>
          <CardContent>
            <p>पंचांग विवरण</p>
          </CardContent>
          <CardFooter>
            <span>समय</span>
          </CardFooter>
        </Card>
      );
      expect(html).toContain('आज का पंचांग');
      expect(html).toContain('पंचांग विवरण');
      expect(html).toContain('border-amber-200');
    });

    it('STATE 2: Hover/Active State applies interactive styles', () => {
      const html = renderToString(
        <Card interactive>
          <p>Interactive Card</p>
        </Card>
      );
      expect(html).toContain('hover:border-amber-400');
      expect(html).toContain('cursor-pointer');
    });

    it('STATE 3: Loading State renders zero-CLS CardSkeleton', () => {
      const html = renderToString(
        <Card loading>
          <p>This should be replaced by skeleton</p>
        </Card>
      );
      expect(html).toContain('Card content loading');
      expect(html).not.toContain('This should be replaced by skeleton');
    });

    it('STATE 4: Error State renders sacred alert with message', () => {
      const html = renderToString(
        <Card
          error="इंटरनेट कनेक्शन अनुपलब्ध है"
          onRetry={vi.fn()}
        >
          <p>Content</p>
        </Card>
      );
      expect(html).toContain('role="alert"');
      expect(html).toContain('त्रुटि उत्पन्न हुई (An Error Occurred)');
      expect(html).toContain('इंटरनेट कनेक्शन अनुपलब्ध है');
      expect(html).toContain('पुनः प्रयास करें (Retry)');
    });

    it('STATE 5: Empty State renders meaningful empty notice', () => {
      const html = renderToString(
        <Card
          empty
          emptyTitle="कोई मुहूर्त नहीं मिला"
          emptyDescription="चयनित तिथि पर कोई विशिष्ट मुहूर्त उपलब्ध नहीं है।"
        >
          <p>Content</p>
        </Card>
      );
      expect(html).toContain('कोई मुहूर्त नहीं मिला');
      expect(html).toContain('चयनित तिथि पर कोई विशिष्ट मुहूर्त उपलब्ध नहीं है।');
      expect(html).toContain('border-dashed');
    });
  });

  describe('HeroBanner Component', () => {
    it('renders sacred mandala hero banner with highlights and actions', () => {
      const html = renderToString(
        <HeroBanner
          title="सनातन घड़ी"
          subtitle="वैदिक समय मापन प्रणाली"
          description="प्राचीन भारतीय कालगणना"
          highlights={[
            { label: 'तिथि', value: 'शुक्ल एकादशी', highlight: true },
            { label: 'नक्षत्र', value: 'रोहिणी' },
          ]}
          actions={<button type="button">आरंभ करें</button>}
        />
      );

      expect(html).toContain('सनातन घड़ी');
      expect(html).toContain('वैदिक समय मापन प्रणाली');
      expect(html).toContain('शुक्ल एकादशी');
      expect(html).toContain('आरंभ करें');
      expect(html).toContain('stroke-dasharray'); // Mandala SVG circles
    });
  });

  describe('VedicInfoPill Component', () => {
    it('renders info trigger button with proper accessible label', () => {
      const html = renderToString(
        <VedicInfoPill
          term="राहुकाल"
          title="राहुकाल (Rahu Kaal)"
          description="दिन की अशुभ 90 मिनट की अवधि"
          significance="वर्ज्य काल"
        />
      );

      expect(html).toContain('राहुकाल');
      expect(html).toContain('aria-label="About राहुकाल"');
      expect(html).toContain('aria-expanded="false"');
    });
  });
});
