"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label" // Ensure this path is correct or create the module if it doesn't exist
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSlideIn } from "../../utils/animations"
import { Upload, LineChart, AlertCircle, Loader2 } from "lucide-react"
import Image from "next/image"
import { AnimatedBackground } from "../../components/animated-background"
import { NavBar } from "../../components/nav-bar"
import { useState, useTransition } from "react"
import { detectDisease, predictYield } from "./actions"
import { useToast } from "@/components/ui/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function ProductsPage() {
  const slideIn = useSlideIn()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [diseaseResult, setDiseaseResult] = useState<any>(null)
  const [yieldResult, setYieldResult] = useState<any>(null)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDiseaseDetection = () => {
    if (!selectedImage) {
      toast({
        title: "No image selected",
        description: "Please upload an image first",
        variant: "destructive",
      })
      return
    }

    startTransition(async () => {
      const result = await detectDisease(new FormData())
      setDiseaseResult(result)
    })
  }

  const handleYieldPrediction = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)

    startTransition(async () => {
      const result = await predictYield(formData)
      setYieldResult(result)
    })
  }

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
            Our Products
          </motion.h1>
          <motion.p
            className="text-xl md:text-2xl mb-8 text-green-800 max-w-3xl mx-auto"
            animate={{ y: [50, 0], opacity: [0, 1] }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Advanced AI-powered solutions for modern agriculture
          </motion.p>
        </motion.div>
      </section>

      {/* Products Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Crop Disease Detection */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Crop Disease Detection</CardTitle>
                  <CardDescription>Upload an image of your crop to detect potential diseases</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4">
                    <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-green-500 transition-colors">
                      {selectedImage ? (
                        <div className="relative w-full aspect-video">
                          <Image
                            src={selectedImage || "/placeholder.svg"}
                            alt="Selected crop"
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="text-center">
                          <Upload className="mx-auto h-12 w-12 text-gray-400" />
                          <p className="mt-2 text-sm text-gray-600">Upload your crop image</p>
                        </div>
                      )}
                      <Input type="file" accept="image/*" className="mt-4" onChange={handleImageUpload} />
                    </div>
                    <Button onClick={handleDiseaseDetection} disabled={isPending || !selectedImage} className="w-full">
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Detecting...
                        </>
                      ) : (
                        "Detect Disease"
                      )}
                    </Button>
                  </div>

                  {diseaseResult && (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Disease Detected: {diseaseResult.disease}</AlertTitle>
                        <AlertDescription>Confidence: {(diseaseResult.confidence * 100).toFixed(1)}%</AlertDescription>
                      </Alert>

                      <div className="space-y-2">
                        <h4 className="font-semibold">Description</h4>
                        <p className="text-sm text-gray-600">{diseaseResult.description}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold">Treatment</h4>
                        <p className="text-sm text-gray-600">{diseaseResult.treatment}</p>
                      </div>

                      <div className="space-y-2">
                        <h4 className="font-semibold">Preventive Measures</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {diseaseResult.preventiveMeasures.map((measure: string, index: number) => (
                            <li key={index}>{measure}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Yield Prediction */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full">
                <CardHeader>
                  <CardTitle>Yield Prediction</CardTitle>
                  <CardDescription>Enter your farm details to predict crop yield</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleYieldPrediction} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="minTemp">Minimum Temperature (°C)</Label>
                        <Input id="minTemp" name="minTemp" type="number" placeholder="15" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="maxTemp">Maximum Temperature (°C)</Label>
                        <Input id="maxTemp" name="maxTemp" type="number" placeholder="30" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="rainfall">Rainfall (mm)</Label>
                      <Input id="rainfall" name="rainfall" type="number" placeholder="750" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="soilType">Soil Type</Label>
                      <Select name="soilType" required>
                        <SelectTrigger>
                          <SelectValue placeholder="Select soil type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="loamy">Loamy</SelectItem>
                          <SelectItem value="sandy">Sandy</SelectItem>
                          <SelectItem value="clay">Clay</SelectItem>
                          <SelectItem value="silt">Silt</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="soilMoisture">Soil Moisture (%)</Label>
                      <Input id="soilMoisture" name="soilMoisture" type="number" placeholder="35" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="soilPh">Soil pH</Label>
                      <Input id="soilPh" name="soilPh" type="number" step="0.1" placeholder="6.5" required />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="nitrogen">Nitrogen (mg/kg)</Label>
                        <Input id="nitrogen" name="nitrogen" type="number" placeholder="40" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phosphorus">Phosphorus (mg/kg)</Label>
                        <Input id="phosphorus" name="phosphorus" type="number" placeholder="50" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="potassium">Potassium (mg/kg)</Label>
                        <Input id="potassium" name="potassium" type="number" placeholder="30" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="organicMatter">Organic Matter (%)</Label>
                      <Input
                        id="organicMatter"
                        name="organicMatter"
                        type="number"
                        step="0.1"
                        placeholder="3.5"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input id="location" name="location" placeholder="City, Country" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="landSize">Land Size (acres)</Label>
                        <Input id="landSize" name="landSize" type="number" step="0.1" placeholder="5.0" required />
                      </div>
                    </div>

                    <Button type="submit" className="w-full" disabled={isPending}>
                      {isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Predicting...
                        </>
                      ) : (
                        "Predict Yield"
                      )}
                    </Button>
                  </form>

                  {yieldResult && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-6 space-y-4"
                    >
                      <Alert>
                        <LineChart className="h-4 w-4" />
                        <AlertTitle>Predicted Yield: {yieldResult.predictedYield} tons</AlertTitle>
                        <AlertDescription>Confidence: {(yieldResult.confidence * 100).toFixed(1)}%</AlertDescription>
                      </Alert>

                      <div className="space-y-2">
                        <h4 className="font-semibold">Optimization Tips</h4>
                        <ul className="list-disc list-inside text-sm text-gray-600">
                          {yieldResult.optimizationTips.map((tip: string, index: number) => (
                            <li key={index}>{tip}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}

