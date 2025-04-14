import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  console.log("Logout API called")

  try {
    // Clear the auth cookie
    cookies().set({
      name: "auth-token",
      value: "",
      expires: new Date(0),
      path: "/",
    })

    console.log("Auth cookie cleared")

    // Return success response
    return NextResponse.json({ success: true, message: "Logged out successfully" })
  } catch (error) {
    console.error("Logout error:", error)
    return NextResponse.json({ success: false, message: "Logout failed" }, { status: 500 })
  }
}
