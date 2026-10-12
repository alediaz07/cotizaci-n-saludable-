import React from 'react';
import { Coffee, Utensils, Package, Truck, ClipboardCheck, AlertCircle, FileText } from 'lucide-react';

interface IncludedServicesProps {
  onOpenPdf?: () => void;
}

export const IncludedServices: React.FC<IncludedServicesProps> = ({ onOpenPdf }) => {
  const items = [
    {
      title: '70 Desayunos',
      desc: 'Elaborados la mañana del evento con ingredientes frescos y porciones calibradas para cada asistente.',
      icon: Coffee,
    },
    {
      title: '70 Almuerzos con refresco',
      desc: 'Platos balanceados acompañados con bebida natural preparada para el servicio de mediodía.',
      icon: Utensils,
    },
    {
      title: 'Empaques y utensilios desechables',
      desc: 'Incluye contenedores higiénicos individuales, servilletas y cubiertos requeridos para el consumo.',
      icon: Package,
    },
    {
      title: 'Transporte y entrega en Sabanilla',
      desc: 'Logística de traslado directo a las instalaciones en Sabanilla, Montes de Oca en los horarios acordados.',
      icon: Truck,
    },
    {
      title: 'Menús definidos para el evento',
      desc: 'Estandarización culinaria estricta en cada preparación garantizando uniformidad en todos los tiempos.',
      icon: ClipboardCheck,
    },
  ];

  return (
    <section id="incluye" className="py-20 sm:py-28 bg-[#F8F7F4] border-b border-black/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-16">
          <span className="text-xs uppercase tracking-widest font-semibold text-[#C8102E] mb-2 inline-block">
            Alcance del Servicio
          </span>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight mb-4 font-heading"
            style={{ textWrap: 'balance' }}
          >
            Todo preparado para su tranquilidad.
          </h2>
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Cada propuesta ha sido estructurada con una logística integral que cubre
            desde la preparación culinaria hasta la entrega en destino.
          </p>
        </div>

        {/* Minimalist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {items.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 sm:p-7 border border-neutral-200/90 shadow-2xs hover:border-neutral-300 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-10 h-10 rounded-xl bg-red-50 text-[#C8102E] flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading font-bold text-base sm:text-lg text-[#111111] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center text-[11px] font-semibold text-neutral-400">
                  <span>Sin costo adicional desglosado</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Commercial Note & PDF Trigger */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="p-5 sm:p-6 bg-white rounded-2xl border border-neutral-200 shadow-2xs flex items-start gap-4">
            <div className="p-2 rounded-lg bg-neutral-100 text-neutral-600 shrink-0">
              <AlertCircle className="w-5 h-5 text-neutral-700" />
            </div>
            <div>
              <h4 className="text-xs uppercase font-bold text-neutral-800 tracking-wider mb-1">
                Nota comercial y condiciones
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 leading-relaxed">
                Los precios presentados corresponden a propuestas preliminares, sujetas a confirmación.
                Montos antes de impuestos. No se incluye personal de servicio en sitio.
              </p>
            </div>
          </div>

          {onOpenPdf && (
            <div className="text-center pt-2">
              <button
                onClick={onOpenPdf}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs sm:text-sm font-semibold text-neutral-900 bg-white hover:bg-neutral-100 border border-neutral-300 rounded-xl shadow-xs transition-all cursor-pointer"
              >
                <FileText className="w-4 h-4 text-[#C8102E]" />
                <span>Ver y Descargar Cotización Oficial Completa (PDF)</span>
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
