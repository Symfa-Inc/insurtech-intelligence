import Image from 'next/image';
import Link from 'next/link';
import { LOGO_PATH, SITE_NAME, NAV_LINKS, COMPANY_NAME } from '@/lib/constants';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image src={LOGO_PATH} alt={COMPANY_NAME} width={32} height={32} className="rounded-md" />
          <span className="text-lg font-semibold">{SITE_NAME}</span>
        </Link>
        <div className="flex items-center gap-6">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden text-sm text-text-secondary transition-colors hover:text-foreground md:block"
            >
              {link.label}
            </a>
          ))}
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
