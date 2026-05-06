import { registerSW } from 'virtual:pwa-register';

const updateCheckIntervalMs = 60_000;

let updateServiceWorker: ((reloadPage?: boolean) => Promise<void>) | null =
  null;
let serviceWorkerRegistration: ServiceWorkerRegistration | null = null;
let updateCheckIntervalId: number | null = null;
let isPwaRegistered = false;

const runUpdateCheck = () => {
  void serviceWorkerRegistration?.update();
};

export const setupPwaUpdates = () => {
  if (isPwaRegistered || !('serviceWorker' in navigator)) {
    return;
  }

  updateServiceWorker = registerSW({
    immediate: true,
    onNeedRefresh() {
      if (!updateServiceWorker) {
        return;
      }

      void updateServiceWorker(true);
    },
    onRegisteredSW(_swUrl, registration) {
      serviceWorkerRegistration = registration ?? null;
      runUpdateCheck();

      if (updateCheckIntervalId !== null) {
        window.clearInterval(updateCheckIntervalId);
      }

      updateCheckIntervalId = window.setInterval(
        runUpdateCheck,
        updateCheckIntervalMs
      );
    }
  });

  window.addEventListener('focus', runUpdateCheck, { passive: true });
  window.addEventListener('pageshow', runUpdateCheck, { passive: true });
  isPwaRegistered = true;
};

export const checkForPwaUpdate = async () => {
  if (!('serviceWorker' in navigator)) {
    return false;
  }

  if (!serviceWorkerRegistration) {
    serviceWorkerRegistration =
      (await navigator.serviceWorker.getRegistration()) ?? null;
  }

  if (!serviceWorkerRegistration) {
    return false;
  }

  await serviceWorkerRegistration.update();

  if (updateServiceWorker) {
    await updateServiceWorker(true);
  }

  return true;
};
