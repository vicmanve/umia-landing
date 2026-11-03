"use client";

/* Ilustraciones explicativas (estilo mock-UI) para las cards del ecosistema. */

const frame =
  "relative flex h-72 w-full items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-mint to-[#c9dfe0] p-6";

export function ScribeIllustration() {
  return (
    <div className={frame}>
      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-3 rounded-2xl bg-surface p-4 shadow-lg">
          <div className="flex size-11 items-center justify-center rounded-full bg-deep-teal text-canvas">🎙</div>
          <div className="flex items-end gap-1">
            {[10, 24, 16, 30, 12, 22, 14, 26].map((h, i) => (
              <span
                key={i}
                style={{ height: h, animationDelay: `${i * 110}ms` }}
                className="w-1.5 animate-pulse rounded-full bg-primary-teal"
              />
            ))}
          </div>
          <span className="text-[11px] text-ink-2">Conversación</span>
        </div>
        <span className="text-2xl text-primary-teal">→</span>
        <div className="w-52 rounded-2xl bg-surface p-4 shadow-lg">
          <p className="mb-2 text-[11px] font-semibold tracking-wider text-primary-teal uppercase">Nota SOAP</p>
          {["S", "O", "A", "P"].map((k, i) => (
            <div key={k} className="mb-2 flex items-center gap-2">
              <span className="flex size-5 items-center justify-center rounded-full bg-deep-teal text-[10px] font-bold text-canvas">
                {k}
              </span>
              <span className="h-2 rounded-full bg-mint" style={{ width: `${90 - i * 14}%` }} />
            </div>
          ))}
          <span className="mt-1 inline-block rounded-full bg-mint px-2 py-0.5 text-[10px] text-primary-teal">CIE-11 ✓</span>
        </div>
      </div>
    </div>
  );
}

export function RecipeIllustration() {
  const qr = Array.from({ length: 49 }, (_, i) => (i * 7 + (i % 5) * 3) % 3 !== 0);
  return (
    <div className={frame}>
      <div className="w-56 rounded-xl bg-surface p-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-line pb-2">
          <span className="font-display text-2xl text-deep-teal italic">Rx</span>
          <span className="text-[10px] text-ink-2">MPPS · COL 12345</span>
        </div>
        <div className="mt-3 space-y-2">
          {[85, 70, 55].map((w) => (
            <div key={w} className="h-2 rounded-full bg-mint" style={{ width: `${w}%` }} />
          ))}
        </div>
        <div className="mt-4 flex items-end justify-between">
          <div className="grid grid-cols-7 gap-px">
            {qr.map((on, i) => (
              <span key={i} className={`size-1.5 ${on ? "bg-deep-teal" : "bg-transparent"}`} />
            ))}
          </div>
          <span className="rotate-[-8deg] rounded border border-primary-teal px-2 py-1 text-[9px] font-semibold text-primary-teal">
            FIRMADO
          </span>
        </div>
      </div>
      <div className="absolute right-6 bottom-8 max-w-[150px] rounded-2xl rounded-bl-sm bg-[#d9fdd3] px-3 py-2 text-xs text-ink shadow-lg">
        Récipe enviado al paciente ✓✓
      </div>
    </div>
  );
}

export function DicomIllustration() {
  return (
    <div className={frame}>
      <div className="relative h-full w-full max-w-sm overflow-hidden rounded-xl bg-[#0b1a1b] shadow-xl">
        <svg viewBox="0 0 300 200" className="size-full">
          <defs>
            <radialGradient id="scan" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#6fa9aa" stopOpacity=".9" />
              <stop offset="70%" stopColor="#2a5c5d" stopOpacity=".8" />
              <stop offset="100%" stopColor="#0b1a1b" stopOpacity="0" />
            </radialGradient>
          </defs>
          <ellipse cx="150" cy="100" rx="78" ry="88" fill="url(#scan)" />
          <ellipse cx="150" cy="100" rx="58" ry="68" fill="none" stroke="#b7d8d9" strokeOpacity=".35" />
          <ellipse cx="150" cy="100" rx="34" ry="42" fill="none" stroke="#b7d8d9" strokeOpacity=".3" />
          <path d="M150 40 V160 M92 100 H208" stroke="#ddecee" strokeOpacity=".25" strokeDasharray="4 4" />
          <line x1="112" y1="140" x2="190" y2="70" stroke="#f5d56b" strokeWidth="1.5" />
          <circle cx="112" cy="140" r="3" fill="#f5d56b" />
          <circle cx="190" cy="70" r="3" fill="#f5d56b" />
          <text x="150" y="112" fill="#f5d56b" fontSize="9">42.6 mm</text>
          <text x="10" y="16" fill="#b7d8d9" fontSize="9">TC · AXIAL 24/96</text>
          <text x="10" y="192" fill="#b7d8d9" fontSize="9">W 400 · L 40</text>
        </svg>
        <span className="absolute top-2 right-2 rounded-full bg-mint px-2 py-0.5 text-[10px] text-deep-teal">En el navegador</span>
      </div>
    </div>
  );
}

export function AgendaIllustration() {
  const days = ["L", "M", "X", "J", "V"];
  const ev: Record<string, [number, number, string]> = {
    L: [0, 2, "bg-deep-teal text-canvas"],
    M: [1, 1, "bg-primary-teal/80 text-canvas"],
    X: [0, 1, "bg-mint-strong text-deep-teal"],
    J: [2, 2, "bg-deep-teal text-canvas"],
    V: [1, 2, "bg-mint-strong text-deep-teal"],
  };
  return (
    <div className={frame}>
      <div className="w-full max-w-sm rounded-2xl bg-surface p-4 shadow-xl">
        <div className="grid grid-cols-5 gap-2">
          {days.map((d) => (
            <div key={d} className="text-center text-[11px] font-semibold text-ink-2">{d}</div>
          ))}
          {days.map((d) => (
            <div key={d} className="relative h-32 rounded-lg bg-canvas">
              <div
                className={`absolute inset-x-1 rounded-md ${ev[d][2]}`}
                style={{ top: 6 + ev[d][0] * 38, height: ev[d][1] * 34 }}
              />
            </div>
          ))}
        </div>
        <div className="mt-3 flex gap-2 text-[10px]">
          {["Presencial", "Virtual", "A domicilio"].map((t) => (
            <span key={t} className="rounded-full bg-mint px-2.5 py-1 text-primary-teal">{t}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

export function PrivacyIllustration() {
  return (
    <div className={frame}>
      <div className="relative flex items-center justify-center">
        <span className="absolute size-56 rounded-full border border-primary-teal/15" />
        <span className="absolute size-40 rounded-full border border-primary-teal/25" />
        <div className="relative flex size-28 items-center justify-center rounded-3xl bg-deep-teal shadow-2xl">
          <svg viewBox="0 0 24 24" className="size-14 text-mint" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6l7-3z" />
            <path d="M9 12l2 2 4-4" />
          </svg>
        </div>
        {[
          ["HIPAA", "-top-2 -left-20"],
          ["HL7", "top-4 -right-24"],
          ["AES-256", "-bottom-2 -left-24"],
          ["CIE-11", "bottom-4 -right-20"],
        ].map(([t, pos]) => (
          <span key={t} className={`absolute ${pos} rounded-full bg-surface px-3 py-1 text-xs font-medium text-primary-teal shadow-md`}>
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}
