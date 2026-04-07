import { RegisterForm } from "./register-form"

export default function RegisterPage() {
  return (
    <div className="flex items-center justify-center py-20">
      <div className="w-full max-w-md">
        <div className="backdrop-blur-3xl bg-black/40 border border-white/[0.05] rounded-2xl p-8 md:p-12 shadow-xl animate-fade-in-up">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-script bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-600 mb-3">
              Inscription
            </h1>
            <p className="text-[10px] font-black uppercase tracking-widest text-gray-500">
              Créez votre compte
            </p>
          </div>
          <RegisterForm />
        </div>
      </div>
    </div>
  )
}
