'use client';

import { useState } from 'react';

const navLinks = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#capabilities', label: 'Capabilities' },
  { href: '/#contact', label: 'Contact' },
];

export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="rounded-lg border border-border p-2 text-sm text-text-secondary transition-colors hover:border-primary hover:text-primary"
      >
        {open ? '\u2715' : '\u2630'}
      </button>
      {open && (
        <div className="absolute left-0 right-0 top-16 border-b border-border bg-background px-6 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-text-secondary transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
