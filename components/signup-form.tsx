"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle } from "lucide-react"

export function SignupForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const router = useRouter()
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setFormError(null)

    // Basic validation
    if (!username || !email || !password) {
      setFormError("All fields are required")
      setIsLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setFormError("Passwords don't match")
      setIsLoading(false)
      return
    }

    try {
      console.log("Submitting signup form...")

      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      })

      // Check if response is JSON
      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        console.error("Non-JSON response received:", await response.text())
        throw new Error("Server returned non-JSON response. Please try again.")
      }

      const result = await response.json()
      console.log("Signup response:", result)

      if (!response.ok) {
        throw new Error(result.message || "Something went wrong")
      }

      toast({
        title: "Account created!",
        description: "You have successfully signed up.",
      })

      // Redirect to login page
      setTimeout(() => {
        router.push("/login")
      }, 2000)
    } catch (error) {
      console.error("Signup error:", error)
      setFormError(error instanceof Error ? error.message : "Something went wrong")
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {formError && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <p className="text-red-700">{formError}</p>
        </div>
      )}

      <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
        <p className="text-blue-700 font-medium">
          <AlertCircle className="inline-block mr-2 h-5 w-5" />
          You can also use the demo account: <strong>demo / demo</strong>
        </p>
      </div>

      <div>
        <label htmlFor="username" className="block text-lg font-medium mb-1">
          Username
        </label>
        <Input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="johndoe"
          className="text-lg py-6"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-lg font-medium mb-1">
          Email
        </label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="john.doe@example.com"
          className="text-lg py-6"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-lg font-medium mb-1">
          Password
        </label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="text-lg py-6"
        />
      </div>

      <div>
        <label htmlFor="confirmPassword" className="block text-lg font-medium mb-1">
          Confirm Password
        </label>
        <Input
          id="confirmPassword"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="text-lg py-6"
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-lg font-bold py-6 mt-6"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            Creating account...
          </>
        ) : (
          "Sign Up"
        )}
      </Button>
    </form>
  )
}
