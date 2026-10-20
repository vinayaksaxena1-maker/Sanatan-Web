import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      injectRegister: 'auto',
      includeAssets: ['favicon.ico', 'pwa-192x192.png', 'pwa-512x512.png'],
      manifest: {
        name: 'सनातन घड़ी',
        short_name: 'सनातन घड़ी',
        description: 'आधुनिक वैदिक पंचांग, चौघड़िया, जन्म कुंडली एवं कालगणना',
        theme_color: '#ea580c',
        background_color: '#faf7f2',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        globIgnores: [
          '**/panchang/**',
          '**/festival/**',
          '**/nakshatra/**',
          '**/rashi/**',
          '**/data/indianTowns5000*.json',
        ],
        globPatterns: ['**/*.{js,css,woff2,ico,svg,png,webmanifest}'],
      },
    }),
  ],
});
