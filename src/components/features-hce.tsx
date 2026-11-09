"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  FileText,
  Download,
  Eye,
  Calendar,
  QrCode,
  SlidersHorizontal,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FeatureItem {
  id: string;
  tabLabel: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
  }>;
}

const featuresList: FeatureItem[] = [
  {
    id: "hce",
    tabLabel: "Historia Clínica",
    title: "La información del paciente, organizada y segura",
    description:
      "La HCE reúne notas, diagnósticos, tratamientos, recetas, informes y solicitudes en un expediente digital que se mantiene dentro de UMIA para futuras consultas.",
    image:
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1000&auto=format&fit=crop&q=85",
    imageAlt: "Médico consultando el expediente electrónico del paciente en UMIA",
    icon: FileText,
  },
  {
    id: "documentos",
    tabLabel: "Documentos",
    title: "Documentos listos en un clic",
    description:
      "Récipes, informes, solicitudes de exámenes y demás documentos médicos, disponibles al instante para compartir por WhatsApp o descargar en PDF.",
    image:
      "https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=1000&auto=format&fit=crop&q=85",
    imageAlt: "Especialistas preparando récipes e informes médicos digitales",
    icon: Download,
  },
  {
    id: "dicom",
    tabLabel: "Visor DICOM",
    title: "Tus estudios, en el navegador",
    description:
      "Visualiza tomografías, resonancias y radiografías dentro de la ficha del paciente, sin instalar software pesado ni complementos externos.",
    image:
      "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?w=1000&auto=format&fit=crop&q=85",
    imageAlt: "Revisión de estudio tomográfico de alta precisión en navegador",
    icon: Eye,
  },
  {
    id: "agenda",
    tabLabel: "Agenda",
    title: "Agenda multiconsultorio",
    description:
      "Coordina consultas presenciales, virtuales y a domicilio en distintas clínicas, con recordatorios automáticos y acceso dedicado para tu secretaria.",
    image:
      "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1000&auto=format&fit=crop&q=85",
    imageAlt: "Doctora coordinando su agenda médica entre múltiples consultorios",
    icon: Calendar,
  },
];

