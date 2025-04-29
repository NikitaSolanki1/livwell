"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { dishes } from "@/lib/data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Leaf, Clock, ArrowRight } from "lucide-react"

export function SeasonalMenu() {
  const [currentSeason] = useState("Summer")

  // Filter dishes based on season - in a real app, this would be dynamic
  const seasonalDishes = dishes
    .filter((dish) =>
      ["Berry Smoothie Bowl", "Fresh Fruit Cups", "Blueberry Protein Smoothie", "Lemon Herb Salmon"].includes(
        dish.name,
      ),
    )
    .slice(0, 4)

  return (
    <section className="py-16 bg-gradient-to-b from-amber-50 to-white dark:from-slate-900 dark:to-slate-950">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <Badge className="mb-4 px-3 py-1 bg-amber-100 text-amber-800 hover:bg-amber-200 dark:bg-amber-900 dark:text-amber-100">
            Limited Time
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{currentSeason} Seasonal Specials</h2>
          <p className="text-muted-foreground max-w-2xl">
            Enjoy our specially curated menu featuring fresh, seasonal ingredients at their peak flavor and nutritional
            value.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonalDishes.map((dish, index) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="overflow-hidden h-full flex flex-col group">
                <div className="relative h-48 overflow-hidden">
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
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                    <div className="p-4 w-full">
                      <Link href={`/dishes/₹{dish.id}`}>
                        <Button size="sm" variant="secondary" className="w-full">
                          View Details
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
                <CardContent className="p-4 flex-grow flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Link href={`/dishes/₹{dish.id}`} className="hover:underline">
                      <h3 className="font-semibold">{dish.name}</h3>
                    </Link>
                    <span className="font-bold text-primary">₹{dish.price.toFixed(2)}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{dish.description}</p>
                  <div className="mt-auto flex items-center text-xs text-muted-foreground">
                    {dish.vegetarian && (
                      <span className="flex items-center mr-3">
                        <Leaf className="h-3 w-3 mr-1 text-green-600" /> Vegetarian
                      </span>
                    )}
                    <span className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" /> {dish.prepTime + dish.cookTime} min
                    </span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center mt-10">
          <Button asChild>
            <Link href="/dishes" className="group">
              Browse All Dishes <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
