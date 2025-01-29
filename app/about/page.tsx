"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { useSlideIn } from "@/utils/animations"
import { Users, Trophy, Target, Heart, Sprout, Leaf } from "lucide-react"
import Image from "next/image"
import { AnimatedBackground } from "@/components/animated-background"
import { NavBar } from "@/components/nav-bar"

export default function AboutPage() {
  const slideIn = useSlideIn()

  return (
    <div className="min-h-screen">
      <AnimatedBackground />
      <NavBar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto"
            initial="hidden"
            animate="visible"
            variants={slideIn}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6 text-green-900">Our Story</h1>
            <p className="text-xl text-gray-600 mb-8">
              Founded in 2020, AgriTech has been at the forefront of agricultural innovation, combining cutting-edge
              technology with sustainable farming practices.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Vision and Mission */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-green-900">Our Vision</h2>
              <p className="text-gray-600 text-lg">
                To revolutionize agriculture through technology, making sustainable farming accessible to everyone while
                ensuring food security for future generations.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center mb-6">
                <Heart className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-green-900">Our Mission</h2>
              <p className="text-gray-600 text-lg">
                To empower farmers with innovative solutions that increase productivity, reduce environmental impact,
                and create a more sustainable agricultural ecosystem.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-900">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              At AgriTech, our values guide everything we do, from product development to customer service.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
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
                    {value.icon}
                  </motion.div>
                  <h3 className="text-xl font-semibold mb-4 text-center">{value.title}</h3>
                  <p className="text-gray-600 text-center">{value.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-900">Our Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Meet the passionate individuals driving innovation in agriculture.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10 }}
              >
                <Card className="overflow-hidden">
                  <div className="relative h-64">
                    <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <p className="text-green-600 mb-4">{member.position}</p>
                    <p className="text-gray-600">{member.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-900">Our Achievements</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Milestones that mark our journey in transforming agriculture.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <motion.div
                    className="w-16 h-16 mx-auto mb-6 text-green-600"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Trophy className="w-full h-full" />
                  </motion.div>
                  <h3 className="text-4xl font-bold text-green-600 mb-2">{achievement.number}</h3>
                  <p className="text-gray-600">{achievement.title}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Join Us CTA */}
      <section className="py-20 bg-green-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-green-900">Join Our Mission</h2>
            <p className="text-lg text-gray-600 mb-8">
              Be part of the agricultural revolution. Together, we can create a more sustainable future for farming.
            </p>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button size="lg" className="bg-green-600 hover:bg-green-700 text-white px-8 py-6 text-lg">
                Join Our Team
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

const values = [
  {
    title: "Innovation",
    description: "Constantly pushing boundaries to develop cutting-edge agricultural solutions",
    icon: <Sprout className="w-full h-full" />,
  },
  {
    title: "Sustainability",
    description: "Committed to environmental stewardship and sustainable farming practices",
    icon: <Leaf className="w-full h-full" />,
  },
  {
    title: "Community",
    description: "Building strong relationships with farmers and agricultural communities",
    icon: <Users className="w-full h-full" />,
  },
]

const team = [
  {
    name: "Dr. Sarah Johnson",
    position: "Chief Executive Officer",
    description: "20+ years experience in AgriTech innovation",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Michael Chen",
    position: "Chief Technology Officer",
    description: "Leading our AI and machine learning initiatives",
    image: "/placeholder.svg?height=400&width=300",
  },
  {
    name: "Emma Rodriguez",
    position: "Head of Sustainability",
    description: "Expert in sustainable farming practices",
    image: "/placeholder.svg?height=400&width=300",
  },
]

const achievements = [
  {
    number: "1M+",
    title: "Farmers Supported",
  },
  {
    number: "50+",
    title: "Countries Reached",
  },
  {
    number: "100+",
    title: "Research Papers",
  },
  {
    number: "25+",
    title: "Industry Awards",
  },
]