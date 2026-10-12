import React from 'react';
import { X, Printer, Download, CheckCircle2 } from 'lucide-react';
import { PROPOSALS, QUOTE_INFO, formatColones } from '../data/quoteData';
import { NodivaLogo } from './NodivaLogo';

interface PrintableQuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedProposalId?: string;
}

export const PrintableQuoteModal: React.FC<PrintableQuoteModalProps> = ({
  isOpen,
  onClose,
  selectedProposalId,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-6 no-print-bg">
      <div className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-neutral-200 overflow-hidden my-auto">
        
        {/* Modal Toolbar (hidden on print) */}
        <div className="no-print bg-[#111111] text-white px-6 py-4 flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <NodivaLogo size={28} />
            <div>
              <h3 className="font-heading font-bold text-sm text-white">
                Cotización Oficial en Formato Imprimible (PDF)
              </h3>
              <p className="text-[11px] text-neutral-400">
                Documento de 2 páginas con las cuatro opciones y desglose reglamentario
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-[#C8102E] hover:bg-[#a60d25] rounded-lg shadow-sm transition-all cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Imprimir / Guardar como PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-neutral-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              aria-label="Cerrar modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Printable Document Container */}
        <div className="max-h-[82vh] overflow-y-auto p-4 sm:p-10 bg-neutral-100 flex flex-col items-center gap-8">
          
          {/* ================= PAGE 1 ================= */}
          <div className="w-full max-w-[800px] bg-white p-8 sm:p-12 shadow-md rounded-sm font-sans text-xs sm:text-sm text-[#111111] leading-normal page-break-after">
            
            {/* Header Page 1 */}
            <div className="flex justify-between items-center text-[10px] text-neutral-400 pb-6 border-b border-neutral-100 mb-6">
              <span>NODIVA PRODUCTS S.A. | Propuesta preliminar de catering</span>
              <span>Página 1</span>
            </div>

            {/* Title Section with Official Logo */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="font-heading font-extrabold text-xl text-[#C8102E] tracking-tight">
                  NODIVA PRODUCTS S.A.
                </h1>
                <h2 className="font-heading font-bold text-base text-neutral-900 tracking-tight">
                  COTIZACIÓN DE CATERING CORPORATIVO
                </h2>
              </div>
              <NodivaLogo size={48} />
            </div>

            {/* Metadata Grid */}
            <div className="grid grid-cols-2 gap-y-2 gap-x-6 pb-6 border-b border-neutral-200 mb-6 text-xs">
              <div>
                <span className="font-semibold text-neutral-700">Cliente:</span> {QUOTE_INFO.client}
              </div>
              <div>
                <span className="font-semibold text-neutral-700">Contacto:</span> {QUOTE_INFO.contact}
              </div>
              <div>
                <span className="font-semibold text-neutral-700">Evento:</span> {QUOTE_INFO.eventDate}
              </div>
              <div>
                <span className="font-semibold text-neutral-700">Asistentes:</span> {QUOTE_INFO.attendees} personas
              </div>
              <div>
                <span className="font-semibold text-neutral-700">Ubicación:</span> {QUOTE_INFO.location}
              </div>
              <div>
                <span className="font-semibold text-neutral-700">Servicio:</span> {QUOTE_INFO.serviceType}
              </div>
            </div>

            {/* Opción 1 */}
            <div className="mb-8">
              <div className="flex justify-between items-baseline border-b-2 border-neutral-900 pb-1 mb-2">
                <h3 className="font-heading font-bold text-sm text-neutral-900">
                  OPCIÓN 01 | {PROPOSALS[0].name}
                </h3>
                <span className="font-heading font-bold text-sm text-neutral-900 tabular-nums">
                  {formatColones(PROPOSALS[0].total)}
                </span>
              </div>
              <p className="text-[11px] text-neutral-700 mb-1">
                <span className="font-semibold">Desayuno:</span> {PROPOSALS[0].breakfast.description}
              </p>
              <p className="text-[11px] text-neutral-700 mb-3">
                <span className="font-semibold">Almuerzo:</span> {PROPOSALS[0].lunch.description}
              </p>

              <table className="w-full text-left text-xs mb-2">
                <thead>
                  <tr className="bg-neutral-100 text-[10px] uppercase font-bold text-neutral-600">
                    <th className="py-1.5 px-3">CONCEPTO</th>
                    <th className="py-1.5 px-3 text-center">CANTIDAD</th>
                    <th className="py-1.5 px-3 text-right">IMPORTE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-1.5 px-3 text-neutral-800">Desayunos saludables</td>
                    <td className="py-1.5 px-3 text-center tabular-nums">70</td>
                    <td className="py-1.5 px-3 text-right tabular-nums">{formatColones(PROPOSALS[0].breakfast.totalPrice)}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-3 text-neutral-800">Almuerzos con refresco</td>
                    <td className="py-1.5 px-3 text-center tabular-nums">70</td>
                    <td className="py-1.5 px-3 text-right tabular-nums">{formatColones(PROPOSALS[0].lunch.totalPrice)}</td>
                  </tr>
                  <tr className="bg-red-50/50 font-bold">
                    <td className="py-1.5 px-3 text-neutral-900 uppercase text-[11px]">TOTAL DE LA OPCIÓN</td>
                    <td className="py-1.5 px-3"></td>
                    <td className="py-1.5 px-3 text-right tabular-nums text-neutral-900">{formatColones(PROPOSALS[0].total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Opción 2 */}
            <div className="mb-4">
              <div className="flex justify-between items-baseline border-b-2 border-neutral-900 pb-1 mb-2">
                <h3 className="font-heading font-bold text-sm text-neutral-900">
                  OPCIÓN 02 | {PROPOSALS[1].name}
                </h3>
                <span className="font-heading font-bold text-sm text-neutral-900 tabular-nums">
                  {formatColones(PROPOSALS[1].total)}
                </span>
              </div>
              <p className="text-[11px] text-neutral-700 mb-1">
                <span className="font-semibold">Desayuno:</span> {PROPOSALS[1].breakfast.description}
              </p>
              <p className="text-[11px] text-neutral-700 mb-3">
                <span className="font-semibold">Almuerzo:</span> {PROPOSALS[1].lunch.description}
              </p>

              <table className="w-full text-left text-xs mb-2">
                <thead>
                  <tr className="bg-neutral-100 text-[10px] uppercase font-bold text-neutral-600">
                    <th className="py-1.5 px-3">CONCEPTO</th>
                    <th className="py-1.5 px-3 text-center">CANTIDAD</th>
                    <th className="py-1.5 px-3 text-right">IMPORTE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-1.5 px-3 text-neutral-800">Desayunos saludables</td>
                    <td className="py-1.5 px-3 text-center tabular-nums">70</td>
                    <td className="py-1.5 px-3 text-right tabular-nums">{formatColones(PROPOSALS[1].breakfast.totalPrice)}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-3 text-neutral-800">Almuerzos con refresco</td>
                    <td className="py-1.5 px-3 text-center tabular-nums">70</td>
                    <td className="py-1.5 px-3 text-right tabular-nums">{formatColones(PROPOSALS[1].lunch.totalPrice)}</td>
                  </tr>
                  <tr className="bg-red-50/50 font-bold">
                    <td className="py-1.5 px-3 text-neutral-900 uppercase text-[11px]">TOTAL DE LA OPCIÓN</td>
                    <td className="py-1.5 px-3"></td>
                    <td className="py-1.5 px-3 text-right tabular-nums text-neutral-900">{formatColones(PROPOSALS[1].total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

          {/* ================= PAGE 2 ================= */}
          <div className="w-full max-w-[800px] bg-white p-8 sm:p-12 shadow-md rounded-sm font-sans text-xs sm:text-sm text-[#111111] leading-normal">
            
            {/* Header Page 2 */}
            <div className="flex justify-between items-center text-[10px] text-neutral-400 pb-6 border-b border-neutral-100 mb-6">
              <span>NODIVA PRODUCTS S.A. | Propuesta preliminar de catering</span>
              <span>Página 2</span>
            </div>

            {/* Title Section with Official Logo */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h1 className="font-heading font-extrabold text-xl text-[#C8102E] tracking-tight">
                  NODIVA PRODUCTS S.A.
                </h1>
                <h2 className="font-heading font-bold text-base text-neutral-900 tracking-tight">
                  COTIZACIÓN DE CATERING CORPORATIVO — CONTINUACIÓN
                </h2>
              </div>
              <NodivaLogo size={48} />
            </div>

            {/* Opción 3 */}
            <div className="mb-8">
              <div className="flex justify-between items-baseline border-b-2 border-neutral-900 pb-1 mb-2">
                <h3 className="font-heading font-bold text-sm text-neutral-900">
                  OPCIÓN 03 | {PROPOSALS[2].name}
                </h3>
                <span className="font-heading font-bold text-sm text-neutral-900 tabular-nums">
                  {formatColones(PROPOSALS[2].total)}
                </span>
              </div>
              <p className="text-[11px] text-neutral-700 mb-1">
                <span className="font-semibold">Desayuno:</span> {PROPOSALS[2].breakfast.description}
              </p>
              <p className="text-[11px] text-neutral-700 mb-3">
                <span className="font-semibold">Almuerzo:</span> {PROPOSALS[2].lunch.description}
              </p>

              <table className="w-full text-left text-xs mb-2">
                <thead>
                  <tr className="bg-neutral-100 text-[10px] uppercase font-bold text-neutral-600">
                    <th className="py-1.5 px-3">CONCEPTO</th>
                    <th className="py-1.5 px-3 text-center">CANTIDAD</th>
                    <th className="py-1.5 px-3 text-right">IMPORTE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-1.5 px-3 text-neutral-800">Desayunos saludables</td>
                    <td className="py-1.5 px-3 text-center tabular-nums">70</td>
                    <td className="py-1.5 px-3 text-right tabular-nums">{formatColones(PROPOSALS[2].breakfast.totalPrice)}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-3 text-neutral-800">Almuerzos con refresco</td>
                    <td className="py-1.5 px-3 text-center tabular-nums">70</td>
                    <td className="py-1.5 px-3 text-right tabular-nums">{formatColones(PROPOSALS[2].lunch.totalPrice)}</td>
                  </tr>
                  <tr className="bg-red-50/50 font-bold">
                    <td className="py-1.5 px-3 text-neutral-900 uppercase text-[11px]">TOTAL DE LA OPCIÓN</td>
                    <td className="py-1.5 px-3"></td>
                    <td className="py-1.5 px-3 text-right tabular-nums text-neutral-900">{formatColones(PROPOSALS[2].total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Opción 4 */}
            <div className="mb-8">
              <div className="flex justify-between items-baseline border-b-2 border-neutral-900 pb-1 mb-2">
                <h3 className="font-heading font-bold text-sm text-neutral-900">
                  OPCIÓN 04 | {PROPOSALS[3].name}
                </h3>
                <span className="font-heading font-bold text-sm text-neutral-900 tabular-nums">
                  {formatColones(PROPOSALS[3].total)}
                </span>
              </div>
              <p className="text-[11px] text-neutral-700 mb-1">
                <span className="font-semibold">Desayuno:</span> {PROPOSALS[3].breakfast.description}
              </p>
              <p className="text-[11px] text-neutral-700 mb-3">
                <span className="font-semibold">Almuerzo:</span> {PROPOSALS[3].lunch.description}
              </p>

              <table className="w-full text-left text-xs mb-2">
                <thead>
                  <tr className="bg-neutral-100 text-[10px] uppercase font-bold text-neutral-600">
                    <th className="py-1.5 px-3">CONCEPTO</th>
                    <th className="py-1.5 px-3 text-center">CANTIDAD</th>
                    <th className="py-1.5 px-3 text-right">IMPORTE</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  <tr>
                    <td className="py-1.5 px-3 text-neutral-800">Desayunos saludables</td>
                    <td className="py-1.5 px-3 text-center tabular-nums">70</td>
                    <td className="py-1.5 px-3 text-right tabular-nums">{formatColones(PROPOSALS[3].breakfast.totalPrice)}</td>
                  </tr>
                  <tr>
                    <td className="py-1.5 px-3 text-neutral-800">Almuerzos con refresco</td>
                    <td className="py-1.5 px-3 text-center tabular-nums">70</td>
                    <td className="py-1.5 px-3 text-right tabular-nums">{formatColones(PROPOSALS[3].lunch.totalPrice)}</td>
                  </tr>
                  <tr className="bg-red-50/50 font-bold">
                    <td className="py-1.5 px-3 text-neutral-900 uppercase text-[11px]">TOTAL DE LA OPCIÓN</td>
                    <td className="py-1.5 px-3"></td>
                    <td className="py-1.5 px-3 text-right tabular-nums text-neutral-900">{formatColones(PROPOSALS[3].total)}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Official Inclusions & Conditions */}
            <div className="pt-4 border-t border-neutral-200 text-[11px] text-neutral-600 space-y-2.5">
              <p>
                <strong className="text-neutral-800">Incluido en todos los menús:</strong> empaques, utensilios desechables necesarios, transporte y entrega en Sabanilla, Montes de Oca.
              </p>
              <p className="leading-relaxed">
                <strong className="text-neutral-800">Condiciones:</strong> Propuesta preliminar sujeta a confirmación de disponibilidad, logística y costos de insumos. Montos expresados antes de impuestos aplicables. El servicio de personal para atención en sitio no está incluido.
              </p>
              <p className="text-[10px] text-neutral-400 pt-3">
                Fecha de emisión: {QUOTE_INFO.issueDate}.
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
