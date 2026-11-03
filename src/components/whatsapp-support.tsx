"use client";

import { useState } from "react";

export function WhatsAppSupport() {
  const [isHovered, setIsHovered] = useState(false);

  const whatsappUrl =
    "https://wa.me/584120000000?text=Hola%20equipo%20de%20UMIA,%20quisiera%20solicitar%20soporte%20o%20m%C3%A1s%20informaci%C3%B3n.";

  return (
    <aside
      aria-label="Soporte por WhatsApp"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center gap-3"
    >
      {/* Tooltip flotante animado */}
      <div
        className={`hidden sm:flex items-center gap-2 rounded-full border border-line bg-surface/95 px-3.5 py-1.5 text-xs font-medium text-deep-teal shadow-lg backdrop-blur-md transition-[opacity,transform] duration-150 ease-out ${
          isHovered
            ? "translate-x-0 opacity-100"
            : "pointer-events-none translate-x-2 opacity-0"
        }`}
      >
        <span className="size-2 rounded-full bg-[#25D366] motion-safe:animate-pulse" />
        ¿Necesitas ayuda? Escríbenos
      </div>

      {/* Botón flotante WhatsApp */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chatear con soporte por WhatsApp"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="group relative flex size-12 sm:size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(37,211,102,0.45)] transition-[transform,box-shadow] duration-150 ease-out hover:scale-105 hover:shadow-[0_12px_32px_rgba(37,211,102,0.6)] motion-safe:active:scale-[0.96] focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        {/* Ping suave de llamada de atención */}
        <span className="absolute -inset-1 -z-10 rounded-full bg-[#25D366] opacity-30 motion-safe:group-hover:animate-ping" />

        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          className="size-6 sm:size-[30px] transition-transform duration-150 ease-out group-hover:scale-105"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
        </svg>
      </a>
    </aside>
  );
}
