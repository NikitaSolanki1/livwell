import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Leaf, Droplet, Award, Users } from "lucide-react"

export default function AboutPage() {
  const teamMembers = [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=300&auto=format",
      bio: "A nutritionist with a passion for healthy living, Sarah founded JuiceVibe to share her love of nutritious juices with the world.",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Michael Chen",
      role: "Head of Product Development",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=300&auto=format",
      bio: "With a background in culinary arts, Michael leads our product development team, creating new and exciting juice blends.",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Emily Rodriguez",
      role: "Operations Manager",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=300&auto=format",
      bio: "Emily ensures that everything runs smoothly, from sourcing the freshest ingredients to delivering the perfect juice to your doorstep.",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Aisha Patel",
      role: "Head Nutritionist",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=300&auto=format",
      bio: "With a PhD in Nutritional Science, Aisha ensures all our products deliver maximum health benefits while tasting amazing.",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "Jessica Wong",
      role: "Marketing Director",
      image: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?q=80&w=300&auto=format",
      bio: "Jessica brings our brand to life through creative campaigns that spread the message of health and wellness to new audiences.",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
    {
      name: "David Thompson",
      role: "Supply Chain Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format",
      bio: "David works directly with organic farmers to ensure we source only the highest quality ingredients for our juices and dishes.",
      social: {
        linkedin: "#",
        twitter: "#",
        instagram: "#",
      },
    },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <section className="py-16 md:py-24 bg-muted/50">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl font-bold tracking-tight mb-6">Our Story</h1>
                <p className="text-muted-foreground mb-6">
                  Livwell was founded in 2025 with a simple mission: to provide delicious, nutritious juices that help
                  people live healthier lives. What started as a small juice bar has grown into a beloved brand, but our
                  commitment to quality and health remains unchanged.
                </p>
                <p className="text-muted-foreground mb-6">
                  We believe that what you put into your body matters. That's why we use only the freshest,
                  highest-quality fruits and vegetables in our juices. Our cold-press technology ensures that all the
                  nutrients, enzymes, and flavor are preserved, giving you the maximum health benefits with every sip.
                </p>
                <Button asChild>
                  <a href="/juices">Explore Our Juices</a>
                </Button>
              </div>
              <div className="relative h-[400px] rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1610970881699-44a5587cabec?q=80&w=800&auto=format"
                  alt="Fresh fruits and vegetables"
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Our Values</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                At JuiceVibe, we're guided by a set of core values that influence everything we do, from sourcing
                ingredients to serving customers.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <Leaf className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Sustainability</h3>
                    <p className="text-muted-foreground">
                      We're committed to sustainable practices that minimize our environmental impact and support local
                      farmers.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <Droplet className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Quality</h3>
                    <p className="text-muted-foreground">
                      We never compromise on quality. From farm to bottle, we ensure that only the best ingredients make
                      it into our juices.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                    <p className="text-muted-foreground">
                      We're constantly exploring new flavors, ingredients, and techniques to create the most delicious
                      and nutritious juices.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center">
                    <div className="bg-primary/10 p-3 rounded-full mb-4">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Community</h3>
                    <p className="text-muted-foreground">
                      We believe in building strong relationships with our customers, employees, and the communities we
                      serve.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-slate-900 dark:to-slate-800">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight mb-4">Our Products</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Explore our range of fresh, nutritious juices and healthy food options that will keep you energized
                throughout the day.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1589733955941-5eeaf752f6dd?q=80&w=600&auto=format"
                  alt="Fresh Juice"
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold">Fresh Juices</h3>
                  <p className="text-primary-foreground/90">Cold-pressed daily</p>
                </div>
              </div>

              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/images/juices/immunity.webp"
                  alt="Immunity Boosters"
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold">Immunity Boosters</h3>
                  <p className="text-primary-foreground/90">Strengthen your system</p>
                </div>
              </div>

              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1600718374662-0483d2b9da44?q=80&w=600&auto=format"
                  alt="Healthy Smoothies"
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold">Healthy Smoothies</h3>
                  <p className="text-primary-foreground/90">Packed with nutrients</p>
                </div>
              </div>

              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600&auto=format"
                  alt="Fresh Salads"
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold">Fresh Salads</h3>
                  <p className="text-primary-foreground/90">Crisp and nutritious</p>
                </div>
              </div>

              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1494597564530-871f2b93ac55?q=80&w=600&auto=format"
                  alt="Smoothie Bowls"
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold">Smoothie Bowls</h3>
                  <p className="text-primary-foreground/90">Delicious and filling</p>
                </div>
              </div>

              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1543339308-43e59d6b73a6?q=80&w=600&auto=format"
                  alt="Healthy Bowls"
                  fill
                  className="object-cover"
                  crossOrigin="anonymous"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-xl font-semibold">Healthy Bowls</h3>
                  <p className="text-primary-foreground/90">Balanced nutrition</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
