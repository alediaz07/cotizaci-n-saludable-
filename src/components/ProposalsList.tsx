import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Proposal, PROPOSALS } from '../data/quoteData';
import { ProposalCard } from './ProposalCard';
import { Info } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface ProposalsListProps {
  selectedProposal: Proposal;
  onSelectProposal: (proposal: Proposal) => void;
  allergiesText: string;
}

export const ProposalsList: React.FC<ProposalsListProps> = ({
  selectedProposal,
  onSelectProposal,
  allergiesText,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('article');
      if (cards && cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="py-6 sm:py-10 bg-[#F8F7F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Important conditions note */}
        <div className="mb-6 p-3.5 rounded-xl bg-amber-50/70 border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900/80">
          <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <p className="text-[11px] sm:text-xs">
            <strong>Nota de inclusión:</strong> Todos los precios contemplan desechables, empaques individuales, utensilios necesarios, transporte y entrega puntual en Sabanilla, Montes de Oca. Montos expresados en colones costarricenses (CRC) antes de impuestos.
          </p>
        </div>

        {/* 4 Proposal Cards in 4-column desktop layout */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5"
        >
          {PROPOSALS.map((proposal, index) => (
            <ProposalCard
              key={proposal.id}
              proposal={proposal}
              index={index}
              isSelected={selectedProposal.id === proposal.id}
              onSelect={onSelectProposal}
              allergiesText={allergiesText}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
