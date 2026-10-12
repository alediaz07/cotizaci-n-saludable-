import React, { useState, useEffect } from 'react';
import { NodivaLogo } from './NodivaLogo';
import { Menu, X, FileText, CheckCircle2, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  onOpenPdf: () => void;
  selectedProposalCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenPdf }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { label: 'Propuestas', href: '#propuestas' },
    { label: 'Alergias', href: '#propuestas' },
    { label: 'Qué incluye', href: '#incluye' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 no-print ${
        scrolled
          ? 'bg-[#F8F7F4]/95 backdrop-blur-md shadow-sm border-b border-black/5 py-2.5 sm:py-3'
          : 'bg-black/30 backdrop-blur-xs py-3 sm:py-5 border-b border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Zone 1: Brand Wordmark (Responsive logo and title) */}
          <a
            href="#"
            className="flex items-center gap-2 sm:gap-2.5 shrink min-w-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C8102E] rounded-lg"
          >
            <NodivaLogo size={34} enableUploadOnClick={false} />
            <div className="flex flex-col min-w-0">
              <span
                className={`font-heading font-extrabold text-sm sm:text-base lg:text-lg tracking-tight truncate transition-colors ${
                  scrolled ? 'text-[#111111]' : 'text-white'
                }`}
              >
                NODIVA <span className="text-[#C8102E] inline">PRODUCTS</span>
                <span className={`hidden sm:inline font-normal text-xs ml-1 ${scrolled ? 'text-neutral-500' : 'text-white/60'}`}>S.A.</span>
              </span>
              <span className={`text-[10px] tracking-wider uppercase font-medium truncate sm:hidden ${scrolled ? 'text-neutral-500' : 'text-white/70'}`}>
                Catering Corporativo
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (Desktop only) */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`whitespace-nowrap transition-colors hover:text-[#C8102E] ${
                  scrolled ? 'text-[#111111]/80 hover:text-[#C8102E]' : 'text-white/80 hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: Actions & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* PDF Button: compact on mobile, full text on tablet/desktop */}
            <button
              onClick={onOpenPdf}
              className={`inline-flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 text-xs font-semibold rounded-lg transition-all shadow-xs border cursor-pointer ${
                scrolled
                  ? 'bg-white text-[#111111] hover:bg-neutral-100 border-neutral-300/80'
                  : 'bg-white/10 hover:bg-white/20 text-white border-white/20 backdrop-blur-sm'
              }`}
              title="Ver formato oficial impreso"
              aria-label="Ver cotización en PDF"
            >
              <FileText className="w-3.5 h-3.5 text-[#C8102E] shrink-0" />
              <span className="hidden sm:inline whitespace-nowrap">Ver Cotización PDF</span>
              <span className="sm:hidden text-[11px] font-bold whitespace-nowrap">PDF</span>
            </button>

            {/* Menu CTA: hidden on small mobile, visible on tablet+ */}
            <a
              href="#propuestas"
              className="hidden md:inline-flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-semibold text-white bg-[#C8102E] hover:bg-[#a50d25] rounded-lg shadow-xs transition-all whitespace-nowrap active:scale-95"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Explorar Menús</span>
            </a>

            {/* Mobile menu toggle hamburger button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors cursor-pointer ${
                scrolled
                  ? 'text-[#111111] hover:bg-black/5 active:bg-black/10'
                  : 'text-white hover:bg-white/10 active:bg-white/20'
              }`}
              aria-label={mobileMenuOpen ? 'Cerrar navegación' : 'Abrir navegación'}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown menu modal */}
        {mobileMenuOpen && (
          <div className="md:hidden fixed inset-x-0 top-[54px] sm:top-[60px] bg-white border-b border-neutral-200 shadow-2xl p-5 animate-in fade-in slide-in-from-top-2 z-50 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">
                  Navegación del Evento
                </span>
                <span className="text-[11px] font-semibold text-[#C8102E]">
                  Centriz Mobility
                </span>
              </div>

              <div className="flex flex-col gap-1">
                <a
                  href="#propuestas"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-sm font-semibold text-neutral-800 hover:text-[#C8102E] hover:bg-neutral-50 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Menús Gastronómicos (4 Opciones)</span>
                  <CheckCircle2 className="w-4 h-4 text-neutral-400" />
                </a>

                <a
                  href="#propuestas"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-sm font-semibold text-neutral-800 hover:text-[#C8102E] hover:bg-neutral-50 rounded-lg transition-colors flex items-center justify-between"
                >
                  <span>Alergias Alimentarias</span>
                  <ShieldAlert className="w-4 h-4 text-[#C8102E]" />
                </a>

                <a
                  href="#incluye"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2.5 text-sm font-semibold text-neutral-800 hover:text-[#C8102E] hover:bg-neutral-50 rounded-lg transition-colors"
                >
                  <span>Qué Incluye el Servicio</span>
                </a>
              </div>

              <div className="border-t border-neutral-100 pt-3 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPdf();
                  }}
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold text-[#111111] bg-neutral-100 hover:bg-neutral-200 rounded-xl transition-colors cursor-pointer"
                >
                  <FileText className="w-4 h-4 text-[#C8102E]" />
                  <span>Descargar Cotización Oficial (PDF)</span>
                </button>

                <a
                  href="#propuestas"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-center gap-2 w-full py-3 text-xs font-bold text-white bg-[#C8102E] hover:bg-[#a60d25] rounded-xl shadow-xs transition-colors"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Ver y Elegir Menú</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
