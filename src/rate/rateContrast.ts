import { Rgb } from '../types'
import { getRelativeLuminance } from '../utils/getRelativeLuminance'

function rateContrast(colors: Array<Rgb>): number {
  const contrastRatios = []

  // Calculate contrast ratio for each pair
  for (let i = 0; i < colors.length; i++) {
    for (let j = i + 1; j < colors.length; j++) {
      const contrastRatio = getContrastRatio(colors[i], colors[j])
      contrastRatios.push(contrastRatio)
    }
  }

  // Calculate average contrast ratio of all pairs
  const avgContrastRatio = contrastRatios.reduce((acc, val) => acc + val, 0) / contrastRatios.length
  const rate = +(avgContrastRatio).toFixed(1)

  return rate
}

function getContrastRatio(color1: Rgb, color2: Rgb) {
  // Get color's relative luminance
  const lum1 = getRelativeLuminance(color1)
  const lum2 = getRelativeLuminance(color2)

    // Determine lighter and darker colors
  const lighter = Math.max(lum1, lum2)
  const darker = Math.min(lum1, lum2)

  // Calculate contrast ratio
  const contrastRatio = (lighter + 0.05) / (darker + 0.05)

  return contrastRatio
}

export { rateContrast }