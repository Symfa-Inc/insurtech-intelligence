import Image from 'next/image';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-12 md:flex-row md:justify-between">
        <div className="flex items-center gap-3">
          <Image
            src="/images/logo/symfa.webp"
            alt="Symfa"
            width={24}
            height={24}
            className="rounded-md"
          />
          <span className="text-sm text-text-secondary">
            &copy; {new Date().getFullYear()} Symfa. All rights reserved.
          </span>
        </div>
        <div className="flex gap-6 text-sm text-text-secondary">
          <Link href="/#projects" className="transition-colors hover:text-foreground">
            Projects
          </Link>
          <Link href="/#capabilities" className="transition-colors hover:text-foreground">
            Capabilities
          </Link>
          <Link href="/#contact" className="transition-colors hover:text-foreground">
            Contact
          </Link>
        </div>
      </div>
    </footer>
  );
}
