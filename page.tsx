"use client"

import { motion, useScroll, useSpring } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useSlideIn, useSmoothTransform } from "@/utils/animations"
import { Leaf, Sprout, LineChart, ShoppingBag, Send, Phone, Mail, MapPin } from "lucide-react"
import Image from "next/image"
import { useRef } from "react"
import { AnimatedBackground } from "@/components/animated-background"
import { NavBar } from "@/components/nav-bar"

export default function LandingPage() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress)
  const ref = useRef(null)
  const slideIn = useSlideIn()

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <NavBar />
      {/* Progress bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-green-600 origin-left z-50" style={{ scaleX }} />

      {/* Hero Section */}
      <section className="relative min-h-screen pt-16 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/placeholder.svg?height=1080&width=1920"
            alt="Agriculture background"
            width={1920}
            height={1080}
            className="object-cover w-full h-full opacity-20"
          />
        </div>
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
            Growing the Future of Agriculture
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-green-800"
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Revolutionizing farming with AI-powered solutions and premium agricultural products
          </motion.p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
              Get Started
            </Button>
          </motion.div>
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-900">Our Mission</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We empower farmers with cutting-edge technology and sustainable solutions to maximize yields while
              preserving our planet's resources for future generations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-green-900">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow duration-300">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-6 text-green-600"
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                  >
                    {service.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4 text-center">{service.title}</h3>
                  <p className="text-gray-600 text-center">{service.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-green-900">Featured Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative h-48">
                    <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                    <p className="text-gray-600 mb-4">{product.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-green-600">${product.price}</span>
                      <Button variant="outline" className="hover:bg-green-50">
                        Buy Now
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-green-900">What Farmers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <Card className="p-6">
                  <p className="text-gray-600 mb-4 italic">&quot;{testimonial.quote}&quot;</p>
                  <div className="flex items-center">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden mr-4">
                      <Image
                        src={testimonial.image || "/placeholder.svg"}
                        alt={testimonial.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h4 className="font-semibold">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.location}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-green-900">Contact Us</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <form className="space-y-6">
                  <div>
                    <Input placeholder="Your Name" className="w-full" />
                  </div>
                  <div>
                    <Input type="email" placeholder="Email Address" className="w-full" />
                  </div>
                  <div>
                    <Input placeholder="Phone Number" className="w-full" />
                  </div>
                  <div>
                    <Textarea placeholder="Your Message" className="w-full" rows={4} />
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white">Send Message</Button>
                </form>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <MapPin className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Visit Us</h3>
                  <p className="text-gray-600">123 Farm Road, Agritown, AT 12345</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Phone className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Call Us</h3>
                  <p className="text-gray-600">+1 (234) 567-8900</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Mail className="text-green-600" />
                </div>
                <div>
                  <h3 className="font-semibold">Email Us</h3>
                  <p className="text-gray-600">contact@agritech.com</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

const services = [
  {
    title: "Crop Disease Detection",
    description: "AI-powered detection system to identify and treat crop diseases early",
    icon: <Leaf className="w-full h-full" />,
  },
  {
    title: "Yield Prediction",
    description: "Advanced analytics to predict and optimize crop yields",
    icon: <LineChart className="w-full h-full" />,
  },
  {
    title: "Agricultural Products",
    description: "Premium tools, fertilizers, and seeds for modern farming",
    icon: <ShoppingBag className="w-full h-full" />,
  },
]

const products = [
  {
    name: "Smart Soil Sensor",
    description: "Real-time soil health monitoring device",
    price: 199.99,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Organic Fertilizer",
    description: "Premium organic fertilizer for all crops",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    name: "Drone Sprayer",
    description: "Automated crop spraying drone",
    price: 999.99,
    image: "/placeholder.svg?height=300&width=400",
  },
]

const testimonials = [
  {
    quote: "The crop disease detection system saved my entire harvest last season.",
    name: "John Smith",
    location: "Iowa, USA",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote: "Yield prediction helped me optimize my planting schedule perfectly.",
    name: "Maria Garcia",
    location: "California, USA",
    image: "/placeholder.svg?height=100&width=100",
  },
  {
    quote: "Their products are top quality and the support is exceptional.",
    name: "David Chen",
    location: "Texas, USA",
    image: "/placeholder.svg?height=100&width=100",
  },
]

