"use client";

import React, { useRef, useState } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import {
  Mic,
  UserPlus,
  Sparkles,
  Check,
  QrCode,
  AlertTriangle,
  History,
  Pill,
  FileText,
} from "lucide-react";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { assetPath, cn } from "@/lib/utils";

type ScenarioId = "soap" | "recipe" | "paciente" | "resumen";

interface UmiScenario {
  id: ScenarioId;
  tabLabel: string;
  caption: string;
  icon: React.ComponentType<{
    className?: string;
    strokeWidth?: number;
    absoluteStrokeWidth?: boolean;
  }>;
}

const SCENARIOS: UmiScenario[] = [
  {
    id: "soap",
    tabLabel: "Notas SOAP",
    caption: "Escucha la consulta y estructura la nota clínica con CIE-10 al instante.",
    icon: Mic,
  },
  {
    id: "recipe",
    tabLabel: "Récipes",
    caption: "Convierte tu indicación hablada en un récipe firmado con código QR.",
    icon: Pill,
  },
  {
    id: "paciente",
    tabLabel: "Pacientes",
    caption: "Abre el expediente por voz y activa alertas de alergias automáticamente.",
    icon: UserPlus,
  },
  {
    id: "resumen",
    tabLabel: "Resumen",
    caption: "Sintetiza controles y laboratorios previos antes de recibir al paciente.",
    icon: History,
  },
];

const LOOP_SECONDS = 9.0;
const WAVE_BARS = [0.4, 0.85, 0.55, 1, 0.65, 0.9, 0.45, 0.78, 0.5];

