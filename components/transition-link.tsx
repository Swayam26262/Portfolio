"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import type { ComponentProps } from "react"

type Props = ComponentProps<typeof Link> & { href: string }

/**
 * A Next <Link> that wraps the navigation in the View Transitions API when the
 * browser supports it (Chromium today), giving a morph between the source and
 * destination elements that share a `view-transition-name`. Falls back to a
 * normal client navigation everywhere else — zero risk if unsupported.
 */
export function TransitionLink({ href, onClick, ...props }: Props) {
  const router = useRouter()

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e)
    const startViewTransition = (document as Document & {
      startViewTransition?: (cb: () => void) => void
    }).startViewTransition

    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey ||
      typeof href !== "string" ||
      href.startsWith("http") ||
      !startViewTransition
    ) {
      return
    }

    e.preventDefault()
    startViewTransition.call(document, () => {
      router.push(href)
    })
  }

  return <Link href={href} onClick={handleClick} {...props} />
}
