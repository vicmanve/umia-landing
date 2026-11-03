"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Check } from "lucide-react";
import { BlurFade } from "@/components/ui/blur-fade";
import {
  AgendaIllustration,
  DicomIllustration,
  PrivacyIllustration,
  RecipeIllustration,
  ScribeIllustration,
} from "@/components/illustrations";

const h2 = "font-display text-4xl leading-tight text-deep-teal sm:text-5xl";

/* ---------- 5. Ecosistema: cards apiladas con scroll ---------- */
const cards: { tag: string; title: string; text: string; bullets: string[]; art: ReactNode }[] = [
  {
    tag: "Scribe clínico",
    title: "Notas SOAP sin teclear una palabra",
    text: "UMI escucha la consulta y redacta la nota estructurada, con codificación CIE-10/11, adaptada a más de 30 especialidades.",
    bullets: ["Escucha ambiental pasiva", "Plantillas por especialidad", "Tú revisas y apruebas"],
    art: <ScribeIllustration />,
  },
  {
    tag: "Récipes e informes",
    title: "Récipes listos en un clic",
    text: "Posología, firma, sello y código QR de verificación. Compártelos por correo o WhatsApp en PDF profesional.",
    bullets: ["MPPS y colegiatura", "QR de autenticidad", "Envío directo al paciente"],
    art: <RecipeIllustration />,
  },
  {
    tag: "Visor DICOM",
    title: "Tus estudios, en el navegador",
    text: "Visualiza tomografías, resonancias y radiografías dentro de la ficha del paciente, sin instalar software pesado.",
    bullets: ["Zoom, contraste y mediciones", "Integrado al expediente", "Acceso desde cualquier equipo"],
    art: <DicomIllustration />,
  },
  {
    tag: "Agenda",
    title: "Agenda multiconsultorio",
    text: "Coordina consultas presenciales, virtuales y a domicilio, con recordatorios y acceso para tu secretaria.",
    bullets: ["Varios centros, una cuenta", "Recordatorios automáticos", "Permisos para secretaria"],
    art: <AgendaIllustration />,
  },
  {
    tag: "Privacidad",
    title: "Seguridad de grado médico",
    text: "Cifrado de extremo a extremo y respaldos continuos bajo estándares HIPAA y HL7. Tus datos y los de tus pacientes, protegidos.",
    bullets: ["Cifrado end-to-end", "Respaldos automáticos", "Interoperabilidad HL7"],
    art: <PrivacyIllustration />,
  },
];

function StackCard({
  i,
  progress,
  card,
}: {
  i: number;
  progress: MotionValue<number>;
  card: (typeof cards)[number];
}) {
  const n = cards.length;
  const scale = useTransform(progress, [i / n, 1], [1, 1 - (n - 1 - i) * 0.05]);
  return (
    <div className="sticky mb-10 last:mb-0" style={{ top: 104 + i * 22 }}>
      <motion.article
        style={{ scale }}
        className="grid origin-top items-center gap-8 rounded-3xl border border-line bg-[#FFFFFF] p-6 shadow-[0_20px_50px_rgba(12,55,56,0.08)] md:grid-cols-2 md:p-8"
      >
        <div>
          <span className="rounded-full bg-mint px-3 py-1 text-xs font-medium tracking-wider text-primary-teal uppercase">
            {card.tag}
          </span>
          <h3 className="font-display mt-4 text-3xl text-deep-teal">{card.title}</h3>
          <p className="mt-3 text-ink-2">{card.text}</p>
          <ul className="mt-5 space-y-2 text-sm text-ink">
            {card.bullets.map((b) => (
              <li key={b} className="flex items-center gap-2">
                <Check className="size-4 text-primary-teal" /> {b}
              </li>
            ))}
          </ul>
        </div>
        {card.art}
      </motion.article>
    </div>
  );
}