/* ========================================================================== */
/* ILUSTRACIÓN EXPLICATIVA EN BUCLE ( ~3.6s animación + ~5s pausa antes de repetir ) */
/* ========================================================================== */
function UmiLoopIllustration({
  scenarioId,
  reducedMotion,
}: {
  scenarioId: ScenarioId;
  reducedMotion: boolean;
}) {
  const loopTransition = (times: number[], ease: "easeOut" | "easeInOut" | "linear" = "easeOut") =>
    reducedMotion
      ? { duration: 0 }
      : {
          duration: LOOP_SECONDS,
          repeat: Infinity,
          times,
          ease,
        };

  return (
    <div className="relative overflow-hidden rounded-[20px] border border-white/10 bg-[#082425]/95 p-4 sm:rounded-[20px] sm:p-8">
      {/* Resplandor ambiental sutil en el centro */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#BBF7D0]/10 blur-3xl"
      />

      <div className="relative z-10 grid items-center gap-2.5 sm:gap-4 lg:grid-cols-[1fr_auto_1.35fr] lg:gap-5">
        {/* ---------------------------------------------------------------- */}
        {/* 1. ENTRADA VISUAL (Voz o Historial previo — casi sin texto)       */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex min-h-[144px] sm:min-h-[168px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] p-4 sm:p-5">
          {scenarioId !== "resumen" ? (
            <>
              {/* Cápsula de micrófono con pulso en bucle */}
              <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#BBF7D0]/15 text-[#BBF7D0]">
                {!reducedMotion && (
                  <motion.span
                    animate={{
                      scale: [1, 1.45, 1.45, 1, 1],
                      opacity: [0.45, 0, 0, 0, 0.45],
                    }}
                    transition={loopTransition([0, 0.16, 0.5, 0.94, 1], "easeOut")}
                    className="absolute inset-0 rounded-full border border-[#BBF7D0]/50"
                  />
                )}
                <Mic className="size-5" strokeWidth={2} absoluteStrokeWidth />
              </div>

              {/* Onda de voz animada al inicio y en reposo durante la pausa */}
              <div className="mt-4 flex h-9 items-center justify-center gap-1.5 px-3">
                {WAVE_BARS.map((peak, idx) => {
                  const altPeak = 0.35 + ((idx * 2) % 3) * 0.22;
                  return (
                    <motion.span
                      key={idx}
                      animate={
                        reducedMotion
                          ? { scaleY: peak * 0.7 }
                          : {
                              scaleY: [
                                0.25,
                                idx % 2 === 0 ? peak : altPeak,
                                idx % 2 === 0 ? altPeak : peak,
                                peak * 0.8,
                                0.25,
                                0.25,
                              ],
                              opacity: [0.45, 1, 0.9, 0.95, 0.4, 0.45],
                            }
                      }
                      transition={loopTransition(
                        [0, 0.06, 0.12, 0.18, 0.26, 1],
                        "easeInOut"
                      )}
                      className="h-8 w-1.5 origin-center rounded-full bg-[#BBF7D0]"
                    />
                  );
                })}
              </div>

              {/* Siluetas mínimas de diálogo (solo en SOAP) o etiqueta de 1 palabra */}
              {scenarioId === "soap" ? (
                <div className="mt-3 flex w-full max-w-[170px] flex-col gap-1.5">
                  <motion.div
                    animate={
                      reducedMotion
                        ? { opacity: 1, x: 0 }
                        : {
                            opacity: [0, 1, 1, 0],
                            x: [-6, 0, 0, -4],
                          }
                    }
                    transition={loopTransition([0, 0.06, 0.94, 1])}
                    className="self-start rounded-lg rounded-tl-xs bg-white/10 px-2.5 py-1.5"
                  >
                    <div className="h-1.5 w-16 rounded-full bg-white/55" />
                  </motion.div>
                  <motion.div
                    animate={
                      reducedMotion
                        ? { opacity: 1, x: 0 }
                        : {
                            opacity: [0, 0, 1, 1, 0],
                            x: [6, 6, 0, 0, 4],
                          }
                    }
                    transition={loopTransition([0, 0.06, 0.13, 0.94, 1])}
                    className="self-end rounded-lg rounded-tr-xs bg-[#BBF7D0]/20 px-2.5 py-1.5"
                  >
                    <div className="h-1.5 w-20 rounded-full bg-[#BBF7D0]/85" />
                  </motion.div>
                </div>
              ) : (
                <span className="mt-3 text-[11px] font-semibold tracking-wider text-mint/65 uppercase">
                  Voz
                </span>
              )}
            </>
          ) : (
            /* Entrada visual para Resumen: 3 fichas previas convergiendo */
            <div className="flex flex-col items-center py-2">
              <div className="relative flex h-24 w-36 items-center justify-center">
                {[0, 1, 2].map((cardIdx) => {
                  const baseY = (cardIdx - 1) * 14;
                  const baseScale = 1 - (2 - cardIdx) * 0.05;
                  return (
                    <motion.div
                      key={cardIdx}
                      animate={
                        reducedMotion
                          ? { y: baseY, scale: baseScale, opacity: 1 }
                          : {
                              y: [baseY * 1.35, baseY, 0, 0, baseY * 1.35],
                              scale: [baseScale, baseScale, 0.92, 0.92, baseScale],
                              opacity: [0.55, 1, 0.9, 0.5, 0.55],
                            }
                      }
                      transition={loopTransition([0, 0.09, 0.2, 0.94, 1], "easeInOut")}
                      className="absolute flex h-11 w-32 items-center gap-2 rounded-xl border border-white/15 bg-[#123d3e] px-3 shadow-sm"
                    >
                      <FileText className="size-3.5 shrink-0 text-[#BBF7D0]" strokeWidth={2} />
                      <div className="flex-1 space-y-1">
                        <div className="h-1.5 w-14 rounded-full bg-white/70" />
                        <div className="h-1 w-9 rounded-full bg-white/30" />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
              <span className="mt-2 text-[11px] font-semibold tracking-wider text-mint/65 uppercase">
                3 Controles
              </span>
            </div>
          )}
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* 2. PUENTE AGÉNTICO UMI (Pulso luminoso viajando de entrada a UI)  */}
        {/* ---------------------------------------------------------------- */}
        <div className="flex flex-col items-center justify-center gap-1.5 sm:gap-2 lg:flex-row">
          {/* Conector izquierdo → UMI (Vertical en móvil / Horizontal en desktop) */}
          <div className="relative h-5 w-0.5 overflow-hidden rounded-full bg-white/12 lg:hidden">
            {!reducedMotion && (
              <motion.span
                animate={{ y: ["-100%", "100%", "100%"], opacity: [0, 1, 0] }}
                transition={loopTransition([0.03, 0.16, 1], "easeInOut")}
                className="block h-full w-full rounded-full bg-[#BBF7D0]"
              />
            )}
          </div>
          <div className="relative hidden h-0.5 w-11 overflow-hidden rounded-full bg-white/12 lg:block">
            {!reducedMotion && (
              <motion.span
                animate={{ x: ["-100%", "100%", "100%"], opacity: [0, 1, 0] }}
                transition={loopTransition([0.03, 0.16, 1], "easeInOut")}
                className="block h-full w-full rounded-full bg-[#BBF7D0]"
              />
            )}
          </div>

          {/* Núcleo UMI */}
          <motion.div
            animate={
              reducedMotion
                ? { scale: 1 }
                : {
                    scale: [1, 1, 1.09, 1, 1],
                  }
            }
            transition={loopTransition([0, 0.12, 0.18, 0.25, 1], "easeOut")}
            className="relative flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-2xl border border-[#BBF7D0]/30 bg-[#123e3f] shadow-[0_0_30px_rgba(187,247,208,0.16)]"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={assetPath("/umi/umi-mascota-3d.png")}
              alt="UMI"
              className="h-10 w-10 sm:h-12 sm:w-12 object-contain select-none"
            />
          </motion.div>

          {/* Conector UMI → Resultado (Vertical en móvil / Horizontal en desktop) */}
          <div className="relative h-5 w-0.5 overflow-hidden rounded-full bg-white/12 lg:hidden">
            {!reducedMotion && (
              <motion.span
                animate={{
                  y: ["-100%", "-100%", "100%", "100%"],
                  opacity: [0, 0, 1, 0],
                }}
                transition={loopTransition([0, 0.14, 0.24, 1], "easeInOut")}
                className="block h-full w-full rounded-full bg-[#BBF7D0]"
              />
            )}
          </div>
          <div className="relative hidden h-0.5 w-11 overflow-hidden rounded-full bg-white/12 lg:block">
            {!reducedMotion && (
              <motion.span
                animate={{
                  x: ["-100%", "-100%", "100%", "100%"],
                  opacity: [0, 0, 1, 0],
                }}
                transition={loopTransition([0, 0.14, 0.24, 1], "easeInOut")}
                className="block h-full w-full rounded-full bg-[#BBF7D0]"
              />
            )}
          </div>
        </div>

        {/* ---------------------------------------------------------------- */}
        {/* 3. RESULTADO CLÍNICO ANIMADO EN BUCLE (Se mantiene ~5s en pantalla)*/}
        {/* ---------------------------------------------------------------- */}
        <div className="flex min-h-[192px] flex-col justify-center rounded-2xl bg-[#FFFFFF] p-4 sm:p-5 text-deep-teal shadow-[0_14px_34px_rgba(0,0,0,0.22)]">
          {/* ======== ESCENARIO 1: NOTAS SOAP ======== */}
          {scenarioId === "soap" && (
            <div>
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="text-xs font-bold tracking-wider text-deep-teal uppercase">
                  SOAP
                </span>
                <motion.span
                  animate={
                    reducedMotion
                      ? { scale: 1, opacity: 1 }
                      : {
                          scale: [0.85, 0.85, 1, 1, 0.9],
                          opacity: [0, 0, 1, 1, 0],
                        }
                  }
                  transition={loopTransition([0, 0.33, 0.39, 0.94, 1])}
                  className="rounded-full bg-[#BBF7D0] px-2.5 py-0.5 text-[10px] font-bold text-deep-teal"
                >
                  CIE-10 · I10
                </motion.span>
              </div>

              <div className="mt-3.5 space-y-2.5">
                {(
                  [
                    ["S", "w-5/6", 0.18],
                    ["O", "w-2/3", 0.22],
                    ["A", "w-3/4", 0.26],
                    ["P", "w-4/5", 0.3],
                  ] as const
                ).map(([letter, widthClass, startAt]) => (
                  <div key={letter} className="flex items-center gap-2.5">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md bg-mint text-[10px] font-bold text-deep-teal">
                      {letter}
                    </span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#F5F4F0]">
                      <motion.div
                        animate={
                          reducedMotion
                            ? { scaleX: 1, opacity: 1 }
                            : {
                                scaleX: [0, 0, 1, 1, 0],
                                opacity: [0, 0, 1, 1, 0],
                              }
                        }
                        transition={loopTransition([
                          0,
                          startAt,
                          startAt + 0.07,
                          0.94,
                          1,
                        ])}
                        className={cn(
                          "h-full origin-left rounded-full bg-deep-teal/75",
                          widthClass
                        )}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-end">
                <motion.span
                  animate={
                    reducedMotion
                      ? { scale: 1, opacity: 1 }
                      : {
                          scale: [0.8, 0.8, 1, 1, 0.85],
                          opacity: [0, 0, 1, 1, 0],
                        }
                  }
                  transition={loopTransition([0, 0.37, 0.42, 0.94, 1])}
                  className="inline-flex items-center gap-1 rounded-full bg-deep-teal px-3 py-1 text-[11px] font-bold text-white"
                >
                  <Check className="size-3 text-[#BBF7D0]" strokeWidth={2.5} />
                  <span>Listo</span>
                </motion.span>
              </div>
            </div>
          )}

          {/* ======== ESCENARIO 2: RÉCIPE DIGITAL CON QR ======== */}
          {scenarioId === "recipe" && (
            <div>
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-mint text-deep-teal">
                    <Pill className="size-3.5" strokeWidth={2} />
                  </span>
                  <span className="text-xs font-bold tracking-wider text-deep-teal uppercase">
                    Rx
                  </span>
                </div>
                <span className="rounded-md bg-[#F5F4F0] px-2 py-0.5 text-[10px] font-bold text-deep-teal/70">
                  PDF
                </span>
              </div>

              {/* Líneas de prescripción dibujándose */}
              <div className="mt-3.5 rounded-xl bg-[#F5F4F0] p-3">
                <motion.div
                  animate={
                    reducedMotion
                      ? { scaleX: 1, opacity: 1 }
                      : {
                          scaleX: [0, 0, 1, 1, 0],
                          opacity: [0, 0, 1, 1, 0],
                        }
                  }
                  transition={loopTransition([0, 0.18, 0.26, 0.94, 1])}
                  className="h-2.5 w-3/4 origin-left rounded-full bg-deep-teal/80"
                />
                <motion.div
                  animate={
                    reducedMotion
                      ? { scaleX: 1, opacity: 1 }
                      : {
                          scaleX: [0, 0, 1, 1, 0],
                          opacity: [0, 0, 1, 1, 0],
                        }
                  }
                  transition={loopTransition([0, 0.22, 0.3, 0.94, 1])}
                  className="mt-2 h-2 w-1/2 origin-left rounded-full bg-deep-teal/35"
                />
              </div>

              {/* Firma médica trazándose + QR escaneado */}
              <div className="mt-3.5 flex items-end justify-between gap-4">
                <div className="flex-1">
                  <svg
                    viewBox="0 0 120 32"
                    className="h-7 w-28 text-deep-teal"
                    fill="none"
                    aria-hidden="true"
                  >
                    <motion.path
                      d="M6 24 C18 8, 26 26, 38 14 C46 6, 52 24, 64 16 C76 8, 88 22, 112 12"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      animate={
                        reducedMotion
                          ? { pathLength: 1, opacity: 1 }
                          : {
                              pathLength: [0, 0, 1, 1, 0],
                              opacity: [0, 0, 1, 1, 0],
                            }
                      }
                      transition={loopTransition([0, 0.27, 0.38, 0.94, 1], "easeInOut")}
                    />
                  </svg>
                  <div className="h-px w-28 bg-deep-teal/20" />
                </div>

                <motion.div
                  animate={
                    reducedMotion
                      ? { scale: 1, opacity: 1 }
                      : {
                          scale: [0.75, 0.75, 1, 1, 0.85],
                          opacity: [0, 0, 1, 1, 0],
                        }
                  }
                  transition={loopTransition([0, 0.32, 0.4, 0.94, 1])}
                  className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-deep-teal/15 bg-[#FFFFFF]"
                >
                  <QrCode className="size-8 text-deep-teal" strokeWidth={1.75} />
                  {!reducedMotion && (
                    <motion.span
                      animate={{
                        y: [-24, 24, 24],
                        opacity: [0, 1, 0],
                      }}
                      transition={loopTransition([0.34, 0.44, 1], "linear")}
                      className="absolute inset-x-0 h-1 bg-[#059669]/60"
                    />
                  )}
                </motion.div>
              </div>
            </div>
          )}

          {/* ======== ESCENARIO 3: NUEVO PACIENTE + ALERTA ======== */}
          {scenarioId === "paciente" && (
            <div>
              <div className="flex items-center justify-between border-b border-line pb-3">
                <div className="flex items-center gap-2.5">
                  <motion.div
                    animate={
                      reducedMotion
                        ? { scale: 1, opacity: 1 }
                        : {
                            scale: [0.7, 0.7, 1, 1, 0.8],
                            opacity: [0, 0, 1, 1, 0],
                          }
                    }
                    transition={loopTransition([0, 0.17, 0.24, 0.94, 1])}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-deep-teal text-[#BBF7D0]"
                  >
                    <UserPlus className="size-4" strokeWidth={2} />
                  </motion.div>
                  <div className="space-y-1.5">
                    <motion.div
                      animate={
                        reducedMotion
                          ? { scaleX: 1, opacity: 1 }
                          : {
                              scaleX: [0, 0, 1, 1, 0],
                              opacity: [0, 0, 1, 1, 0],
                            }
                      }
                      transition={loopTransition([0, 0.2, 0.28, 0.94, 1])}
                      className="h-2.5 w-24 origin-left rounded-full bg-deep-teal/85"
                    />
                    <motion.div
                      animate={
                        reducedMotion
                          ? { scaleX: 1, opacity: 1 }
                          : {
                              scaleX: [0, 0, 1, 1, 0],
                              opacity: [0, 0, 1, 1, 0],
                            }
                      }
                      transition={loopTransition([0, 0.24, 0.32, 0.94, 1])}
                      className="h-2 w-16 origin-left rounded-full bg-deep-teal/30"
                    />
                  </div>
                </div>

                <span className="rounded-full bg-mint px-2.5 py-0.5 text-[10px] font-bold text-deep-teal">
                  HCE
                </span>
              </div>

              {/* Alerta de alergia detectada automáticamente */}
              <motion.div
                animate={
                  reducedMotion
                    ? { y: 0, opacity: 1 }
                    : {
                        y: [8, 8, 0, 0, 4],
                        opacity: [0, 0, 1, 1, 0],
                      }
                }
                transition={loopTransition([0, 0.3, 0.37, 0.94, 1])}
                className="mt-3.5 flex items-center gap-2.5 rounded-xl border border-amber-300 bg-amber-50 px-3.5 py-2.5"
              >
                <AlertTriangle className="size-4 shrink-0 text-amber-600" strokeWidth={2.2} />
                <span className="text-[11px] font-bold text-amber-950">Alergia</span>
                <div className="h-2 flex-1 rounded-full bg-amber-900/20" />
              </motion.div>

              <div className="mt-3.5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="h-5 w-12 rounded-md bg-[#F5F4F0]" />
                  <span className="h-5 w-14 rounded-md bg-[#F5F4F0]" />
                </div>
                <motion.span
                  animate={
                    reducedMotion
                      ? { scale: 1, opacity: 1 }
                      : {
                          scale: [0.8, 0.8, 1, 1, 0.85],
                          opacity: [0, 0, 1, 1, 0],
                        }
                  }
                  transition={loopTransition([0, 0.36, 0.42, 0.94, 1])}
                  className="inline-flex items-center gap-1 rounded-full bg-[#BBF7D0] px-2.5 py-0.5 text-[10px] font-bold text-deep-teal"
                >
                  <Check className="size-3" strokeWidth={2.5} />
                  <span>Activo</span>
                </motion.span>
              </div>
            </div>
          )}

          {/* ======== ESCENARIO 4: RESUMEN CLÍNICO (3 → 1) ======== */}
          {scenarioId === "resumen" && (
            <div>
              <div className="flex items-center justify-between border-b border-line pb-3">
                <span className="rounded-full bg-mint px-2.5 py-0.5 text-[10px] font-bold text-deep-teal">
                  3 → 1
                </span>
                <motion.span
                  animate={
                    reducedMotion
                      ? { scale: 1, opacity: 1 }
                      : {
                          scale: [0.8, 0.8, 1, 1, 0.85],
                          opacity: [0, 0, 1, 1, 0],
                        }
                  }
                  transition={loopTransition([0, 0.36, 0.42, 0.94, 1])}
                  className="inline-flex items-center gap-1 rounded-full bg-[#BBF7D0] px-2.5 py-0.5 text-[10px] font-bold text-deep-teal"
                >
                  <Check className="size-3" strokeWidth={2.5} />
                  <span>Síntesis</span>
                </motion.span>
              </div>

              {/* Gráfica de evolución clínica animada */}
              <div className="relative mt-3.5 rounded-xl bg-[#F5F4F0] px-3.5 py-3">
                {/* Banda meta saludable */}
                <div className="absolute inset-x-3 bottom-2.5 h-4 rounded bg-[#BBF7D0]/55" />
                <svg
                  viewBox="0 0 200 48"
                  className="relative z-10 h-11 w-full text-deep-teal"
                  fill="none"
                  aria-hidden="true"
                >
                  <motion.path
                    d="M10 10 L75 22 L135 34 L190 36"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    animate={
                      reducedMotion
                        ? { pathLength: 1, opacity: 1 }
                        : {
                            pathLength: [0, 0, 1, 1, 0],
                            opacity: [0, 0, 1, 1, 0],
                          }
                    }
                    transition={loopTransition([0, 0.19, 0.34, 0.94, 1], "easeInOut")}
                  />
                  <motion.circle
                    cx="190"
                    cy="36"
                    r="4.5"
                    fill="#059669"
                    animate={
                      reducedMotion
                        ? { scale: 1, opacity: 1 }
                        : {
                            scale: [0, 0, 1.2, 1, 0],
                            opacity: [0, 0, 1, 1, 0],
                          }
                    }
                    transition={loopTransition([0, 0.31, 0.37, 0.94, 1])}
                  />
                </svg>
              </div>

              {/* 2 puntos clave resumidos */}
              <div className="mt-3 space-y-2">
                {[0.27, 0.32].map((startAt, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <span className="h-2 w-2 shrink-0 rounded-full bg-[#059669]" />
                    <motion.div
                      animate={
                        reducedMotion
                          ? { scaleX: 1, opacity: 1 }
                          : {
                              scaleX: [0, 0, 1, 1, 0],
                              opacity: [0, 0, 1, 1, 0],
                            }
                      }
                      transition={loopTransition([0, startAt, startAt + 0.07, 0.94, 1])}
                      className={cn(
                        "h-2 origin-left rounded-full bg-deep-teal/65",
                        idx === 0 ? "w-4/5" : "w-3/5"
                      )}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function UmiScrollSection() {
  const runwayRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = Boolean(useReducedMotion());
  const [activeScenarioId, setActiveScenarioId] = useState<ScenarioId>("soap");

  const activeScenario =
    SCENARIOS.find((s) => s.id === activeScenarioId) ?? SCENARIOS[0];

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start 48%", "end 52%"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.25,
  });

  const umiScale = useTransform(
    smoothProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1.45, 1]
  );
  const umiGlowOpacity = useTransform(smoothProgress, [0, 1], [0.55, 0.28]);

  const secondTitleOpacity = useTransform(
    smoothProgress,
    [0.45, 0.85],
    prefersReducedMotion ? [1, 1] : [0, 1]
  );
  const secondTitleY = useTransform(
    smoothProgress,
    [0.45, 0.85],
    prefersReducedMotion ? [0, 0] : [22, 0]
  );

  const simulatorOpacity = useTransform(
    smoothProgress,
    [0.62, 0.96],
    prefersReducedMotion ? [1, 1] : [0, 1]
  );
  const simulatorY = useTransform(
    smoothProgress,
    [0.62, 0.96],
    prefersReducedMotion ? [0, 0] : [28, 0]
  );

  return (
    <section
      id="umi"
      data-nav-theme="dark"
      className="relative bg-deep-teal py-16 sm:py-24 lg:py-32 text-canvas scroll-mt-20"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <Spotlight className="-top-40 left-0 md:-top-20 md:left-48" fill="#b7d8d9" />
        <BackgroundBeams className="opacity-45" />
      </div>

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-5 sm:px-6">
        {/* 1. CABECERA SUPERIOR */}
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 text-[11px] sm:text-xs font-semibold tracking-[0.16em] text-[#BBF7D0] uppercase">
            <Sparkles className="size-3.5 shrink-0 text-[#BBF7D0]" strokeWidth={2} absoluteStrokeWidth />
            <span>La evolución de la IA en salud</span>
          </span>

          <h2 className="font-display mt-4 max-w-2xl text-[2rem] leading-[1.1] text-balance text-canvas sm:text-5xl sm:leading-[1.08] lg:text-[58px]">
            Te presentamos la{" "}
            <span className="text-[#BBF7D0] underline decoration-[#BBF7D0]/80 decoration-[1.5px] underline-offset-[0.18em]">
              IA
            </span>{" "}
            <br className="hidden sm:inline" />
            como nunca la habías{" "}
            <br className="hidden sm:inline" />
            visto.
          </h2>
        </div>

        {/* 2. PISTA STICKY DE UMI (proporcionada en móvil para que scale 1.45 no desborde ni colisione) */}
        <div
          ref={runwayRef}
          className="relative mt-8 sm:mt-12 flex h-[290px] sm:h-[420px] lg:h-[480px] w-full justify-center"
        >
          <div className="sticky top-[18svh] sm:top-[16vh] flex h-[176px] sm:h-[260px] lg:h-[300px] items-start justify-center">
            <motion.div
              style={{
                scale: umiScale,
                transformOrigin: "center top",
              }}
              className="relative flex h-[176px] w-[176px] sm:h-[260px] sm:w-[260px] lg:h-[300px] lg:w-[300px] items-center justify-center"
            >
              <motion.div
                style={{ opacity: umiGlowOpacity }}
                className="pointer-events-none absolute inset-4 rounded-full bg-[#BBF7D0]/30 blur-3xl"
              />

              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={assetPath("/umi/umi-mascota-3d.png")}
                alt="UMI - La primera IA agéntica para medicina en Latinoamérica"
                className="relative z-10 h-full w-full object-contain drop-shadow-[0_26px_48px_rgba(0,0,0,0.42)] select-none"
              />
            </motion.div>
          </div>
        </div>

        {/* 3. SEGUNDO TÍTULO */}
        <motion.div
          style={{
            opacity: secondTitleOpacity,
            y: secondTitleY,
          }}
          className="mt-6 sm:mt-6 flex flex-col items-center text-center"
        >
          <h3 className="font-display text-3xl sm:text-5xl lg:text-[50px] leading-tight text-canvas">
            Conoce a UMI
          </h3>
          <p className="mt-2 max-w-lg text-sm sm:text-base text-mint/80">
            La primera IA agéntica para medicina en Latinoamérica.
          </p>
        </motion.div>

        {/* 4. DEMOSTRACIÓN ANIMADA EN BUCLE POR CADA SECCIÓN DE UMI */}
        <motion.div
          style={{
            opacity: simulatorOpacity,
            y: simulatorY,
          }}
          className="mt-7 sm:mt-10 w-full max-w-4xl"
        >
          {/* Chips de selección: grilla simétrica 2x2 en móvil y fila centrada en sm+ */}
          <div
            role="tablist"
            aria-label="Capacidades de UMI"
            className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:items-center sm:justify-center sm:gap-2.5"
          >
            {SCENARIOS.map((scenario) => {
              const Icon = scenario.icon;
              const isSelected = scenario.id === activeScenario.id;

              return (
                <button
                  key={scenario.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveScenarioId(scenario.id)}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-full border px-3.5 py-2.5 sm:px-4 sm:py-2 text-xs sm:text-[13px] font-semibold tracking-tight whitespace-nowrap transition-[background-color,border-color,color,transform] duration-150 ease-out focus:outline-none motion-safe:enabled:active:scale-[0.96]",
                    isSelected
                      ? "border-[#FFFFFF] bg-[#FFFFFF] text-deep-teal"
                      : "border-white/15 bg-white/[0.04] text-mint/85 hover:border-white/30 hover:bg-white/[0.09] hover:text-white"
                  )}
                >
                  <Icon
                    className={cn(
                      "size-3.5 shrink-0 transition-colors duration-150",
                      isSelected ? "text-deep-teal" : "text-[#BBF7D0]"
                    )}
                    strokeWidth={2}
                    absoluteStrokeWidth
                  />
                  <span>{scenario.tabLabel}</span>
                </button>
              );
            })}
          </div>

          {/* Una sola línea breve de apoyo fuera de la ilustración */}
          <p className="mx-auto mt-4 max-w-md text-center text-xs sm:text-sm leading-relaxed text-mint/80">
            {activeScenario.caption}
          </p>

          {/* Escenario ilustrado en bucle continuo (concéntrico: 28px - 8px = 20px, 30px - 10px = 20px) */}
          <div className="mt-4 sm:mt-5 rounded-[28px] sm:rounded-[30px] border border-white/12 bg-[#113f40]/70 p-2 sm:p-2.5 backdrop-blur-md">
            <UmiLoopIllustration
              key={activeScenario.id}
              scenarioId={activeScenario.id}
              reducedMotion={prefersReducedMotion}
            />
          </div>

          {/* Video demostración de UMI con Hispana Seguros con buen espaciado */}
          <div className="mt-8 sm:mt-12 w-full">
            <div className="overflow-hidden rounded-[24px] sm:rounded-[32px] border border-white/15 bg-[#0e3637]/75 p-2 sm:p-3 shadow-2xl backdrop-blur-md">
              <div className="relative aspect-video w-full overflow-hidden rounded-[18px] sm:rounded-[22px] bg-[#051c1d]">
                <video
                  src={assetPath("/videos/umia-hispana-seguros-16x9.mp4")}
                  controls
                  playsInline
                  autoPlay={!prefersReducedMotion}
                  muted
                  loop
                  preload="metadata"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
