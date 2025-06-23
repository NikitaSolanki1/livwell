"use client"

import type React from "react"
import type { User, CartItem, Order } from "@/lib/data"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { createOrder, juices, dishes } from "@/lib/data"
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
import CheckoutForm from "@/components/checkout-form"

export default function CheckoutPage() {
  const { user } = useAuth()
  const { items, subtotal, clearCart } = useCart()
  const router = useRouter()
  const { toast } = useToast()

  const userTyped = user as unknown as User | undefined;
  const [formData, setFormData] = useState({
    name: userTyped?.name || "",
    email: userTyped?.email || "",
    phone: userTyped?.phone || "",
    address: userTyped?.address || "",
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

  const handlePaymentSuccess = async (paymentId: string) => {
    if (!userTyped) return;
    try {
      // Create order
      const order = createOrder({
        userId: userTyped.id || "",
        items: items as CartItem[],
        total,
        status: "completed",
        paymentMethod: "upi",
        paymentId,
        address: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
        phone: formData.phone,
      }) as Order
      clearCart()
      toast({
        title: "Order placed successfully!",
        description: `Your order #${order.id} has been placed successfully.`,
      })
      router.push(`/order-success?orderId=${order.id}`)
    } catch (error: any) {
      toast({
        title: "Error placing order",
        description: error?.message || "There was an error placing your order. Please try again.",
        variant: "destructive",
      })
    }
  }

  const handlePaymentError = (error: Error) => {
    toast({
      title: "Payment failed",
      description: error.message || "There was an error processing your payment. Please try again.",
      variant: "destructive",
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userTyped) {
      router.push("/login?redirect=/checkout")
      return
    }
    if (formData.paymentMethod === "cod") {
      setIsLoading(true)
      try {
        // Create order for COD
        const order = createOrder({
          userId: userTyped.id || "",
          items: items as CartItem[],
          total,
          status: "pending",
          paymentMethod: "cod",
          address: `${formData.address}, ${formData.city}, ${formData.zipCode}`,
          phone: formData.phone,
        }) as Order
        clearCart()
        toast({
          title: "Order placed successfully!",
          description: `Your order #${order.id} has been placed successfully.`,
        })
        router.push(`/order-success?orderId=${order.id}`)
      } catch (error: any) {
        toast({
          title: "Error placing order",
          description: error?.message || "There was an error placing your order. Please try again.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }
  }

  if (!items || items.length === 0) {
    router.push("/cart")
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Enter your shipping details</CardDescription>
              </CardHeader>
              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
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
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </form>
            </Card>

            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
                <CardDescription>Choose how you want to pay</CardDescription>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={formData.paymentMethod}
                  onValueChange={handlePaymentMethodChange}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="upi" id="upi" />
                    <Label htmlFor="upi" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Pay Online (UPI/Card)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2 mt-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label htmlFor="cod" className="flex items-center gap-2">
                      <Banknote className="h-4 w-4" />
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
                <CardDescription>Review your items</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item: CartItem) => {
                    // Find the name for the item (juice, dish, or custom)
                    let itemName = item.customName
                    if (!itemName && item.juiceId) {
                      const juice = juices.find((j: any) => j.id === item.juiceId)
                      itemName = juice?.name
                    }
                    if (!itemName && item.dishId) {
                      const dish = dishes.find((d: any) => d.id === item.dishId)
                      itemName = dish?.name
                    }
                    itemName = itemName || "Item"
                    return (
                      <div key={item.id} className="flex justify-between">
                        <span>
                          {itemName} x {item.quantity}
                        </span>
                        <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    )
                  })}
                  <Separator />
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4">
                {formData.paymentMethod === "upi" ? (
                  <CheckoutForm
                    amount={total}
                    onSuccess={handlePaymentSuccess}
                    onError={handlePaymentError}
                  />
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="w-full"
                    disabled={isLoading}
                  >
                    {isLoading ? "Processing..." : "Place Order"}
                  </Button>
                )}
              </CardFooter>
            </Card>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
