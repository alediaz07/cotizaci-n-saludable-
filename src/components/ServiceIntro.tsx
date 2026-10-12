import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, Coffee, UtensilsCrossed, Sparkles, Building, User, Calendar, MapPin } from 'lucide-react';
import { QUOTE_INFO } from '../data/quoteData';
import { AllergySelector } from './AllergySelector';

gsap.registerPlugin(ScrollTrigger);

interface ServiceIntroProps {
  allergiesText: string;
  onChangeAllergies: (text: string) => void;
}

export const ServiceIntro: React.FC<ServiceIntroProps> = ({
  allergiesText,
  onChangeAllergies,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const statsContainerRef = useRef<HTMLDivElement>(null);
  const cardDetailsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Animate indicators on scroll
      const statItems = statsContainerRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsContainerRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }

      // Animate Event Details Card
      if (cardDetailsRef.current) {
        gsap.fromTo(
          cardDetailsRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardDetailsRef.current,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const indicators = [
    {
      value: '70',
      label: 'personas',
      sublabel: 'Equipo Centriz Mobility',
      icon: Users,
    },
    {
      value: '70',
      label: 'desayunos',
      sublabel: 'Preparación fresca matutina',
      icon: Coffee,
    },
    {
      value: '70',
      label: 'almuerzos',
      sublabel: 'Con refresco natural incluido',
      icon: UtensilsCrossed,
    },
    {
      value: '4',
      label: 'propuestas',
      sublabel: 'Gastronómicas a elegir',
      icon: Sparkles,
    },
  ];

  return (
    <section id="servicio" ref={sectionRef} className="py-20 sm:py-28 bg-[#F8F7F4] border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section 2: Presentation */}
        <div className="max-w-3xl mb-16 sm:mb-20">
          <div className="text-xs uppercase tracking-widest font-semibold text-[#C8102E] mb-3">
            NODIVA PRODUCTS S.A.
          </div>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight mb-5 font-heading"
            style={{ textWrap: 'balance' }}
          >
            Una experiencia pensada para su equipo.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            En NODIVA PRODUCTS diseñamos soluciones de alimentación para eventos corporativos,
            combinando variedad, practicidad y una presentación cuidada.
          </p>
        </div>

        {/* 4 Quantitative Indicators */}
        <div
          ref={statsContainerRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-16"
        >
          {indicators.map((ind, i) => {
            const Icon = ind.icon;
            return (
              <div
                key={i}
                className="stat-item bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] transition-all duration-300 hover:border-neutral-300 hover:-translate-y-1"
              >
                <div className="w-10 h-10 rounded-xl bg-neutral-100 flex items-center justify-center text-neutral-700 mb-4">
                  <Icon className="w-5 h-5 text-[#C8102E]" />
                </div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-heading tabular-nums">
                    {ind.value}
                  </span>
                  <span className="text-sm sm:text-base font-semibold text-[#111111]">
                    {ind.label}
                  </span>
                </div>
                <p className="text-xs text-neutral-500 mt-1 font-normal">
                  {ind.sublabel}
                </p>
              </div>
            );
          })}
        </div>

        {/* Event Specification Banner */}
        <div
          ref={cardDetailsRef}
          className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200 shadow-sm"
        >
          <div className="text-xs font-bold uppercase tracking-wider text-neutral-400 mb-4 pb-2 border-b border-neutral-100 flex items-center justify-between">
            <span>Ficha del Evento Corporativo</span>
            <span className="text-emerald-700 font-semibold bg-emerald-50 px-2.5 py-0.5 rounded text-[11px]">
              Confirmación Preliminar
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-600 shrink-0">
                <Building className="w-4 h-4 text-[#C8102E]" />
              </div>
              <div>
                <span className="text-xs font-medium text-neutral-500 block">Cliente</span>
                <span className="text-sm font-bold text-neutral-900">{QUOTE_INFO.client}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-600 shrink-0">
                <User className="w-4 h-4 text-[#C8102E]" />
              </div>
              <div>
                <span className="text-xs font-medium text-neutral-500 block">Contacto</span>
                <span className="text-sm font-bold text-neutral-900">{QUOTE_INFO.contact}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-600 shrink-0">
                <Calendar className="w-4 h-4 text-[#C8102E]" />
              </div>
              <div>
                <span className="text-xs font-medium text-neutral-500 block">Fecha del Evento</span>
                <span className="text-sm font-bold text-neutral-900">{QUOTE_INFO.eventDate}</span>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-lg bg-neutral-100 text-neutral-600 shrink-0">
                <MapPin className="w-4 h-4 text-[#C8102E]" />
              </div>
              <div>
                <span className="text-xs font-medium text-neutral-500 block">Ubicación</span>
                <span className="text-sm font-bold text-neutral-900">{QUOTE_INFO.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Apartado de Alergias Alimentarias (debajo de la ficha del evento corporativo y arriba de menús corporativos 2026) */}
        <AllergySelector
          allergiesText={allergiesText}
          onChangeAllergies={onChangeAllergies}
        />

        {/* Section 3: Transition to Menus */}
        <div id="propuestas" className="pt-12 sm:pt-16 text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C8102E] mb-2 inline-block">
            Menús Corporativos 2026
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight mb-4 font-heading"
            style={{ textWrap: 'balance' }}
          >
            Cuatro propuestas. Una misma dedicación.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Explore las alternativas preparadas para su evento y seleccione la que mejor se adapte a sus preferencias.
          </p>
        </div>

      </div>
    </section>
  );
};
