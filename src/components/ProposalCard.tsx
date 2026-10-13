import React from 'react';
import { Proposal, formatColones, generateEmailUrl } from '../data/quoteData';
import { CulinaryImage } from './CulinaryImage';
import { CheckCircle2, ArrowRight, Tag, Coffee, Utensils, Mail } from 'lucide-react';

interface ProposalCardProps {
  proposal: Proposal;
  isSelected: boolean;
  onSelect: (proposal: Proposal) => void;
  index: number;
  allergiesText?: string;
}

export const ProposalCard: React.FC<ProposalCardProps> = ({
  proposal,
  isSelected,
  onSelect,
  allergiesText,
}) => {

  return (
    <article
      className={`relative bg-white rounded-2xl border transition-all duration-300 overflow-hidden flex flex-col justify-between ${
        isSelected
          ? 'border-[#C8102E] shadow-lg ring-2 ring-[#C8102E]/20'
          : 'border-neutral-200 shadow-2xs hover:shadow-md hover:border-neutral-300'
      }`}
    >
      {/* Top Header */}
      <div className="p-4 sm:p-5 border-b border-neutral-100">
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="font-mono text-xs font-bold text-[#C8102E] bg-red-50 px-1.5 py-0.5 rounded">
              {proposal.number}
            </span>
            <span className="text-[11px] uppercase tracking-wider font-semibold text-neutral-400">
              {proposal.code}
            </span>
          </div>

          {proposal.isLowestPrice && (
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
              <Tag className="w-2.5 h-2.5" />
              Más Económica
            </span>
          )}
        </div>

        <h3 className="text-lg font-bold text-[#111111] font-heading tracking-tight leading-snug">
          {proposal.name}
        </h3>
        <p className="text-xs text-neutral-500 mt-0.5 line-clamp-1">
          {proposal.tagline}
        </p>
      </div>

      {/* Compact Dual Visuals (Desayuno & Almuerzo) */}
      <div className="p-3 sm:p-4 bg-neutral-50/70">
        <div className="grid grid-cols-2 gap-2">
          {/* Breakfast preview */}
          <div className="rounded-lg overflow-hidden border border-neutral-200/80 bg-white">
            <CulinaryImage
              mealType="breakfast"
              proposalCode={proposal.id}
              title={proposal.breakfast.title}
              className="w-full h-24 sm:h-28"
              alt={`Desayuno: ${proposal.breakfast.title}`}
            />
            <div className="p-2 text-center bg-white border-t border-neutral-100">
              <span className="text-[10px] font-bold text-neutral-700 uppercase block truncate">
                Desayuno
              </span>
              <span className="text-[11px] font-mono font-semibold text-neutral-900 tabular-nums">
                {formatColones(proposal.breakfast.totalPrice)}
              </span>
            </div>
          </div>

          {/* Lunch preview */}
          <div className="rounded-lg overflow-hidden border border-neutral-200/80 bg-white">
            <CulinaryImage
              mealType="lunch"
              proposalCode={proposal.id}
              title={proposal.lunch.title}
              className="w-full h-24 sm:h-28"
              alt={`Almuerzo: ${proposal.lunch.title}`}
            />
            <div className="p-2 text-center bg-white border-t border-neutral-100">
              <span className="text-[10px] font-bold text-neutral-700 uppercase block truncate">
                Almuerzo
              </span>
              <span className="text-[11px] font-mono font-semibold text-neutral-900 tabular-nums">
                {formatColones(proposal.lunch.totalPrice)}
              </span>
            </div>
          </div>
        </div>

        {/* Short Menus Summary */}
        <div className="mt-3 space-y-2 text-xs">
          <div className="p-2.5 bg-white rounded-lg border border-neutral-200/60">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-800 text-[11px] mb-0.5">
              <Coffee className="w-3 h-3 text-amber-600 shrink-0" />
              <span className="truncate">{proposal.breakfast.title}</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              {proposal.breakfast.description}
            </p>
          </div>

          <div className="p-2.5 bg-white rounded-lg border border-neutral-200/60">
            <div className="flex items-center gap-1.5 font-semibold text-neutral-800 text-[11px] mb-0.5">
              <Utensils className="w-3 h-3 text-[#C8102E] shrink-0" />
              <span className="truncate">{proposal.lunch.title}</span>
            </div>
            <p className="text-[11px] text-neutral-600 leading-relaxed">
              {proposal.lunch.description}
            </p>
          </div>
        </div>
      </div>

      {/* Pricing & Selection Button */}
      <div className="p-4 sm:p-5 bg-white border-t border-neutral-100">
        <div className="flex items-baseline justify-between mb-3">
          <div className="text-xl sm:text-2xl font-extrabold text-[#C8102E] font-heading tabular-nums leading-tight">
            {formatColones(proposal.total)}
          </div>
          <span className="text-[10px] text-neutral-400">Antes de imp.</span>
        </div>

        {/* Action Button */}
        {isSelected ? (
          <div className="space-y-2">
            <div className="w-full py-1.5 px-3 rounded-lg bg-neutral-900 text-white text-xs font-semibold flex items-center justify-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Propuesta elegida</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                const url = generateEmailUrl(proposal, allergiesText);
                window.location.href = url;
              }}
              className="w-full py-2.5 px-3 rounded-xl font-bold text-xs text-white bg-[#C8102E] hover:bg-[#a60d25] shadow-md shadow-[#C8102E]/20 transition-all flex items-center justify-center gap-1.5 cursor-pointer active:scale-98"
              title="Enviar correo formal de confirmación a NODIVA PRODUCTS"
            >
              <Mail className="w-3.5 h-3.5 text-white" />
              <span>Confirmar por Correo</span>
            </button>
            {allergiesText && allergiesText.trim().length > 0 && (
              <span className="text-[10px] text-emerald-600 block text-center font-medium pt-0.5">
                ✓ Alergias guardadas incluidas
              </span>
            )}
          </div>
        ) : (
          <button
            onClick={() => onSelect(proposal)}
            className="w-full py-2.5 px-3 rounded-xl font-semibold text-xs transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer bg-[#C8102E] text-white hover:bg-[#a60d25]"
          >
            <span>Seleccionar propuesta</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </article>
  );
};
