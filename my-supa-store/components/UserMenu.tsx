"use client"

import Link from "next/link"

interface UserMenuProps {
  userName: string
}

export function UserMenu({ userName }: UserMenuProps) {
  const publicSiteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "Site name not set"

  const initials = userName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)

  const handleLogout = async () => {
    const { logout } = await import("@/app/auth/login/actions")
    await logout()
  }

  return (
    <div className="flex items-center space-x-4">
      <span className="hidden lg:block text-[9px] font-black uppercase tracking-widest text-gray-600">
        {publicSiteName}
      </span>
      <Link
        href="/account"
        className="w-8 h-8 flex items-center justify-center bg-white/10 rounded-full text-xs font-black text-white hover:bg-white/20 transition-all"
        title={userName}
      >
        {initials}
      </Link>
      <button
        onClick={handleLogout}
        className="text-[10px] font-black tracking-[0.2em] text-gray-500 hover:text-red-400 transition-all uppercase"
      >
        Signout
      </button>
    </div>
  )
}
