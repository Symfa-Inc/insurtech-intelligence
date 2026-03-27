import Image from 'next/image';
import { LOGO_PATH, COMPANY_NAME, NAV_LINKS, CONTACT_EMAIL, SITE_NAME } from '@/lib/constants';

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div className="max-w-sm">
            <div className="mb-3 flex items-center gap-3">
              <Image
                src={LOGO_PATH}
                alt={COMPANY_NAME}
                width={24}
                height={24}
                className="rounded-md"
              />
              <span className="font-semibold">{SITE_NAME}</span>
            </div>
            <p className="mb-4 text-sm leading-relaxed text-text-secondary">
              AI-powered insurance solutions built by {COMPANY_NAME}. From claim processing to
              forecasting, we turn solutions into production systems.
            </p>
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="text-sm text-primary transition-colors hover:text-primary-hover"
            >
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="flex gap-8 text-sm text-text-secondary">
            <div className="flex flex-col gap-3">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  {...(link.href.startsWith('http')
                    ? { target: '_blank', rel: 'noopener noreferrer' }
                    : {})}
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d={link.icon} />
                  </svg>
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-10 border-t border-border pt-6 text-center text-xs text-text-secondary">
          &copy; {new Date().getFullYear()} {COMPANY_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
