/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Client-side Dynamic MetaTags Manager
 * Updates document head for SEO, OpenGraph, and Twitter Cards without external dependencies
 */

import { useEffect } from 'react';

export interface MetaTagsProps {
  title: string;
  description: string;
  canonical?: string;
  ogType?: 'website' | 'article';
  ogImage?: string;
  keywords?: string[];
  noIndex?: boolean;
}

export const MetaTags: React.FC<MetaTagsProps> = ({
  title,
  description,
  canonical,
  ogType = 'website',
  ogImage = '/images/og-panchang-banner.png',
  keywords = [],
  noIndex = false,
}) => {
  useEffect(() => {
    // 1. Title
    const formattedTitle = title.includes('सनातन घड़ी')
      ? title
      : `${title} | सनातन घड़ी (Sanatan Ghadi)`;
    document.title = formattedTitle;

    // Helper to create or update meta tag
    const setMetaTag = (attrName: string, attrVal: string, content: string) => {
      let element = document.querySelector(`meta[${attrName}="${attrVal}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attrName, attrVal);
        document.head.appendChild(element);
      }
      element.setAttribute('content', content);
    };

    // 2. Standard SEO Meta
    setMetaTag('name', 'description', description);
    if (keywords.length > 0) {
      setMetaTag('name', 'keywords', keywords.join(', '));
    }
    if (noIndex) {
      setMetaTag('name', 'robots', 'noindex, nofollow');
    } else {
      setMetaTag('name', 'robots', 'index, follow, max-image-preview:large, max-snippet:-1');
    }

    // 3. OpenGraph Tags
    setMetaTag('property', 'og:title', formattedTitle);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:type', ogType);
    setMetaTag('property', 'og:site_name', 'सनातन घड़ी (Sanatan Ghadi)');
    setMetaTag('property', 'og:image', ogImage);

    // 4. Twitter Card
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', formattedTitle);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', ogImage);

    // 5. Canonical Link
    if (canonical) {
      let linkElement = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
      if (!linkElement) {
        linkElement = document.createElement('link');
        linkElement.setAttribute('rel', 'canonical');
        document.head.appendChild(linkElement);
      }
      linkElement.setAttribute('href', canonical);
    }
  }, [title, description, canonical, ogType, ogImage, keywords, noIndex]);

  return null;
};

export default MetaTags;
