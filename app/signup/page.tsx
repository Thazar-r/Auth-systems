import { SignupForm } from "@/components/signup-form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SignupPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-indigo-100 p-4">
      <Card className="w-full max-w-md shadow-2xl border-4 border-blue-300">
        <CardHeader className="space-y-1 text-center bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <CardTitle className="text-3xl font-extrabold">Create an account</CardTitle>
          <CardDescription className="text-blue-100 text-lg">
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <SignupForm />
          <div className="mt-6 text-center text-lg">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-blue-600 underline underline-offset-4 hover:text-blue-800">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
