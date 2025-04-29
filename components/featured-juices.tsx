"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"
import { juices } from "@/lib/data"
import { JuiceCard } from "@/components/juice-card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Map of juice names to Unsplash image URLs
const juiceImages = {
  "Detox Green": "/images/juices/spinach.webp",
  "Immunity Booster": "/images/juices/immunity-booster.jpg",
  "Energy Blast": "/images/juices/energy-blast.jpeg",
  "Berry Bliss": "berry-bliss.jpeg",
  "Tropical Paradise": "tropical-paradise.jpg",
  "Green Machine": "green-machine.webp",
}

export function FeaturedJuices() {
  const [activeTab, setActiveTab] = useState("featured")

  const featuredJuices = juices.filter((juice) => juice.featured)
  const popularJuices = juices.filter((juice) => juice.popular)
  const newJuices = juices.filter((juice) => juice.new)

  return (
    <section className="py-16 container">
      <div className="relative mb-12 overflow-hidden rounded-xl">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?q=80&w=1932&auto=format"
            alt="Fresh juices"
            fill
            className="object-cover"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col items-center text-center p-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4 text-white">Discover Our Juices</h2>
          <p className="text-white/80 max-w-2xl">
            Explore our range of delicious and nutritious juices, crafted with the freshest ingredients to boost your
            health and energy.
          </p>
        </div>
      </div>

      <Tabs defaultValue="featured" className="w-full" onValueChange={setActiveTab}>
        <div className="flex justify-center mb-8">
          <TabsList>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="new">New Arrivals</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="featured" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJuices.map((juice, index) => (
              <motion.div
                key={juice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <JuiceCard juice={{ ...juice, image: juiceImages[juice.name] || juice.image }} />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="popular" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularJuices.map((juice, index) => (
              <motion.div
                key={juice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <JuiceCard juice={{ ...juice, image: juiceImages[juice.name] || juice.image }} />
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="new" className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newJuices.map((juice, index) => (
              <motion.div
                key={juice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <JuiceCard juice={{ ...juice, image: juiceImages[juice.name] || juice.image }} />
              </motion.div>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="flex justify-center mt-12">
        <Button size="lg" asChild>
          <Link href="/juices">View All Juices</Link>
        </Button>
      </div>

      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative h-64 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?q=80&w=600&auto=format"
            alt="Fresh juice preparation"
            fill
            className="object-cover transition-transform hover:scale-105"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <p className="text-white p-4 font-medium">Freshly Pressed Daily</p>
          </div>
        </div>
        <div className="relative h-64 rounded-lg overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1600718374662-0483d2b9da44?q=80&w=600&auto=format"
            alt="Organic ingredients"
            fill
            className="object-cover transition-transform hover:scale-105"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <p className="text-white p-4 font-medium">100% Organic Ingredients</p>
          </div>
        </div>
        <div className="relative h-64 rounded-lg overflow-hidden">
          <Image
            src="/images/juices/spinach.webp"
            alt="Nutritional benefits"
            fill
            className="object-cover transition-transform hover:scale-105"
            crossOrigin="anonymous"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <p className="text-white p-4 font-medium">Packed With Nutrients</p>
          </div>
        </div>
      </div>
    </section>
  )
}
