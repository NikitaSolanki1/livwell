"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

// Updated products array with local images
const products = [
  {
    id: 1,
    name: "Detox Green Juice",
    image: "/images/juices/spinach.webp",
    description: "A refreshing blend of kale, cucumber, apple, and lemon",
  },
  {
    id: 2,
    name: "Berry Bliss Smoothie",
    image: "/images/juices/berry-bliss.jpeg",
    description: "Mixed berries, banana, and almond milk for a perfect start",
  },
  {
    id: 3,
    name: "Tropical Paradise",
    image: "/images/juices/tropical-paradise1.jpg",
    description: "Pineapple, mango, and coconut water for a tropical escape",
  },
  {
    id: 4,
    name: "Immunity Booster",
    image: "/images/immunity-booster.jpg",
    description: "Orange, carrot, ginger, and turmeric to strengthen your immune system",
  },
  {
    id: 5,
    name: "Energy Blast",
    image: "/images/energy-blast.jpeg",
    description: "Spinach, banana, protein powder, and almond milk for sustained energy",
  },
  {
    id: 6,
    name: "Coconut Refresher",
    image: "/images/coconut-refresher.j",
    description: "Pure coconut water with a hint of lime for ultimate hydration",
  },
]

export function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const visibleProducts = 3

  const nextProduct = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (products.length - visibleProducts + 1))
  }

  const prevProduct = () => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + (products.length - visibleProducts + 1)) % (products.length - visibleProducts + 1),
    )
  }

  return (
    <section className="py-16 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight">Our Premium Products</h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto">
            Discover our range of fresh, organic juices and smoothies crafted with care for your health and enjoyment.
          </p>
        </div>

        <div className="relative">
          <div className="flex overflow-hidden">
            <motion.div
              className="flex gap-6"
              initial={false}
              animate={{ x: `-${currentIndex * (100 / visibleProducts)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {products.map((product) => (
                <div key={product.id} className="min-w-[calc(33.333%-1rem)] flex-shrink-0">
                  <div className="bg-gray-50 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                    <div className="relative h-64">
                      <Image
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        fill
                        className="object-cover"
                        crossOrigin="anonymous"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                      <p className="text-gray-600">{product.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-md z-10"
            onClick={prevProduct}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous</span>
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full bg-white shadow-md z-10"
            onClick={nextProduct}
            disabled={currentIndex === products.length - visibleProducts}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next</span>
          </Button>
        </div>

        <div className="flex justify-center mt-8 gap-1">
          {[...Array(products.length - visibleProducts + 1)].map((_, i) => (
            <button
              key={i}
              className={`h-2 w-2 rounded-full ${i === currentIndex ? "bg-primary" : "bg-gray-300"}`}
              onClick={() => setCurrentIndex(i)}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
