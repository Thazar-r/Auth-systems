"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoutButton } from "@/components/logout-button"
import { Loader2, User, Settings, Bell, Shield, CreditCard, Home } from "lucide-react"

type ProfileUser = {
  id: number
  username: string
  email: string
  firstName?: string
  lastName?: string
  createdAt?: string
}

export default function ProfilePage() {
  const [user, setUser] = useState<ProfileUser | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch("/api/auth/me")

        if (!response.ok) {
          throw new Error("Not authenticated")
        }

        const data = await response.json()
        setUser(data.user)
      } catch (error) {
        console.error("Authentication error:", error)
        router.push("/login")
      } finally {
        setLoading(false)
      }
    }

    fetchUserData()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-16 w-16 animate-spin text-blue-600" />
          <p className="text-2xl font-bold text-blue-800">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null // This shouldn't happen as we redirect in the useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-purple-700 to-blue-700 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <span className="text-3xl font-extrabold tracking-tight">PROFILE</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-700 font-bold"
                >
                  <Home size={20} className="mr-2" />
                  Dashboard
                </Button>
              </Link>
              <LogoutButton size="lg" className="bg-red-600 hover:bg-red-700 font-bold text-lg" />
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <Card className="shadow-2xl border-4 border-blue-300">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardTitle className="text-3xl font-bold">Your Profile</CardTitle>
            <CardDescription className="text-blue-100 text-lg">
              View and manage your account information
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-8">
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 flex flex-col items-center">
                <div className="h-40 w-40 rounded-full bg-blue-600 flex items-center justify-center">
                  <span className="text-6xl font-extrabold text-white">{user.username.charAt(0).toUpperCase()}</span>
                </div>
                <Button className="mt-6 w-full text-lg font-bold py-6" variant="outline">
                  Change Avatar
                </Button>
              </div>

              <div className="flex-1 space-y-8">
                <div>
                  <h3 className="text-2xl font-bold text-blue-800">Account Information</h3>
                  <div className="mt-4 border-2 border-blue-200 rounded-md overflow-hidden">
                    <div className="px-6 py-4 bg-blue-50 border-b-2 border-blue-200">
                      <div className="flex justify-between">
                        <span className="font-bold text-lg">Username</span>
                        <span className="text-lg">{user.username}</span>
                      </div>
                    </div>
                    <div className="px-6 py-4 border-b-2 border-blue-200">
                      <div className="flex justify-between">
                        <span className="font-bold text-lg">Email</span>
                        <span className="text-lg">{user.email}</span>
                      </div>
                    </div>
                    {user.createdAt && (
                      <div className="px-6 py-4 border-b-2 border-blue-200">
                        <div className="flex justify-between">
                          <span className="font-bold text-lg">Member Since</span>
                          <span className="text-lg">{new Date(user.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    )}
                    <div className="px-6 py-4">
                      <div className="flex justify-between">
                        <span className="font-bold text-lg">User ID</span>
                        <span className="text-lg">{user.id}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-blue-800">Security</h3>
                  <div className="mt-4 space-y-4">
                    <Button variant="outline" className="w-full justify-start text-lg font-bold py-6 border-2">
                      <Shield className="h-6 w-6 mr-3" />
                      Change Password
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-lg font-bold py-6 border-2">
                      <User className="h-6 w-6 mr-3" />
                      Enable Two-Factor Authentication
                    </Button>
                  </div>
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-blue-800">Preferences</h3>
                  <div className="mt-4 space-y-4">
                    <Button variant="outline" className="w-full justify-start text-lg font-bold py-6 border-2">
                      <Settings className="h-6 w-6 mr-3" />
                      Account Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-lg font-bold py-6 border-2">
                      <CreditCard className="h-6 w-6 mr-3" />
                      Billing Information
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-lg font-bold py-6 border-2">
                      <Bell className="h-6 w-6 mr-3" />
                      Notification Settings
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-lg">&copy; {new Date().getFullYear()} Auth System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
