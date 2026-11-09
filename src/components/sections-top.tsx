"use client";

import { useRef, useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { assetPath, cn } from "@/lib/utils";

/* ---------- 0. Navbar ---------- */
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
    ["Funciones", "#ecosistema"],
    ["UMI", "#umi"],
    ["Seguridad", "#seguridad"],
    ["B2B", "#b2b"],
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
              "inline-flex h-9 sm:h-10 lg:h-11 items-center justify-center rounded-full px-3.5 sm:px-5 lg:px-6 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors duration-150 ease-out",
              isDark
                ? "bg-[#FFFFFF] text-deep-teal hover:bg-[#FFFFFF]/90"
                : "bg-deep-teal text-white hover:bg-primary-teal"
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

/* ---------- 1. Hero ---------- */
export { HeroIsometric as Hero } from "@/components/hero-isometric";
