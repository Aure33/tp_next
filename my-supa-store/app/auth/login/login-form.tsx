"use client"

import { useActionState } from "react"
import { login } from "./actions"
import Link from "next/link"

const initialState = {
  message: "",
}

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState)

  return (
    <form action={formAction} className="space-y-6">
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
          placeholder="john@example.com"
        />
        {state?.errors?.email && (
          <p className="text-red-400 text-xs mt-2">{state.errors.email[0]}</p>
        )}
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
        {state?.errors?.password && (
          <p className="text-red-400 text-xs mt-2">{state.errors.password[0]}</p>
        )}
      </div>

      {state?.message && (
        <p className="text-red-400 text-sm text-center">{state.message}</p>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gradient-to-r from-white via-gray-200 to-gray-400 text-black py-3 px-6 rounded-lg font-black text-xs uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        {isPending ? "Connexion..." : "Se connecter"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Pas encore de compte ?{" "}
        <Link href="/auth/register" className="text-white hover:underline transition-all">
          S'inscrire
        </Link>
      </p>
    </form>
  )
}
