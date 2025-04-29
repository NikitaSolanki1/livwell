"use client"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { dishes } from "@/lib/data"
import { DishCard } from "@/components/dish-card"
import { Button } from "@/components/ui/button"

// Map of dish names to Unsplash image URLs
const dishImages = {
  "Quinoa Vegetable Salad": "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format",
  "Greek Yogurt Parfait": "https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=500&auto=format",
  "Zucchini Pasta with Cherry Tomatoes":
    "https://images.unsplash.com/photo-1473093226795-af9932fe5856?q=80&w=500&auto=format",
  "Lemon Herb Salmon": "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=500&auto=format",
  "Roasted Vegetable & Chickpea Bowl":
    "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=500&auto=format",
  "Berry Smoothie Bowl": "https://images.unsplash.com/photo-1494597564530-871f2b93ac55?q=80&w=500&auto=format",
}

export function FeaturedDishes() {
  const featuredDishes = dishes.filter((dish) => dish.featured).slice(0, 3)

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="relative mb-12 overflow-hidden rounded-xl">
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=1932&auto=format"
              alt="Healthy dishes"
              fill
              className="object-cover"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          <div className="relative z-10 flex flex-col items-center text-center p-12">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">Healthy Dishes</h2>
            <p className="text-white/80 max-w-2xl">
              Discover our range of nutritious and delicious dishes, crafted with the freshest ingredients to nourish
              your body and delight your taste buds.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <DishCard dish={{ ...dish, image: dishImages[dish.name] || dish.image }} />
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-12">
          <Button size="lg" asChild>
            <Link href="/dishes">View All Dishes</Link>
          </Button>
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=500&auto=format"
              alt="Fresh salad"
              fill
              className="object-cover transition-transform hover:scale-105"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white p-4 font-medium">Fresh Salads</p>
            </div>
          </div>
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=500&auto=format"
              alt="Healthy breakfast"
              fill
              className="object-cover transition-transform hover:scale-105"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white p-4 font-medium">Healthy Breakfast</p>
            </div>
          </div>
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=500&auto=format"
              alt="Protein-rich meals"
              fill
              className="object-cover transition-transform hover:scale-105"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white p-4 font-medium">Protein-Rich Meals</p>
            </div>
          </div>
          <div className="relative h-48 rounded-lg overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1494597564530-871f2b93ac55?q=80&w=500&auto=format"
              alt="Smoothie bowls"
              fill
              className="object-cover transition-transform hover:scale-105"
              crossOrigin="anonymous"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
              <p className="text-white p-4 font-medium">Smoothie Bowls</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
