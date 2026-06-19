"use client"

import { useEffect } from "react"
import Lenis from "lenis"

/**
 * Lenis smooth scrolling for desktop wheel/keyboard. Touch uses native scroll
 * (smoothTouch off) so mobile stays responsive, and the whole thing is skipped
 * under prefers-reduced-motion. The instance is exposed on window so in-page
 * anchor navigation can route through it.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true })
    ;(window as unknown as { __lenis?: Lenis }).__lenis = lenis

    let raf = 0
    const loop = (time: number) => {
      lenis.raf(time)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      ;(window as unknown as { __lenis?: Lenis }).__lenis = undefined
    }
  }, [])

  return null
}
