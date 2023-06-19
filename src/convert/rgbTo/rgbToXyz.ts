import { Rgb, Xyz } from '../../types'
import { validateRgb } from '../../validate'

/**
 * Converts an RGB color to XYZ format.
 * 
 * @param {Rgb} rgb - RGB color.
 * @returns {Xyz} A XYZ color.
 * @throws {Error} If a RGB value is missing, is not a number, or is outside of its respective range.
*/
function rgbToXyz(rgb: Rgb): Xyz {
  validateRgb(rgb)

  let r: number = rgb.r / 255
  let g: number = rgb.g / 255
  let b: number = rgb.b / 255

  // Linearize sRGB values
  r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92
  g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92
  b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92

  // Convert sRGB to XYZ
  let x = r * 0.4124 + g * 0.3576 + b * 0.1805
  let y = r * 0.2126 + g * 0.7152 + b * 0.0722
  let z = r * 0.0193 + g * 0.1192 + b * 0.9505

  // Normalize values to a range of 0 to 100, and 1 decimal
  x = +(x * 100).toFixed(1)
  y = +(y * 100).toFixed(1)
  z = +(z * 100).toFixed(1)

  return { x, y, z }
}

export { rgbToXyz }