"use client";

import React from "react";
import {
  Code2,
  Network,
  Server,
  Database,
  Cpu,
  Layers,
  FileCode2,
  Workflow,
  ShieldCheck,
  ChevronRight,
  Boxes,
  Cable,
  Microscope,
} from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

interface GridSlot {
  row: number; // 0..4
  col: number; // 0..8
  hasIcon?: boolean;
  name?: string;
  icon?: React.ComponentType<{ className?: string }>;
  iconColor?: string;
  iconBg?: string;
  dimmed?: boolean;
}

const gridTiles: GridSlot[] = [
  // Fila 0
  { row: 0, col: 0, dimmed: true },
  { row: 0, col: 1, hasIcon: true, name: "HL7 FHIR", icon: Network, iconColor: "text-indigo-500", iconBg: "bg-indigo-50" },
  { row: 0, col: 2, dimmed: true },
  { row: 0, col: 3 },
  { row: 0, col: 4, hasIcon: true, name: "IA UMI", icon: Cpu, iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
  { row: 0, col: 5 },
  { row: 0, col: 6, hasIcon: true, name: "DICOM PACS", icon: Layers, iconColor: "text-sky-500", iconBg: "bg-sky-50" },
  { row: 0, col: 7, dimmed: true },
  { row: 0, col: 8 },

  // Fila 1
  { row: 1, col: 0 },
  { row: 1, col: 1 },
  { row: 1, col: 2, hasIcon: true, name: "WhatsApp API", icon: Workflow, iconColor: "text-teal-600", iconBg: "bg-teal-50" },
  { row: 1, col: 3 },
  { row: 1, col: 4 },
  { row: 1, col: 5 },
  { row: 1, col: 6 },
  { row: 1, col: 7, hasIcon: true, name: "HIS Hospital", icon: Server, iconColor: "text-slate-600", iconBg: "bg-slate-50" },
  { row: 1, col: 8, dimmed: true },

  // Fila 2 (Centro)
  { row: 2, col: 0, hasIcon: true, name: "REST API", icon: Code2, iconColor: "text-blue-600", iconBg: "bg-blue-50" },
  { row: 2, col: 1 },
  { row: 2, col: 2 },
  { row: 2, col: 3 },
  { row: 2, col: 4 },
  { row: 2, col: 5 },
  { row: 2, col: 6, hasIcon: true, name: "Webhooks", icon: Cable, iconColor: "text-amber-500", iconBg: "bg-amber-50" },
  { row: 2, col: 7 },
  { row: 2, col: 8, hasIcon: true, name: "SAP Salud", icon: Database, iconColor: "text-blue-700", iconBg: "bg-blue-50" },

  // Fila 3
  { row: 3, col: 0 },
  { row: 3, col: 1, hasIcon: true, name: "CIE-10 / 11", icon: FileCode2, iconColor: "text-rose-500", iconBg: "bg-rose-50" },
  { row: 3, col: 2 },
  { row: 3, col: 3 },
  { row: 3, col: 4 },
  { row: 3, col: 5, hasIcon: true, name: "LIS Lab", icon: Microscope, iconColor: "text-violet-500", iconBg: "bg-violet-50" },
  { row: 3, col: 6 },
  { row: 3, col: 7 },
  { row: 3, col: 8 },

  // Fila 4
  { row: 4, col: 0, dimmed: true },
  { row: 4, col: 1 },
  { row: 4, col: 2 },
  { row: 4, col: 3, hasIcon: true, name: "Cifrado mTLS", icon: ShieldCheck, iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
  { row: 4, col: 4 },
  { row: 4, col: 5 },
  { row: 4, col: 6 },
  { row: 4, col: 7, hasIcon: true, name: "EHR Bridge", icon: Boxes, iconColor: "text-cyan-600", iconBg: "bg-cyan-50" },
  { row: 4, col: 8, dimmed: true },
];

export function B2bApiSection() {
  return (
    <section
      id="api"
      data-nav-theme="light"
      className="relative overflow-hidden bg-gradient-to-b from-[#fbfbf8] via-[#f8faf9] to-[#f4f7f5] py-28 sm:py-36"
    >
      {/* ============================================================== */}
      {/* GRILLA NO CONTINUA DE TILES (Íconos con 50% de opacidad)       */}
      {/* ============================================================== */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden select-none">
        <div
          className="absolute h-[620px] w-[880px] rounded-full opacity-55"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(183, 216, 217, 0.42) 0%, rgba(221, 236, 238, 0.14) 50%, transparent 75%)",
          }}
        />

        <div className="grid grid-cols-5 sm:grid-cols-7 lg:grid-cols-9 gap-3.5 sm:gap-4 md:gap-5 p-4 max-w-[1400px] w-full justify-items-center">
          {gridTiles.map((tile, i) => {
            const Icon = tile.icon;

            if (tile.hasIcon && Icon) {
              return (
                <div
                  key={i}
                  className="flex h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 flex-col items-center justify-center rounded-[18px] sm:rounded-[22px] border border-white/90 bg-white opacity-50 shadow-[0_8px_24px_rgba(12,55,56,0.06),0_2px_6px_rgba(0,0,0,0.02)] backdrop-blur-md"
                >
                  <div
                    className={`flex h-8 w-8 sm:h-9 sm:w-9 lg:h-10 lg:w-10 items-center justify-center rounded-xl ${tile.iconBg || "bg-mint/40"}`}
                  >
                    <Icon
                      className={`h-4 w-4 sm:h-5 sm:w-5 lg:h-5 lg:w-5 ${tile.iconColor || "text-primary-teal"}`}
                    />
                  </div>
                  <span className="mt-1 hidden lg:block text-[9px] font-semibold tracking-tight text-deep-teal/70 text-center leading-none">
                    {tile.name}
                  </span>
                </div>
              );
            }

            return (
              <div
                key={i}
                className={`h-14 w-14 sm:h-16 sm:w-16 lg:h-20 lg:w-20 rounded-[18px] sm:rounded-[22px] border border-black/[0.03] ${
                  tile.dimmed
                    ? "bg-white/[0.22] opacity-25"
                    : "bg-white/[0.4] shadow-[0_4px_16px_rgba(0,0,0,0.015)] opacity-45"
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* ============================================================== */}
      {/* CONTENIDO PRINCIPAL CENTRADO + UN SOLO CTA SECUNDARIO          */}
      {/* ============================================================== */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <BlurFade inView>
          <span className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.16em] text-[#0F766E] uppercase">
            <Code2 className="h-4 w-4 text-[#0F766E]" strokeWidth={2} absoluteStrokeWidth />
            <span>Integración B2B para desarrolladores e instituciones</span>
          </span>

          <h2 className="font-display mt-4 text-3xl sm:text-5xl lg:text-[56px] leading-[1.12] text-deep-teal">
            Potencia y conecta cualquier{" "}
            <span className="em-serif text-primary-teal">software clínico</span> con nuestra API B2B
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-ink-2 leading-relaxed">
            Conecta la inteligencia artificial de UMI, transcripción médica, notas SOAP automáticas,
            emisión de récipes con QR y el expediente digital directo en tu propio HIS, ERP hospitalario
            o sistema existente sin cambiar de plataforma.
          </p>

          {/* ÚNICO CTA SECUNDARIO: "Saber más" */}
          <div className="mt-8 flex items-center justify-center">
            <a
              href="#precios"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border-2 border-primary-teal/35 bg-surface/90 pl-8 pr-7 text-sm font-semibold text-deep-teal shadow-xs backdrop-blur-sm transition-[background-color,border-color,transform] duration-150 ease-out hover:scale-[1.03] hover:border-primary-teal hover:bg-mint/40 motion-safe:active:scale-[0.96]"
            >
              <span>Saber más</span>
              <ChevronRight
                className="h-4 w-4 text-primary-teal"
                strokeWidth={2}
                absoluteStrokeWidth
              />
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}
