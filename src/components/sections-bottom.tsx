"use client";

import { useEffect, useRef, useState } from "react";
import {
  Star,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Stethoscope,
} from "lucide-react";
import { useReducedMotion } from "motion/react";
import { BlurFade } from "@/components/ui/blur-fade";
import { assetPath, cn } from "@/lib/utils";

const h2 =
  "font-display text-[1.85rem] leading-[1.14] text-balance sm:text-5xl sm:leading-tight text-deep-teal";

/* ============================================================== */
/* 1. TESTIMONIOS (Carrusel de Cards Verdes Grandes de Tamaño Fijo)*/
/* ============================================================== */
interface TestimonialItem {
  id: string;
  category: string;
  quote: string;
  name: string;
  role: string;
  institution: string;
  image: string;
  rating: number;
}

const testimonialsData: TestimonialItem[] = [
  {
    id: "ginecologia",
    category: "Ginecología & Obstetricia",
    quote:
      "Tener los estudios de mis pacientes de dos clínicas diferentes en una sola pestaña y que UMI redacte la nota SOAP mientras converso con ellas me devolvió dos horas libres cada tarde.",
    name: "Dra. Andrea Briceño",
    role: "Especialista en Ginecología y Obstetricia",
    institution: "Centro Médico Metropolitano",
    image:
      "https://images.unsplash.com/photo-1584515933487-779824d29309?w=700&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "neurocirugia",
    category: "Neurocirugía",
    quote:
      "Abrir tomografías y resonancias en el visor DICOM directamente en el navegador sin instalar software pesado, junto al informe estructurado de IA, es tecnología de clase mundial.",
    name: "Dr. Ricardo González",
    role: "Neurocirujano Clínico",
    institution: "Hospital Clínico Universitario",
    image:
      "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=700&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "cirugia",
    category: "Cirugía & Trauma",
    quote:
      "La coordinación con mi secretaria entre tres consultorios y el seguimiento postoperatorio en un expediente único transformaron por completo el orden de nuestra práctica.",
    name: "Dra. Mariana Silva",
    role: "Cirugía General y Traumatología",
    institution: "Clínica El Ávila",
    image:
      "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?w=700&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "cardiologia",
    category: "Cardiología",
    quote:
      "Antes terminaba mi jornada agotado transcribiendo notas en la computadora. Ahora apruebo el borrador de UMI con un clic y el paciente sale con su récipe con QR en WhatsApp.",
    name: "Dr. Carlos Montilla",
    role: "Medicina Interna & Cardiología",
    institution: "Clínica Santa Sofía",
    image:
      "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=700&auto=format&fit=crop&q=80",
    rating: 5,
  },
  {
    id: "pediatria",
    category: "Pediatría",
    quote:
      "En consulta pediátrica necesitas toda tu atención puesta en el niño y los padres. Con UMIA el control de crecimiento, vacunas y recetas queda impecable sin tocar el teclado.",
    name: "Dra. Valeria Rojas",
    role: "Pediatría & Puericultura",
    institution: "Instituto Médico La Floresta",
    image:
      "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=700&auto=format&fit=crop&q=80",
    rating: 5,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const scrollToSlide = (index: number) => {
    const wrapped = (index + testimonialsData.length) % testimonialsData.length;
    setCurrentIndex(wrapped);
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[wrapped] as HTMLElement | undefined;
    if (!card) return;
    const targetLeft = card.offsetLeft - (track.clientWidth - card.clientWidth) / 2;
    track.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const handleScroll = () => {
      const trackCenter = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let minDist = Infinity;
      Array.from(track.children).forEach((child, idx) => {
        const el = child as HTMLElement;
        const cardCenter = el.offsetLeft + el.clientWidth / 2;
        const dist = Math.abs(trackCenter - cardCenter);
        if (dist < minDist) {
          minDist = dist;
          closest = idx;
        }
      });
      setCurrentIndex(closest);
    };

    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => track.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section data-nav-theme="light" className="overflow-hidden bg-[#FFFFFF] py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <BlurFade inView>
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:justify-between sm:text-left">
            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.16em] text-[#0F766E] uppercase">
                <Stethoscope className="size-4 shrink-0 text-[#0F766E]" strokeWidth={2} absoluteStrokeWidth />
                <span>Experiencias Reales</span>
              </span>
              <h2 className={`${h2} mt-3.5 sm:mt-4`}>
                Médicos que dejaron el papel y recuperaron{" "}
                <span className="em-serif text-[#059669]">su tiempo</span>.
              </h2>
              <p className="mt-3.5 sm:mt-4 text-[15px] leading-relaxed text-ink-2 sm:text-lg">
                Más de 5,000 profesionales de la salud confían a diario en UMIA para atender mirando a sus pacientes.
              </p>
            </div>

            {/* Controles del carrusel en sm+ */}
            <div className="hidden shrink-0 items-center gap-2.5 sm:flex">
              <button
                type="button"
                onClick={() => scrollToSlide(currentIndex - 1)}
                aria-label="Testimonio anterior"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-deep-teal shadow-2xs transition-[background-color,border-color,transform] duration-150 ease-out hover:border-primary-teal/40 hover:bg-mint/40 motion-safe:enabled:active:scale-[0.96]"
              >
                <ChevronLeft
                  className="-translate-x-px size-5"
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              </button>
              <button
                type="button"
                onClick={() => scrollToSlide(currentIndex + 1)}
                aria-label="Siguiente testimonio"
                className="flex h-11 w-11 items-center justify-center rounded-full bg-deep-teal text-canvas shadow-sm transition-[background-color,transform] duration-150 ease-out hover:bg-primary-teal motion-safe:enabled:active:scale-[0.96]"
              >
                <ChevronRight
                  className="translate-x-px size-5"
                  strokeWidth={2}
                  absoluteStrokeWidth
                />
              </button>
            </div>
          </div>
        </BlurFade>
      </div>

      {/* Pista del Carrusel: Cards verdes grandes con asomo lateral en móvil */}
      <div
        ref={trackRef}
        className="mt-9 sm:mt-12 flex snap-x snap-mandatory gap-4 sm:gap-6 overflow-x-auto px-5 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:px-[max(1.5rem,calc((100vw-72rem)/2+1.5rem))]"
      >
        {testimonialsData.map((t) => (
          <article
            key={t.id}
            className="relative flex h-[480px] w-[82vw] max-w-[360px] shrink-0 snap-center flex-col overflow-hidden rounded-[28px] border border-deep-teal/15 bg-deep-teal p-4 text-canvas sm:h-[390px] sm:w-[660px] sm:max-w-[760px] sm:flex-row sm:gap-7 sm:rounded-[32px] sm:p-6 lg:w-[760px]"
          >
            {/* Destello de color suave en la parte superior izquierda sobre el fondo en #BBF7D0 */}
            <div
              className="pointer-events-none absolute -top-16 -left-16 h-64 w-64 rounded-full select-none"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, rgba(187, 247, 208, 0.28) 0%, rgba(187, 247, 208, 0.12) 35%, rgba(187, 247, 208, 0.03) 65%, transparent 80%)",
                filter: "blur(28px)",
                mixBlendMode: "screen",
              }}
            />

            {/* Fotografía vertical fija del especialista (concéntrico: 28px - 16px = 12px/14px en móvil, 32px - 24px -> 20px en sm+) */}
            <div className="relative z-10 h-44 w-full shrink-0 overflow-hidden rounded-[14px] bg-[#071f20] sm:h-full sm:w-64 sm:rounded-[20px] outline outline-1 -outline-offset-1 outline-white/10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={t.image}
                alt={t.name}
                className="h-full w-full object-cover object-[center_20%] sm:object-center"
              />
            </div>

            {/* Cita y autor con altura estructurada sin recortar el pie */}
            <div className="relative z-10 mt-4 flex flex-1 flex-col justify-between sm:mt-0 sm:py-2 sm:pr-2">
              <div>
                {/* Estrellas alineadas a la izquierda sin chip superior */}
                <div className="flex items-center gap-1 text-amber-400">
                  {Array.from({ length: t.rating }).map((_, idx) => (
                    <Star key={idx} className="size-3.5 sm:size-4 fill-amber-400" />
                  ))}
                </div>

                <blockquote className="font-display mt-3 sm:mt-5 line-clamp-5 text-[16.5px] leading-[1.48] text-canvas sm:text-[22px] sm:leading-[1.45]">
                  “{t.quote}”
                </blockquote>
              </div>

              <div className="border-t border-white/12 pt-3.5 sm:pt-4">
                <h4 className="text-[15px] sm:text-base font-bold text-canvas">{t.name}</h4>
                <p className="text-xs font-medium text-mint-strong">{t.role}</p>
                <p className="mt-0.5 text-xs text-mint/70">{t.institution}</p>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Controles táctiles + indicadores de paginación */}
      <div className="mt-4 sm:mt-6 flex items-center justify-center gap-3 px-5">
        <button
          type="button"
          onClick={() => scrollToSlide(currentIndex - 1)}
          aria-label="Testimonio anterior"
          className="flex h-9 w-9 sm:hidden items-center justify-center rounded-full border border-line bg-surface text-deep-teal shadow-2xs transition-[background-color,border-color,transform] duration-150 ease-out motion-safe:enabled:active:scale-[0.96]"
        >
          <ChevronLeft className="-translate-x-px size-4" strokeWidth={2} absoluteStrokeWidth />
        </button>

        <div className="flex items-center justify-center gap-1">
          {testimonialsData.map((t, idx) => {
            const active = idx === currentIndex;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => scrollToSlide(idx)}
                aria-label={`Ir al testimonio de ${t.name}`}
                aria-current={active ? "true" : undefined}
                className="flex h-8 items-center px-1"
              >
                <span
                  className={cn(
                    "block h-2 rounded-full transition-[width,background-color] duration-200 ease-out",
                    active ? "w-8 bg-deep-teal" : "w-2 bg-deep-teal/20 hover:bg-deep-teal/40"
                  )}
                />
              </button>
            );
          })}
        </div>

        <button
          type="button"
          onClick={() => scrollToSlide(currentIndex + 1)}
          aria-label="Siguiente testimonio"
          className="flex h-9 w-9 sm:hidden items-center justify-center rounded-full bg-deep-teal text-canvas shadow-xs transition-[background-color,transform] duration-150 ease-out motion-safe:enabled:active:scale-[0.96]"
        >
          <ChevronRight className="translate-x-px size-4" strokeWidth={2} absoluteStrokeWidth />
        </button>
      </div>
    </section>
  );
}

