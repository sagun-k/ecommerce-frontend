import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Product } from "../types/product"

interface CartItem {
  id: string
  name: string
  price: number
  quantity: number
  image: string
}

interface CartContextType {
  cartItems: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">, quantity?: number) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  cartTotal: number
  cartItemCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    // Initialize cart from localStorage
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cartItems")
      return storedCart ? JSON.parse(storedCart) : []
    }
    return []
  })

  useEffect(() => {
    // Persist cart to localStorage whenever it changes
    if (typeof window !== "undefined") {
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }
  }, [cartItems])

  const addToCart = (item: Product, quantity = 1) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item._id)
      if (existingItem) {
        return prevItems.map((i) => (i.id === item._id ? { ...i, quantity: i.quantity + quantity } : i))
      } else {
        return [...prevItems, { ...item, quantity }]
      }
    })
  }

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item)),
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  const cartTotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const cartItemCount = cartItems.reduce((count, item) => count + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartItemCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
