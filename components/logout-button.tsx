"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

interface LogoutButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string
  size?: "default" | "sm" | "lg"
}

export function LogoutButton({ className, size = "default", ...props }: LogoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)

  async function handleLogout() {
    setIsLoading(true)

    try {
      console.log("Logging out...")

      // Clear the auth cookie on the client side
      document.cookie = "auth-token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

      // Redirect to home page
      window.location.href = "/"
    } catch (error) {
      console.error("Logout error:", error)
      setIsLoading(false)
    }
  }

  return (
    <Button
      variant="destructive"
      size={size}
      onClick={handleLogout}
      disabled={isLoading}
      className={cn("font-medium", className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          Logging out...
        </>
      ) : (
        <>
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </>
      )}
    </Button>
  )
}
