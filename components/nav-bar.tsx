"use client"

import { motion } from "framer-motion"
import { Sprout, Home, Package, ShoppingCart, Users, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AboutPage } from "@/app/about/page"
import { ProductsPage } from "@/app/products/page"

export function NavBar() {
  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-green-100"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
              <Sprout className="w-8 h-8 text-green-600" />
            </motion.div>
            <span className="text-xl font-bold text-green-900">AgriTech</span>
          </Link>

          {/* Navigation Items */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <motion.div key={item.name} whileHover={{ y: -2 }} whileTap={{ y: 0 }}>
                <Link href={item.href} key={item.name}>
                  <Button
                    variant="ghost"
                    className="flex items-center space-x-2 text-green-800 hover:text-green-600 hover:bg-green-50"
                  >
                    {item.icon}
                    <span>{item.name}</span>
                  </Button>
                </Link>
              </motion.div>
            ))}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button variant="default" className="bg-green-600 hover:bg-green-700 text-white ml-4">
                <User className="w-4 h-4 mr-2" />
                Profile
              </Button>
            </motion.div>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" className="md:hidden" size="icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </Button>
        </div>
      </div>
    </motion.header>
  )
}

const navItems = [
  { name: "Home", icon: <Home className="w-4 h-4" />, href: "/" },
  { name: "Products", icon: <Package className="w-4 h-4" />, href: "/products" },
  { name: "Marketplace", icon: <ShoppingCart className="w-4 h-4" />, href: "/marketplace" },
  { name: "About Us", icon: <Users className="w-4 h-4" />, href: "/about" },
]

