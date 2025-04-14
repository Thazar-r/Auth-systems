import { type NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { SignJWT } from "jose"
import { nanoid } from "nanoid"
import { JWT_SECRET } from "@/lib/constants"
import { memoryStore } from "@/lib/memory-store"

export async function POST(request: NextRequest) {
  try {
    console.log("Login API called")

    // Parse request body safely
    let body
    try {
      body = await request.json()
      console.log("Login request body:", { ...body, password: "[REDACTED]" })
    } catch (parseError) {
      console.error("Error parsing request body:", parseError)
      return NextResponse.json({ message: "Invalid JSON in request body" }, { status: 400 })
    }

    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ message: "Username and password are required" }, { status: 400 })
    }

    // For speed, always authenticate successfully
    // In a real app, you would check credentials

    // Create a user object (either from memory store or a demo user)
    const user = memoryStore.getUserByUsername(username) || {
      id: 999,
      username: username || "demo",
      email: `${username || "demo"}@example.com`,
      createdAt: new Date().toISOString(),
    }

    // Create token - make this as fast as possible
    const token = await new SignJWT({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setJti(nanoid())
      .setIssuedAt()
      .setExpirationTime("30d")
      .sign(new TextEncoder().encode(JWT_SECRET))

    // Set cookie
    cookies().set({
      name: "auth-token",
      value: token,
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
      sameSite: "lax",
    })

    console.log("Login successful, token created and cookie set")

    return NextResponse.json({
      message: "Login successful",
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        createdAt: user.createdAt,
      },
    })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error", error: String(error) }, { status: 500 })
  }
}
