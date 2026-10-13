/**
 * Datos oficiales de la cotización corporativa de NODIVA PRODUCTS S.A.
 * para Centriz Mobility.
 */

export interface MealDetail {
  title: string;
  description: string;
  servings: number;
  unitPrice: number;
  totalPrice: number;
  imageUrl?: string;
  highlights: string[];
}

export interface Proposal {
  id: string;
  number: string;
  code: string;
  name: string;
  tagline: string;
  breakfast: MealDetail;
  lunch: MealDetail;
  total: number;
  isLowestPrice?: boolean;
  featuredBadge?: string;
}

export interface QuoteEventInfo {
  provider: string;
  providerDoc: string;
  client: string;
  contact: string;
  eventDate: string;
  issueDate: string;
  attendees: number;
  location: string;
  serviceType: string;
  providerEmail: string; // Correo receptor oficial de NODIVA
  commercialNote: string;
}

export const QUOTE_INFO: QuoteEventInfo = {
  provider: "NODIVA PRODUCTS S.A.",
  providerDoc: "Cotización de Catering Corporativo",
  client: "Centriz Mobility",
  contact: "Allison Gonzalez",
  eventDate: "11 de diciembre de 2026",
  issueDate: "12 de octubre de 2026",
  attendees: 70,
  location: "Sabanilla, Montes de Oca, San José",
  serviceType: "Desayuno y almuerzo",
  providerEmail: "nodivaproducts@gmail.com",
  commercialNote: "Los precios presentados corresponden a propuestas preliminares, sujetas a confirmación de disponibilidad, logística y costos de insumos. Montos expresados en colones costarricenses (CRC), antes de impuestos aplicables. No se incluye personal de servicio para atención en sitio."
};

export const PROPOSALS: Proposal[] = [
  {
    id: "opcion-01",
    number: "01",
    code: "OPCIÓN 01",
    name: "Saludable clásica",
    tagline: "Equilibrio nutricional y ligereza para una jornada activa",
    breakfast: {
      title: "Desayuno saludable",
      description: "Wrap integral de pollo con vegetales frescos, fruta de temporada y bebida natural.",
      servings: 70,
      unitPrice: 3800,
      totalPrice: 266000,
      highlights: ["Wrap integral artesanal", "Pechuga de pollo magra", "Fruta fresca tropical", "Bebida natural"]
    },
    lunch: {
      title: "Almuerzo con refresco",
      description: "Pechuga de pollo a la plancha, arroz, vegetales salteados, ensalada fresca y refresco natural.",
      servings: 70,
      unitPrice: 6057.14,
      totalPrice: 424000,
      highlights: ["Pechuga dorada a la plancha", "Vegetales salteados crujientes", "Ensalada verde del día", "Refresco natural"]
    },
    total: 690000,
    isLowestPrice: false
  },
  {
    id: "opcion-02",
    number: "02",
    code: "OPCIÓN 02",
    name: "Tradicional balanceada",
    tagline: "El sabor auténtico de Costa Rica con preparación balanceada",
    breakfast: {
      title: "Desayuno tradicional",
      description: "Gallo pinto, huevo revuelto, queso fresco, fruta de temporada y café.",
      servings: 70,
      unitPrice: 3300,
      totalPrice: 231000,
      highlights: ["Gallo pinto tradicional", "Huevos revueltos frescos", "Queso blanco artesanal", "Café costarricense y fruta"]
    },
    lunch: {
      title: "Almuerzo típico casado",
      description: "Casado con pollo a la plancha, arroz, frijoles, ensalada fresca, plátano maduro y refresco natural.",
      servings: 70,
      unitPrice: 6057.14,
      totalPrice: 424000,
      highlights: ["Casado completo clásico", "Frijoles tiernos y arroz", "Plátano maduro caramelizado", "Refresco natural"]
    },
    total: 655000,
    isLowestPrice: false
  },
  {
    id: "opcion-03",
    number: "03",
    code: "OPCIÓN 03",
    name: "Ejecutiva económica",
    tagline: "Eficiencia presupuestaria con excelente estándar culinario",
    breakfast: {
      title: "Desayuno ejecutivo",
      description: "Sándwich integral de pollo con vegetales frescos, fruta de temporada y bebida natural.",
      servings: 70,
      unitPrice: 3350,
      totalPrice: 234500,
      highlights: ["Pan integral fresco", "Relleno de pollo con vegetales", "Porción de fruta fresca", "Bebida natural"]
    },
    lunch: {
      title: "Almuerzo italiano ejecutivo",
      description: "Pasta con pollo en salsa ligera, ensalada fresca, pan y refresco natural.",
      servings: 70,
      unitPrice: 5650,
      totalPrice: 395500,
      highlights: ["Pasta al dente en salsa ligera", "Tiras de pechuga de pollo", "Pan artesanal caliente", "Refresco natural"]
    },
    total: 630000,
    isLowestPrice: true,
    featuredBadge: "Mejor opción económica"
  },
  {
    id: "opcion-04",
    number: "04",
    code: "OPCIÓN 04",
    name: "Bowl saludable",
    tagline: "Innovación gastronómica fresca y de alta densidad nutritiva",
    breakfast: {
      title: "Desayuno bowl & toast",
      description: "Yogur natural con granola y frutas frescas, tostada integral con huevo y bebida natural.",
      servings: 70,
      unitPrice: 3825,
      totalPrice: 267750,
      highlights: ["Yogur natural con granola crujiente", "Tostada integral de masa madre", "Huevo preparado fresco", "Bebida natural"]
    },
    lunch: {
      title: "Almuerzo power bowl",
      description: "Bowl de pollo a la plancha, arroz integral, vegetales salteados, ensalada fresca y refresco natural.",
      servings: 70,
      unitPrice: 6103.57,
      totalPrice: 427250,
      highlights: ["Base de arroz integral", "Pollo marinado a la plancha", "Vegetales salteados y ensalada", "Refresco natural"]
    },
    total: 695000,
    isLowestPrice: false
  }
];

