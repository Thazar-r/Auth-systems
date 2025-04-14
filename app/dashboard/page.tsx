"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LogoutButton } from "@/components/logout-button"
import { User, Home, Settings, Bell, ChevronRight, BarChart3, Users, Activity } from "lucide-react"
import { Progress } from "@/components/ui/progress"

export default function DashboardPage() {
  // Use local state instead of API calls for speed
  const [user] = useState({
    id: 999,
    username: "demo",
    email: "demo@example.com",
    createdAt: new Date().toISOString(),
  })

  // Generate random stats for visual appeal
  const stats = {
    visitors: Math.floor(Math.random() * 5000) + 1000,
    revenue: Math.floor(Math.random() * 10000) + 5000,
    newUsers: Math.floor(Math.random() * 100) + 20,
    conversion: Math.floor(Math.random() * 20) + 5,
  }

  // Log when dashboard loads
  useEffect(() => {
    console.log("Dashboard loaded successfully!")
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white">
      {/* Super Visible Header */}
      <header className="bg-gradient-to-r from-purple-700 to-blue-700 text-white shadow-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <span className="text-3xl font-extrabold tracking-tight">DASHBOARD</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link href="/profile">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-white border-white hover:bg-white hover:text-blue-700 font-bold"
                >
                  <User size={20} className="mr-2" />
                  Profile
                </Button>
              </Link>
              <LogoutButton size="lg" className="bg-red-600 hover:bg-red-700 font-bold text-lg" />
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* ULTRA Visible Welcome Banner */}
        <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 rounded-lg shadow-2xl mb-10 overflow-hidden border-4 border-yellow-300">
          <div className="px-8 py-16 text-white">
            <h1 className="text-5xl font-extrabold mb-4 animate-pulse">WELCOME, {user.username.toUpperCase()}!</h1>
            <p className="text-white text-2xl font-bold">Your dashboard is ready. Here's your activity overview.</p>
            <div className="mt-8">
              <Button
                size="lg"
                className="bg-white text-orange-600 hover:bg-orange-100 text-lg font-bold px-8 py-6 h-auto"
              >
                View Activity
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards - SUPER VISIBLE */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <Card className="bg-white shadow-xl border-l-8 border-blue-500 hover:shadow-2xl transition-shadow">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center">
                <div className="p-4 rounded-full bg-blue-100 mr-4">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-700">Visitors</p>
                  <p className="text-3xl font-extrabold text-blue-600">{stats.visitors.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-6">
                <Progress value={75} className="h-3" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl border-l-8 border-green-500 hover:shadow-2xl transition-shadow">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center">
                <div className="p-4 rounded-full bg-green-100 mr-4">
                  <BarChart3 className="h-8 w-8 text-green-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-700">Revenue</p>
                  <p className="text-3xl font-extrabold text-green-600">${stats.revenue.toLocaleString()}</p>
                </div>
              </div>
              <div className="mt-6">
                <Progress value={65} className="h-3 bg-green-100 [&>div]:bg-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl border-l-8 border-purple-500 hover:shadow-2xl transition-shadow">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center">
                <div className="p-4 rounded-full bg-purple-100 mr-4">
                  <User className="h-8 w-8 text-purple-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-700">New Users</p>
                  <p className="text-3xl font-extrabold text-purple-600">{stats.newUsers}</p>
                </div>
              </div>
              <div className="mt-6">
                <Progress value={85} className="h-3 bg-purple-100 [&>div]:bg-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-xl border-l-8 border-amber-500 hover:shadow-2xl transition-shadow">
            <CardContent className="pt-8 pb-8">
              <div className="flex items-center">
                <div className="p-4 rounded-full bg-amber-100 mr-4">
                  <Activity className="h-8 w-8 text-amber-600" />
                </div>
                <div>
                  <p className="text-lg font-bold text-gray-700">Conversion</p>
                  <p className="text-3xl font-extrabold text-amber-600">{stats.conversion}%</p>
                </div>
              </div>
              <div className="mt-6">
                <Progress value={stats.conversion * 5} className="h-3 bg-amber-100 [&>div]:bg-amber-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Info Card - SUPER VISIBLE */}
        <Card className="mb-10 bg-white shadow-2xl border-4 border-blue-300 hover:shadow-2xl transition-shadow">
          <CardHeader className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
            <CardTitle className="text-2xl font-bold">YOUR ACCOUNT</CardTitle>
          </CardHeader>
          <CardContent className="pt-8 pb-8">
            <div className="space-y-6">
              <div className="flex items-center p-6 bg-blue-50 rounded-lg border-2 border-blue-200">
                <div className="h-20 w-20 rounded-full bg-blue-600 flex items-center justify-center mr-6">
                  <span className="text-3xl font-extrabold text-white">{user.username.charAt(0).toUpperCase()}</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-blue-800">{user.username}</h3>
                  <p className="text-lg text-gray-700">{user.email}</p>
                  <p className="text-md text-gray-600 font-medium">
                    Member since {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link href="/profile" className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg font-bold py-6">
                    <User className="mr-2 h-5 w-5" />
                    View Full Profile
                  </Button>
                </Link>
                <Button variant="outline" className="w-full text-lg font-bold border-2 py-6">
                  <Settings className="mr-2 h-5 w-5" />
                  Account Settings
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions - SUPER VISIBLE */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          <Card className="bg-gradient-to-b from-blue-50 to-white shadow-xl border-2 border-blue-300 hover:shadow-2xl transition-shadow">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-blue-500 flex items-center justify-center mb-4">
                  <Home className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-blue-800">Home</h3>
                <p className="text-md text-gray-600 mt-2 font-medium">Return to homepage</p>
                <Link href="/" className="mt-6 w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-lg font-bold py-6">Go Home</Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-purple-50 to-white shadow-xl border-2 border-purple-300 hover:shadow-2xl transition-shadow">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-purple-500 flex items-center justify-center mb-4">
                  <Bell className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-purple-800">Notifications</h3>
                <p className="text-md text-gray-600 mt-2 font-medium">View your notifications</p>
                <Button className="mt-6 w-full bg-purple-600 hover:bg-purple-700 text-lg font-bold py-6">
                  Notifications
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-b from-green-50 to-white shadow-xl border-2 border-green-300 hover:shadow-2xl transition-shadow">
            <CardContent className="pt-8 pb-8">
              <div className="flex flex-col items-center text-center">
                <div className="h-16 w-16 rounded-full bg-green-500 flex items-center justify-center mb-4">
                  <Settings className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-green-800">Settings</h3>
                <p className="text-md text-gray-600 mt-2 font-medium">Manage your settings</p>
                <Button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-lg font-bold py-6">Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
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
