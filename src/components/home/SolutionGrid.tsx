import { getAllSolutions } from '@/lib/solutions';
import { SolutionCard } from './SolutionCard';

export function SolutionGrid() {
  const solutions = getAllSolutions();

  return (
    <section id="solutions" className="px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Solutions</h2>
          <p className="mx-auto max-w-2xl text-text-secondary">
            Production-ready proof-of-concepts demonstrating our insurance AI capabilities. Each
            solution includes a live demo you can try.
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {solutions.map((solution) => (
            <SolutionCard key={solution.slug} solution={solution} />
          ))}
        </div>
      </div>
    </section>
  );
}
