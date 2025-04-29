"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import type { Juice } from "@/lib/data"
import { useCart } from "@/components/cart-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ShoppingCart, Plus, Minus } from "lucide-react"

// Map of juice names to Unsplash image URLs
const juiceImages = {
  "Detox Green": "/images/juices/spinach.webp",
  "Immunity Booster": "/images/juices/immunity-booster.jpg",
  "Energy Blast": "/images/juices/energy-blast.jpeg",
  "Berry Bliss": "/images/juices/berry-bliss.jpeg",
  "Tropical Paradise": "/images/juices/tropical-paradise.jpg",
  "Green Machine": "images/juices/green-machine.webp",
}

interface JuiceCardProps {
  juice: Juice
}

export function JuiceCard({ juice }: JuiceCardProps) {
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

  // Get image URL from our map, or fallback to the original image
  const imageUrl = juiceImages[juice.name as keyof typeof juiceImages] || juice.image

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <CardHeader className="p-0">
        <div className="relative h-64 w-full bg-muted overflow-hidden group">
          <Link href={`/juices/${juice.id}`}>
            <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors z-10" />
            <Image
              src={imageUrl || "/placeholder.svg"}
              alt={juice.name}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              crossOrigin="anonymous"
            />
          </Link>
          <div className="absolute top-2 right-2 z-20 flex flex-col gap-2">
            {juice.featured && (
              <Badge variant="secondary" className="bg-yellow-500 hover:bg-yellow-600 text-white">
                Featured
              </Badge>
            )}
            {juice.popular && (
              <Badge variant="secondary" className="bg-purple-500 hover:bg-purple-600 text-white">
                Popular
              </Badge>
            )}
            {juice.new && (
              <Badge variant="secondary" className="bg-green-500 hover:bg-green-600 text-white">
                New
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <div className="flex justify-between items-start mb-2">
          <Link href={`/juices/${juice.id}`} className="hover:underline">
            <h3 className="font-semibold text-lg">{juice.name}</h3>
          </Link>
          <span className="font-bold text-primary">₹{juice.price.toFixed(2)}</span>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{juice.description}</p>
        <div className="flex flex-wrap gap-1 mb-2">
          {juice.ingredients.map((ingredient) => (
            <Badge key={ingredient} variant="outline" className="text-xs">
              {ingredient}
            </Badge>
          ))}
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
