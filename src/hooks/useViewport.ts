import { useSyncExternalStore } from 'react';

export function useViewport() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

const viewport = { width: 0, height: 0 };
function getSnapshot() {
  if (window.innerHeight !== viewport.height || window.innerWidth !== viewport.width) {
    viewport.height = window.innerHeight;
    viewport.width = window.innerWidth;
  }

  return viewport;
}
