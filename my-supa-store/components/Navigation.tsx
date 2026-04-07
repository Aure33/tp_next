import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import Link from 'next/link'
import CartSummary from './CartSummary'
import { UserMenu } from './UserMenu'

const SECRET = new TextEncoder().encode(
  process.env.AUTH_SECRET || "dev-secret-change-in-production-min-32-chars"
)

async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("session")?.value
  if (!sessionCookie) return null
  try {
    const { payload } = await jwtVerify(sessionCookie, SECRET)
    return payload
  } catch {
    return null
  }
}

export default async function Navigation() {
  const session = await getSession()

  return (
    <nav className="sticky top-0 z-50 w-full backdrop-blur-3xl bg-black/40 border-b border-white/[0.05] transition-all duration-500">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center space-x-6">
            <Link href="/" className="text-3xl font-script bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-300 to-gray-600 hover:opacity-70 transition-opacity">
              My Supa Store
            </Link>
          </div>
          <div className="flex items-center space-x-8">
            <CartSummary />
            <div className="hidden sm:flex sm:space-x-10 items-center">
              <Link
                href="/"
                className="text-[10px] font-black tracking-[0.2em] text-gray-500 hover:text-white transition-all uppercase"
              >
                Catalog
              </Link>
              {session?.name ? (
                <UserMenu userName={session.name as string} />
              ) : (
                <Link
                  href="/auth/login"
                  className="text-[10px] font-black tracking-[0.2em] text-gray-500 hover:text-white transition-all uppercase"
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
