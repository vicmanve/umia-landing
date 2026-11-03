"use client"

import { useRef } from "react"
import {
  motion,
  useInView,
  useReducedMotion,
  type MotionProps,
  type UseInViewOptions,
  type Variants,
} from "motion/react"

type MarginType = UseInViewOptions["margin"]

interface BlurFadeProps extends MotionProps {
  children: React.ReactNode
  className?: string
  variant?: {
    hidden: { y: number }
    visible: { y: number }
  }
  duration?: number
  delay?: number
  offset?: number
  direction?: "up" | "down" | "left" | "right"
  inView?: boolean
  inViewMargin?: MarginType
  blur?: string
}

const getFilter = (v: Variants[string]) =>
  typeof v === "function" ? undefined : v.filter

export function BlurFade({
  children,
  className,
  variant,
  duration = 0.3,
  delay = 0,
  offset = 12,
  direction = "up",
  inView = false,
  inViewMargin = "-50px",
  blur = "4px",
  ...props
}: BlurFadeProps) {
  const ref = useRef(null)
  const prefersReducedMotion = useReducedMotion()
  const inViewResult = useInView(ref, { once: true, margin: inViewMargin })
  const isInView = !inView || inViewResult

  const reducedVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  const defaultVariants: Variants = {
    hidden: {
      [direction === "left" || direction === "right" ? "x" : "y"]:
        direction === "right" || direction === "down" ? -offset : offset,
      opacity: 0,
      filter: `blur(${blur})`,
    },
    visible: {
      [direction === "left" || direction === "right" ? "x" : "y"]: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
  }

  const combinedVariants = prefersReducedMotion
    ? reducedVariants
    : (variant ?? defaultVariants)

  const hiddenFilter = getFilter(combinedVariants.hidden)
  const visibleFilter = getFilter(combinedVariants.visible)

  const shouldTransitionFilter =
    !prefersReducedMotion &&
    hiddenFilter != null &&
    visibleFilter != null &&
    hiddenFilter !== visibleFilter

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={combinedVariants}
      transition={{
        delay: prefersReducedMotion ? 0 : 0.04 + delay,
        duration: prefersReducedMotion ? 0.15 : duration,
        ease: "easeOut",
        ...(shouldTransitionFilter ? { filter: { duration } } : {}),
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
