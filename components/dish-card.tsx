"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Dish } from "@/lib/data"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus, Clock, Leaf, Wheat, Milk } from "lucide-react"
import { v4 as uuidv4 } from "uuid"

interface DishCardProps {
  dish: Dish
}

export function DishCard({ dish }: DishCardProps) {
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
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full bg-muted overflow-hidden group">
          <Link href={`/dishes/${dish.id}`}>
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors z-10" />
            <Image
              src={dish.image || "/placeholder.svg"}
              alt={dish.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              onError={(e) => {
                e.currentTarget.src = "/placeholder.svg"
              }}
              crossOrigin="anonymous"
            />
          </Link>
          <div className="absolute top-2 right-2 z-20 flex flex-col gap-2">
            {dish.featured && (
              <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                Featured
              </Badge>
            )}
            {dish.popular && (
              <Badge variant="secondary" className="bg-purple-500 hover:bg-purple-600 text-white">
                Popular
              </Badge>
            )}
            {dish.new && (
              <Badge variant="secondary" className="bg-green-500 hover:bg-green-600 text-white">
                New
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/dishes/${dish.id}`} className="hover:underline">
            <h3 className="font-semibold text-lg">{dish.name}</h3>
          </Link>
          <span className="font-bold text-primary">₹{dish.price.toFixed(2)}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{dish.description}</p>

        <div className="flex flex-wrap gap-1 mb-3">
          {dish.vegetarian && (
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              <Leaf className="h-3 w-3 mr-1" /> Vegetarian
            </Badge>
          )}
          {dish.vegan && (
            <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-200">
              <Leaf className="h-3 w-3 mr-1" /> Vegan
            </Badge>
          )}
          {dish.glutenFree && (
            <Badge variant="outline" className="text-xs bg-amber-50 text-amber-700 border-amber-200">
              <Wheat className="h-3 w-3 mr-1" /> Gluten-Free
            </Badge>
          )}
          {dish.dairyFree && (
            <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
              <Milk className="h-3 w-3 mr-1" /> Dairy-Free
            </Badge>
          )}
        </div>

        <div className="flex items-center text-sm text-muted-foreground mb-2">
          <Clock className="h-4 w-4 mr-1" />
          <span>Prep: {dish.prepTime} min</span>
          <span className="mx-2">•</span>
          <span>Cook: {dish.cookTime} min</span>
        </div>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <div className="flex items-center w-full gap-2">
          <div className="flex items-center border rounded-md">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-r-none" onClick={decrementQuantity}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-l-none" onClick={incrementQuantity}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <Button className="flex-1" onClick={handleAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
