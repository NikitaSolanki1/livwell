"use client"

import { motion } from "framer-motion"
import { Leaf, Droplet, Zap, Heart } from "lucide-react"
import Image from "next/image"

export function Benefits() {
  const benefits = [
    {
      icon: <Leaf className="h-10 w-10 text-green-500" />,
      title: "100% Natural",
      description:
        "Our juices are made from fresh, organic fruits and vegetables with no added preservatives or artificial flavors.",
      image: "/images/juices/healthy.jpeg",
    },
    {
      icon: <Droplet className="h-10 w-10 text-blue-500" />,
      title: "Cold-Pressed",
      description: "We use cold-press technology to extract maximum nutrients and flavor from our ingredients.",
      image: "/images/juices/cold.avif",
    },
    {
      icon: <Zap className="h-10 w-10 text-yellow-500" />,
      title: "Energy Boost",
      description: "Our juices provide a natural energy boost to help you power through your day.",
      image: "/images/juices/healthy2.webp",
    },
    {
      icon: <Heart className="h-10 w-10 text-red-500" />,
      title: "Health Benefits",
      description:
        "Each juice is crafted to provide specific health benefits, from immunity boosting to detoxification.",
      image: "/images/juices/detox.cms",
    },
  ]

  return (
    <section className="py-16 bg-muted/50">
      <div className="container">
        <div className="flex flex-col items-center text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">Why Choose Our Products?</h2>
          <p className="text-muted-foreground max-w-2xl">
            We're committed to providing the highest quality juices and dishes that not only taste great but also
            contribute to your overall wellbeing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-background rounded-lg overflow-hidden shadow-sm flex flex-col h-full"
            >
              <div className="relative h-48 w-full">
                <Image
                  src={benefit.image || "/placeholder.svg"}
                  alt={benefit.title}
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
              </div>
              <div className="p-6 flex flex-col items-center text-center flex-grow">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
