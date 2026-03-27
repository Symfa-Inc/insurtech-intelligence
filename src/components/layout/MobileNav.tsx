'use client';

import { useEffect, useState } from 'react';
import { NAV_LINKS } from '@/lib/constants';

export function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg border border-border text-text-secondary transition-colors hover:border-primary hover:text-primary"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          className="h-4 w-4"
        >
          {open ? (
            <>
              <path d="M18 6 6 18" />
              <path d="m6 6 12 12" />
            </>
          ) : (
            <>
              <path d="M4 8h16" />
              <path d="M4 16h16" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 top-16 z-40 bg-background/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="fixed left-0 right-0 top-16 z-50 border-b border-border bg-background px-6 py-3">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                {...(link.href.startsWith('http')
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
                className="flex items-center justify-center rounded-lg px-3 py-3 text-sm text-text-secondary transition-colors hover:bg-surface hover:text-foreground"
              >
                {link.label}
              </a>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
