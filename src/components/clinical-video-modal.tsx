"use client";

import React, { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { X } from "lucide-react";

interface ClinicalVideoModalProps {
  open: boolean;
  onClose: () => void;
  videoSrc: string;
  posterSrc?: string;
  title: string;
  subtitle?: string;
}

export function ClinicalVideoModal({
  open,
  onClose,
  videoSrc,
  posterSrc,
  title,
  subtitle,
}: ClinicalVideoModalProps) {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-label={title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2, ease: "easeOut" } }}
          exit={{ opacity: 0, transition: { duration: 0.15, ease: "easeOut" } }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center overflow-y-auto overscroll-contain bg-[#051c1d]/80 p-4 sm:p-6 backdrop-blur-md"
        >
          <motion.div
            initial={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, filter: "blur(4px)" }
            }
            animate={
              prefersReducedMotion
                ? { opacity: 1, transition: { duration: 0.15, ease: "easeOut" } }
                : {
                    opacity: 1,
                    y: 0,
                    filter: "blur(0px)",
                    transition: { duration: 0.3, ease: "easeOut" },
                  }
            }
            exit={
              prefersReducedMotion
                ? { opacity: 0, transition: { duration: 0.15, ease: "easeOut" } }
                : {
                    opacity: 0,
                    y: -12,
                    filter: "blur(4px)",
                    transition: { duration: 0.15, ease: "easeOut" },
                  }
            }
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl rounded-[28px] border border-white/15 bg-[#0c3738] p-3 sm:p-4 text-canvas shadow-[0_28px_80px_rgba(0,0,0,0.55)]"
          >
            {/* Cabecera del modal */}
            <div className="mb-3 flex items-center justify-between gap-4 px-2 pt-1">
              <div>
                <h3 className="font-display text-lg sm:text-xl text-canvas leading-tight">
                  {title}
                </h3>
                {subtitle && (
                  <p className="text-xs text-mint/75">{subtitle}</p>
                )}
              </div>
              <button
                type="button"
                onClick={onClose}
                aria-label="Cerrar video"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-canvas transition-[background-color,transform] duration-150 ease-out hover:bg-white/20 motion-safe:enabled:active:scale-[0.96]"
              >
                <X className="h-4 w-4" strokeWidth={2} absoluteStrokeWidth />
              </button>
            </div>

            {/* Contenedor con radio concéntrico: 28px outer - 12px padding = 16px inner */}
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-[#051c1d] outline outline-1 -outline-offset-1 outline-white/10">
              <video
                src={videoSrc}
                poster={posterSrc}
                controls
                autoPlay={!prefersReducedMotion}
                playsInline
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

