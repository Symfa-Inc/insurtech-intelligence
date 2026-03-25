import { Hero } from '@/components/home/Hero';
import { Capabilities } from '@/components/home/Capabilities';
import { SolutionGrid } from '@/components/home/SolutionGrid';
import { ContactCTA } from '@/components/home/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <SolutionGrid />
      <ContactCTA />
    </>
  );
}
