"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Heart, Activity, Apple } from "lucide-react"

export function NutritionCalculator() {
  const [activeTab, setActiveTab] = useState("calories")
  const [gender, setGender] = useState("female")
  const [age, setAge] = useState("30")
  const [weight, setWeight] = useState("70")
  const [height, setHeight] = useState("170")
  const [activityLevel, setActivityLevel] = useState("moderate")
  const [result, setResult] = useState<number | null>(null)

  const calculateCalories = () => {
    // Basic BMR calculation using Harris-Benedict Equation
    let bmr = 0
    const w = Number.parseFloat(weight)
    const h = Number.parseFloat(height)
    const a = Number.parseFloat(age)

    if (gender === "male") {
      bmr = 88.362 + 13.397 * w + 4.799 * h - 5.677 * a
    } else {
      bmr = 447.593 + 9.247 * w + 3.098 * h - 4.33 * a
    }

    // Apply activity multiplier
    let activityMultiplier = 1.2 // sedentary
    if (activityLevel === "light") activityMultiplier = 1.375
    if (activityLevel === "moderate") activityMultiplier = 1.55
    if (activityLevel === "active") activityMultiplier = 1.725
    if (activityLevel === "very-active") activityMultiplier = 1.9

    setResult(Math.round(bmr * activityMultiplier))
  }

  return (
    <section className="py-16 bg-muted/30">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-primary/10 p-3 rounded-full mb-4"
          >
            <Calculator className="h-6 w-6 text-primary" />
          </motion.div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Nutrition Calculator</h2>
          <p className="text-muted-foreground max-w-2xl">
            Use our nutrition tools to calculate your daily caloric needs, track your macros, and plan your healthy
            meals.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Tabs defaultValue="calories" onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="calories">
                <Heart className="h-4 w-4 mr-2" /> Calorie Calculator
              </TabsTrigger>
              <TabsTrigger value="macros">
                <Activity className="h-4 w-4 mr-2" /> Macro Planner
              </TabsTrigger>
              <TabsTrigger value="meal">
                <Apple className="h-4 w-4 mr-2" /> Meal Suggestions
              </TabsTrigger>
            </TabsList>

            <TabsContent value="calories">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Calorie Calculator</CardTitle>
                  <CardDescription>
                    Calculate your estimated daily caloric needs based on your body metrics and activity level.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="gender">Gender</Label>
                        <Select value={gender} onValueChange={setGender}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="age">Age</Label>
                        <Input
                          id="age"
                          type="number"
                          value={age}
                          onChange={(e) => setAge(e.target.value)}
                          placeholder="Years"
                        />
                      </div>

                      <div>
                        <Label htmlFor="activity">Activity Level</Label>
                        <Select value={activityLevel} onValueChange={setActivityLevel}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select activity level" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                            <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                            <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                            <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                            <SelectItem value="very-active">Very Active (hard exercise daily)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="weight">Weight</Label>
                        <div className="flex items-center">
                          <Input
                            id="weight"
                            type="number"
                            value={weight}
                            onChange={(e) => setWeight(e.target.value)}
                            placeholder="Weight"
                          />
                          <span className="ml-2 text-muted-foreground">kg</span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="height">Height</Label>
                        <div className="flex items-center">
                          <Input
                            id="height"
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(e.target.value)}
                            placeholder="Height"
                          />
                          <span className="ml-2 text-muted-foreground">cm</span>
                        </div>
                      </div>

                      <Button onClick={calculateCalories} className="mt-6 w-full">
                        Calculate
                      </Button>
                    </div>
                  </div>

                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-8 p-6 bg-muted rounded-lg text-center"
                    >
                      <h3 className="text-lg font-semibold mb-2">Your Estimated Daily Calories</h3>
                      <p className="text-4xl font-bold text-primary">{result} calories</p>
                      <p className="mt-2 text-sm text-muted-foreground">
                        This is an estimate of the calories you need to maintain your current weight.
                      </p>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="macros">
              <Card>
                <CardHeader>
                  <CardTitle>Macro Nutrient Calculator</CardTitle>
                  <CardDescription>
                    Calculate your ideal macronutrient distribution based on your goals.
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground">Coming soon! Our macro calculator is under development.</p>
                    <Button variant="outline" className="mt-4">
                      Get Notified
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="meal">
              <Card>
                <CardHeader>
                  <CardTitle>Personalized Meal Suggestions</CardTitle>
                  <CardDescription>
                    Get meal suggestions based on your nutritional needs and preferences.
                  </CardDescription>
                </CardHeader>
                <CardContent className="h-[400px] flex items-center justify-center">
                  <div className="text-center">
                    <p className="text-muted-foreground">Coming soon! Our meal planner is under development.</p>
                    <Button variant="outline" className="mt-4">
                      Get Notified
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
