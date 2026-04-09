"use client"

export default function PublicEnvBadge() {
  const siteName = process.env.NEXT_PUBLIC_SITE_NAME ?? "NEXT_PUBLIC_SITE_NAME non définie"

  return (
    <div className="mb-6 rounded-xl border border-white/[0.08] bg-black/30 px-4 py-3">
      <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">
        Variable publique (client)
      </p>
      <p className="text-sm text-white">NEXT_PUBLIC_SITE_NAME = {siteName}</p>
    </div>
  )
}
