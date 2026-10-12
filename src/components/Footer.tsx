import React from 'react';
import { NodivaLogo } from './NodivaLogo';
import { QUOTE_INFO } from '../data/quoteData';
import { MapPin, Calendar, Building2, User, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#111111] text-white pt-16 pb-12 border-t border-neutral-800 no-print">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-neutral-800">
          
          {/* Brand & Wordmark */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <NodivaLogo size={40} />
              <div>
                <span className="font-heading font-extrabold text-lg text-white block">
                  NODIVA <span className="text-[#C8102E]">PRODUCTS S.A.</span>
                </span>
                <span className="text-xs text-neutral-400">
                  Soluciones Gastronómicas & Catering Corporativo
                </span>
              </div>
            </div>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Propuesta gastronómica exclusiva diseñada para Centriz Mobility.
              Alimentamos grandes jornadas con frescura, puntualidad y excelencia en cada detalle.
            </p>
          </div>

          {/* Proposal Summary Details */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-neutral-400">
              Datos de la Cotización
            </h4>
            <ul className="space-y-2 text-xs text-neutral-300">
              <li className="flex items-center gap-2">
                <Building2 className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>Cliente: <strong>{QUOTE_INFO.client}</strong></span>
              </li>
              <li className="flex items-center gap-2">
                <User className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>Atención: {QUOTE_INFO.contact}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>Correo: <a href={`mailto:${QUOTE_INFO.providerEmail}`} className="hover:text-white underline">{QUOTE_INFO.providerEmail}</a></span>
              </li>
              <li className="flex items-center gap-2">
                <Calendar className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>Evento: {QUOTE_INFO.eventDate} (70 personas)</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#C8102E]" />
                <span>Ubicación: {QUOTE_INFO.location}</span>
              </li>
            </ul>
          </div>

          {/* Quick Links & Info */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-neutral-400">
              Navegación Rápida
            </h4>
            <div className="flex flex-col gap-2 text-xs text-neutral-400">
              <a href="#propuestas" className="hover:text-white transition-colors">
                Propuestas Gastronómicas
              </a>
              <a href="#incluye" className="hover:text-white transition-colors">
                Servicios y Logística Incluida
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <div>
            © 2026 NODIVA PRODUCTS S.A. Todos los derechos reservados.
          </div>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Emisión: {QUOTE_INFO.issueDate}</span>
            <span>·</span>
            <span>Validez sujeta a confirmación</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
