"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useSlideIn } from "../../utils/animations"
import { ShoppingCart, Package, Loader2, Check } from "lucide-react"
import Image from "next/image"
import { AnimatedBackground } from "../../components/animated-background"
import { NavBar } from "../../components/nav-bar"
import { useState, useTransition } from "react"
import { useToast } from "@/components/ui/use-toast"
import { CartProvider, useCart } from "./cart-context"
import type { Product } from "./types"
import { placeOrder } from "./actions"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet"
import { ScrollArea } from "@/components/ui/scroll-area"

// Mock products data
const products: Product[] = [
  {
    id: "1",
    name: "Premium Garden Tools Set",
    description: "Complete set of essential gardening tools including shovel, rake, and pruning shears",
    price: 89.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "tools",
    stock: 50,
  },
  {
    id: "2",
    name: "Organic Tomato Seeds",
    description: "High-yield, disease-resistant tomato seeds perfect for home gardens",
    price: 4.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "seeds",
    stock: 100,
  },
  {
    id: "3",
    name: "Natural Fertilizer",
    description: "Eco-friendly, balanced NPK fertilizer for all types of crops",
    price: 29.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "fertilizers",
    stock: 75,
  },
  {
    id: "4",
    name: "Neem Oil Pesticide",
    description: "Organic pest control solution safe for edible crops",
    price: 19.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "pesticides",
    stock: 60,
  },
  {
    id: "5",
    name: "Herb Garden Starter Kit",
    description: "Complete kit with seeds and supplies to start your herb garden",
    price: 34.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "seeds",
    stock: 40,
  },
  {
    id: "6",
    name: "Professional Pruning Shears",
    description: "High-quality steel pruning shears for precise cuts",
    price: 45.99,
    image: "/placeholder.svg?height=200&width=200",
    category: "tools",
    stock: 30,
  },
]

function CartSheet() {
  const { state, dispatch } = useCart()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState({
    fullName: "",
    phoneNumber: "",
    streetAddress: "",
    city: "",
    state: "",
    postalCode: "",
  })
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleCheckout = () => {
    if (!isCheckingOut) {
      setIsCheckingOut(true)
      return
    }

    // Validate delivery address
    if (Object.values(deliveryAddress).some((value) => !value)) {
      toast({
        title: "Missing Information",
        description: "Please fill in all delivery address fields",
        variant: "destructive",
      })
      return
    }

    startTransition(async () => {
      const result = await placeOrder(deliveryAddress, state.items)
      if (result.success) {
        toast({
          title: "Order Placed Successfully!",
          description: `Order ID: ${result.orderId}`,
        })
        dispatch({ type: "CLEAR_CART" })
        setIsCheckingOut(false)
      }
    })
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="relative">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Cart
          {state.items.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-green-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {state.items.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg flex flex-col h-full">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
          <SheetDescription>
            {state.items.length === 0 ? "Your cart is empty" : `${state.items.length} items in your cart`}
          </SheetDescription>
        </SheetHeader>

        {/* Main content area with fixed height and scrolling */}
        <div className="flex flex-col h-[calc(100vh-8rem)] mt-6">
          {!isCheckingOut ? (
            // Cart items view
            <div className="flex-1 flex flex-col h-full">
              <ScrollArea className="flex-1 -mx-6 px-4 mb-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center gap-4 mb-4 p-2 border rounded">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={60}
                      height={60}
                      className="rounded object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-600">
                        ${item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch({
                              type: "UPDATE_QUANTITY",
                              payload: { id: item.id, quantity: item.quantity - 1 },
                            })
                          } else {
                            dispatch({ type: "REMOVE_FROM_CART", payload: item.id })
                          }
                        }}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          dispatch({
                            type: "UPDATE_QUANTITY",
                            payload: { id: item.id, quantity: item.quantity + 1 },
                          })
                        }}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                ))}
              </ScrollArea>

              {state.items.length > 0 && (
                <div className="py-4 border-t bg-background">
                  <div className="flex justify-between text-lg font-semibold mb-4">
                    <span>Total:</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>
                  <Button className="w-full" onClick={handleCheckout}>
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </div>
          ) : (
            // Delivery address form view
            <div className="flex-1 flex flex-col h-full">
              <div className="flex items-center gap-2 mb-4">
                <Button variant="ghost" onClick={() => setIsCheckingOut(false)} className="flex items-center gap-2">
                  ← Back to Cart
                </Button>
              </div>

              <ScrollArea className="flex-1 -mx-6 px-4 mb-4">
                <div className="space-y-4">
                  <h4 className="font-semibold text-lg">Delivery Address</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        value={deliveryAddress.fullName}
                        onChange={(e) =>
                          setDeliveryAddress((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phoneNumber">Phone Number</Label>
                      <Input
                        id="phoneNumber"
                        value={deliveryAddress.phoneNumber}
                        onChange={(e) =>
                          setDeliveryAddress((prev) => ({
                            ...prev,
                            phoneNumber: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="streetAddress">Street Address</Label>
                    <Input
                      id="streetAddress"
                      value={deliveryAddress.streetAddress}
                      onChange={(e) =>
                        setDeliveryAddress((prev) => ({
                          ...prev,
                          streetAddress: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={deliveryAddress.city}
                        onChange={(e) =>
                          setDeliveryAddress((prev) => ({
                            ...prev,
                            city: e.target.value,
                          }))
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        value={deliveryAddress.state}
                        onChange={(e) =>
                          setDeliveryAddress((prev) => ({
                            ...prev,
                            state: e.target.value,
                          }))
                        }
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input
                      id="postalCode"
                      value={deliveryAddress.postalCode}
                      onChange={(e) =>
                        setDeliveryAddress((prev) => ({
                          ...prev,
                          postalCode: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
              </ScrollArea>

              {/* Fixed bottom section for place order button */}
              <div className="py-4 border-t bg-background">
                <div className="flex justify-between text-lg font-semibold mb-4">
                  <span>Total:</span>
                  <span>${state.total.toFixed(2)}</span>
                </div>
                <Button className="w-full" onClick={handleCheckout} disabled={isPending}>
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check className="mr-2 h-4 w-4" />
                      Place Order (Cash on Delivery)
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}

function ProductCard({ product }: { product: Product }) {
  const { dispatch } = useCart()

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="relative h-48 mb-4">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>
          <CardTitle>{product.name}</CardTitle>
          <CardDescription>{product.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <p className="text-2xl font-bold text-green-600">${product.price.toFixed(2)}</p>
          <p className="text-sm text-gray-500 mt-2">{product.stock} in stock</p>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={() => dispatch({ type: "ADD_TO_CART", payload: product })}>
            Add to Cart
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}

function MarketplacePage() {
  const slideIn = useSlideIn()

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-20 flex items-center justify-center min-h-[40vh] overflow-hidden">
        <motion.div
          className="container mx-auto px-4 text-center z-10"
          initial="hidden"
          animate="visible"
          variants={slideIn}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6 text-green-900"
            animate={{ scale: [0.9, 1], opacity: [0, 1] }}
            transition={{ duration: 1 }}
          >
            Agricultural Marketplace
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-green-800 max-w-3xl mx-auto"
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Quality farming supplies delivered to your doorstep
          </motion.p>
        </motion.div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-green-900">Available Products</h2>
            <CartSheet />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

// Wrap the page with CartProvider
export default function MarketplaceWithProvider() {
  return (
    <CartProvider>
      <MarketplacePage />
    </CartProvider>
  )
}

