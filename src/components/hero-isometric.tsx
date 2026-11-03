"use client";

import React, { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useReducedMotion } from "motion/react";
import { assetPath, cn } from "@/lib/utils";

// Lista de videos en Website con sus rutas servidas desde public
const HERO_VIDEOS = [
  "/videos/hero/5406017-uhd_3840_2160_25fps.mp4",
  "/videos/hero/5998350-hd_1920_1080_30fps.mp4",
  "/videos/hero/6010957-uhd_3840_2160_25fps.mp4",
  "/videos/hero/6234577-uhd_3840_2160_25fps.mp4",
  "/videos/hero/7580479-uhd_4096_2160_25fps.mp4",
].map(assetPath);

const SEGMENT_DURATION_MS = 6000;

export function HeroIsometric() {
  const prefersReducedMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Rotar cada 6 segundos al siguiente video
  useEffect(() => {
    if (prefersReducedMotion) return;

    // Asegurar que el video actual inicie desde 0
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      try {
        currentVideo.currentTime = 0;
        const playPromise = currentVideo.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            /* Silenciar posible bloqueo de autoplay */
          });
        }
      } catch {
        /* Ignorar */
      }
    }

    const timer = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % HERO_VIDEOS.length);
    }, SEGMENT_DURATION_MS);

    return () => clearTimeout(timer);
  }, [currentIndex, prefersReducedMotion]);

  return (
    <section
      data-nav-theme="dark"
      className="relative flex min-h-[82svh] sm:min-h-[88svh] lg:min-h-[92vh] w-full items-end overflow-hidden bg-deep-teal pt-24 pb-12 sm:pt-32 sm:pb-20 lg:pb-24"
    >
      {/* ============================================================== */}
      {/* VIDEOS EN EL FONDO (6s cada uno) + DEGRADADO DE FIGMA           */}
      {/* ============================================================== */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="grid h-full w-full">
          {HERO_VIDEOS.map((src, index) => {
            const isActive = index === currentIndex;
            return (
              <video
                key={src}
                ref={(el) => {
                  videoRefs.current[index] = el;
                }}
                src={src}
                muted
                playsInline
                preload="auto"
                aria-hidden="true"
                className={cn(
                  "[grid-area:1/1] h-full w-full object-cover object-[70%_25%] sm:object-[72%_center] lg:object-right transition-opacity duration-700 ease-in-out",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              />
            );
          })}
        </div>

        {/* Degradado móvil vertical: despeja la ventana superior para el video y asegura contraste sólido bajo el texto inferior */}
        <div
          className="absolute inset-0 md:hidden"
          style={{
            background:
              "linear-gradient(180deg, rgba(8, 38, 39, 0.52) 0%, rgba(12, 55, 56, 0.22) 28%, rgba(12, 55, 56, 0.84) 56%, rgba(12, 55, 56, 0.97) 76%, rgba(12, 55, 56, 1) 100%)",
          }}
        />

        {/* 
          Degradado Desktop exacto según Figma:
          Línea desde esquina inferior izquierda (0%, 100%) hacia esquina superior derecha (100%, 0%).
          Ángulo aproximado: atan2(width, height) ~ 62deg a 65deg.
          Stops oficiales:
            17%: #0C3738 a 100%
            31%: #0C3738 a 87% (rgba(12, 55, 56, 0.87))
            78%: #0C3738 a 0%   (rgba(12, 55, 56, 0))
        */}
        <div
          className="hidden md:block absolute inset-0"
          style={{
            background:
              "linear-gradient(64deg, rgba(12, 55, 56, 1) 0%, rgba(12, 55, 56, 1) 17%, rgba(12, 55, 56, 0.87) 31%, rgba(12, 55, 56, 0) 78%, rgba(12, 55, 56, 0) 100%)",
          }}
        />

        {/* 
          Destello de luz abajo a la izquierda en color #BBF7D0
          con núcleo luminoso radial y desenfoque suave tipo resplandor
        */}
        <div
          className="absolute -bottom-16 -left-16 sm:-bottom-24 sm:-left-24 h-80 w-80 sm:h-[440px] sm:w-[440px] lg:h-[520px] lg:w-[520px] rounded-full pointer-events-none select-none"
          style={{
            background:
              "radial-gradient(circle at 35% 65%, rgba(187, 247, 208, 0.42) 0%, rgba(187, 247, 208, 0.22) 28%, rgba(187, 247, 208, 0.08) 52%, transparent 72%)",
            filter: "blur(40px)",
            mixBlendMode: "screen",
          }}
        />

        {/* Sombra superior suave para mantener contraste con la navegación */}
        <div
          className="absolute inset-x-0 top-0 h-28"
          style={{
            background:
              "linear-gradient(180deg, rgba(8, 38, 39, 0.35) 0%, rgba(8, 38, 39, 0) 100%)",
          }}
        />
      </div>

      {/* ============================================================== */}
      {/* CONTENIDO ANCLADO ABAJO A LA IZQUIERDA                          */}
      {/* ============================================================== */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-12">
        <div className="flex max-w-xl lg:max-w-[630px] flex-col items-start text-left text-canvas">
          {/* Titular principal */}
          <h1 className="font-display text-[2.15rem] leading-[1.08] text-balance text-canvas sm:text-6xl sm:leading-[1.06] lg:text-[66px]">
            Tecnología enfocada{" "}
            <br className="hidden sm:inline" />
            en la <span className="em-serif text-[#BBF7D0]">salud</span> de tus pacientes.
          </h1>

          {/* Subtítulo descriptivo */}
          <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-mint/90 sm:mt-5 sm:text-lg">
            Transcribe consultas en tiempo real, redacta notas SOAP y emite récipes con
            estándar internacional en segundos.
          </p>

          {/* Fila de acciones proporcionada en móvil (full-width simétrico) y en línea en sm+ */}
          <div className="mt-7 flex w-full flex-col items-stretch gap-3 sm:mt-9 sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:gap-4">
            <a
              href="#precios"
              className="group inline-flex h-12 sm:h-13 w-full sm:w-auto items-center justify-between sm:justify-start gap-3 rounded-full bg-[#FFFFFF] py-1.5 pl-11 pr-1.5 sm:pl-6 sm:pr-2 text-sm font-semibold text-deep-teal shadow-[0_12px_28px_rgba(0,0,0,0.26)] transition-[background-color,box-shadow,transform] duration-150 ease-out hover:bg-[#FFFFFF]/95 hover:-translate-y-0.5 motion-safe:active:scale-[0.96]"
            >
              <span className="flex-1 text-center sm:flex-none">Crear cuenta gratis</span>
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-deep-teal text-canvas transition-transform duration-150 ease-out group-hover:translate-x-0.5">
                <ArrowRight className="size-4" strokeWidth={2.25} absoluteStrokeWidth />
              </span>
            </a>

            <a
              href="#precios"
              className="inline-flex h-12 sm:h-13 w-full sm:w-auto items-center justify-center rounded-full border border-white/35 bg-deep-teal/45 px-7 text-sm font-medium text-canvas backdrop-blur-md transition-[background-color,border-color,transform] duration-150 ease-out hover:border-white/65 hover:bg-deep-teal/65 hover:-translate-y-0.5 motion-safe:active:scale-[0.96]"
            >
              Ver planes
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
