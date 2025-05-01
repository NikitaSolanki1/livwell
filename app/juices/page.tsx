"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { juices } from "@/lib/data"
import { Navbar } from "@/components/navbar"
import { JuiceCard } from "@/components/juice-card"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, SlidersHorizontal } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function JuicesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  // Updated price range to match actual juice prices (50-100)
  const [priceRange, setPriceRange] = useState([50, 100])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const categories = Array.from(new Set(juices.map((juice) => juice.category)))

  const filteredJuices = juices.filter((juice) => {
    const matchesSearch =
      juice.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      juice.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPrice = juice.price >= priceRange[0] && juice.price <= priceRange[1]

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(juice.category)

    return matchesSearch && matchesPrice && matchesCategory
  })

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="relative h-80 bg-gradient-to-r from-green-600 to-emerald-400 mb-8">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <Image
              src="https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?q=80&w=1932&auto=format"
              alt="Fresh juices banner"
              fill
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
              crossOrigin="anonymous"
            />
          </div>
          <div className="container relative h-full flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Explore Our Juices</h1>
            <p className="text-lg max-w-2xl">
              Discover our range of delicious and nutritious juices, crafted with the freshest ingredients to boost your
              health and energy.
            </p>
          </div>
        </div>

        <div className="container py-8">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search juices..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:w-auto">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  Filters
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Filters</SheetTitle>
                  <SheetDescription>Refine your juice selection with these filters.</SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Price Range</h3>
                    <Slider
                      defaultValue={[50, 100]}
                      min={50}
                      max={100}
                      step={5}
                      value={priceRange}
                      onValueChange={setPriceRange}
                    />
                    <div className="flex justify-between">
                      <span>₹{priceRange[0].toFixed(2)}</span>
                      <span>₹{priceRange[1].toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-medium">Categories</h3>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <div key={category} className="flex items-center space-x-2">
                          <Checkbox
                            id={category}
                            checked={selectedCategories.includes(category)}
                            onCheckedChange={() => handleCategoryChange(category)}
                          />
                          <Label htmlFor={category}>{category}</Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setPriceRange([50, 100])
                      setSelectedCategories([])
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {filteredJuices.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredJuices.map((juice, index) => (
                <motion.div
                  key={juice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <JuiceCard juice={juice} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No juices found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters to find what you're looking for.
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}