"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams, notFound } from "next/navigation"
import { motion } from "framer-motion"
import { juices } from "@/lib/data"
import { useCart } from "@/components/cart-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Plus, Minus, ArrowLeft } from "lucide-react"
import { Star } from "lucide-react"

export default function JuiceDetailPage() {
  const params = useParams()
  const juiceId = params.id as string

  const juice = juices.find((j) => j.id === juiceId)

  if (!juice) {
    notFound()
  }

  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    addToCart({
      juiceId: juice.id,
      quantity,
      price: juice.price,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container py-8">
          <Button variant="ghost" className="mb-6" asChild>
            <a href="/juices">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Juices
            </a>
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-lg overflow-hidden bg-muted"
            >
              <Image src={juice.image || "/placeholder.svg"} alt={juice.name} fill className="object-cover" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge>{juice.category}</Badge>
                {juice.featured && <Badge variant="secondary">Featured</Badge>}
                {juice.popular && <Badge variant="secondary">Popular</Badge>}
                {juice.new && <Badge variant="secondary">New</Badge>}
              </div>

              <h1 className="text-3xl font-bold mb-2">{juice.name}</h1>
              <div className="text-2xl font-bold text-primary mb-4">₹{juice.price.toFixed(2)}</div>

              <p className="text-muted-foreground mb-6">{juice.description}</p>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Ingredients:</h3>
                <div className="flex flex-wrap gap-2">
                  {juice.ingredients.map((ingredient) => (
                    <Badge key={ingredient} variant="outline">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-2">Benefits:</h3>
                <ul className="list-disc list-inside text-muted-foreground">
                  {juice.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-r-none" onClick={decrementQuantity}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button variant="ghost" size="icon" className="h-10 w-10 rounded-l-none" onClick={incrementQuantity}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                <Button size="lg" className="flex-1" onClick={handleAddToCart}>
                  <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
              </div>
            </motion.div>
          </div>

          <div className="mt-12">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="nutrition">Nutrition Facts</TabsTrigger>
                <TabsTrigger value="reviews">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="description" className="py-6">
                <div className="prose prose-sm max-w-none">
                  <p>
                    {juice.name} is a refreshing and nutritious juice blend designed to provide you with essential
                    vitamins and minerals. Made with only the freshest ingredients, this juice is perfect for anyone
                    looking to improve their health and wellbeing.
                  </p>
                  <p>
                    Our cold-press technology ensures that all the nutrients from the fruits and vegetables are
                    preserved, giving you maximum health benefits with every sip. Unlike pasteurized juices, our
                    cold-pressed juices retain more vitamins, minerals, and enzymes.
                  </p>
                  <p>
                    Enjoy {juice.name} as part of your daily routine for optimal health benefits. It's perfect as a
                    morning energizer, a pre-workout boost, or an afternoon pick-me-up.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="nutrition" className="py-6">
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Nutrition Facts</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b pb-2">
                      <span>Serving Size</span>
                      <span>8 fl oz (240ml)</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Calories</span>
                      <span>120</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Total Fat</span>
                      <span>0g</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Sodium</span>
                      <span>10mg</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Total Carbohydrate</span>
                      <span>28g</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Dietary Fiber</span>
                      <span>2g</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Sugars</span>
                      <span>24g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protein</span>
                      <span>2g</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="py-6">
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-semibold">Jane D.</div>
                      <div className="text-muted-foreground text-sm">Verified Purchase</div>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-sm">
                      This juice is amazing! It tastes great and gives me so much energy. I drink it every morning
                      before my workout.
                    </p>
                  </div>
                  <div className="border-b pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-semibold">Mark T.</div>
                      <div className="text-muted-foreground text-sm">Verified Purchase</div>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                      {Array.from({ length: 1 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-muted-foreground" />
                      ))}
                    </div>
                    <p className="text-sm">
                      Great taste and quality. I would have given 5 stars but it's a bit pricey. Still worth it for the
                      health benefits.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-semibold">Sarah L.</div>
                      <div className="text-muted-foreground text-sm">Verified Purchase</div>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <p className="text-sm">
                      I've tried many juices and this is by far the best. The ingredients are fresh and you can really
                      taste the difference. Highly recommend!
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
