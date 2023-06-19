import { Hsv, Rgb } from '../../types'
import { validateHsv } from '../../validate'

/**
 * Converts an HSV color to RGB format.
 * 
 * @param {Hsv} hsv - HSV color.
 * @returns {Rgb} A RGB color.
 * @throws {Error} If a HSV value is missing, is not a number, or is outside of its respective range.
*/
function hsvToRgb({ h, s, v }: Hsv): Rgb {
  validateHsv({ h, s, v })

  // Normalize values to a range of 0 to 360
  h /= 360

  // Normalize values to a range of 0 to 100
  s /= 100
  v /= 100

  // Calculate intermediate values
  const i = Math.floor(h * 6)
  const f = h * 6 - i
  const p = v * (1 - s)
  const q = v * (1 - f * s)
  const t = v * (1 - (1 - f) * s)

  // Determine the RGB values based on hue value
  let r: number
  let g: number
  let b: number

  switch (i % 6) {
    case 0: r = v, g = t, b = p 
      break
    case 1: r = q, g = v, b = p 
      break
    case 2: r = p, g = v, b = t 
      break
    case 3: r = p, g = q, b = v 
      break
    case 4: r = t, g = p, b = v 
      break
    case 5: r = v, g = p, b = q 
      break
  }

  // Normalize values to a range of 0 to 255
  r = Math.round(r * 255)
  g = Math.round(g * 255)
  b = Math.round(b * 255)

  return { r, g, b }
}

export { hsvToRgb }