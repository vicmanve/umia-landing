"use client";

import { ShieldCheck, BookOpenCheck, Lock, CheckCircle2 } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import { assetPath } from "@/lib/utils";

export function StandardsSection() {
  return (
    <section
      id="seguridad"
      data-nav-theme="light"
      className="border-y border-line bg-surface py-16 sm:py-24 lg:py-28 scroll-mt-20 overflow-hidden"
    >
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="grid items-center gap-10 sm:gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Columna Izquierda: Información de OMS CIE-10 / CIE-11 y Seguridad de Datos */}
          <div className="lg:col-span-7">
            <BlurFade inView>
              <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.16em] text-[#0F766E] uppercase">
                <ShieldCheck className="size-4 shrink-0 text-[#0F766E]" strokeWidth={2} absoluteStrokeWidth />
                <span>Cumplimiento y Normativa Médica</span>
              </span>

              <h2 className="font-display mt-3.5 sm:mt-4 text-[1.85rem] leading-[1.14] text-balance text-deep-teal sm:text-5xl">
                Estándares clínicos y{" "}
                <span className="em-serif text-[#059669]">seguridad</span> para tu consulta médica.
              </h2>

              <div className="mt-6 sm:mt-8 space-y-3.5 sm:space-y-5">
                {/* Estándar 1: OMS CIE-10 / CIE-11 */}
                <div className="flex items-start gap-3.5 sm:gap-4 rounded-2xl border border-line bg-[#FFFFFF] p-4 sm:p-5 shadow-2xs transition-[border-color,box-shadow] duration-150 ease-out hover:border-primary-teal/30 hover:shadow-xs">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-primary-teal">
                    <BookOpenCheck className="size-5" strokeWidth={2} absoluteStrokeWidth />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                      <h3 className="text-[15px] sm:text-lg font-bold leading-snug text-deep-teal">
                        Estándar OMS CIE-10 / CIE-11
                      </h3>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-mint px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap text-primary-teal">
                        <CheckCircle2 className="size-3 shrink-0" strokeWidth={2.5} />
                        Oficial
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                      Codificación diagnóstica estandarizada según la OMS para interoperabilidad y validez médica internacional.
                    </p>
                  </div>
                </div>

                {/* Estándar 2: Seguridad y Protección de Datos */}
                <div className="flex items-start gap-3.5 sm:gap-4 rounded-2xl border border-line bg-[#FFFFFF] p-4 sm:p-5 shadow-2xs transition-[border-color,box-shadow] duration-150 ease-out hover:border-primary-teal/30 hover:shadow-xs">
                  <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-mint text-primary-teal">
                    <Lock className="size-5" strokeWidth={2} absoluteStrokeWidth />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-x-2 gap-y-1.5">
                      <h3 className="text-[15px] sm:text-lg font-bold leading-snug text-deep-teal">
                        Seguridad y Privacidad de Datos
                      </h3>
                      <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-mint px-2 py-0.5 text-[11px] font-semibold whitespace-nowrap text-primary-teal">
                        <CheckCircle2 className="size-3 shrink-0" strokeWidth={2.5} />
                        Cifrado militar
                      </span>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-2">
                      Cifrado de grado médico en reposo y en tránsito (AES-256 / TLS) con respaldos continuos que blindan tus historias clínicas.
                    </p>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>

          {/* Columna Derecha: Foto de la doctora adjunta por el usuario */}
          <div className="lg:col-span-5">
            <BlurFade inView delay={0.15}>
              <div className="relative mx-auto max-w-[380px] sm:max-w-[420px] lg:max-w-none">
                {/* Marco de fotografía médico con acabados limpios */}
                <div className="relative aspect-[4/4.5] w-full overflow-hidden rounded-[26px] sm:rounded-[28px] border border-line bg-canvas shadow-[0_20px_50px_rgba(12,55,56,0.12)] outline outline-1 -outline-offset-1 outline-black/10">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={assetPath("/compliance-doctor.jpg")}
                    alt="Especialistas de UMIA con expediente digital seguro y blindado"
                    className="h-full w-full object-cover object-center"
                  />
                  {/* Sutil viñeta degradada inferior */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-deep-teal/40 via-transparent to-transparent" />

                  {/* Badge flotante en la foto (concéntrico: 26px - 12px = 14px en móvil, 28px - 16px = 12px/14px) */}
                  <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 flex items-center justify-between rounded-[14px] sm:rounded-2xl border border-white/60 bg-white/92 px-3.5 py-2.5 sm:px-4 sm:py-3 shadow-[0_12px_28px_rgba(12,55,56,0.18)] backdrop-blur-md">
                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-deep-teal text-mint-strong">
                        <ShieldCheck className="size-4.5 sm:size-5" strokeWidth={2} absoluteStrokeWidth />
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-deep-teal">Expedientes 100% Blindados</p>
                        <p className="truncate text-[11px] text-ink-2">OMS CIE-10/11 &amp; Cifrado AES-256</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </BlurFade>
          </div>
        </div>
      </div>
    </section>
  );
}
