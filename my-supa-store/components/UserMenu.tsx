"use client"

import { useSession, signOut } from "next-auth/react"
import Link from "next/link"

export function UserMenu() {
  const { data: session, status } = useSession()

  if (status === "loading") {
    return (
      <div className="w-8 h-8 bg-white/10 rounded-full animate-pulse" />
    )
  }

  if (!session?.user) {
    return (
      <Link
        href="/auth/login"
        className="text-[10px] font-black tracking-[0.2em] text-gray-500 hover:text-white transition-all uppercase"
      >
        Login
      </Link>
    )
  }

  const name = session.user.name || session.user.email || "User"
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/account"
        className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-xs font-black text-white hover:bg-white/20 transition-all"
        title={name}
      >
        {initials}
      </Link>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="text-[10px] font-black tracking-[0.2em] text-gray-500 hover:text-red-400 transition-all uppercase"
      >
        Signout
      </button>
    </div>
  )
}
