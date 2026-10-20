import { registerSW } from 'virtual:pwa-register';

export function registerAppServiceWorker() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    const updateSW = registerSW({
      onNeedRefresh() {
        console.log('Sanatan Web: New content available, reload to update.');
      },
      onOfflineReady() {
        console.log('Sanatan Web: Ready for 100% offline usage.');
      },
    });
    return updateSW;
  }
  return undefined;
}
