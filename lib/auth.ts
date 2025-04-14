import { cookies } from "next/headers"
import { jwtVerify } from "jose"
import { JWT_SECRET } from "./constants"

export type User = {
  id: number
  username: string
  email: string
}

export async function getSession(): Promise<User | null> {
  try {
    const token = cookies().get("auth-token")?.value

    if (!token) {
      return null
    }

    const verified = await jwtVerify(token, new TextEncoder().encode(JWT_SECRET), {
      algorithms: ["HS256"],
    })

    // Extract user data from payload
    const payload = verified.payload

    return {
      id: payload.id as number,
      username: payload.username as string,
      email: payload.email as string,
    }
  } catch (error) {
    console.error("Session verification failed:", error)
    return null
  }
}
