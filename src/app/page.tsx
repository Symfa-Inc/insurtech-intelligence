import { Hero } from '@/components/home/Hero';
import { Capabilities } from '@/components/home/Capabilities';
import { ProjectGrid } from '@/components/home/ProjectGrid';
import { ContactCTA } from '@/components/home/ContactCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Capabilities />
      <ProjectGrid />
      <ContactCTA />
    </>
  );
}
