import { type MotionValue, useScroll, useTransform, useSpring, useInView } from "framer-motion"

export const useParallax = (value: MotionValue<number>, distance: number) => {
  return useTransform(value, [0, 1], [-distance, distance])
}

export const useSlideIn = (direction: "left" | "right" | "up" | "down" = "up") => {
  const variants = {
    hidden: {
      opacity: 0,
      x: direction === "left" ? -50 : direction === "right" ? 50 : 0,
      y: direction === "up" ? 50 : direction === "down" ? -50 : 0,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
    },
  }

  return variants
}

export const useSmoothTransform = (value: MotionValue<number>, input: number[], output: number[]) => {
  return useSpring(useTransform(value, input, output), {
    stiffness: 100,
    damping: 30,
  })
}