/* ============================================================== */
/* 2. PRICING (UI/UX PULIDA CON BETTER-UI)                        */
/* ============================================================== */
export function Pricing() {
  const [annual, setAnnual] = useState(true);

  const freeFeatures = [
    "Hasta 30 pacientes activos",
    "Historia clínica digital básica",
    "5 horas de transcripción IA con UMI / mes",
    "Notas SOAP estructuradas en PDF",
    "Soporte por correo electrónico",
  ];

  const proFeatures = [
    "Pacientes y expedientes ilimitados",
    "Transcripción y Scribe IA ilimitado con UMI",
    "Notas SOAP automáticas con códigos CIE-10/11",
    "Récipes y recetas con firma digital y QR",
    "Visor DICOM en la nube integrado",
    "Agenda multiconsultorio y acceso secretaria",
    "Soporte prioritario 24/7 por WhatsApp",
  ];

  const clinicFeatures = [
    "Todo lo de Pro para equipos de salud",
    "Multi-sucursal y roles asistenciales RBAC",
    "Acceso a API REST B2B + Webhooks clínicos",
    "Integración directa con sistemas HIS y ERP",
    "Acuerdo de Privacidad BAA HIPAA dedicado",
    "Onboarding y capacitación institucional",
    "Gerente de cuenta técnico exclusivo",
  ];

  return (
    <section id="precios" data-nav-theme="light" className="bg-[#F5F4F0] py-16 sm:py-24 lg:py-32 scroll-mt-20">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <BlurFade inView>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.16em] text-[#0F766E] uppercase">
              <Sparkles className="size-4 shrink-0 text-[#0F766E]" strokeWidth={2} absoluteStrokeWidth />
              <span>Planes Transparentes</span>
            </span>
            <h2 className={`${h2} mt-3.5 sm:mt-4`}>
              Invierte en tu tranquilidad{" "}
              <span className="em-serif text-[#059669]">médica</span>.
            </h2>
            <p className="mx-auto mt-3.5 sm:mt-4 max-w-2xl text-[15px] sm:text-lg text-ink-2">
              Sin contratos forzados ni cobros ocultos. Cancela o cambia de plan en cualquier momento.
            </p>

            {/* Switcher Mensual / Anual proporcionado en móvil sin saltos de línea */}
            <div className="mx-auto mt-7 sm:mt-8 flex w-fit max-w-full items-center rounded-full border border-line bg-surface p-1 text-xs sm:text-sm shadow-xs">
              <button
                type="button"
                onClick={() => setAnnual(false)}
                className={cn(
                  "whitespace-nowrap rounded-full px-3.5 py-2 sm:px-5 font-medium transition-[background-color,color,box-shadow,transform] duration-150 ease-out motion-safe:enabled:active:scale-[0.96]",
                  !annual ? "bg-deep-teal text-white shadow-xs" : "text-ink-2 hover:text-deep-teal"
                )}
              >
                Pago Mensual
              </button>
              <button
                type="button"
                onClick={() => setAnnual(true)}
                className={cn(
                  "flex items-center gap-1.5 whitespace-nowrap rounded-full py-2 pl-3.5 pr-2.5 sm:pl-5 sm:pr-3.5 font-medium transition-[background-color,color,box-shadow,transform] duration-150 ease-out motion-safe:enabled:active:scale-[0.96]",
                  annual ? "bg-deep-teal text-white shadow-xs" : "text-ink-2 hover:text-deep-teal"
                )}
              >
                <span>Pago Anual</span>
                <span className="whitespace-nowrap rounded-full bg-mint px-2 py-0.5 text-[10px] font-bold text-primary-teal">
                  Ahorra 20%
                </span>
              </button>
            </div>
          </div>
        </BlurFade>

        {/* Grid de Precios con arquitectura concéntrica de doble superficie */}
        <div className="mt-10 sm:mt-14 grid items-stretch gap-5 sm:gap-6 lg:grid-cols-3 lg:gap-7">
          {/* Plan Starter / Free */}
          <div className="flex flex-col rounded-[28px] sm:rounded-[32px] border border-black/[0.06] bg-[#EAE9E3]/75 p-2 sm:p-2.5 transition-[box-shadow,border-color] duration-200 ease-out hover:border-primary-teal/25 hover:shadow-[0_18px_40px_rgba(12,55,56,0.07)]">
            {/* Cápsula superior blanca (concéntrico: 28-8=20px en móvil, 32-10=22px en sm+) */}
            <div className="rounded-[20px] sm:rounded-[22px] border border-white bg-[#FFFFFF] p-5 sm:p-6 shadow-[0_2px_10px_rgba(12,55,56,0.04)]">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-canvas px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-ink-2">
                  Inicial
                </span>
                <span className="text-xs font-medium text-ink-2/70">1 consultorio</span>
              </div>

              <h3 className="font-display mt-4 text-2xl text-deep-teal sm:text-[28px]">
                Prueba Gratis
              </h3>
              <p className="mt-1 text-xs text-ink-2">
                Ideal para explorar el flujo clínico digital en tu consulta.
              </p>

              <div className="mt-5 sm:mt-6 flex items-baseline gap-1.5 tabular-nums">
                <span className="font-display text-4xl font-semibold text-deep-teal sm:text-5xl">
                  $0
                </span>
                <span className="text-xs font-medium text-ink-2">/ siempre gratis</span>
              </div>

              <button
                type="button"
                className="mt-5 sm:mt-6 w-full rounded-full border border-primary-teal/35 bg-surface py-3 text-sm font-semibold text-deep-teal transition-colors duration-150 ease-out hover:border-primary-teal hover:bg-mint/50"
              >
                Crear cuenta gratis
              </button>
            </div>

            {/* Lista estructurada inferior */}
            <div className="flex flex-1 flex-col px-4 pt-5 pb-4 sm:px-5 sm:pt-6 sm:pb-5">
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-ink-2/65">
                Qué incluye
              </p>
              <ul className="mt-3.5 sm:mt-4 space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-deep-teal/90">
                {freeFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-mint text-primary-teal">
                      <Check className="size-3" strokeWidth={2.5} absoluteStrokeWidth />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Plan Pro (Destacado en verde UMIA + Cápsula interior luminosa + CTA #FFFFFF) */}
          <div className="relative flex flex-col overflow-hidden rounded-[28px] sm:rounded-[32px] bg-deep-teal p-2 sm:p-2.5 text-canvas shadow-[0_28px_64px_rgba(12,55,56,0.24)] ring-1 ring-white/10 lg:-translate-y-3">
            {/* Destello de color en la esquina superior izquierda con #BBF7D0 */}
            <div
              className="pointer-events-none absolute -top-14 -left-14 h-56 w-56 rounded-full select-none"
              style={{
                background:
                  "radial-gradient(circle at 40% 40%, rgba(187, 247, 208, 0.32) 0%, rgba(187, 247, 208, 0.14) 38%, rgba(187, 247, 208, 0.02) 68%, transparent 80%)",
                filter: "blur(24px)",
                mixBlendMode: "screen",
              }}
            />

            {/* Cápsula superior en gradiente esmeralda (concéntrico: 20px móvil / 22px sm+) */}
            <div className="relative z-10 rounded-[20px] sm:rounded-[22px] border border-[#BBF7D0]/30 bg-gradient-to-br from-[#1b5051] via-[#144041] to-[#0f3334] p-5 sm:p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-[#BBF7D0] px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-deep-teal">
                  Más elegido
                </span>
                <span className="text-xs font-medium text-mint/85">Especialistas</span>
              </div>

              <h3 className="font-display mt-4 text-2xl text-white sm:text-[28px]">
                Médico Pro
              </h3>
              <p className="mt-1 text-xs text-mint/80">
                Potencia ilimitada con UMI para tu práctica médica diaria.
              </p>

              <div className="mt-5 sm:mt-6 flex items-baseline gap-2 tabular-nums">
                <span className="font-display text-4xl font-semibold text-white sm:text-5xl">
                  {annual ? "$20" : "$25"}
                </span>
                <span className="text-xs font-medium text-mint/85">
                  USD {annual ? "/mes · anual" : "/mes"}
                </span>
              </div>

              <button
                type="button"
                className="mt-5 sm:mt-6 w-full rounded-full bg-[#FFFFFF] py-3 text-sm font-bold text-deep-teal transition-colors duration-150 ease-out hover:bg-[#FFFFFF]/90"
              >
                Comenzar prueba de 14 días
              </button>
            </div>

            {/* Lista estructurada inferior sobre verde profundo */}
            <div className="flex flex-1 flex-col px-4 pt-5 pb-4 sm:px-5 sm:pt-6 sm:pb-5">
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-mint-strong/75">
                Todo lo de Inicial, más
              </p>
              <ul className="mt-3.5 sm:mt-4 space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-mint/95">
                {proFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-mint-strong/20 text-mint-strong">
                      <Check className="size-3" strokeWidth={2.5} absoluteStrokeWidth />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Plan Clínicas & API B2B */}
          <div className="flex flex-col rounded-[28px] sm:rounded-[32px] border border-black/[0.06] bg-[#EAE9E3]/75 p-2 sm:p-2.5 transition-[box-shadow,border-color] duration-200 ease-out hover:border-primary-teal/25 hover:shadow-[0_18px_40px_rgba(12,55,56,0.07)]">
            {/* Cápsula superior blanca (concéntrico: 20px móvil / 22px sm+) */}
            <div className="rounded-[20px] sm:rounded-[22px] border border-white bg-[#FFFFFF] p-5 sm:p-6 shadow-[0_2px_10px_rgba(12,55,56,0.04)]">
              <div className="flex items-center justify-between gap-2">
                <span className="rounded-full bg-mint/70 px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-primary-teal">
                  Institucional
                </span>
                <span className="text-xs font-medium text-ink-2/70">Multi-sede</span>
              </div>

              <h3 className="font-display mt-4 text-2xl text-deep-teal sm:text-[28px]">
                Clínicas &amp; API B2B
              </h3>
              <p className="mt-1 text-xs text-ink-2">
                Para hospitales, centros médicos y software de salud.
              </p>

              <div className="mt-5 sm:mt-6 flex items-baseline gap-1.5">
                <span className="font-display text-3xl font-semibold text-deep-teal sm:text-4xl">
                  A medida
                </span>
                <span className="text-xs font-medium text-ink-2">/ por volumen</span>
              </div>

              <a
                href="#api"
                className="mt-5 sm:mt-6 block w-full rounded-full bg-deep-teal py-3 text-center text-sm font-semibold text-white transition-colors duration-150 ease-out hover:bg-primary-teal"
              >
                Contactar equipo B2B
              </a>
            </div>

            {/* Lista estructurada inferior */}
            <div className="flex flex-1 flex-col px-4 pt-5 pb-4 sm:px-5 sm:pt-6 sm:pb-5">
              <p className="text-[11px] font-bold tracking-[0.14em] uppercase text-ink-2/65">
                Arquitectura empresarial
              </p>
              <ul className="mt-3.5 sm:mt-4 space-y-2.5 sm:space-y-3 text-xs sm:text-sm text-deep-teal/90">
                {clinicFeatures.map((feat) => (
                  <li key={feat} className="flex items-start gap-2.5">
                    <span className="mt-0.5 flex h-4.5 w-4.5 shrink-0 items-center justify-center rounded-full bg-mint text-primary-teal">
                      <Check className="size-3" strokeWidth={2.5} absoluteStrokeWidth />
                    </span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================== */
/* 3. PREGUNTAS FRECUENTES (Transición reversible better-ui)      */
/* ============================================================== */
export function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Qué tan difícil es aprender a usar UMIA en mi consulta?",
      a: "UMIA está diseñado para usarse desde el primer minuto sin necesidad de cursos ni manuales técnicos. La interfaz es intuitiva: solo presionas 'Iniciar consulta', hablas con tu paciente con naturalidad y UMI se encarga de estructurar el expediente.",
    },
    {
      q: "¿Cómo se protegen los audios y las notas clínicas bajo el estándar HIPAA?",
      a: "El audio de la consulta se procesa en memoria volátil cifrada de 256 bits y se elimina permanentemente una vez redactada la nota SOAP. La información clínica se resguarda bajo estrictos protocolos HIPAA y HL7 FHIR con redundancia geográfica.",
    },
    {
      q: "¿Los récipes y recetas tienen validez legal y farmacéutica?",
      a: "Totalmente. Los récipes generados en UMIA incorporan tu número de colegiatura, MPPS, firma electrónica certificada y un código QR criptográfico único que cualquier farmacia puede escanear para verificar su autenticidad antifraude.",
    },
    {
      q: "¿Podemos conectar UMIA a nuestro software hospitalario existente mediante API B2B?",
      a: "Sí. Nuestra API B2B REST y Webhooks permiten integrar los motores de Scribe IA, el visor DICOM y el expediente de UMIA directamente en cualquier sistema HIS, ERP o software clínico propietario sin fricción técnica.",
    },
    {
      q: "¿Puedo acceder a mis pacientes desde mi teléfono o tablet fuera del consultorio?",
      a: "Sí. UMIA es una plataforma cloud responsive. Puedes revisar expedientes, responder dudas y consultar estudios desde tu iPhone, iPad, Android, Mac o PC con sincronización en tiempo real.",
    },
    {
      q: "¿Qué sucede si atiendo en varios consultorios o clínicas a la vez?",
      a: "Con una sola cuenta puedes configurar múltiples consultorios, asignando horarios, tarifas y secretarias independientes por sede, mientras mantienes un expediente clínico unificado de cada paciente.",
    },
  ];

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section
      id="faq"
      data-nav-theme="light"
      className="relative pt-6 pb-16 sm:pt-12 sm:pb-28 lg:pb-32 scroll-mt-20"
      style={{
        background:
          "linear-gradient(180deg, #F5F4F0 0%, #F5F4F0 59%, #D6E7E4 90%, #CAE2DF 100%)",
      }}
    >
      <div className="mx-auto max-w-4xl px-5 sm:px-6">
        <BlurFade inView>
          <div className="text-center">
            <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.16em] text-[#0F766E] uppercase">
              Respuestas Claras
            </span>
            <h2 className={`${h2} mt-3.5 sm:mt-4`}>
              Preguntas{" "}
              <span className="em-serif text-[#059669]">frecuentes</span>.
            </h2>
            <p className="mx-auto mt-3.5 sm:mt-4 max-w-xl text-[15px] sm:text-lg text-ink-2">
              Todo lo que necesitas saber antes de dar el salto al estándar digital médico de UMIA.
            </p>
          </div>
        </BlurFade>

        {/* Acordeón Interactivo con transición reversible CSS Grid (200ms open / 150ms close) */}
        <div className="mt-9 sm:mt-14 space-y-3 sm:space-y-4">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <BlurFade key={faq.q} inView delay={0.05 * i}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-[border-color,background-color,box-shadow] duration-150 ease-out",
                    isOpen
                      ? "border-primary-teal/40 bg-gradient-to-b from-[#f7faf9] to-[#ffffff] shadow-sm"
                      : "border-line bg-surface hover:border-primary-teal/20"
                  )}
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => toggle(i)}
                    className="flex w-full items-center justify-between p-4 sm:p-6 text-left font-medium text-deep-teal transition-colors duration-150 ease-out"
                  >
                    <span className="text-[15px] leading-snug sm:text-lg font-bold pr-3 sm:pr-4">{faq.q}</span>
                    <ChevronDown
                      strokeWidth={2.25}
                      absoluteStrokeWidth
                      className={cn(
                        "size-5 shrink-0 text-primary-teal transition-transform ease-out",
                        isOpen ? "rotate-180 duration-200" : "rotate-0 duration-150"
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "grid transition-[grid-template-rows,opacity] ease-out",
                      isOpen
                        ? "grid-rows-[1fr] opacity-100 duration-200"
                        : "grid-rows-[0fr] opacity-0 duration-150"
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="border-t border-line/60 px-4 pt-3 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-ink-2 leading-relaxed">
                        {faq.a}
                      </div>
                    </div>
                  </div>
                </div>
              </BlurFade>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================== */
/* 4. FINAL CTA (Con video ambiental médico sutil + #FFFFFF CTA)  */
/* ============================================================== */
export function FinalCta() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      data-nav-theme="dark"
      className="relative overflow-hidden bg-gradient-to-b from-deep-teal to-[#082829] px-5 py-18 sm:px-6 sm:py-28 lg:py-32 text-center text-canvas"
    >
      {/* Video ambiental clínico muy sutil detrás de la máscara verde oscuro */}
      <div className="pointer-events-none absolute inset-0">
        {!prefersReducedMotion && (
          <video
            src={assetPath("/videos/hero-1.mp4")}
            muted
            loop
            playsInline
            autoPlay
            aria-hidden="true"
            className="h-full w-full object-cover opacity-15 mix-blend-luminosity"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-deep-teal/90 via-deep-teal/80 to-[#082829]/95" />
        {/* Destello difuso orgánico sin cortes en los bordes con #BBF7D0 */}
        <div
          className="absolute inset-0 select-none"
          style={{
            background:
              "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(187, 247, 208, 0.22) 0%, rgba(187, 247, 208, 0.08) 40%, rgba(187, 247, 208, 0) 70%)",
            filter: "blur(20px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-3xl">
        <h2 className="font-display text-[2rem] leading-[1.12] text-balance sm:text-5xl lg:text-6xl sm:leading-tight">
          Evoluciona tu práctica al siguiente estándar{" "}
          <span className="em-serif text-[#BBF7D0]">médico</span>.
        </h2>
        <p className="mt-4 sm:mt-5 text-[15px] sm:text-lg text-mint/85 leading-relaxed">
          Comienza hoy sin tarjeta de crédito y comprueba cómo UMI transforma cada consulta médica.
        </p>

        <div className="mt-8 sm:mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href="#precios"
            className="inline-flex h-12 w-full max-w-xs sm:w-auto items-center justify-center rounded-full bg-[#FFFFFF] px-6 sm:px-8 text-sm sm:text-base font-bold text-deep-teal transition-colors duration-150 ease-out hover:bg-[#FFFFFF]/90"
          >
            Crear cuenta y probar gratis
          </a>
        </div>

        <p className="mt-5 text-xs leading-relaxed text-mint/60">
          Sin contratos de permanencia · Cancela en cualquier momento · Cumplimiento HIPAA
        </p>
      </div>
    </section>
  );
}

/* ============================================================== */
/* 5. FOOTER                                                      */
/* ============================================================== */
export function Footer() {
  return (
    <footer
      data-nav-theme="dark"
      className="border-t border-white/10 bg-[#051c1d] px-5 pt-12 pb-24 text-sm text-mint/70 sm:px-6 sm:py-14"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-10">
        {/* Columna 1: Logotipo UMIA y misión de marca */}
        <div className="col-span-2 md:col-span-1">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={assetPath("/umia-logo-white.svg")} alt="UMIA" className="h-7 w-auto" />
          <p className="mt-4 max-w-xs text-xs leading-relaxed text-mint/60">
            Uniendo Medicina, Inteligencia y Atención. La plataforma clínica agéntica líder en Latinoamérica.
          </p>
        </div>

        {/* Columna 2: Información Legal */}
        <div>
          <p className="mb-3 font-bold text-canvas uppercase text-xs tracking-wider">
            Información Legal
          </p>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="#terminos"
                className="transition-colors duration-150 hover:text-canvas"
              >
                Términos y condiciones
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 3: Privacidad y Seguridad */}
        <div>
          <p className="mb-3 font-bold text-canvas uppercase text-xs tracking-wider">
            Privacidad y Seguridad
          </p>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="#privacidad"
                className="transition-colors duration-150 hover:text-canvas"
              >
                Política de privacidad
              </a>
            </li>
          </ul>
        </div>

        {/* Columna 4: FAQ – Preguntas frecuentes */}
        <div className="col-span-2 sm:col-span-1">
          <p className="mb-3 font-bold text-canvas uppercase text-xs tracking-wider">
            FAQ – Preguntas frecuentes
          </p>
          <ul className="space-y-2 text-xs">
            <li>
              <a
                href="#faq"
                className="transition-colors duration-150 hover:text-canvas font-medium text-mint"
              >
                Preguntas frecuentes
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Barra inferior: RIF y contacto a la izquierda, Redes sociales a la derecha */}
      <div className="mx-auto mt-10 sm:mt-12 max-w-6xl border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left text-xs text-mint/70">
        <div className="space-y-1">
          <p className="font-semibold text-mint/95 tracking-wide">
            RIF J502621539 UNIDAD DE MEDICINA INTERNA AMBULATORIA (UMIA), C.A.
          </p>
          <p className="text-mint/70">
            Teléfono de contacto:{" "}
            <a
              href="tel:+584221282391"
              className="font-medium text-canvas hover:text-mint transition-colors duration-150 underline-offset-2 hover:underline"
            >
              +58 (422)128-2391
            </a>
          </p>
        </div>

        {/* Redes Sociales: LinkedIn, Instagram, X */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn de UMIA"
            className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-[#0d3436] text-canvas shadow-2xs transition-[background-color,border-color,transform] duration-150 hover:border-mint/40 hover:bg-[#13494c] hover:text-mint motion-safe:active:scale-95"
          >
            <span className="font-bold text-sm tracking-tight">in</span>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram de UMIA"
            className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-[#0d3436] text-canvas shadow-2xs transition-[background-color,border-color,transform] duration-150 hover:border-mint/40 hover:bg-[#13494c] hover:text-mint motion-safe:active:scale-95"
          >
            <svg
              className="size-4"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
            </svg>
          </a>
          <a
            href="https://x.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (Twitter) de UMIA"
            className="flex size-9 items-center justify-center rounded-lg border border-white/10 bg-[#0d3436] text-canvas shadow-2xs transition-[background-color,border-color,transform] duration-150 hover:border-mint/40 hover:bg-[#13494c] hover:text-mint motion-safe:active:scale-95"
          >
            <svg className="size-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
