"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { createOrder } from "@/lib/data"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, Banknote } from "lucide-react"

export default function CheckoutPage() {
  const { user } = useAuth()
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: user?.address || "",
    city: "",
    zipCode: "",
    paymentMethod: "cod",
  })

  const [isLoading, setIsLoading] = useState(false)

  const shipping = 5.99
  const total = subtotal + shipping

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handlePaymentMethodChange = (value: string) => {
    setFormData((prev) => ({ ...prev, paymentMethod: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      router.push("/login?redirect=/checkout")
      return
    }

    setIsLoading(true)

    try {
      // Create order
      const order = createOrder({
        userId: user.id,
        items: items,
        total,
        status: "pending",
        paymentMethod: formData.paymentMethod as "cod" | "upi",
        address: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
        phone: formData.phone,
      })

      // Clear cart
      clearCart()

      // Show success message
      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.id} has been placed successfully.`,
      })

      // Redirect to success page
      router.push(`/order-success?orderId=${order.id}`)
    } catch (error) {
      toast({
        title: "Error placing order",
        description: "There was an error placing your order. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  if (items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <form onSubmit={handleSubmit}>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                    <CardDescription>Enter your contact details for order confirmation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                    <CardDescription>Enter your address where you want to receive your order</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="address">Street Address</Label>
                      <Input id="address" name="address" value={formData.address} onChange={handleChange} required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input id="city" name="city" value={formData.city} onChange={handleChange} required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP / Postal Code</Label>
                        <Input id="zipCode" name="zipCode" value={formData.zipCode} onChange={handleChange} required />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                    <CardDescription>Select your preferred payment method</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RadioGroup
                      value={formData.paymentMethod}
                      onValueChange={handlePaymentMethodChange}
                      className="space-y-3"
                    >
                      <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="cod" id="cod" />
                        <Label htmlFor="cod" className="flex items-center gap-2 cursor-pointer">
                          <Banknote className="h-5 w-5" />
                          <div>
                            <div>Cash on Delivery</div>
                            <div className="text-sm text-muted-foreground">Pay when you receive your order</div>
                          </div>
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 border rounded-md p-3 cursor-pointer hover:bg-muted/50">
                        <RadioGroupItem value="upi" id="upi" />
                        <Label htmlFor="upi" className="flex items-center gap-2 cursor-pointer">
                          <CreditCard className="h-5 w-5" />
                          <div>
                            <div>UPI / Mobile Payment</div>
                            <div className="text-sm text-muted-foreground">
                              Pay using UPI apps like Google Pay, PhonePe, etc.
                            </div>
                          </div>
                        </Label>
                      </div>
                    </RadioGroup>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" type="submit" disabled={isLoading}>
                      {isLoading ? "Processing..." : "Place Order"}
                    </Button>
                  </CardFooter>
                </Card>
              </form>
            </div>

            <div>
              <Card className="sticky top-24">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span>
                          {item.quantity} x {item.isCustom ? item.customName : "Juice"}
                        </span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>₹{subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>₹{shipping.toFixed(2)}</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
