import Link from "next/link"
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="font-bold text-xl text-primary">Livwell</span>
            </Link>
            <p className="text-muted-foreground">Fresh, healthy, and delicious juices delivered to your doorstep.</p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon" asChild>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </a>
              </Button>
              <Button variant="ghost" size="icon" asChild>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/juices" className="text-muted-foreground hover:text-primary transition-colors">
                  Shop Juices
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-muted-foreground hover:text-primary transition-colors">
                  Create Your Own
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <span className="text-muted-foreground">123 Health Street, Bikaner, Rajasthan 334001, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span className="text-muted-foreground">hello@livwell.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Newsletter</h3>
            <p className="text-muted-foreground mb-4">Subscribe to our newsletter for the latest updates and offers.</p>
            <form className="space-y-2">
              <Input type="email" placeholder="Your email address" className="bg-background" />
              <Button className="w-full">Subscribe</Button>
            </form>
          </div>
        </div>

        <div className="border-t mt-12 pt-6 text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} Livwell. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
