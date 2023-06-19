import { Rgb, WCAGRequierements } from '../types'
import { getRelativeLuminance } from '../utils/getRelativeLuminance'

/**
 * Calculates the contrast ratio and checks if it passes or fails levels AA and AAA of WCAG.
 * 
 * @param {Array<Rgb>} colors - The two colors to calculate the rate.
 * @returns {WCAGRequierements} An object containing the contrast ratio and information to determine if the contrast is sufficient to meet the AA and AAA level requirements.
 * @throws {Error} If a RGB value is missing, is not a number, or is outside of its respective range.
*/
export function rateContrast(colors: Array<Rgb>): WCAGRequierements {
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

  // Check WCAG requirement 2023
  const minValueSmallAA = 4.5
  const minValueLargeAA = 3
  const minValueUIAA = 3
  const minValueSmallAAA = 7
  const minValueLargeAAA = 4.5

  const wcagRequirements: WCAGRequierements = {
    contrastValue: rate,
    AA: {
      smallTextMinimum: minValueSmallAA,
      smallText: rate >= minValueSmallAA,

      largeTextMinimum: minValueLargeAA,
      largeText: rate >= minValueLargeAA,

      uiComponentMinimum: minValueUIAA,
      uiComponent: rate >= minValueUIAA
    },
    AAA: {
      smallTextMinimum: minValueSmallAAA,
      smallText: rate >= minValueSmallAAA,

      largeTextMinimum: minValueLargeAAA,
      largeText: rate >= minValueLargeAAA,

      uiComponentMinimum: minValueUIAA,
      uiComponent: rate >= minValueUIAA
    }
  }

  return wcagRequirements
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