/* ---------- Interfaces Low-Fi minimalistas para superponer sobre cada foto ---------- */
function LowFiOverlay({ id }: { id: string }) {
  if (id === "hce") {
    return (
      <div className="w-full max-w-[232px] rounded-xl border border-white/80 bg-[#FFFFFF]/92 p-3 shadow-[0_18px_40px_rgba(8,38,39,0.22)] backdrop-blur-md sm:max-w-[290px] sm:rounded-2xl sm:p-4 lg:max-w-[300px]">
        {/* Cabecera paciente low-fi */}
        <div className="flex items-center justify-between gap-2.5 sm:gap-3">
          <div className="flex items-center gap-2 sm:gap-2.5">
            <div className="h-7 w-7 sm:h-8 sm:w-8 shrink-0 rounded-full bg-deep-teal/90" />
            <div className="space-y-1 sm:space-y-1.5">
              <div className="h-2 sm:h-2.5 w-20 sm:w-24 rounded-full bg-deep-teal/85" />
              <div className="h-1.5 sm:h-2 w-12 sm:w-14 rounded-full bg-deep-teal/25" />
            </div>
          </div>
          <span className="shrink-0 rounded-full bg-mint px-2 py-0.5 text-[9px] sm:px-2.5 sm:text-[10px] font-bold text-primary-teal">
            HCE
          </span>
        </div>

        {/* Bloques estructurados SOAP low-fi */}
        <div className="mt-2.5 sm:mt-3.5 space-y-1.5 sm:space-y-2 rounded-lg sm:rounded-xl bg-[#F5F4F0] p-2 sm:p-2.5">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full bg-primary-teal" />
            <div className="h-1.5 sm:h-2 w-full rounded-full bg-deep-teal/25" />
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full bg-primary-teal/65" />
            <div className="h-1.5 sm:h-2 w-4/5 rounded-full bg-deep-teal/20" />
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 shrink-0 rounded-full bg-primary-teal/40" />
            <div className="h-1.5 sm:h-2 w-3/5 rounded-full bg-deep-teal/15" />
          </div>
        </div>

        {/* Barra inferior de estado */}
        <div className="mt-2.5 sm:mt-3 flex items-center justify-between">
          <div className="flex gap-1.5">
            <span className="h-3.5 sm:h-4 w-9 sm:w-10 rounded-md bg-mint" />
            <span className="h-3.5 sm:h-4 w-10 sm:w-12 rounded-md bg-mint/60" />
          </div>
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
        </div>
      </div>
    );
  }

  if (id === "documentos") {
    return (
      <div className="w-full max-w-[232px] rounded-xl border border-white/80 bg-[#FFFFFF]/92 p-3 shadow-[0_18px_40px_rgba(8,38,39,0.22)] backdrop-blur-md sm:max-w-[290px] sm:rounded-2xl sm:p-4 lg:max-w-[300px]">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-lg bg-mint text-primary-teal">
              <FileText className="h-3.5 w-3.5" strokeWidth={2} absoluteStrokeWidth />
            </div>
            <div className="space-y-1">
              <div className="h-2 sm:h-2.5 w-18 sm:w-20 rounded-full bg-deep-teal/85" />
              <div className="h-1.5 w-11 sm:w-12 rounded-full bg-deep-teal/25" />
            </div>
          </div>
          <span className="shrink-0 rounded-md bg-deep-teal px-2 py-0.5 text-[9px] font-bold text-white">
            PDF
          </span>
        </div>

        {/* Líneas de récipe + sello QR low-fi */}
        <div className="mt-2.5 sm:mt-3.5 flex items-end justify-between gap-2.5 sm:gap-3 rounded-lg sm:rounded-xl bg-[#F5F4F0] p-2.5 sm:p-3">
          <div className="flex-1 space-y-1.5 sm:space-y-2">
            <div className="h-1.5 sm:h-2 w-full rounded-full bg-deep-teal/25" />
            <div className="h-1.5 sm:h-2 w-5/6 rounded-full bg-deep-teal/20" />
            <div className="h-1.5 sm:h-2 w-2/3 rounded-full bg-deep-teal/15" />
            <div className="pt-0.5 sm:pt-1">
              <div className="h-px w-14 sm:w-16 bg-primary-teal/40" />
            </div>
          </div>
          <div className="flex h-9 w-9 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-lg border border-primary-teal/20 bg-white text-deep-teal">
            <QrCode className="h-5 w-5 sm:h-6 sm:w-6" strokeWidth={1.75} absoluteStrokeWidth />
          </div>
        </div>
      </div>
    );
  }

  if (id === "dicom") {
    return (
      <div className="w-full max-w-[232px] rounded-xl border border-white/20 bg-[#082627]/92 p-3 text-canvas shadow-[0_18px_40px_rgba(0,0,0,0.38)] backdrop-blur-md sm:max-w-[290px] sm:rounded-2xl sm:p-4 lg:max-w-[300px]">
        {/* Barra superior de visor */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-mint-strong" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
          </div>
          <span className="rounded bg-white/10 px-2 py-0.5 text-[9px] font-semibold tracking-wider text-mint-strong uppercase">
            DICOM 3.0
          </span>
        </div>

        {/* Retícula diagnóstica low-fi */}
        <div className="relative mt-2.5 sm:mt-3 flex h-16 sm:h-24 items-center justify-center overflow-hidden rounded-lg sm:rounded-xl border border-white/10 bg-[#051819]">
          <div className="h-12 w-12 sm:h-16 sm:w-16 rounded-full border border-dashed border-mint-strong/45" />
          <div className="absolute h-7 w-7 sm:h-9 sm:w-9 rounded-full border border-mint-strong/80 bg-mint-strong/10" />
          <div className="absolute inset-x-5 sm:inset-x-6 h-px bg-mint-strong/20" />
          <div className="absolute inset-y-2.5 sm:inset-y-3 w-px bg-mint-strong/20" />
        </div>

        {/* Control deslizante de contraste / zoom */}
        <div className="mt-2.5 sm:mt-3 flex items-center gap-2 sm:gap-2.5">
          <SlidersHorizontal
            className="h-3.5 w-3.5 shrink-0 text-mint-strong"
            strokeWidth={2}
            absoluteStrokeWidth
          />
          <div className="relative h-1.5 flex-1 rounded-full bg-white/15">
            <div className="h-full w-2/3 rounded-full bg-mint-strong" />
            <span className="absolute top-1/2 left-2/3 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#082627] bg-white" />
          </div>
        </div>
      </div>
    );
  }

  // id === "agenda"
  return (
    <div className="w-full max-w-[232px] rounded-xl border border-white/80 bg-[#FFFFFF]/92 p-3 shadow-[0_18px_40px_rgba(8,38,39,0.22)] backdrop-blur-md sm:max-w-[290px] sm:rounded-2xl sm:p-4 lg:max-w-[300px]">
      {/* Tira de días low-fi */}
      <div className="grid grid-cols-5 gap-1 sm:gap-1.5">
        {[false, true, false, false, false].map((selected, idx) => (
          <div
            key={idx}
            className={cn(
              "flex flex-col items-center gap-1 rounded-md sm:rounded-lg py-1 sm:py-1.5",
              selected ? "bg-deep-teal text-white" : "bg-[#F5F4F0] text-deep-teal/50"
            )}
          >
            <span className="h-1 sm:h-1.5 w-2.5 sm:w-3 rounded-full bg-current opacity-60" />
            <span className="h-1.5 sm:h-2 w-3.5 sm:w-4 rounded-full bg-current" />
          </div>
        ))}
      </div>

      {/* Bloques de turnos multiconsultorio */}
      <div className="mt-2.5 sm:mt-3 space-y-1.5 sm:space-y-2">
        <div className="flex items-center gap-2 sm:gap-2.5 rounded-lg sm:rounded-xl border-l-[3px] border-l-deep-teal bg-mint/65 px-2.5 py-1.5 sm:px-3 sm:py-2">
          <span className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 rounded-full bg-deep-teal/85" />
          <div className="flex-1 space-y-1">
            <div className="h-1.5 sm:h-2 w-18 sm:w-24 rounded-full bg-deep-teal/80" />
            <div className="h-1.5 w-11 sm:w-14 rounded-full bg-primary-teal/45" />
          </div>
          <span className="h-1.5 sm:h-2 w-6 sm:w-8 rounded-full bg-primary-teal/35" />
        </div>

        <div className="flex items-center gap-2 sm:gap-2.5 rounded-lg sm:rounded-xl border-l-[3px] border-l-primary-teal/50 bg-[#F5F4F0] px-2.5 py-1.5 sm:px-3 sm:py-2">
          <span className="h-4 w-4 sm:h-5 sm:w-5 shrink-0 rounded-full bg-primary-teal/40" />
          <div className="flex-1 space-y-1">
            <div className="h-1.5 sm:h-2 w-16 sm:w-20 rounded-full bg-deep-teal/45" />
            <div className="h-1.5 w-10 sm:w-12 rounded-full bg-deep-teal/25" />
          </div>
          <span className="h-1.5 sm:h-2 w-6 sm:w-8 rounded-full bg-deep-teal/20" />
        </div>
      </div>
    </div>
  );
}

export function FeaturesHce() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [progresses, setProgresses] = useState<number[]>([0, 0, 0, 0]);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);
  const tabsNavRef = useRef<HTMLElement>(null);
  const tabButtonRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    let rafId = 0;

    const updateOnScroll = () => {
      const elements = cardRefs.current;
      const triggerY = window.innerHeight * 0.52;
      let currentActive = 0;

      const nextProgresses = featuresList.map((_, idx) => {
        const el = elements[idx];
        if (!el) return 0;
        const rect = el.getBoundingClientRect();
        // Progreso continuo de cada bloque conforme cruza el eje de lectura
        const raw = (triggerY - rect.top) / Math.max(rect.height, 1);
        const clamped = Math.min(1, Math.max(0, raw));
        if (rect.top <= triggerY) {
          currentActive = idx;
        }
        return clamped;
      });

      setActiveIndex(currentActive);
      setProgresses(nextProgresses);
    };

    const onScroll = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateOnScroll);
    };

    updateOnScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  // Mantener centrada horizontalmente la tab activa dentro de la barra en móvil
  useEffect(() => {
    const navEl = tabsNavRef.current;
    const btnEl = tabButtonRefs.current[activeIndex];
    if (!navEl || !btnEl || navEl.scrollWidth <= navEl.clientWidth) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targetLeft = btnEl.offsetLeft - (navEl.clientWidth - btnEl.clientWidth) / 2;
    navEl.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }, [activeIndex]);

  const scrollToFeature = (idx: number) => {
    const el = cardRefs.current[idx];
    if (!el) return;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const rect = el.getBoundingClientRect();
    const stickyOffset = window.innerWidth < 1024 ? 124 : 210;
    const targetY = window.scrollY + rect.top - stickyOffset;
    window.scrollTo({
      top: Math.max(0, targetY),
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  return (
    <section
      id="ecosistema"
      data-nav-theme="light"
      className="relative bg-[#F5F4F0] py-16 sm:py-24 lg:py-32 scroll-mt-20"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        {/* Layout 2 columnas sin encabezado de sección */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start lg:gap-14">
          {/* ============================================================== */}
          {/* COLUMNA DE IMAGEN (STICKY EN DESKTOP): Foto + UI Low-Fi        */}
          {/* ============================================================== */}
          <div className="hidden lg:col-span-6 lg:sticky lg:top-28 lg:block">
            <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-[28px] bg-deep-teal shadow-[0_24px_60px_rgba(12,55,56,0.12)] outline outline-1 -outline-offset-1 outline-black/10">
              {/* Fotografías temáticas pre-montadas para cross-fade limpio */}
              <div className="grid h-full w-full">
                {featuresList.map((feat, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img
                      key={feat.id}
                      src={feat.image}
                      alt={feat.imageAlt}
                      className={cn(
                        "[grid-area:1/1] h-full w-full object-cover transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:scale-100",
                        isCurrent ? "opacity-100 scale-100" : "opacity-0 scale-[1.03]"
                      )}
                    />
                  );
                })}
              </div>

              {/* Degradado inferior sutil para anclar la interfaz low-fi */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#082627]/70 via-[#082627]/15 to-transparent" />

              {/* Superposición de interfaz Low-Fi sincronizada con la función activa */}
              <div className="absolute inset-x-6 bottom-6 grid place-items-start">
                {featuresList.map((feat, idx) => {
                  const isCurrent = idx === activeIndex;
                  return (
                    <div
                      key={feat.id}
                      aria-hidden={!isCurrent}
                      className={cn(
                        "[grid-area:1/1] w-full transition-[opacity,translate] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:translate-y-0",
                        isCurrent
                          ? "opacity-100 translate-y-0"
                          : "pointer-events-none opacity-0 translate-y-3"
                      )}
                    >
                      <LowFiOverlay id={feat.id} />
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ============================================================== */}
          {/* COLUMNA DERECHA: Dock de Tabs Stickys + Bloques sin contenedor */}
          {/* ============================================================== */}
          <div className="min-w-0 lg:col-span-6">
            {/*
              Wrapper sticky con cortina superior #F5F4F0:
              - En móvil mantiene una sola fila deslizable horizontalmente para no ocupar doble altura.
              - En desktop alinea las tabs con la foto sticky (~112px).
            */}
            <div className="sticky top-0 z-30 -mx-5 -mt-14 sm:mx-0 sm:-mt-20 lg:-mt-28 pointer-events-none">
              <div className="bg-[#F5F4F0] px-5 pt-14 pb-2 sm:px-0 sm:pt-20 lg:pt-28">
                <nav
                  ref={tabsNavRef}
                  aria-label="Funciones principales de UMIA"
                  className="pointer-events-auto flex flex-nowrap items-center gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:flex-wrap lg:overflow-visible sm:gap-2.5"
                >
                  {featuresList.map((feat, idx) => {
                    const isCurrent = idx === activeIndex;
                    const rawFill = progresses[idx] ?? 0;
                    const displayFill = isCurrent ? Math.max(0.08, rawFill) : 0;

                    return (
                      <button
                        key={feat.id}
                        ref={(el) => {
                          tabButtonRefs.current[idx] = el;
                        }}
                        type="button"
                        onClick={() => scrollToFeature(idx)}
                        aria-current={isCurrent ? "step" : undefined}
                        className={cn(
                          "group relative shrink-0 overflow-hidden rounded-full border px-3.5 py-2 text-xs font-semibold tracking-tight whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-out focus:outline-none motion-safe:enabled:active:scale-[0.96] sm:px-4.5 sm:py-2.5 sm:text-[13px]",
                          isCurrent
                            ? "border-deep-teal bg-deep-teal text-white shadow-sm"
                            : "border-deep-teal/15 bg-white text-deep-teal/70 hover:border-deep-teal/30 hover:bg-[#FDFCF9] hover:text-deep-teal"
                        )}
                      >
                        <span className="relative z-10 block select-none">
                          {feat.tabLabel}
                        </span>

                        {/* Línea de progreso en el borde inferior: se dibuja únicamente cuando la tab está seleccionada */}
                        {isCurrent && (
                          <span className="absolute inset-x-0 bottom-0 h-[2.5px] overflow-hidden bg-white/20">
                            <span
                              className="block h-full w-full origin-left bg-[#BBF7D0] transition-transform duration-100 ease-out"
                              style={{ transform: `scaleX(${displayFill})` }}
                            />
                          </span>
                        )}
                      </button>
                    );
                  })}
                </nav>
              </div>

              {/* Difuminado inferior para que el texto que sube no se corte de golpe contra las tabs */}
              <div className="h-6 sm:h-8 lg:h-10 w-full bg-gradient-to-b from-[#F5F4F0] via-[#F5F4F0]/85 to-transparent" />
            </div>

            {/* Bloques de contenido sin contenedor visible, sin número, sin chip y sin checks */}
            <div>
              {featuresList.map((feat, idx) => {
                const Icon = feat.icon;
                const isActive = idx === activeIndex;

                return (
                  <article
                    key={feat.id}
                    ref={(el) => {
                      cardRefs.current[idx] = el;
                    }}
                    className={cn(
                      "py-9 first:pt-2 last:pb-0 sm:py-14 lg:flex lg:min-h-[56vh] lg:flex-col lg:justify-center lg:py-16 lg:first:pt-16 lg:last:pb-16 transition-opacity duration-200 ease-out",
                      isActive ? "opacity-100" : "lg:opacity-40 lg:hover:opacity-75"
                    )}
                  >
                    {/* Vista móvil/tablet: Foto + Interfaz Low-Fi proporcionada sin tapar la imagen */}
                    <div className="relative mb-6 aspect-[4/4.1] sm:mb-8 sm:aspect-[16/10.5] w-full overflow-hidden rounded-[24px] bg-deep-teal lg:hidden outline outline-1 -outline-offset-1 outline-black/10">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={feat.image}
                        alt={feat.imageAlt}
                        className="h-full w-full object-cover object-top sm:object-center"
                      />
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#082627]/75 via-[#082627]/15 to-transparent" />
                      <div className="absolute inset-x-3 bottom-3 sm:inset-x-5 sm:bottom-5">
                        <LowFiOverlay id={feat.id} />
                      </div>
                    </div>

                    {/* Ícono que acompaña la información en lugar del chip */}
                    <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl border border-primary-teal/15 bg-mint text-deep-teal">
                      <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" strokeWidth={2} absoluteStrokeWidth />
                    </div>

                    {/* Título más grande + únicamente subtítulo */}
                    <h3 className="font-display mt-4 sm:mt-6 text-[1.75rem] leading-[1.12] text-balance text-deep-teal sm:text-4xl lg:text-[44px]">
                      {feat.title}
                    </h3>

                    <p className="mt-3 sm:mt-4 max-w-lg text-[15px] leading-relaxed text-ink-2 sm:text-lg">
                      {feat.description}
                    </p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
