/**
 * Sanatan Ghadi (सनातन घड़ी)
 * Client-side Structured Data (JSON-LD) Microdata Injector
 * Injects Schema.org JSON-LD scripts for Googlebot, Bing, and Search Engine rich snippets
 */

import React, { useEffect } from 'react';

export interface JsonLdProps {
  data: Record<string, unknown> | Array<Record<string, unknown>>;
  id?: string;
}

export const JsonLd: React.FC<JsonLdProps> = ({ data, id = 'jsonld-schema' }) => {
  useEffect(() => {
    let scriptTag = document.getElementById(id) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.id = id;
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }

    try {
      scriptTag.textContent = JSON.stringify(data);
    } catch {
      // In case of circular reference or parsing error
    }

    return () => {
      const el = document.getElementById(id);
      if (el) {
        el.remove();
      }
    };
  }, [data, id]);

  return null;
};

export default JsonLd;
