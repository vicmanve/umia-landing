import { Navbar, Hero } from "@/components/sections-top";
import { FeaturesHce } from "@/components/features-hce";
import { UmiScrollSection } from "@/components/umi-scroll-section";
import { StandardsSection } from "@/components/standards-section";
import { B2bSection } from "@/components/b2b-section";
import {
  // Testimonials, // Ocultado temporalmente; preparado para pronta implementación
  Pricing,
  Faq,
  FinalCta,
  Footer,
} from "@/components/sections-bottom";
import { WhatsAppSupport } from "@/components/whatsapp-support";

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-clip bg-[#F5F4F0] text-ink antialiased">
      {/* Navegación flotante*/}
      <Navbar />

      {/* 1. Hero Section con ilustración y copies actualizados */}
      <Hero />

      {/* 2. Sección de Features enmarcada (HCE integral, Documentos, Visor DICOM y Agenda) */}
      <FeaturesHce />

      {/* 3. Sección UMI (Verde oscuro, centrada, UMI mascot 3D reduciéndose al scroll) */}
      <UmiScrollSection />

      {/* 4. Estándares médicos y normativos de seguridad (HIPAA, HL7 FHIR, CIE-10/11, DICOM) */}
      <StandardsSection />

      {/* 5. Integración B2B y API para desarrolladores e instituciones */}
      <B2bSection />

      {/* 6. Testimonios médicos reales (Oculto temporalmente; preparado para pronta implementación) */}
      {/* <Testimonials /> */}

      {/* 7. Planes y Precios transparentes (UI/UX mejorada con switcher anual) */}
      <Pricing />

      {/* 8. Preguntas frecuentes (Acordeón interactivo mejorado) */}
      <Faq />

      {/* 9. Llamado a la acción final y pie de página */}
      <FinalCta />
      <Footer />

      {/* Widget flotante de soporte clínico por WhatsApp */}
      <WhatsAppSupport />
    </main>
  );
}
