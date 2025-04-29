"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { getOrdersByUserId } from "@/lib/data"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/components/ui/use-toast"
import { User, Package, LogOut } from "lucide-react"

export default function ProfilePage() {
  const { user, logout, updateProfile, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  })

  const [orders, setOrders] = useState<any[]>([])
  const [isUpdating, setIsUpdating] = useState(false)

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login?redirect=/profile")
    }

    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        address: user.address || "",
      })

      // Get user orders
      const userOrders = getOrdersByUserId(user.id)
      setOrders(userOrders)
    }
  }, [user, isLoading, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) return

    setIsUpdating(true)

    try {
      await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      })

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (isLoading || !user) {
    return null
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <Avatar className="h-24 w-24 mb-4">
                      <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl font-bold">{user.name}</h2>
                    <p className="text-muted-foreground">{user.email}</p>
                    <Button variant="outline" className="mt-4 w-full" onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" /> Logout
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex-1">
              <Tabs defaultValue="profile">
                <TabsList className="mb-6">
                  <TabsTrigger value="profile">
                    <User className="mr-2 h-4 w-4" /> Profile
                  </TabsTrigger>
                  <TabsTrigger value="orders">
                    <Package className="mr-2 h-4 w-4" /> Orders
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="profile">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your profile information</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleSubmit}>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">Full Name</Label>
                          <Input id="name" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email</Label>
                          <Input id="email" name="email" value={formData.email} disabled />
                          <p className="text-sm text-muted-foreground">Email cannot be changed</p>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone Number</Label>
                          <Input id="phone" name="phone" value={formData.phone} onChange={handleChange} />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="address">Address</Label>
                          <Input id="address" name="address" value={formData.address} onChange={handleChange} />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit" disabled={isUpdating}>
                          {isUpdating ? "Updating..." : "Update Profile"}
                        </Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value="orders">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>View your past orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      {orders.length > 0 ? (
                        <div className="space-y-4">
                          {orders.map((order) => (
                            <div key={order.id} className="border rounded-lg p-4 space-y-3">
                              <div className="flex justify-between items-start">
                                <div>
                                  <p className="font-medium">Order #{order.id}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                  </p>
                                </div>
                                <Badge>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</Badge>
                              </div>

                              <div className="space-y-2">
                                {order.items.map((item: any) => (
                                  <div key={item.id} className="flex justify-between text-sm">
                                    <span>
                                      {item.quantity} x {item.isCustom ? item.customName : "Juice"}
                                    </span>
                                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                                  </div>
                                ))}
                              </div>

                              <div className="pt-2 border-t flex justify-between">
                                <span className="font-medium">Total</span>
                                <span className="font-bold">${order.total.toFixed(2)}</span>
                              </div>

                              <div className="pt-2 text-sm text-muted-foreground">
                                <p>Delivery Address: {order.address}</p>
                                <p>Payment Method: {order.paymentMethod === "cod" ? "Cash on Delivery" : "UPI"}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                          <h3 className="text-lg font-semibold mb-2">No orders yet</h3>
                          <p className="text-muted-foreground mb-4">You haven't placed any orders yet.</p>
                          <Button asChild>
                            <a href="/juices">Shop Now</a>
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
