"use client";

import { useRef, useState, useEffect } from "react";
import { Mic, FileText, ShieldCheck, Sparkles, Stethoscope, Menu, X } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { WordRotate } from "@/components/ui/word-rotate";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { AnimatedBeam } from "@/components/ui/animated-beam";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { assetPath, cn } from "@/lib/utils";

const pill =
  "inline-flex items-center gap-2 rounded-full border border-primary-teal/20 bg-mint px-4 py-1.5 text-xs font-medium tracking-widest text-primary-teal uppercase";

/* ---------- 0. Navbar ---------- */
export function TopBar() {
  return null;
}

export function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isVisible, setIsVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Actualizar tema según la sección activa bajo el navbar
      const sections = document.querySelectorAll<HTMLElement>("[data-nav-theme]");
      const navY = 40;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= navY && rect.bottom > navY) {
          const sectionTheme = section.getAttribute("data-nav-theme");
          if (sectionTheme === "dark" || sectionTheme === "light") {
            setTheme(sectionTheme);
          }
          break;
        }
      }

      // Detectar si está en la parte superior
      setIsScrolled(currentScrollY > 20);

      // Si está casi arriba del todo, siempre visible
      if (currentScrollY <= 60) {
        setIsVisible(true);
      } else {
        // Al scrollear hacia abajo, ocultar; al scrollear hacia arriba, mostrar
        if (currentScrollY > lastScrollY.current + 4) {
          // Scrolling down
          setIsVisible(false);
          setMobileMenuOpen(false);
        } else if (currentScrollY < lastScrollY.current - 4) {
          // Scrolling up
          setIsVisible(true);
        }
      }

      lastScrollY.current = currentScrollY;
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileMenuOpen]);

  const links = [
    ["Historia Clínica", "#ecosistema"],
    ["Agente IA", "#umi"],
    ["Normativa", "#seguridad"],
    ["Planes", "#precios"],
  ];

  const isDark = theme === "dark";
  const showHeader = isVisible || mobileMenuOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 w-full transition-transform duration-300 ease-in-out",
        showHeader ? "translate-y-0" : "-translate-y-full"
      )}
    >
      {/* Fondo translúcido con degradado suave de arriba hacia abajo (abajo completamente transparente) */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-24 sm:h-32 transition-opacity duration-300",
          (isScrolled || mobileMenuOpen) && showHeader ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: isDark
            ? "linear-gradient(180deg, rgba(8, 32, 33, 0.95) 0%, rgba(12, 55, 56, 0.82) 35%, rgba(12, 55, 56, 0.48) 65%, rgba(12, 55, 56, 0.15) 85%, rgba(12, 55, 56, 0) 100%)"
            : "linear-gradient(180deg, rgba(245, 244, 240, 0.96) 0%, rgba(245, 244, 240, 0.82) 35%, rgba(245, 244, 240, 0.45) 65%, rgba(245, 244, 240, 0.12) 85%, rgba(245, 244, 240, 0) 100%)",
          backdropFilter: (isScrolled || mobileMenuOpen) && showHeader ? "blur(16px)" : "none",
          WebkitBackdropFilter: (isScrolled || mobileMenuOpen) && showHeader ? "blur(16px)" : "none",
          maskImage: "linear-gradient(to bottom, black 0%, black 50%, rgba(0, 0, 0, 0.5) 80%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 50%, rgba(0, 0, 0, 0.5) 80%, transparent 100%)",
        }}
      />
      {/* Sutil línea de brillo superior para definir el borde */}
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-px transition-opacity duration-300",
          (isScrolled || mobileMenuOpen) && showHeader ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: isDark
            ? "linear-gradient(90deg, transparent 0%, rgba(183, 216, 217, 0.25) 30%, rgba(183, 216, 217, 0.4) 50%, rgba(183, 216, 217, 0.25) 70%, transparent 100%)"
            : "linear-gradient(90deg, transparent 0%, rgba(12, 55, 56, 0.12) 50%, transparent 100%)",
        }}
      />

      <div className="relative mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-3 sm:px-8 sm:py-4 lg:px-12">
        {/* Logotipo a la izquierda */}
        <div className="flex shrink-0 items-center">
          <a
            href="#"
            aria-label="UMIA"
            onClick={() => setMobileMenuOpen(false)}
            className="transition-opacity duration-150 ease-out hover:opacity-85"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetPath(isDark ? "/umia-logo-white.svg" : "/umia-logo.png")}
              alt="UMIA"
              className="h-5 w-auto sm:h-6"
            />
          </a>
        </div>

        {/* Menú de navegación centrado en desktop amplio (lg+), evitando colisión en móvil/tablet */}
        <nav
          aria-label="Navegación principal"
          className="hidden lg:flex absolute left-1/2 -translate-x-1/2 items-center"
        >
          <ul className="flex items-center gap-1 xl:gap-2">
            {links.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  className={cn(
                    "inline-flex items-center rounded-full px-3.5 xl:px-5 py-2.5 text-sm font-semibold tracking-tight whitespace-nowrap transition-[color,background-color] duration-150 ease-out",
                    isDark
                      ? "text-white hover:bg-white/10 hover:text-white"
                      : "text-deep-teal/80 hover:bg-deep-teal/8 hover:text-deep-teal"
                  )}
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Acciones a la derecha */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-2.5">
          <a
            href="#"
            className={cn(
              "hidden sm:inline-flex h-10 lg:h-11 items-center justify-center rounded-full px-4 lg:px-5 text-sm font-medium whitespace-nowrap transition-colors duration-150 ease-out",
              isDark
                ? "text-white/90 hover:text-white"
                : "text-deep-teal/80 hover:text-deep-teal"
            )}
          >
            Iniciar sesión
          </a>
          <a
            href="#precios"
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              "inline-flex h-9 sm:h-10 lg:h-11 items-center justify-center rounded-full px-3.5 sm:px-5 lg:px-6 text-xs sm:text-sm font-semibold whitespace-nowrap transition-[background-color,color,box-shadow,transform] duration-150 ease-out hover:scale-[1.02] motion-safe:active:scale-[0.96]",
              isDark
                ? "bg-[#FFFFFF] text-deep-teal hover:bg-[#FFFFFF]/90 shadow-[0_4px_16px_rgba(0,0,0,0.18)]"
                : "bg-deep-teal text-white hover:bg-primary-teal shadow-[0_4px_16px_rgba(12,55,56,0.16)]"
            )}
          >
            Crear cuenta
          </a>

          {/* Botón de menú móvil / tablet */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={mobileMenuOpen}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={cn(
              "relative inline-flex h-9 w-9 sm:h-10 sm:w-10 lg:hidden items-center justify-center rounded-full border transition-[background-color,border-color,color,transform] duration-150 ease-out motion-safe:enabled:active:scale-[0.96]",
              isDark
                ? "border-white/20 bg-white/10 text-white hover:bg-white/18"
                : "border-deep-teal/15 bg-white/80 text-deep-teal hover:bg-white"
            )}
          >
            <Menu
              strokeWidth={2}
              absoluteStrokeWidth
              className={cn(
                "size-4.5 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:scale-100 motion-reduce:blur-0",
                mobileMenuOpen
                  ? "scale-25 opacity-0 blur-[4px]"
                  : "scale-100 opacity-100 blur-0"
              )}
            />
            <X
              strokeWidth={2}
              absoluteStrokeWidth
              className={cn(
                "absolute size-4.5 transition-[opacity,transform,filter] duration-300 ease-[cubic-bezier(0.2,0,0,1)] motion-reduce:scale-100 motion-reduce:blur-0",
                mobileMenuOpen
                  ? "scale-100 opacity-100 blur-0"
                  : "scale-25 opacity-0 blur-[4px]"
              )}
            />
          </button>
        </div>
      </div>

      {/* Menú desplegable móvil / tablet con transición reversible y overscroll-contain */}
      <div
        inert={!mobileMenuOpen || undefined}
        className={cn(
          "lg:hidden px-4 sm:px-8 transition-[opacity,transform,filter,visibility] ease-out motion-reduce:translate-y-0 motion-reduce:blur-0",
          mobileMenuOpen
            ? "visible pointer-events-auto translate-y-0 opacity-100 blur-0 duration-200"
            : "invisible pointer-events-none -translate-y-3 opacity-0 blur-[4px] duration-150"
        )}
      >
        <nav
          aria-label="Menú móvil"
          className={cn(
            "mx-auto max-w-md overflow-y-auto overscroll-contain rounded-[22px] border p-2.5 shadow-[0_20px_48px_rgba(0,0,0,0.28)] backdrop-blur-xl",
            isDark
              ? "border-white/15 bg-[#082425]/96 text-canvas"
              : "border-deep-teal/12 bg-[#FFFEFA]/96 text-deep-teal"
          )}
        >
          <ul className="space-y-1">
            {links.map(([label, href]) => (
              <li key={href}>
                <a
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-[12px] px-4 py-3 text-sm font-semibold transition-colors duration-150 ease-out",
                    isDark
                      ? "text-canvas hover:bg-white/10"
                      : "text-deep-teal hover:bg-mint/60"
                  )}
                >
                  <span>{label}</span>
                </a>
              </li>
            ))}
          </ul>
          <div
            className={cn(
              "mt-2 border-t pt-2 sm:hidden",
              isDark ? "border-white/10" : "border-line"
            )}
          >
            <a
              href="#"
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex h-10 w-full items-center justify-center rounded-[12px] text-sm font-semibold transition-colors duration-150 ease-out",
                isDark
                  ? "bg-white/10 text-white hover:bg-white/15"
                  : "bg-mint/60 text-deep-teal hover:bg-mint"
              )}
            >
              Iniciar sesión
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}

