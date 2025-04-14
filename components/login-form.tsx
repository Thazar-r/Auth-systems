"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle } from "lucide-react"

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)
  const [username, setUsername] = useState("demo") // Pre-fill with demo for testing
  const [password, setPassword] = useState("demo") // Pre-fill with demo for testing
  const { toast } = useToast()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setIsLoading(true)
    setFormError(null)

    // Basic validation
    if (!username || !password) {
      setFormError("Username and password are required")
      setIsLoading(false)
      return
    }

    try {
      console.log("Attempting login...")

      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
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
      console.log("Login response:", result)

      if (!response.ok) {
        throw new Error(result.message || "Invalid credentials")
      }

      console.log("Login successful, redirecting to dashboard...")

      // Force immediate redirect to dashboard
      window.location.href = "/dashboard"

      // No toast here - it might delay the redirect
    } catch (error) {
      console.error("Login error:", error)
      setFormError(error instanceof Error ? error.message : "Invalid credentials")
      toast({
        variant: "destructive",
        title: "Error",
        description: error instanceof Error ? error.message : "Something went wrong",
      })
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

      <div className="bg-green-50 border-l-4 border-green-500 p-4 mb-4">
        <p className="text-green-700 font-medium">
          <AlertCircle className="inline-block mr-2 h-5 w-5" />
          Demo account is pre-filled. Just click "Login" to access the dashboard.
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
          placeholder="demo"
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
          placeholder="demo"
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
            Logging in...
          </>
        ) : (
          "Login"
        )}
      </Button>
    </form>
  )
}
