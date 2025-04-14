import { NextResponse } from "next/server"
import { memoryStore } from "@/lib/memory-store"

export async function GET() {
  try {
    console.log("Fetching users")

    const users = memoryStore.getAllUsers().map((user) => ({
      id: user.id,
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    }))

    return NextResponse.json({ users })
  } catch (error) {
    console.error("Error fetching users:", error)
    return NextResponse.json({ message: "Error fetching users", users: [] }, { status: 500 })
  }
}
