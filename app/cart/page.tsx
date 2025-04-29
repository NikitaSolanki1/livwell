"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { juices } from "@/lib/data"
import { useCart } from "@/components/cart-provider"
import { useAuth } from "@/components/auth-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Trash, Plus, Minus, ShoppingBag, ArrowRight, Check } from "lucide-react"
import { dishes } from "@/lib/data"

export default function CartPage() {
  const { items, removeFromCart, updateQuantity, subtotal, clearCart } = useCart()
  const { user } = useAuth()
  const router = useRouter()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)
  const [promoApplied, setPromoApplied] = useState(false)
  const [promoError, setPromoError] = useState("")

  const shipping = 5.99
  const total = subtotal + shipping - discount

  const handleApplyPromo = () => {
    setPromoError("")
    setPromoApplied(false)

    // List of valid promo codes
    const validPromoCodes = {
      FRESH50: 0.5, // 50% off
      JUICE10: 0.1, // 10% off
      WELCOME20: 0.2, // 20% off
      SUMMER25: 0.25, // 25% off
    }

    if (promoCode.trim() === "") {
      setPromoError("Please enter a promo code")
      return
    }

    const normalizedCode = promoCode.toUpperCase().trim()

    if (validPromoCodes[normalizedCode]) {
      const discountAmount = subtotal * validPromoCodes[normalizedCode]
      setDiscount(discountAmount)
      setPromoApplied(true)
    } else {
      setPromoError("Invalid promo code")
      setDiscount(0)
    }
  }

  const handleCheckout = () => {
    if (!user) {
      router.push("/login?redirect=/checkout")
    } else {
      router.push("/checkout")
    }
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />

        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-12">
            <div className="flex justify-center mb-6">
              <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
            <p className="text-muted-foreground mb-6">Looks like you haven't added any juices to your cart yet.</p>
            <Button asChild>
              <Link href="/juices">Shop Juices</Link>
            </Button>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container py-8">
          <h1 className="text-3xl font-bold mb-8">Your Cart</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {items.map((item) => {
                  const isCustom = item.isCustom
                  const juice = item.juiceId ? juices.find((j) => j.id === item.juiceId) : null
                  const dish = item.dishId ? dishes.find((d) => d.id === item.dishId) : null

                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="flex gap-4 bg-muted/50 p-4 rounded-lg"
                    >
                      <div className="h-24 w-24 relative bg-background rounded-md overflow-hidden shrink-0">
                        {isCustom ? (
                          <div className="h-full w-full flex items-center justify-center bg-primary/10">
                            <span className="font-semibold text-primary">Custom</span>
                          </div>
                        ) : juice ? (
                          <Image
                            src={
                              juice.image ||
                              "https://images.unsplash.com/photo-1622597467836-f3e6047cc116?q=80&w=200&auto=format" ||
                              "/placeholder.svg"
                            }
                            alt={juice.name}
                            fill
                            className="object-cover"
                            crossOrigin="anonymous"
                          />
                        ) : dish ? (
                          <Image
                            src={
                              dish.image ||
                              "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=200&auto=format" ||
                              "/placeholder.svg"
                            }
                            alt={dish.name}
                            fill
                            className="object-cover"
                            crossOrigin="anonymous"
                          />
                        ) : null}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between">
                          <h3 className="font-semibold">
                            {isCustom ? item.customName : juice ? juice.name : dish ? dish.name : "Item"}
                          </h3>
                          <span className="font-bold">₹{(item.price * item.quantity).toFixed(2)}</span>
                        </div>

                        {isCustom && item.customIngredients && (
                          <p className="text-sm text-muted-foreground mb-2">{item.customIngredients.join(", ")}</p>
                        )}

                        {!isCustom && juice && (
                          <p className="text-sm text-muted-foreground mb-2">{juice.ingredients.join(", ")}</p>
                        )}

                        {!isCustom && dish && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {dish.ingredients.slice(0, 3).join(", ")}...
                          </p>
                        )}

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center border rounded-md">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-8 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-muted-foreground"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Trash className="h-4 w-4 mr-1" /> Remove
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div>

              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/juices">Continue Shopping</Link>
                </Button>
              </div>
            </div>

            <div>
              <div className="bg-muted/50 rounded-lg p-6 sticky top-24">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>₹{subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>₹{shipping.toFixed(2)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount</span>
                      <span>-₹{discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="pt-4 border-t flex justify-between font-bold">
                    <span>Total</span>
                    <span>₹{total.toFixed(2)}</span>
                  </div>

                  <div className="pt-4">
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter promo code"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                        />
                        <Button variant="outline" onClick={handleApplyPromo}>
                          Apply
                        </Button>
                      </div>

                      {promoApplied && (
                        <div className="text-sm text-green-600 flex items-center">
                          <Check className="h-4 w-4 mr-1" /> Promo code applied successfully!
                        </div>
                      )}

                      {promoError && <div className="text-sm text-red-500">{promoError}</div>}

                      <div className="text-xs text-muted-foreground mt-2">
                        <p className="font-medium">Available promo codes:</p>
                        <ul className="list-disc list-inside mt-1">
                          <li>FRESH50 - 50% off your order</li>
                          <li>JUICE10 - 10% off your order</li>
                          <li>WELCOME20 - 20% off your order</li>
                          <li>SUMMER25 - 25% off your order</li>
                        </ul>
                      </div>
                    </div>

                    <Button className="w-full mt-4" onClick={handleCheckout}>
                      Checkout <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>

                    {!user && (
                      <p className="text-sm text-muted-foreground mt-2 text-center">
                        You'll need to log in before checkout
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
