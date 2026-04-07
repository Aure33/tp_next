"use client"

import Link from "next/link"
import { useSearchParams } from "next/navigation"

export function LoginForm() {
  const searchParams = useSearchParams()
  const error = searchParams.get("error")

  return (
    <form action="/api/login" method="POST" className="space-y-6">
      {error && (
        <p className="text-red-400 text-sm text-center">
          Email ou mot de passe incorrect
        </p>
      )}

      <div>
        <label htmlFor="email" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="w-full px-4 py-3 bg-black/20 border border-white/[0.05] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all"
          placeholder="votre@email.com"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
          Mot de passe
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          className="w-full px-4 py-3 bg-black/20 border border-white/[0.05] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all"
          placeholder="••••••••"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-gradient-to-r from-white via-gray-200 to-gray-400 text-black py-3 px-6 rounded-lg font-black text-xs uppercase tracking-widest hover:opacity-90 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        Se connecter
      </button>

      <p className="text-center text-sm text-gray-500">
        Pas encore de compte ?{" "}
        <Link href="/auth/register" className="text-white hover:underline transition-all">
          S&apos;inscrire
        </Link>
      </p>
    </form>
  )
}