export function Ecosystem() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  return (
    <section id="ecosistema" data-nav-theme="light" className="bg-[#F5F4F0] py-24">
      <div className="mx-auto max-w-5xl px-6">
        <BlurFade inView>
          <h2 className={h2}>
            Un ecosistema médico <span className="em-serif">integral</span>.
          </h2>
          <p className="mt-3 text-ink-2">Todo lo que tu consulta necesita, en una sola plataforma.</p>
        </BlurFade>
        <div ref={ref} className="mt-12">
          {cards.map((c, i) => (
            <StackCard key={c.tag} i={i} progress={scrollYProgress} card={c} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- 9. Precios (sitio actual de UMIA) ---------- */
export function Pricing() {
  const [annual, setAnnual] = useState(false);

  const free = ["10 GB de almacenamiento", "50 h de IA", "Acceso básico", "1 usuario", "Soporte de la comunidad"];
  const pro = [
    "10 GB de almacenamiento",
    "50 h de IA al mes",
    "Acceso completo a la plataforma",
    "Plantillas IA · DICOM · PDF",
    "Compartir por correo",
    "Soporte prioritario 24/7",
  ];
  const clinic = ["Almacenamiento ilimitado", "REST API + Webhooks", "SSO + SLA empresarial", "Onboarding dedicado", "Cumplimiento a medida"];

  const list = (items: string[], dark = false) => (
    <ul className={`mt-6 flex-1 space-y-3 text-sm ${dark ? "text-canvas" : "text-ink"}`}>
      {items.map((x) => (
        <li key={x} className="flex items-center gap-3">
          <Check className={`size-4 shrink-0 ${dark ? "text-mint" : "text-primary-teal"}`} /> {x}
        </li>
      ))}
    </ul>
  );

  const btn = "mt-8 w-full rounded-full py-3 text-sm font-medium transition-transform hover:scale-[1.02]";

  return (
    <section id="precios" data-nav-theme="light" className="bg-canvas py-24">
      <div className="mx-auto max-w-5xl px-6">
        <BlurFade inView>
          <h2 className={`${h2} text-center`}>
            Planes <span className="em-serif">claros</span>, sin letra pequeña.
          </h2>
        </BlurFade>

        <div className="mx-auto mt-8 flex w-fit items-center rounded-full border border-line bg-surface p-1 text-sm">
          {[
            [false, "Mensual"],
            [true, "Anual −20%"],
          ].map(([v, l]) => (
            <button
              key={String(l)}
              onClick={() => setAnnual(v as boolean)}
              className={`rounded-full px-5 py-2 transition-colors ${
                annual === v ? "bg-[#2f7f80] font-medium text-white" : "text-ink-2"
              }`}
            >
              {l as string}
            </button>
          ))}
        </div>

        <div className="mt-14 grid items-stretch gap-6 md:grid-cols-3">
          {/* Free */}
          <div className="flex flex-col rounded-3xl bg-surface p-8 shadow-sm">
            <p className="text-sm text-ink">Free</p>
            <p className="mt-6 text-6xl font-bold tracking-tight text-ink">Free</p>
            <p className="mt-3 text-sm text-ink-2">Para conocer la plataforma.</p>
            {list(free)}
            <button className={`${btn} bg-[#2f7f80] text-white`}>Crear cuenta</button>
          </div>

          {/* Pro */}
          <div className="relative flex flex-col rounded-3xl bg-[#2f7f80] p-8 shadow-xl md:-my-4">
            <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-surface px-4 py-1 text-xs font-semibold text-[#2f7f80]">
              Más elegido
            </span>
            <p className="text-sm text-canvas">Pro</p>
            <p className="mt-6 text-6xl font-bold tracking-tight text-white">
              {annual ? "$240" : "$25"}
              <span className="ml-1 text-sm font-normal text-mint">{annual ? "/año" : "/mes"}</span>
            </p>
            <p className="mt-3 text-sm text-mint">Para médicos independientes.</p>
            {list(pro, true)}
            <button className={`${btn} bg-surface text-ink`}>Crear cuenta</button>
          </div>

          {/* Clínicas */}
          <div className="flex flex-col rounded-3xl bg-surface p-8 shadow-sm">
            <p className="text-sm text-ink">Clínicas / API</p>
            <p className="mt-6 text-6xl font-bold tracking-tight text-ink">
              Custom<span className="ml-1 text-sm font-normal text-ink-2">por volumen</span>
            </p>
            <p className="mt-3 text-sm text-ink-2">Integración B2B y on-premise.</p>
            {list(clinic)}
            <button className={`${btn} bg-[#2f7f80] text-white`}>Hablar con ventas</button>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3 rounded-2xl bg-mint p-5">
          <span className="text-sm font-medium text-deep-teal">¿Tienes un código de embajador?</span>
          <input
            placeholder="Ej: DRAANDREA3M"
            className="min-w-0 flex-1 rounded-full border border-line bg-surface px-4 py-2 text-sm outline-none"
          />
          <button className="rounded-full bg-deep-teal px-5 py-2 text-sm text-canvas">Aplicar 3 meses gratis</button>
        </div>
      </div>
    </section>
  );
}
