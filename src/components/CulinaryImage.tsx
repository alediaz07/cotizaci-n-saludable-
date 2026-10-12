import React, { useState } from 'react';
import { Utensils, Coffee, Leaf, Sparkles, SunMedium, Flame } from 'lucide-react';
import option1BreakfastImg from '../assets/images/regenerated_image_1791845209206.jpg';
import option1LunchImg from '../assets/images/regenerated_image_1791845706208.png';
import option2BreakfastImg from '../assets/images/regenerated_image_1791845708435.png';
import option2LunchImg from '../assets/images/regenerated_image_1791845710277.png';
import option3BreakfastImg from '../assets/images/regenerated_image_1791845712023.png';
import option3LunchImg from '../assets/images/option3-lunch.jpg';
import option4BreakfastImg from '../assets/images/regenerated_image_1791845713655.png';
import option4LunchImg from '../assets/images/regenerated_image_1791845715399.png';

interface CulinaryImageProps {
  mealType: 'breakfast' | 'lunch';
  proposalCode: string;
  title: string;
  className?: string;
  alt: string;
}

// Curated reliable web gastronomy images with instant graceful vector fallbacks
const GASTRONOMY_SOURCES: Record<string, { breakfast: string; lunch: string; fallbackGradient: string; icon: string }> = {
  'opcion-01': {
    // Saludable clásica: Wrap integral con vegetales, frutas y jugo natural & Pechuga de pollo
    breakfast: option1BreakfastImg,
    lunch: option1LunchImg,
    fallbackGradient: 'from-emerald-950 via-slate-900 to-emerald-900',
    icon: 'Leaf'
  },
  'opcion-02': {
    // Tradicional balanceada: Gallo pinto & Casado con pollo
    breakfast: option2BreakfastImg,
    lunch: option2LunchImg,
    fallbackGradient: 'from-amber-950 via-stone-900 to-amber-900',
    icon: 'SunMedium'
  },
  'opcion-03': {
    // Ejecutiva económica: Sándwich integral & Pasta con pollo
    breakfast: option3BreakfastImg,
    lunch: option3LunchImg,
    fallbackGradient: 'from-slate-950 via-zinc-900 to-red-950',
    icon: 'Utensils'
  },
  'opcion-04': {
    // Bowl saludable: Yogur con granola y tostada & Power Bowl
    breakfast: option4BreakfastImg,
    lunch: option4LunchImg,
    fallbackGradient: 'from-teal-950 via-stone-900 to-emerald-950',
    icon: 'Sparkles'
  }
};

export const CulinaryImage: React.FC<CulinaryImageProps> = ({
  mealType,
  proposalCode,
  title,
  className = '',
  alt
}) => {
  const [hasError, setHasError] = useState(false);

  const config = GASTRONOMY_SOURCES[proposalCode] || GASTRONOMY_SOURCES['opcion-01'];
  const baseSrc = mealType === 'breakfast' ? config.breakfast : config.lunch;

  return (
    <div
      className={`relative overflow-hidden bg-neutral-900 select-none group ${className}`}
    >
      {/* Background image: directly visible */}
      {!hasError ? (
        <img
          src={baseSrc}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onError={() => setHasError(true)}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      ) : (
        /* Styled vector fallback container ONLY if image fails to load */
        <div
          className={`absolute inset-0 bg-gradient-to-br ${config.fallbackGradient} flex flex-col items-center justify-center p-6 text-center text-white`}
        >
          <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center mb-3">
            {mealType === 'breakfast' ? (
              <Coffee className="w-6 h-6 text-amber-300" />
            ) : (
              <Utensils className="w-6 h-6 text-red-300" />
            )}
          </div>
          <span className="text-xs uppercase tracking-widest text-white/60 font-medium">
            {mealType === 'breakfast' ? 'Desayuno Corporativo' : 'Almuerzo Gourmet'}
          </span>
          <p className="text-sm font-semibold text-white/90 mt-1 max-w-[200px] line-clamp-2">
            {title}
          </p>
        </div>
      )}

      {/* Scrim overlay for contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent pointer-events-none" />

      {/* Top badge */}
      <div className="absolute top-2 left-2 z-10 flex items-center gap-1.5 pointer-events-none">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-white bg-black/70 backdrop-blur-md rounded border border-white/20">
          {mealType === 'breakfast' ? (
            <>
              <Coffee className="w-2.5 h-2.5 text-amber-400" />
              <span>Desayuno</span>
            </>
          ) : (
            <>
              <Flame className="w-2.5 h-2.5 text-[#C8102E]" />
              <span>Almuerzo</span>
            </>
          )}
        </span>
      </div>
    </div>
  );
};
