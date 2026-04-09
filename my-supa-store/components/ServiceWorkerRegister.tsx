"use client"

import { useEffect } from "react"

function canRegisterServiceWorker() {
  return typeof window !== "undefined" && "serviceWorker" in navigator
}

function shouldRegisterInThisEnv() {
  return process.env.NODE_ENV === "production"
}

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!canRegisterServiceWorker()) return

    if (!shouldRegisterInThisEnv()) {
      console.info("[SW] Skipped registration in dev (HMR may conflict)")
      return
    }

    const register = async () => {
      try {
        const registration = await navigator.serviceWorker.register("/sw.js")
        console.info("[SW] Registered:", registration.scope)
      } catch (error) {
        console.error("[SW] Registration failed:", error)
      }
    }

    register()
  }, [])

  return null
}
