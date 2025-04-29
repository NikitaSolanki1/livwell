"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { dishes } from "@/lib/data"
import { Navbar } from "@/components/navbar"
import { DishCard } from "@/components/dish-card"
import { Footer } from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, SlidersHorizontal, Leaf, Wheat, Milk } from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Image from "next/image"

export default function DishesPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [priceRange, setPriceRange] = useState([0, 20])
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [dietaryFilters, setDietaryFilters] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")

  const categories = Array.from(new Set(dishes.map((dish) => dish.category)))

  const filteredDishes = dishes.filter((dish) => {
    const matchesSearch =
      dish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dish.description.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesPrice = dish.price >= priceRange[0] && dish.price <= priceRange[1]

    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(dish.category)

    const matchesDietary =
      dietaryFilters.length === 0 ||
      dietaryFilters.every((filter) => {
        switch (filter) {
          case "vegetarian":
            return dish.vegetarian
          case "vegan":
            return dish.vegan
          case "glutenFree":
            return dish.glutenFree
          case "dairyFree":
            return dish.dairyFree
          default:
            return true
        }
      })

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "featured" && dish.featured) ||
      (activeTab === "popular" && dish.popular) ||
      (activeTab === "new" && dish.new)

    return matchesSearch && matchesPrice && matchesCategory && matchesDietary && matchesTab
  })

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category],
    )
  }

  const handleDietaryChange = (filter: string) => {
    setDietaryFilters((prev) => (prev.includes(filter) ? prev.filter((f) => f !== filter) : [...prev, filter]))
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <div className="relative h-80 bg-gradient-to-r from-green-600 to-emerald-400 mb-8">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-black/20" />
            <Image
              src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=1932&auto=format"
              alt="Healthy dishes banner"
              fill
              className="object-cover"
              style={{ objectPosition: "center 30%" }}
              crossOrigin="anonymous"
            />
          </div>
          <div className="container relative h-full flex flex-col justify-center items-center text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Healthy Dishes</h1>
            <p className="text-lg max-w-2xl">
              Explore our range of nutritious and delicious dishes, crafted with the freshest ingredients to nourish
              your body and delight your taste buds.
            </p>
          </div>
        </div>

        <div className="container py-8">
          <div className="flex flex-col items-center text-center mb-8">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Healthy Dishes</h1>
            <p className="text-muted-foreground max-w-2xl">
              Explore our range of nutritious and delicious dishes, crafted with the freshest ingredients to nourish
              your body and delight your taste buds.
            </p>
          </div>

          <Tabs defaultValue="all" className="mb-8" onValueChange={setActiveTab}>
            <div className="flex justify-center">
              <TabsList>
                <TabsTrigger value="all">All Dishes</TabsTrigger>
                <TabsTrigger value="featured">Featured</TabsTrigger>
                <TabsTrigger value="popular">Popular</TabsTrigger>
                <TabsTrigger value="new">New Arrivals</TabsTrigger>
              </TabsList>
            </div>
          </Tabs>

          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search dishes..."
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
                  <SheetDescription>Refine your dish selection with these filters.</SheetDescription>
                </SheetHeader>

                <div className="py-6 space-y-6">
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

                  <div className="space-y-4">
                    <h3 className="font-medium">Dietary Preferences</h3>
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vegetarian"
                          checked={dietaryFilters.includes("vegetarian")}
                          onCheckedChange={() => handleDietaryChange("vegetarian")}
                        />
                        <Label htmlFor="vegetarian" className="flex items-center">
                          <Leaf className="h-4 w-4 mr-1 text-green-600" /> Vegetarian
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="vegan"
                          checked={dietaryFilters.includes("vegan")}
                          onCheckedChange={() => handleDietaryChange("vegan")}
                        />
                        <Label htmlFor="vegan" className="flex items-center">
                          <Leaf className="h-4 w-4 mr-1 text-green-600" /> Vegan
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="glutenFree"
                          checked={dietaryFilters.includes("glutenFree")}
                          onCheckedChange={() => handleDietaryChange("glutenFree")}
                        />
                        <Label htmlFor="glutenFree" className="flex items-center">
                          <Wheat className="h-4 w-4 mr-1 text-amber-600" /> Gluten-Free
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="dairyFree"
                          checked={dietaryFilters.includes("dairyFree")}
                          onCheckedChange={() => handleDietaryChange("dairyFree")}
                        />
                        <Label htmlFor="dairyFree" className="flex items-center">
                          <Milk className="h-4 w-4 mr-1 text-blue-600" /> Dairy-Free
                        </Label>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      setSelectedCategories([])
                      setDietaryFilters([])
                    }}
                  >
                    Reset Filters
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {filteredDishes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDishes.map((dish, index) => (
                <motion.div
                  key={dish.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <DishCard dish={dish} />
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold mb-2">No dishes found</h3>
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
