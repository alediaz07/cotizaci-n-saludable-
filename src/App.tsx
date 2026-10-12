/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServiceIntro } from './components/ServiceIntro';
import { ProposalsList } from './components/ProposalsList';
import { IncludedServices } from './components/IncludedServices';
import { Footer } from './components/Footer';
import { PrintableQuoteModal } from './components/PrintableQuoteModal';
import { Proposal, PROPOSALS } from './data/quoteData';

export default function App() {
  // Default selected proposal is Option 1 (Saludable clásica)
  const [selectedProposal, setSelectedProposal] = useState<Proposal>(PROPOSALS[0]);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [allergiesText, setAllergiesText] = useState('');

  const handleSelectProposal = (proposal: Proposal) => {
    setSelectedProposal(proposal);
  };

  return (
    <div className="min-h-screen bg-[#F8F7F4] text-[#111111] flex flex-col font-sans selection:bg-[#C8102E] selection:text-white">
      {/* Top Bar Navigation */}
      <Navbar
        onOpenPdf={() => setIsPdfModalOpen(true)}
      />

      <main className="flex-1">
        {/* Section 1: Hero Cinematográfico (100svh) */}
        <Hero />

        {/* Section 2 & 3: Presentación del Servicio, Ficha, Alergias & Transición de Menús */}
        <ServiceIntro
          allergiesText={allergiesText}
          onChangeAllergies={setAllergiesText}
        />

        {/* Section 4: Las Cuatro Cotizaciones */}
        <ProposalsList
          selectedProposal={selectedProposal}
          onSelectProposal={handleSelectProposal}
          allergiesText={allergiesText}
        />

        {/* Section 5: Qué Incluye el Servicio */}
        <IncludedServices
          onOpenPdf={() => setIsPdfModalOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Official 2-Page Quotation Printable Modal */}
      <PrintableQuoteModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        selectedProposalId={selectedProposal.id}
      />
    </div>
  );
}
