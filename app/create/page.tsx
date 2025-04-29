"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { useCart } from "@/components/cart-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { ShoppingCart, ArrowLeft, ArrowRight, Droplet, Leaf, Sparkles } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { v4 as uuidv4 } from "uuid"
import confetti from "canvas-confetti"

// Define the base options with Unsplash images
const baseOptions = [
  {
    id: "water",
    name: "Water",
    image: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?q=80&w=200&auto=format",
    color: "#E0F7FA",
    price: 5,
  },
  {
    id: "coconut",
    name: "Coconut Water",
    image: "/images/fruits/coco.jpeg",
    color: "#FFF3E0",
    price: 10,
  },
  {
    id: "almond",
    name: "Almond Milk",
    image: "/images/fruits/almond.jpg",
    color: "#F5F5F5",
    price: 20,
  },
  {
    id: "oat",
    name: "Oat Milk",
    image: "/images/fruits/oat.jpg",
    color: "#EFEBE9",
    price: 20,
  },
]

// Define the booster options with Unsplash images
const boosterOptions = [
  {
    id: "protein",
    name: "Protein Powder",
    image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?q=80&w=200&auto=format",
    color: "#E8EAF6",
    price: 30,
  },
  {
    id: "chia",
    name: "Chia Seeds",
    image: "/images/fruits/chia.webp",
    color: "#F3E5F5",
    price: 10,
  },
  {
    id: "flax",
    name: "Flax Seeds",
    image: "/images/fruits/flex.jpg",
    color: "#FFF8E1",
    price: 10,
  },
  {
    id: "honey",
    name: "Honey",
    image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?q=80&w=200&auto=format",
    color: "#FFF9C4",
    price: 5,
  },
  {
    id: "ginger",
    name: "Ginger",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?q=80&w=200&auto=format",
    color: "#FFFDE7",
    price: 5,
  },
]

// Define the vegetable options with Unsplash images
const vegetableOptions = [
  {
    id: "spinach",
    name: "Spinach",
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?q=80&w=200&auto=format",
    color: "#E8F5E9",
    price: 10,
  },
  {
    id: "kale",
    name: "Kale",
    image: "https://images.unsplash.com/photo-1524179091875-bf99a9a6af57?q=80&w=200&auto=format",
    color: "#F1F8E9",
    price: 15,
  },
  {
    id: "tomato",
    name: "Tomato",
    image: "https://images.unsplash.com/photo-1594057687713-5fd14eed1c17?q=80&w=200&auto=format",
    color: "#F9FBE7",
    price: 10,
  },
  {
    id: "cucumber",
    name: "Cucumber",
    image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?q=80&w=200&auto=format",
    color: "#E0F2F1",
    price: 10,
  },
  {
    id: "carrot",
    name: "Carrot",
    image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=200&auto=format",
    color: "#FFF3E0",
    price: 10,
  },
]

// Define the fruit options with Unsplash images
const fruitOptions = [
  {
    id: "apple",
    name: "Apple",
    image: "https://images.unsplash.com/photo-1570913149827-d2ac84ab3f9a?q=80&w=200&auto=format",
    color: "#FFEBEE",
    price: 30,
  },
  {
    id: "orange",
    name: "Orange",
    image: "https://images.unsplash.com/photo-1582979512210-99b6a53386f9?q=80&w=200&auto=format",
    color: "#FFF3E0",
    price: 20,
  },
  {
    id: "kiwi",
    name: "Kiwi",
    image: "https://images.unsplash.com/photo-1618897996318-5a901fa6ca71?q=80&w=200&auto=format",
    color: "#F1F8E9",
    price: 40,
  },
  {
    id: "strawberry",
    name: "Strawberry",
    image: "https://images.unsplash.com/photo-1543528176-61b239494933?q=80&w=200&auto=format",
    color: "#FFEBEE",
    price: 40,
  },
  {
    id: "banana",
    name: "Banana",
    image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?q=80&w=200&auto=format",
    color: "#FFFDE7",
    price: 10,
  },
  {
    id: "blueberry",
    name: "Blueberry",
    image: "https://images.unsplash.com/photo-1498557850523-fd3d118b962e?q=80&w=200&auto=format",
    color: "#EDE7F6",
    price: 30,
  },
  {
    id: "pineapple",
    name: "Pineapple",
    image: "https://images.unsplash.com/photo-1589820296156-2454bb8a6ad1?q=80&w=200&auto=format",
    color: "#FFF9C4",
    price: 35,
  },
  {
    id: "mango",
    name: "Mango",
    image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=200&auto=format",
    color: "#FFECB3",
    price: 30,
  },
]

