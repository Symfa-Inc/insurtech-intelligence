import Image from 'next/image';
import { LOGO_PATH, COMPANY_NAME, NAV_LINKS } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <Image src={LOGO_PATH} alt={COMPANY_NAME} width={24} height={24} className="rounded-md" />
          <span className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
          </span>
        </div>
        <div className="flex gap-6 text-sm text-text-secondary">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="transition-colors hover:text-foreground">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
