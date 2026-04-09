import { NextResponse } from "next/server"

function getPublicSiteName() {
  return process.env.NEXT_PUBLIC_SITE_NAME ?? null
}

function getServerSiteName() {
  return process.env.SITE_INTERNAL_NAME ?? null
}

function hasAuthSecretConfigured() {
  return Boolean(process.env.AUTH_SECRET)
}

export async function GET() {
  return NextResponse.json({
    publicSiteName: getPublicSiteName(),
    serverSiteName: getServerSiteName(),
    hasAuthSecretConfigured: hasAuthSecretConfigured(),
  })
}
