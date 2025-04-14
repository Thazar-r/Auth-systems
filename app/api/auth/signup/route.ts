import { type NextRequest, NextResponse } from "next/server"
import { memoryStore } from "@/lib/memory-store"

export async function POST(request: NextRequest) {
  try {
    console.log("Signup API called")

    // Parse request body safely
    let body
    try {
      body = await request.json()
      console.log("Request body:", { ...body, password: "[REDACTED]" })
    } catch (parseError) {
      console.error("Error parsing request body:", parseError)
      return NextResponse.json({ message: "Invalid JSON in request body" }, { status: 400 })
    }

    const { username, email, password } = body

    if (!username || !email || !password) {
      return NextResponse.json({ message: "Username, email, and password are required" }, { status: 400 })
    }

    // Check if user already exists
    const existingUser = memoryStore.getUserByUsername(username) || memoryStore.getUserByEmail(email)
    if (existingUser) {
      return NextResponse.json({ message: "Username or email already exists" }, { status: 409 })
    }

    // Create user in memory store
    const user = memoryStore.addUser(username, email, password)
    console.log("User created successfully:", { ...user, passwordHash: "[REDACTED]" })

    return NextResponse.json(
      {
        message: "User created successfully",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          createdAt: user.createdAt,
        },
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("Signup error:", error)
    // Always return JSON, never HTML
    return NextResponse.json({ message: "Internal server error", error: String(error) }, { status: 500 })
  }
}
