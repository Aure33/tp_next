"use client"

import { useActionState } from "react"
import { register } from "./actions"
import Link from "next/link"

const initialState = {
  message: "",
}

export function RegisterForm() {
  const [state, formAction, isPending] = useActionState(register, initialState)

  return (
    <form action={formAction} className="space-y-6">
      <div>
        <label htmlFor="name" className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-2">
          Nom complet
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full px-4 py-3 bg-black/20 border border-white/[0.05] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all"
          placeholder="Votre nom"
        />
        {state?.errors?.name && (
          <p className="text-red-400 text-xs mt-2">{state.errors.name[0]}</p>
        )}
      </div>

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
          minLength={6}
          className="w-full px-4 py-3 bg-black/20 border border-white/[0.05] rounded-lg text-white placeholder-gray-600 focus:outline-none focus:border-white/[0.2] focus:ring-1 focus:ring-white/[0.1] transition-all"
          placeholder="••••••••"
        />
        {state?.errors?.password && (
          <p className="text-red-400 text-xs mt-2">{state.errors.password[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="w-full bg-gradient-to-r from-white via-gray-200 to-gray-400 text-black py-3 px-6 rounded-lg font-black text-xs uppercase tracking-widest hover:opacity-90 disabled:opacity-50 transition-all hover:scale-[1.02] active:scale-[0.98]"
      >
        {isPending ? "Inscription..." : "Créer mon compte"}
      </button>

      <p className="text-center text-sm text-gray-500">
        Déjà un compte ?{" "}
        <Link href="/auth/login" className="text-white hover:underline transition-all">
          Se connecter
        </Link>
      </p>
    </form>
  )
}
