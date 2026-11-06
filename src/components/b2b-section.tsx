"use client";

import {
  Code2,
  Network,
  FileText,
  Layers,
  Server,
  Database,
  Boxes,
  MessageSquare,
  Sparkles,
  Webhook,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";

export function B2bSection() {
  return (
    <section
      id="b2b"
      data-nav-theme="light"
      className="relative overflow-hidden bg-gradient-to-b from-[#F9F9F8] via-[#FFFFFF] to-[#F5F4F0] py-20 sm:py-28 lg:py-36 scroll-mt-20 border-t border-line"
    >
      {/* Resplandor radial médico suave en el fondo */}
      <div className="pointer-events-none absolute inset-0 select-none">
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[900px] rounded-full opacity-40 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(187,247,208,0.35) 0%, rgba(209,250,229,0.18) 45%, transparent 70%)",
          }}
        />
      </div>

      {/* Constelación de Cards Flotantes en Desktop (conforme a la imagen de referencia) */}
      <div className="pointer-events-none absolute inset-0 hidden select-none lg:block">
        <div className="relative mx-auto h-full max-w-7xl">
          {/* Card 1: HL7 FHIR (Arriba Izquierda) */}
          <div className="absolute top-[12%] left-[9%] xl:left-[11%] animate-float-slow">
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-line/80 bg-white/95 px-5 py-4 shadow-[0_12px_28px_rgba(25,72,73,0.08)] backdrop-blur-sm transition-transform duration-300 hover:scale-105">
              <div className="flex size-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                <Network className="size-5" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold tracking-tight text-deep-teal">
                HL7 FHIR
              </span>
            </div>
          </div>

          {/* Card 2: REST API (Centro Izquierda) */}
          <div className="absolute top-[48%] left-[4%] xl:left-[5%] -translate-y-1/2 animate-float-mid">
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-line/80 bg-white/95 px-5 py-4 shadow-[0_12px_28px_rgba(25,72,73,0.08)] backdrop-blur-sm transition-transform duration-300 hover:scale-105">
              <div className="flex size-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600">
                <Code2 className="size-5" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold tracking-tight text-deep-teal">
                REST API
              </span>
            </div>
          </div>

          {/* Card 3: CIE-10/11 (Abajo Izquierda) */}
          <div className="absolute bottom-[14%] left-[9%] xl:left-[12%] animate-float-slow">
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-line/80 bg-white/95 px-5 py-4 shadow-[0_12px_28px_rgba(25,72,73,0.08)] backdrop-blur-sm transition-transform duration-300 hover:scale-105">
              <div className="flex size-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
                <FileText className="size-5" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold tracking-tight text-deep-teal">
                CIE-10/11
              </span>
            </div>
          </div>

          {/* Card 4: DICOM PACS (Arriba Derecha) */}
          <div className="absolute top-[12%] right-[9%] xl:right-[11%] animate-float-slow">
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-line/80 bg-white/95 px-5 py-4 shadow-[0_12px_28px_rgba(25,72,73,0.08)] backdrop-blur-sm transition-transform duration-300 hover:scale-105">
              <div className="flex size-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                <Layers className="size-5" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold tracking-tight text-deep-teal">
                DICOM PACS
              </span>
            </div>
          </div>

          {/* Card 5: HIS Hospital (Centro Derecha) */}
          <div className="absolute top-[34%] right-[6%] xl:right-[7%] animate-float-fast">
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-line/80 bg-white/95 px-5 py-4 shadow-[0_12px_28px_rgba(25,72,73,0.08)] backdrop-blur-sm transition-transform duration-300 hover:scale-105">
              <div className="flex size-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                <Server className="size-5" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold tracking-tight text-deep-teal">
                HIS Hospital
              </span>
            </div>
          </div>

          {/* Card 6: SAP Salud (Extremo Derecha) */}
          <div className="absolute top-[52%] right-[2.5%] xl:right-[3.5%] animate-float-mid">
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-line/80 bg-white/95 px-5 py-4 shadow-[0_12px_28px_rgba(25,72,73,0.08)] backdrop-blur-sm transition-transform duration-300 hover:scale-105">
              <div className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Database className="size-5" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold tracking-tight text-deep-teal">
                SAP Salud
              </span>
            </div>
          </div>

          {/* Card 7: EHR Bridge (Abajo Derecha) */}
          <div className="absolute bottom-[14%] right-[9%] xl:right-[12%] animate-float-slow">
            <div className="flex flex-col items-center gap-2 rounded-2xl border border-line/80 bg-white/95 px-5 py-4 shadow-[0_12px_28px_rgba(25,72,73,0.08)] backdrop-blur-sm transition-transform duration-300 hover:scale-105">
              <div className="flex size-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                <Boxes className="size-5" strokeWidth={2} />
              </div>
              <span className="text-[11px] font-bold tracking-tight text-deep-teal">
                EHR Bridge
              </span>
            </div>
          </div>

          {/* Chips tenues de fondo (Watermarks como en la imagen) */}
          <div className="absolute top-[38%] left-[18%] opacity-35 scale-90">
            <div className="flex items-center gap-2 rounded-xl border border-line/50 bg-white/60 px-3 py-2 text-[10px] font-medium text-ink-2 shadow-2xs">
              <MessageSquare className="size-3.5 text-emerald-500" />
              <span>WhatsApp API</span>
            </div>
          </div>

          <div className="absolute top-[18%] left-[46%] -translate-x-1/2 opacity-35 scale-90">
            <div className="flex items-center gap-1.5 rounded-xl border border-line/50 bg-white/60 px-3 py-2 text-[10px] font-medium text-ink-2 shadow-2xs">
              <Sparkles className="size-3.5 text-amber-500" />
              <span>IA UMI</span>
            </div>
          </div>

          <div className="absolute top-[48%] right-[18%] opacity-35 scale-90">
            <div className="flex items-center gap-1.5 rounded-xl border border-line/50 bg-white/60 px-3 py-2 text-[10px] font-medium text-ink-2 shadow-2xs">
              <Webhook className="size-3.5 text-orange-500" />
              <span>Webhooks</span>
            </div>
          </div>

          <div className="absolute bottom-[22%] left-[36%] opacity-35 scale-90">
            <div className="flex items-center gap-1.5 rounded-xl border border-line/50 bg-white/60 px-3 py-2 text-[10px] font-medium text-ink-2 shadow-2xs">
              <ShieldCheck className="size-3.5 text-teal-600" />
              <span>Cifrado mTLS</span>
            </div>
          </div>

          {/* Elementos suaves vacíos para efecto visual de profundidad multicapa */}
          <div className="absolute top-[18%] left-[3%] size-16 rounded-2xl border border-line/30 bg-white/20 blur-[1px] opacity-25" />
          <div className="absolute bottom-[10%] right-[3%] size-20 rounded-2xl border border-line/30 bg-white/25 blur-[1px] opacity-25" />
        </div>
      </div>

      {/* Contenido Central */}
      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center sm:px-6">
        <BlurFade inView>
          {/* Pill superior */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0F766E]/20 bg-[#E6F4F2]/90 px-4 py-1.5 text-[11px] sm:text-xs font-semibold tracking-wider text-[#0F766E] uppercase shadow-2xs backdrop-blur-xs">
            <Code2 className="size-3.5 shrink-0 text-[#0F766E]" strokeWidth={2.5} />
            <span>Integración B2B para desarrolladores e instituciones</span>
          </div>

          {/* Título principal con em-serif en "software clínico" y subrayado verde */}
          <h2 className="font-display mt-5 sm:mt-6 text-[2rem] leading-[1.12] text-balance text-deep-teal sm:text-5xl lg:text-[54px] sm:leading-[1.1]">
            Potencia y conecta cualquier{" "}
            <span className="em-serif italic text-deep-teal underline decoration-[#059669] decoration-[2px] underline-offset-[6px] sm:underline-offset-[10px]">
              software clínico
            </span>{" "}
            con nuestra API B2B
          </h2>

          {/* Párrafo explicativo */}
          <p className="mx-auto mt-4 sm:mt-6 max-w-2xl sm:max-w-3xl text-[15px] sm:text-lg leading-relaxed text-ink-2">
            Conecta la inteligencia artificial de UMI, transcripción médica, notas SOAP automáticas, emisión de récipes con QR y el expediente digital directo en tu propio HIS, ERP hospitalario o sistema existente sin cambiar de plataforma.
          </p>

          {/* UN SOLO CTA */}
          <div className="mt-8 sm:mt-10 flex justify-center">
            <a
              href="https://wa.me/584221282391?text=Hola%20equipo%20de%20UMIA,%20estoy%20interesado%20en%20la%20integraci%C3%B3n%20B2B%20y%20API%20cl%C3%ADnica.%20Quisiera%20solicitar%20m%C3%A1s%20informaci%C3%B3n."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-deep-teal px-8 py-4 text-sm sm:text-base font-bold text-canvas transition-colors duration-150 ease-out hover:bg-[#123637]"
            >
              <span>Solicitar más información</span>
              <ArrowRight className="size-4 shrink-0" />
            </a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
}