export const INCLUDED_SERVICES = [
  {
    id: "desayunos",
    title: "70 Desayunos completos",
    description: "Preparados la mañana del evento con ingredientes frescos de primera calidad y porciones calibradas.",
    icon: "Coffee"
  },
  {
    id: "almuerzos",
    title: "70 Almuerzos con refresco",
    description: "Platos balanceados calientes servidos con refresco natural y guarniciones frescas.",
    icon: "Utensils"
  },
  {
    id: "empaques",
    title: "Empaques y cubiertos desechables",
    description: "Empaques higiénicos individuales, servilletas y utensilios completos incluidos en el precio.",
    icon: "PackageCheck"
  },
  {
    id: "transporte",
    title: "Transporte y entrega puntual",
    description: "Logística y entrega directa en sus instalaciones de Sabanilla, Montes de Oca sin cargos adicionales.",
    icon: "Truck"
  },
  {
    id: "menu",
    title: "Menús definidos y controlados",
    description: "Recetas estandarizadas con control de porciones y presentación ejecutiva impecable.",
    icon: "ShieldCheck"
  }
];

export function formatColones(amount: number): string {
  // Formats cleanly like ₡690.000
  const formatted = Math.round(amount).toLocaleString("es-CR");
  return `₡${formatted}`;
}

export function generateEmailUrl(
  proposal: Proposal,
  allergiesNote?: string
): string {
  const subject = `Confirmación de propuesta — ${proposal.code}`;
  const allergiesSection = allergiesNote && allergiesNote.trim().length > 0
    ? `\nAlergias alimentarias:\n${allergiesNote.trim()}\n`
    : '';

  const body = `Estimado equipo comercial de NODIVA PRODUCTS S.A.,

Deseamos confirmar la propuesta ${proposal.code} — ${proposal.name} para el evento de ${QUOTE_INFO.client}.
${allergiesSection}
Agradecemos nos indiquen los siguientes pasos para coordinar el servicio.

Saludos,
${QUOTE_INFO.client}`;

  return `mailto:${QUOTE_INFO.providerEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