export default function CreateJuicePage() {
  const [step, setStep] = useState(1)
  const [selectedBase, setSelectedBase] = useState<string | null>(null)
  const [selectedFruits, setSelectedFruits] = useState<string[]>([])
  const [selectedVegetables, setSelectedVegetables] = useState<string[]>([])
  const [selectedBoosters, setSelectedBoosters] = useState<string[]>([])
  const [customName, setCustomName] = useState("")
  const [sweetness, setSweetness] = useState([5])
  const [iciness, setIciness] = useState([5])
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [imagesLoaded, setImagesLoaded] = useState(false)

  // Preload images
  useEffect(() => {
    // Set a timeout to show the content after a brief delay
    // This avoids complex image preloading that might cause errors
    const timer = setTimeout(() => {
      setImagesLoaded(true)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Calculate total price
  const calculatePrice = () => {
    let price = 0

    // Add base price
    if (selectedBase) {
      const base = baseOptions.find((b) => b.id === selectedBase)
      if (base) price += base.price
    }

    // Add fruits price
    selectedFruits.forEach((fruitId) => {
      const fruit = fruitOptions.find((f) => f.id === fruitId)
      if (fruit) price += fruit.price
    })

    // Add vegetables price
    selectedVegetables.forEach((vegId) => {
      const veg = vegetableOptions.find((v) => v.id === vegId)
      if (veg) price += veg.price
    })

    // Add boosters price
    selectedBoosters.forEach((boosterId) => {
      const booster = boosterOptions.find((b) => b.id === boosterId)
      if (booster) price += booster.price
    })

    return price
  }

  const handleBaseSelect = (baseId: string) => {
    setSelectedBase(baseId)
  }

  const handleFruitToggle = (fruitId: string) => {
    setSelectedFruits((prev) => (prev.includes(fruitId) ? prev.filter((id) => id !== fruitId) : [...prev, fruitId]))
  }

  const handleVegetableToggle = (vegId: string) => {
    setSelectedVegetables((prev) => (prev.includes(vegId) ? prev.filter((id) => id !== vegId) : [...prev, vegId]))
  }

  const handleBoosterToggle = (boosterId: string) => {
    setSelectedBoosters((prev) =>
      prev.includes(boosterId) ? prev.filter((id) => id !== boosterId) : [...prev, boosterId],
    )
  }

  const nextStep = () => {
    if (step < 5) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!selectedBase
      case 2:
        return selectedFruits.length > 0
      case 3:
        return true // Vegetables are optional
      case 4:
        return true // Boosters are optional
      default:
        return true
    }
  }

  const handleAddToCart = () => {
    // Get all selected ingredients
    const baseIngredient = baseOptions.find((b) => b.id === selectedBase)?.name || ""
    const fruitIngredients = selectedFruits.map((id) => fruitOptions.find((f) => f.id === id)?.name || "")
    const vegetableIngredients = selectedVegetables.map((id) => vegetableOptions.find((v) => v.id === id)?.name || "")
    const boosterIngredients = selectedBoosters.map((id) => boosterOptions.find((b) => b.id === id)?.name || "")

    // Combine all ingredients
    const allIngredients = [baseIngredient, ...fruitIngredients, ...vegetableIngredients, ...boosterIngredients].filter(
      Boolean,
    )

    // Generate a name if not provided
    const juiceName = customName.trim() || `Custom ${fruitIngredients[0] || ""} Juice`

    // Add to cart
    addToCart({
      juiceId: uuidv4(),
      quantity: 1,
      price: calculatePrice(),
      isCustom: true,
      customName: juiceName,
      customIngredients: allIngredients,
    })

    // Show success toast
    toast({
      title: "Custom juice created!",
      description: `${juiceName} has been added to your cart.`,
    })

    // Trigger confetti effect
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF5722", "#4CAF50", "#2196F3"],
    })

    // Reset form
    setSelectedBase(null)
    setSelectedFruits([])
    setSelectedVegetables([])
    setSelectedBoosters([])
    setCustomName("")
    setSweetness([5])
    setIciness([5])
    setStep(1)
  }

  // Get the current step items
  const getCurrentStepItems = () => {
    switch (step) {
      case 1:
        return baseOptions
      case 2:
        return fruitOptions
      case 3:
        return vegetableOptions
      case 4:
        return boosterOptions
      default:
        return []
    }
  }

  // Check if an item is selected
  const isItemSelected = (itemId: string) => {
    switch (step) {
      case 1:
        return selectedBase === itemId
      case 2:
        return selectedFruits.includes(itemId)
      case 3:
        return selectedVegetables.includes(itemId)
      case 4:
        return selectedBoosters.includes(itemId)
      default:
        return false
    }
  }

  // Handle item toggle
  const handleItemToggle = (itemId: string) => {
    switch (step) {
      case 1:
        handleBaseSelect(itemId)
        break
      case 2:
        handleFruitToggle(itemId)
        break
      case 3:
        handleVegetableToggle(itemId)
        break
      case 4:
        handleBoosterToggle(itemId)
        break
    }
  }

  // Get step title
  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Choose Your Base"
      case 2:
        return "Add Fruits"
      case 3:
        return "Add Vegetables"
      case 4:
        return "Add Boosters"
      case 5:
        return "Customize & Finish"
      default:
        return ""
    }
  }

  // Get step description
  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Select a liquid base for your juice"
      case 2:
        return "Choose at least one fruit for your blend"
      case 3:
        return "Add vegetables for extra nutrition (optional)"
      case 4:
        return "Enhance your juice with boosters (optional)"
      case 5:
        return "Customize your juice and add it to your cart"
      default:
        return ""
    }
  }

  // Get step icon
  const getStepIcon = () => {
    switch (step) {
      case 1:
        return <Droplet className="h-6 w-6 text-blue-500" />
      case 2:
        return <Leaf className="h-6 w-6 text-green-500" />
      case 3:
        return <Leaf className="h-6 w-6 text-green-700" />
      case 4:
        return <Sparkles className="h-6 w-6 text-yellow-500" />
      case 5:
        return <ShoppingCart className="h-6 w-6 text-primary" />
      default:
        return null
    }
  }

  if (!imagesLoaded) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mb-4"></div>
            <p className="text-lg">Loading juice creator...</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="relative h-80 bg-gradient-to-r from-green-600 to-emerald-400 mb-8">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black/20" />
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage:
                "url('/images/fruits/juice6.avif')",
              backgroundBlendMode: "overlay",
            }}
          />
        </div>
        <div className="container relative h-full flex flex-col justify-center items-center text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Custom Juices</h1>
          <p className="text-lg max-w-2xl">
            Create your perfect blend by mixing and matching fresh ingredients. Design a juice that's uniquely yours!
          </p>
        </div>
      </div>

      <main className="flex-1">
        <div className="container py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center mb-8"
          >
            <p className="text-muted-foreground max-w-2xl">
              Mix and match fruits, vegetables, and superfoods to create your perfect blend
            </p>
          </motion.div>

          {/* Step Progress */}
          <div className="mb-8">
            <div className="grid grid-cols-5 gap-2 w-full max-w-3xl mx-auto bg-muted/30 p-1 rounded-full">
              {[1, 2, 3, 4, 5].map((stepNumber) => (
                <button
                  key={stepNumber}
                  className={`py-2 px-4 rounded-full text-sm font-medium transition-colors ${
                    step === stepNumber
                      ? "bg-primary text-white"
                      : step > stepNumber
                        ? "bg-primary/20 text-primary"
                        : "bg-transparent text-muted-foreground"
                  } ${step > stepNumber ? "cursor-pointer" : ""}`}
                  onClick={() => step > stepNumber && setStep(stepNumber)}
                  disabled={step <= stepNumber}
                >
                  {stepNumber}.{" "}
                  {stepNumber === 1
                    ? "Base"
                    : stepNumber === 2
                      ? "Fruits"
                      : stepNumber === 3
                        ? "Vegetables"
                        : stepNumber === 4
                          ? "Boosters"
                          : "Finish"}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card className="overflow-hidden border-none shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    {getStepIcon()}
                    <div>
                      <h2 className="text-xl font-semibold">{getStepTitle()}</h2>
                      <p className="text-muted-foreground">{getStepDescription()}</p>
                    </div>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {step < 5 ? (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                          {getCurrentStepItems().map((item) => (
                            <motion.div
                              key={item.id}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-colors ${
                                isItemSelected(item.id) ? "border-primary" : "border-transparent"
                              }`}
                              onClick={() => handleItemToggle(item.id)}
                            >
                              <div
                                className="aspect-square relative"
                                style={{
                                  backgroundColor: `${item.color}80`,
                                }}
                              >
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover p-2"
                                  onError={(e) => {
                                    // Prevent infinite error loops by setting a fallback
                                    e.currentTarget.src = "/placeholder.svg"
                                  }}
                                  crossOrigin="anonymous"
                                />
                                {isItemSelected(item.id) && (
                                  <div className="absolute inset-0 bg-primary/10 flex items-center justify-center">
                                    <div className="bg-primary text-white rounded-full p-1">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="16"
                                        height="16"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                      >
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                      </svg>
                                    </div>
                                  </div>
                                )}
                              </div>
                              <div className="p-2 text-center bg-background">
                                <span className="font-medium text-sm">{item.name}</span>
                                <div className="text-xs text-muted-foreground">₹{item.price.toFixed(2)}</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      ) : (
                        <div className="space-y-6">
                          <div className="space-y-4">
                            <Label htmlFor="juice-name">Name Your Juice</Label>
                            <Input
                              id="juice-name"
                              placeholder="e.g., Tropical Blast"
                              value={customName}
                              onChange={(e) => setCustomName(e.target.value)}
                            />
                          </div>

                          <div className="space-y-4">
                            <Label>Sweetness Level</Label>
                            <Slider value={sweetness} onValueChange={setSweetness} max={10} step={1} className="py-4" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Less Sweet</span>
                              <span>More Sweet</span>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Label>Ice Level</Label>
                            <Slider value={iciness} onValueChange={setIciness} max={10} step={1} className="py-4" />
                            <div className="flex justify-between text-xs text-muted-foreground">
                              <span>Less Ice</span>
                              <span>More Ice</span>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <Label>Selected Ingredients</Label>
                            <div className="bg-muted/50 rounded-lg p-4 space-y-2">
                              {selectedBase && (
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Base:</span>
                                  <span>{baseOptions.find((b) => b.id === selectedBase)?.name}</span>
                                </div>
                              )}

                              {selectedFruits.length > 0 && (
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Fruits:</span>
                                  <span>
                                    {selectedFruits.map((id) => fruitOptions.find((f) => f.id === id)?.name).join(", ")}
                                  </span>
                                </div>
                              )}

                              {selectedVegetables.length > 0 && (
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Vegetables:</span>
                                  <span>
                                    {selectedVegetables
                                      .map((id) => vegetableOptions.find((v) => v.id === id)?.name)
                                      .join(", ")}
                                  </span>
                                </div>
                              )}

                              {selectedBoosters.length > 0 && (
                                <div className="flex items-center justify-between">
                                  <span className="font-medium">Boosters:</span>
                                  <span>
                                    {selectedBoosters
                                      .map((id) => boosterOptions.find((b) => b.id === id)?.name)
                                      .join(", ")}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="pt-4 border-t">
                            <div className="flex justify-between mb-4">
                              <span className="font-medium">Total Price:</span>
                              <span className="font-bold text-primary">₹{calculatePrice().toFixed(2)}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <div className="flex justify-between mt-8">
                    <Button variant="outline" onClick={prevStep} disabled={step === 1}>
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>

                    {step < 5 ? (
                      <Button onClick={nextStep} disabled={!canProceed()}>
                        Next <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button onClick={handleAddToCart} disabled={!selectedBase || selectedFruits.length === 0}>
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            <div>
              <Card className="sticky top-24 border-none shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Your Juice Preview</h3>

                  <div className="aspect-square relative rounded-lg overflow-hidden mb-4 bg-gradient-to-b from-primary/10 to-primary/5">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="relative h-40 w-40">
                        <div className="absolute inset-0 rounded-full bg-primary/20 animate-pulse"></div>
                        <div className="absolute inset-4 rounded-full bg-primary/30"></div>
                        <div className="absolute inset-8 rounded-full bg-primary/40"></div>
                        <div className="absolute inset-12 rounded-full bg-primary/50"></div>
                      </div>
                    </div>

                    {/* Ingredient icons */}
                    {selectedBase && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute top-4 left-4 h-12 w-12 rounded-full bg-white shadow-md overflow-hidden"
                      >
                        <Image
                          src={baseOptions.find((b) => b.id === selectedBase)?.image || "/placeholder.svg"}
                          alt="Base"
                          fill
                          className="object-cover p-2"
                          onError={(e) => {
                            // Prevent infinite error loops by setting a fallback
                            e.currentTarget.src = "/placeholder.svg"
                          }}
                          crossOrigin="anonymous"
                        />
                      </motion.div>
                    )}

                    {selectedFruits.slice(0, 2).map((fruitId, index) => (
                      <motion.div
                        key={fruitId}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * (index + 1) }}
                        className="absolute top-4 right-4 h-12 w-12 rounded-full bg-white shadow-md overflow-hidden"
                        style={{ right: `${(index + 1) * 3.5}rem` }}
                      >
                        <Image
                          src={fruitOptions.find((f) => f.id === fruitId)?.image || "/placeholder.svg"}
                          alt="Fruit"
                          fill
                          className="object-cover p-2"
                          onError={(e) => {
                            // Prevent infinite error loops by setting a fallback
                            e.currentTarget.src = "/placeholder.svg"
                          }}
                          crossOrigin="anonymous"
                        />
                      </motion.div>
                    ))}

                    {selectedVegetables.slice(0, 2).map((vegId, index) => (
                      <motion.div
                        key={vegId}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * (index + 3) }}
                        className="absolute bottom-4 left-4 h-12 w-12 rounded-full bg-white shadow-md overflow-hidden"
                        style={{ left: `${(index + 1) * 3.5}rem` }}
                      >
                        <Image
                          src={vegetableOptions.find((v) => v.id === vegId)?.image || "/placeholder.svg"}
                          alt="Vegetable"
                          fill
                          className="object-cover p-2"
                          onError={(e) => {
                            // Prevent infinite error loops by setting a fallback
                            e.currentTarget.src = "/placeholder.svg"
                          }}
                          crossOrigin="anonymous"
                        />
                      </motion.div>
                    ))}

                    {selectedBoosters.slice(0, 2).map((boosterId, index) => (
                      <motion.div
                        key={boosterId}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 * (index + 5) }}
                        className="absolute bottom-4 right-4 h-12 w-12 rounded-full bg-white shadow-md overflow-hidden"
                        style={{ right: `${(index + 1) * 3.5}rem` }}
                      >
                        <Image
                          src={boosterOptions.find((b) => b.id === boosterId)?.image || "/placeholder.svg"}
                          alt="Booster"
                          fill
                          className="object-cover p-2"
                          onError={(e) => {
                            // Prevent infinite error loops by setting a fallback
                            e.currentTarget.src = "/placeholder.svg"
                          }}
                          crossOrigin="anonymous"
                        />
                      </motion.div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium">Name</h4>
                      <p className="text-muted-foreground">{customName || "Your Custom Juice"}</p>
                    </div>

                    <div>
                      <h4 className="font-medium">Ingredients</h4>
                      <ul className="text-sm text-muted-foreground list-disc list-inside">
                        {selectedBase && <li>{baseOptions.find((b) => b.id === selectedBase)?.name}</li>}

                        {selectedFruits.map((fruitId) => (
                          <li key={fruitId}>{fruitOptions.find((f) => f.id === fruitId)?.name}</li>
                        ))}

                        {selectedVegetables.map((vegId) => (
                          <li key={vegId}>{vegetableOptions.find((v) => v.id === vegId)?.name}</li>
                        ))}

                        {selectedBoosters.map((boosterId) => (
                          <li key={boosterId}>{boosterOptions.find((b) => b.id === boosterId)?.name}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-medium">Estimated Price</h4>
                      <p className="text-xl font-bold text-primary">₹{calculatePrice().toFixed(2)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
