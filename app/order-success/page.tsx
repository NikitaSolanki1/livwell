"use client"

import { useEffect } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, ShoppingBag, Home } from "lucide-react"

export default function OrderSuccessPage() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("orderId")

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0)
  }, [])

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12">
        <div className="container max-w-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="text-center">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  <CheckCircle className="h-16 w-16 text-green-500" />
                </div>
                <CardTitle className="text-2xl font-bold">Order Confirmed!</CardTitle>
                <CardDescription>Your order has been placed successfully</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-muted p-4 rounded-md">
                  <p className="font-medium">Order ID:</p>
                  <p className="text-muted-foreground">{orderId || "N/A"}</p>
                </div>
                <p className="text-muted-foreground">
                  Thank you for your order! We've received your order and will begin processing it right away. You will
                  receive an email confirmation shortly.
                </p>
              </CardContent>
              <CardFooter className="flex flex-col space-y-2">
                <Button asChild className="w-full">
                  <Link href="/profile">
                    <ShoppingBag className="mr-2 h-4 w-4" /> View My Orders
                  </Link>
                </Button>
                <Button variant="outline" asChild className="w-full">
                  <Link href="/">
                    <Home className="mr-2 h-4 w-4" /> Back to Home
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
