import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ArrowDown, ArrowRight, Calendar, Building2, MapPin } from 'lucide-react';
import { QUOTE_INFO } from '../data/quoteData';
import { NodivaLogo } from './NodivaLogo';

export const Hero: React.FC = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // Split words animation for the main title
      const titleWords = headlineRef.current?.querySelectorAll('.word');
      
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 }
      )
      .fromTo(
        metaRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      );

      if (titleWords && titleWords.length > 0) {
        tl.fromTo(
          titleWords,
          { opacity: 0, y: 40, rotateX: 20 },
          { opacity: 1, y: 0, rotateX: 0, stagger: 0.12, duration: 0.8 },
          '-=0.3'
        );
      }

      tl.fromTo(
        subtitleRef.current,
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.7 },
        '-=0.4'
      )
      .fromTo(
        actionsRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6 },
        '-=0.4'
      )
      .fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.2'
      );

      // Gentle floating pulse on scroll indicator
      gsap.to(scrollIndicatorRef.current, {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.5,
        ease: 'sine.inOut',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const headline = 'Alimentamos grandes jornadas.';
  const words = headline.split(' ');

  return (
    <section
      ref={heroRef}
      className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden bg-[#111111]"
    >
      {/* Background Photography with slow cinematic subtle zoom */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=2000&q=85"
          alt="Gastronomía y catering de alta gama NODIVA"
          className="w-full h-full object-cover object-center scale-105 filter brightness-75 transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />
        {/* Measured scrims ensuring WCAG AA contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/75 to-[#111111]/50" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/40 to-black/80" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center justify-center pt-24 sm:pt-28">
        {/* Official PK NODIVA Emblem */}
        <div className="mb-4 sm:mb-5 flex justify-center">
          <NodivaLogo size={62} className="drop-shadow-xl" />
        </div>

        {/* Editorial Eyebrow & Client Metadata (Zero-pill format) */}
        <div
          ref={metaRef}
          className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-3 text-xs sm:text-sm font-medium text-white/80 mb-5 sm:mb-8"
        >
          <span className="font-heading font-bold text-white tracking-wider uppercase text-[11px] sm:text-xs">
            {QUOTE_INFO.provider}
          </span>
          <span className="text-[#C8102E] font-bold" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 sm:gap-1.5 text-white/90 text-xs sm:text-sm">
            <Building2 className="w-3.5 h-3.5 text-[#C8102E]" />
            Para {QUOTE_INFO.client}
          </span>
          <span className="text-white/40" aria-hidden="true">·</span>
          <span className="inline-flex items-center gap-1 sm:gap-1.5 text-white/80 text-xs sm:text-sm">
            <Calendar className="w-3.5 h-3.5 text-white/60" />
            {QUOTE_INFO.eventDate}
          </span>
        </div>

        {/* Main Title animated word by word */}
        <h1
          ref={headlineRef}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold text-white tracking-tight leading-[1.1] max-w-4xl mb-6 font-heading"
          style={{ textWrap: 'balance' }}
        >
          {words.map((word, index) => (
            <span
              key={index}
              className="word inline-block mr-2 sm:mr-3.5 last:mr-0 text-white"
            >
              {word === 'jornadas.' ? (
                <span className="text-white relative">
                  {word}
                  <span className="absolute -bottom-1 left-0 right-0 h-1 bg-[#C8102E] rounded-full opacity-80" />
                </span>
              ) : (
                word
              )}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="text-base sm:text-lg md:text-xl text-neutral-200/90 max-w-2xl font-light leading-relaxed mb-8 sm:mb-10"
        >
          Una propuesta gastronómica diseñada para acompañar a su equipo con calidad,
          frescura y atención en cada detalle.
        </p>

        {/* CTAs */}
        <div
          ref={actionsRef}
          className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#propuestas"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-semibold text-white bg-[#C8102E] hover:bg-[#a70d26] rounded-xl shadow-lg shadow-[#C8102E]/30 transition-all hover:shadow-[#C8102E]/50 active:scale-98 whitespace-nowrap"
          >
            <span>Explorar propuestas</span>
            <ArrowRight className="w-4 h-4" />
          </a>

          <a
            href="#incluye"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm sm:text-base font-medium text-white/90 bg-white/10 hover:bg-white/15 backdrop-blur-md border border-white/20 rounded-xl transition-all hover:text-white whitespace-nowrap"
          >
            <span>Qué incluye el servicio</span>
          </a>
        </div>

        {/* Quiet Location Badge */}
        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-white/60">
          <MapPin className="w-3.5 h-3.5 text-white/50" />
          <span>{QUOTE_INFO.location}</span>
        </div>
      </div>

      {/* Animated scroll down indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-white/60 hover:text-white transition-colors cursor-pointer"
        onClick={() => {
          const target = document.getElementById('servicio');
          target?.scrollIntoView({ behavior: 'smooth' });
        }}
      >
        <span className="text-[11px] uppercase tracking-widest font-medium">Desplazar</span>
        <ArrowDown className="w-4 h-4 text-white/80" />
      </div>
    </section>
  );
};
