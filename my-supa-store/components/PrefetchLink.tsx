"use client"

import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { useState, useEffect } from "react"

interface PrefetchLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  prefetch?: boolean
}

export default function PrefetchLink({ href, children, className, prefetch = true }: PrefetchLinkProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [shouldPrefetch, setShouldPrefetch] = useState(true)

  useEffect(() => {
    // Check AB variant cookie
    if (typeof document !== "undefined") {
      const cookies = document.cookie.split("; ")
      const abCookie = cookies.find((c) => c.startsWith("ab_variant="))
      const variant = abCookie?.split("=")[1]
      // A = normal prefetch, B = hover prefetch only
      setShouldPrefetch(variant !== "B")
    }
  }, [])

  const handleMouseEnter = () => {
    // Only prefetch on hover if variant B (no automatic prefetch)
    if (!shouldPrefetch) {
      router.prefetch(href)
    }
  }

  // If we should prefetch normally (variant A), use Link's built-in prefetch
  if (shouldPrefetch) {
    return (
      <Link href={href} className={className} prefetch={prefetch}>
        {children}
      </Link>
    )
  }

  // For variant B, use regular link but prefetch on hover
  return (
    <Link href={href} className={className} onMouseEnter={handleMouseEnter}>
      {children}
    </Link>
  )
}
