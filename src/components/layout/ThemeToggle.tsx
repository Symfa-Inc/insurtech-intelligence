'use client';

import { useCallback, useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('storage', callback);
  return () => window.removeEventListener('storage', callback);
}

function getSnapshot() {
  return localStorage.getItem('theme') !== 'light';
}

function getServerSnapshot() {
  return true;
}

export function ThemeToggle() {
  const dark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
    window.dispatchEvent(new StorageEvent('storage'));
  }, [dark]);

  return (
    <button
      onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="rounded-lg border border-border p-2 text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary"
    >
      {dark ? '\u2600\ufe0f' : '\ud83c\udf19'}
    </button>
  );
}
