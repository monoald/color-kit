import { Hsl, Hsv } from '../../types'
import { validateHsv } from '../../validate'

/**
 * Converts an HSV color to HSL format.
 * 
 * @param {Hsv} hsv - HSV color.
 * @returns {Hsl} An HSL color.
 * @throws {Error} If a HSV value is missing, is not a number, or is outside of its respective range.
*/
function hsvToHsl({ h, s, v }: Hsv): Hsl {
  validateHsv({ h, s, v })

  // Normalize values to a range of range 0 to 1
  s /= 100
  v /= 100

  // Calculate Lightness
  let l = (2 - s) * v / 2

  // Calculate Saturation
  if (l !== 0) {
    if (l === 1) {
      s = 0
    } else if (l < 0.5) {
      s = s * v / (l * 2)
    } else {
      s = s * v / (2 - l * 2)
    }
  }

  // Normalize values to a range of range 0 to 100
  s = s * 100
  l = l * 100

  return { h, s, l }
}


export { hsvToHsl }