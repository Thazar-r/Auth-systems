import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// This middleware is completely disabled
export async function middleware(request: NextRequest) {
  // Always allow access to all pages
  return NextResponse.next()
}

export const config = {
  matcher: [], // Empty matcher means it won't run for any routes
}