/* ---------- 1. Hero (Isometric 3D) ---------- */
export { HeroIsometric as Hero } from "@/components/hero-isometric";

/* ---------- 3. EFECTO WOW · UMI ---------- */
export function UmiSection() {
  const container = useRef<HTMLDivElement>(null);
  const center = useRef<HTMLDivElement>(null);
  const n1 = useRef<HTMLDivElement>(null);
  const n2 = useRef<HTMLDivElement>(null);
  const n3 = useRef<HTMLDivElement>(null);
  const n4 = useRef<HTMLDivElement>(null);

  const nodes = [
    { ref: n1, icon: FileText, label: "Nota SOAP", pos: "top-0 left-0" },
    { ref: n2, icon: Stethoscope, label: "Récipe digital", pos: "top-0 right-0" },
    { ref: n3, icon: ShieldCheck, label: "Alerta fármacos", pos: "bottom-0 left-0" },
    { ref: n4, icon: Mic, label: "Informe WhatsApp", pos: "bottom-0 right-0" },
  ];

  const acciones = [
    ["Escucha ambiental pasiva", "Conversa natural con tu paciente. UMI extrae síntomas, antecedentes y exploración sin que toques el teclado."],
    ["Alertas farmacológicas", "Cruza alergias y medicación actual y te avisa del riesgo de interacción antes de prescribir."],
    ["Récipes en segundos", "Detecta el plan discutido y deja el récipe listo con posología, MPPS y QR para WhatsApp."],
    ["Tú tienes la última palabra", "UMI nunca decide por ti: te entrega un borrador perfecto y apruebas con 1 clic."],
  ];

  return (
    <section id="umi" data-nav-theme="dark" className="relative overflow-hidden bg-deep-teal py-24 text-canvas">
      <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#b7d8d9" />
      <BackgroundBeams />
      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <BlurFade inView>
          <span className="inline-flex rounded-full border border-mint-strong/30 px-4 py-1.5 text-xs tracking-widest text-mint-strong uppercase">
            <Sparkles className="mr-2 size-4" /> La evolución de la IA en salud
          </span>
          <h2 className="font-display mt-6 max-w-3xl text-4xl leading-tight sm:text-5xl">
            Te presentamos a <span className="em-serif text-mint-strong">UMI</span>: La primera IA
            agéntica para medicina en Latam
          </h2>
          <p className="mt-5 max-w-2xl text-lg text-mint/80">
            Otras herramientas te piden dictar o corregir textos genéricos.{" "}
            <strong className="text-canvas">UMI actúa:</strong> escucha tu consulta y orquesta
            expediente, récipes y alertas mientras tú miras al paciente a los ojos.
          </p>
        </BlurFade>

        <div className="mt-14 grid items-center gap-12 lg:grid-cols-2">
          <CardContainer containerClassName="py-0" className="w-full">
            <CardBody className="h-auto w-full">
              <CardItem translateZ={40} className="w-full">
                <div
                  ref={container}
                  className="relative mx-auto h-[380px] w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-4 backdrop-blur"
                >
                  <div
                    ref={center}
                    className="absolute top-1/2 left-1/2 z-10 size-32 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-mint bg-mint shadow-[0_0_70px_#b7d8d9]"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={assetPath("/umi/umi-mascota.png")}
                      alt="UMI, la IA agéntica de UMIA"
                      className="size-full scale-125 object-cover"
                    />
                  </div>
                  {nodes.map(({ ref, icon: Icon, label, pos }) => (
                    <div key={label} className={cn("absolute m-4 flex flex-col items-center gap-1", pos)}>
                      <div ref={ref} className="flex size-14 items-center justify-center rounded-2xl border border-white/15 bg-primary-teal">
                        <Icon className="size-6 text-mint" />
                      </div>
                      <span className="text-xs text-mint/80">{label}</span>
                    </div>
                  ))}
                  {nodes.map(({ ref, label }, i) => (
                    <AnimatedBeam
                      key={label}
                      containerRef={container}
                      fromRef={center}
                      toRef={ref}
                      delay={i * 0.4}
                      gradientStartColor="#b7d8d9"
                      gradientStopColor="#194849"
                    />
                  ))}
                </div>
              </CardItem>
            </CardBody>
          </CardContainer>

          <ul className="space-y-4">
            {acciones.map(([t, d], i) => (
              <BlurFade key={t} inView delay={0.1 * i}>
                <li className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <h3 className="font-medium text-canvas">{t}</h3>
                  <p className="mt-1 text-sm text-mint/75">{d}</p>
                </li>
              </BlurFade>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function RotatingPain() {
  return (
    <section data-nav-theme="light" className="bg-canvas py-6 text-center text-ink-2">
      <span>Atiende sin</span>{" "}
      <WordRotate
        className="inline font-display text-xl text-deep-teal italic"
        words={["carpetas físicas", "tu WhatsApp personal", "noches de papeleo", "plantillas de Word"]}
      />
    </section>
  );
}
