"use client"

import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowDown, ArrowRight } from "lucide-react"


export function Hero() {
  const featuredRef = useRef<HTMLDivElement>(null)

  const scrollToFeatured = () => {
    featuredRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  }

  return (
    <div className="relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?q=80&w=1932&auto=format&fit=crop"
          alt="Fresh fruits and vegetables background"
          fill
          priority
          className="object-cover"
          crossOrigin="anonymous"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
      </div>

      <div className="container relative z-10 flex flex-col lg:flex-row items-center justify-between min-h-[calc(100vh-4rem)] py-12">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="max-w-2xl space-y-6 text-center lg:text-left mb-12 lg:mb-0"
        >
          <motion.span
            variants={item}
            className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm font-medium mb-2"
          >
            Healthy Living Made Delicious
          </motion.span>
          <motion.h1 variants={item} className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
            Fresh, Healthy, <span className="text-primary">Vibrant</span> Food
          </motion.h1>
          <motion.p variants={item} className="text-gray-200 md:text-xl">
            Discover the perfect blend of nature's goodness with Livwell. Our juices and dishes are crafted with the
            freshest ingredients to boost your health and energy.
          </motion.p>
          <motion.div variants={item} className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90" onClick={scrollToFeatured}>
              Explore Now
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10" asChild>
              <Link href="/dishes">
                View Menu <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="relative w-full max-w-md"
        >
          <div className="grid grid-cols-3 gap-4">
            <motion.div whileHover={{ y: -5 }} className="h-32 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/juices/healthy3.jpg"
                alt="Meal"
                width={200}
                height={160}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="h-32 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/juices/healthy4.jpg"
                alt="avacado"
                width={200}
                height={160}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="h-32 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/juices/healthy5.jpg"
                alt="sprouts"
                width={200}
                height={160}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="h-32 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/juices/juice1.jpg"
                alt="tomato"
                width={200}
                height={160}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="h-32 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/juices/juice2.webp"
                alt="mango"
                width={200}
                height={160}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="h-32 rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/images/juices/juice3.webp"
                alt="chia-lemon"
                width={200}
                height={160}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </motion.div>
            <motion.div whileHover={{ y: -5 }} className="h-32 rounded-lg overflow-hidden shadow-lg col-span-3">
              <Image
                src="https://images.unsplash.com/photo-1505252585461-04db1eb84625?q=80&w=600&auto=format"
                alt="Juice Collection"
                width={600}
                height={160}
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-12 w-12 animate-bounce bg-white/10 hover:bg-white/20 text-white"
            onClick={scrollToFeatured}
          >
            <ArrowDown className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>
      <div ref={featuredRef} />
    </div>
  )
}
