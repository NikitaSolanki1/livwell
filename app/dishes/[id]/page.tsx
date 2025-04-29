"use client"

import { useState } from "react"
import Image from "next/image"
import { useParams, notFound } from "next/navigation"
import { motion } from "framer-motion"
import { dishes } from "@/lib/data"
import { useCart } from "@/components/cart-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ShoppingCart, Plus, Minus, ArrowLeft, Clock, Leaf, Wheat, Milk } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

export default function DishDetailPage() {
  const params = useParams()
  const dishId = params.id as string

  const dish = dishes.find((d) => d.id === dishId)

  if (!dish) {
    notFound()
  }

  const [quantity, setQuantity] = useState(1)
  const { addToCart } = useCart()

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    addToCart({
      id: uuidv4(),
      dishId: dish.id,
      quantity,
      price: dish.price,
    })
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="container py-8">
          <Button variant="ghost" className="mb-6" asChild>
            <a href="/dishes">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dishes
            </a>
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative aspect-square rounded-lg overflow-hidden bg-muted"
            >
              <Image
                src={dish.image || "/placeholder.svg"}
                alt={dish.name}
                fill
                className="object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/placeholder.svg"
                }}
                crossOrigin="anonymous"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="flex flex-wrap gap-2 mb-2">
                <Badge>{dish.category}</Badge>
                {dish.vegetarian && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Leaf className="h-3 w-3 mr-1" /> Vegetarian
                  </Badge>
                )}
                {dish.vegan && (
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                    <Leaf className="h-3 w-3 mr-1" /> Vegan
                  </Badge>
                )}
                {dish.glutenFree && (
                  <Badge variant="outline" className="bg-amber-50 text-amber-700 border-amber-200">
                    <Wheat className="h-3 w-3 mr-1" /> Gluten-Free
                  </Badge>
                )}
                {dish.dairyFree && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                    <Milk className="h-3 w-3 mr-1" /> Dairy-Free
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl font-bold mb-2">{dish.name}</h1>
              <div className="text-2xl font-bold text-primary mb-4">₹{dish.price.toFixed(2)}</div>

              <p className="text-muted-foreground mb-6">{dish.description}</p>

              <div className="flex items-center text-sm text-muted-foreground mb-6">
                <Clock className="h-4 w-4 mr-1" />
                <span>Prep: {dish.prepTime} min</span>
                <span className="mx-2">•</span>
                <span>Cook: {dish.cookTime} min</span>
                <span className="mx-2">•</span>
                <span>Total: {dish.prepTime + dish.cookTime} min</span>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold mb-2">Ingredients:</h3>
                <div className="flex flex-wrap gap-2">
                  {dish.ingredients.map((ingredient) => (
                    <Badge key={ingredient} variant="outline">
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold mb-2">Nutritional Information:</h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <div className="text-lg font-semibold">{dish.nutritionalInfo.calories}</div>
                    <div className="text-xs text-muted-foreground">Calories</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <div className="text-lg font-semibold">{dish.nutritionalInfo.protein}g</div>
                    <div className="text-xs text-muted-foreground">Protein</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <div className="text-lg font-semibold">{dish.nutritionalInfo.carbs}g</div>
                    <div className="text-xs text-muted-foreground">Carbs</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <div className="text-lg font-semibold">{dish.nutritionalInfo.fat}g</div>
                    <div className="text-xs text-muted-foreground">Fat</div>
                  </div>
                  <div className="bg-muted/50 p-3 rounded-lg text-center">
                    <div className="text-lg font-semibold">{dish.nutritionalInfo.fiber}g</div>
                    <div className="text-xs text-muted-foreground">Fiber</div>
                  </div>
                </div>
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
                    {dish.name} is a delicious and nutritious dish designed to provide you with essential vitamins and
                    minerals. Made with only the freshest ingredients, this dish is perfect for anyone looking to
                    improve their health and wellbeing.
                  </p>
                  <p>
                    Our chefs carefully prepare each dish to ensure maximum flavor and nutritional value. Unlike
                    processed foods, our dishes retain more vitamins, minerals, and enzymes.
                  </p>
                  <p>
                    Enjoy {dish.name} as part of your daily routine for optimal health benefits. It's perfect as a
                    nutritious meal, a pre-workout boost, or a satisfying dinner option.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="nutrition" className="py-6">
                <div className="bg-muted p-6 rounded-lg">
                  <h3 className="font-semibold text-lg mb-4">Nutrition Facts</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between border-b pb-2">
                      <span>Serving Size</span>
                      <span>1 serving</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Calories</span>
                      <span>{dish.nutritionalInfo.calories}</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Total Fat</span>
                      <span>{dish.nutritionalInfo.fat}g</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Total Carbohydrate</span>
                      <span>{dish.nutritionalInfo.carbs}g</span>
                    </div>
                    <div className="flex justify-between border-b pb-2">
                      <span>Dietary Fiber</span>
                      <span>{dish.nutritionalInfo.fiber}g</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Protein</span>
                      <span>{dish.nutritionalInfo.protein}g</span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="py-6">
                <div className="space-y-6">
                  <div className="border-b pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-semibold">Alex M.</div>
                      <div className="text-muted-foreground text-sm">Verified Purchase</div>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm">
                      This dish is amazing! It tastes great and gives me so much energy. I've ordered it multiple times
                      and it's always fresh and delicious.
                    </p>
                  </div>
                  <div className="border-b pb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-semibold">Jamie L.</div>
                      <div className="text-muted-foreground text-sm">Verified Purchase</div>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4 text-muted-foreground"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                        />
                      </svg>
                    </div>
                    <p className="text-sm">
                      Great taste and quality. I would have given 5 stars but the portion size was a bit small for the
                      price. Still worth it for the health benefits.
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="font-semibold">Taylor K.</div>
                      <div className="text-muted-foreground text-sm">Verified Purchase</div>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-4 h-4 text-yellow-500"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                            clipRule="evenodd"
                          />
                        </svg>
                      ))}
                    </div>
                    <p className="text-sm">
                      I've tried many healthy meal options and this is by far the best. The ingredients are fresh and
                      you can really taste the difference. Highly recommend!
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
