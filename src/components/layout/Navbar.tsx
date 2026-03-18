import Image from 'next/image';
import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { MobileNav } from './MobileNav';

const navLinks = [
  { href: '/#projects', label: 'Projects' },
  { href: '/#capabilities', label: 'Capabilities' },
  { href: '/#contact', label: 'Contact' },
];

export function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo/symfa.webp"
            alt="Symfa"
            width={32}
            height={32}
            className="rounded-md"
          />
          <span className="text-lg font-semibold">InsurTech Intelligence</span>
        </Link>
        <div className="flex items-center gap-6">
          {navLinks.map((link) => (
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
