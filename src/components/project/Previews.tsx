'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Project } from '@/lib/types';

function Lightbox({
  src,
  alt,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
}: {
  src: string;
  alt: string;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  hasPrev: boolean;
  hasNext: boolean;
}) {
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    },
    [onClose, onPrev, onNext, hasPrev, hasNext],
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [handleKeyDown]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 cursor-pointer rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
        aria-label="Close lightbox"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>

      {/* Previous button */}
      {hasPrev && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          className="absolute left-4 z-10 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Previous preview"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
      )}

      {/* Next button */}
      {hasNext && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          className="absolute right-4 z-10 cursor-pointer rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
          aria-label="Next preview"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      )}

      {/* Image */}
      <img
        src={src}
        alt={alt}
        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

function PreviewThumbnail({
  src,
  alt,
  onClick,
  featured,
}: {
  src: string;
  alt: string;
  onClick: () => void;
  featured: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative cursor-pointer overflow-hidden rounded-xl border border-border bg-surface transition-all duration-300 hover:border-primary/50 hover:shadow-lg hover:shadow-primary/5${featured ? ' sm:col-span-2' : ''}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full transition-transform duration-500 group-hover:scale-[1.03]"
      />
      {/* Hover overlay with expand icon */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/0 transition-all duration-300 group-hover:bg-black/20">
        <div className="rounded-full bg-white/0 p-3 text-white opacity-0 transition-all duration-300 group-hover:bg-white/20 group-hover:opacity-100">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="15 3 21 3 21 9" />
            <polyline points="9 21 3 21 3 15" />
            <line x1="21" y1="3" x2="14" y2="10" />
            <line x1="3" y1="21" x2="10" y2="14" />
          </svg>
        </div>
      </div>
    </button>
  );
}

export function Previews({ project }: { project: Project }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (project.previews.length === 0) {
    return (
      <section className="px-6 py-12">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-8 text-2xl font-bold">Preview</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[1, 2].map((i) => (
              <div
                key={i}
                className="flex aspect-video items-center justify-center rounded-lg border border-dashed border-border bg-surface text-sm text-text-secondary"
              >
                Preview coming soon
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h2 className="mb-8 text-2xl font-bold">Preview</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {project.previews.map((src, i) => (
            <PreviewThumbnail
              key={i}
              src={src}
              alt={`${project.name} preview ${i + 1}`}
              onClick={() => setLightboxIndex(i)}
              featured={project.previews.length === 3 && i === 0}
            />
          ))}
        </div>
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          src={project.previews[lightboxIndex]}
          alt={`${project.name} screenshot ${lightboxIndex + 1}`}
          onClose={() => setLightboxIndex(null)}
          onPrev={() => setLightboxIndex((i) => (i !== null ? i - 1 : 0))}
          onNext={() => setLightboxIndex((i) => (i !== null ? i + 1 : 0))}
          hasPrev={lightboxIndex > 0}
          hasNext={lightboxIndex < project.previews.length - 1}
        />
      )}
    </section>
  );
}
