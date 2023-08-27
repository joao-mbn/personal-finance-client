import { useSyncExternalStore } from 'react';

export function useViewport() {
  return useSyncExternalStore(subscribe, getSnapshot);
}

function subscribe(callback: () => void) {
  window.addEventListener('resize', callback);
  return () => window.removeEventListener('resize', callback);
}

const viewport = { vw: 0, vh: 0 };
function getSnapshot() {
  if (window.innerHeight !== viewport.vh || window.innerWidth !== viewport.vw) {
    viewport.vh = window.innerHeight;
    viewport.vw = window.innerWidth;
  }

  return viewport;
}
