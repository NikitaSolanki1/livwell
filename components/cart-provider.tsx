"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import {
  type CartItem,
  addToCart as addToCartData,
  removeFromCart as removeFromCartData,
  updateCartItemQuantity as updateCartItemQuantityData,
  clearCart as clearCartData,
} from "@/lib/data"
import { useAuth } from "@/components/auth-provider"
import { useToast } from "@/components/ui/use-toast"
import { v4 as uuidv4 } from "uuid"

type CartContextType = {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "id">) => void
  removeFromCart: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  subtotal: number
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  totalItems: 0,
  subtotal: 0,
})

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const { user } = useAuth()
  const { toast } = useToast()

  // Calculate derived values
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)

  // Load cart from localStorage on initial load
  useEffect(() => {
    const storedCart = localStorage.getItem("cart")
    if (storedCart) {
      setItems(JSON.parse(storedCart))
    }
  }, [])

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items))
  }, [items])

  // Update the addToCart function to handle both juices and dishes
  const addToCart = (item: Omit<CartItem, "id">) => {
    const cartItem: CartItem = {
      ...item,
      id: uuidv4(),
    }

    if (user) {
      const updatedCart = addToCartData(user.id, cartItem)
      setItems(updatedCart)
    } else {
      // Handle guest cart
      const existingItemIndex = items.findIndex(
        (i) => (item.juiceId && i.juiceId === item.juiceId && !i.isCustom) || (item.dishId && i.dishId === item.dishId),
      )

      if (existingItemIndex > -1 && !item.isCustom) {
        const updatedItems = [...items]
        updatedItems[existingItemIndex].quantity += item.quantity
        setItems(updatedItems)
      } else {
        setItems([...items, cartItem])
      }
    }

    toast({
      title: "Added to cart",
      description: `${item.isCustom ? item.customName : item.dishId ? "Dish" : "Juice"} has been added to your cart`,
    })
  }

  const removeFromCart = (itemId: string) => {
    if (user) {
      const updatedCart = removeFromCartData(user.id, itemId)
      setItems(updatedCart)
    } else {
      setItems(items.filter((item) => item.id !== itemId))
    }

    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart",
    })
  }

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity < 1) return

    if (user) {
      const updatedCart = updateCartItemQuantityData(user.id, itemId, quantity)
      setItems(updatedCart)
    } else {
      setItems(items.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
    }
  }

  const clearCart = () => {
    if (user) {
      clearCartData(user.id)
    }
    setItems([])
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        subtotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)
