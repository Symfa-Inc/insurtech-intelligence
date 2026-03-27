import { CONTACT_URL } from '@/lib/constants';
import { Button } from '@/components/ui/Button';

export function ContactCTA() {
  return (
    <section id="contact" className="px-6 py-24">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-surface p-12 text-center">
        <h2 className="mb-4 text-3xl font-bold md:text-4xl">Let&apos;s Build Something Together</h2>
        <p className="mx-auto mb-8 max-w-2xl text-text-secondary">
          These solutions showcase what&apos;s possible. We adapt and customize these AI and ML
          models to fit your specific insurance workflows, data, and business requirements.
        </p>
        <Button href={CONTACT_URL} target="_blank" rel="noopener noreferrer">
          Contact Us
        </Button>
      </div>
    </section>
  );
}
