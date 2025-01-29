"use server"

export async function detectDisease(formData: FormData) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock response - in real app, this would call an AI service
  return {
    disease: "Late Blight",
    confidence: 0.92,
    description:
      "Late blight is a devastating disease that affects tomatoes and potatoes. The disease is caused by the fungus-like organism Phytophthora infestans.",
    treatment: "Apply fungicide immediately. Remove and destroy infected plants. Improve air circulation.",
    preventiveMeasures: [
      "Use disease-resistant varieties",
      "Maintain proper plant spacing",
      "Water at the base of plants",
      "Practice crop rotation",
    ],
  }
}

export async function predictYield(formData: FormData) {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Mock response - in real app, this would use ML model
  const landSize = Number(formData.get("landSize"))
  const mockYieldPerAcre = 4.2 // tons per acre

  return {
    predictedYield: (landSize * mockYieldPerAcre).toFixed(1),
    confidence: 0.89,
    optimizationTips: [
      "Consider increasing nitrogen application by 10%",
      "Optimal planting time would be early March",
      "Current soil conditions are favorable",
      "Irrigation schedule looks appropriate",
    ],
  }
}

