import { Hex, Rgb } from '../../types'
import { validateRgb } from '../../validate'

/**
 * Converts an RGB color to Hexadecimal format.
 * 
 * @param {Rgb} rgb - RGB color.
 * @returns {string} A Hexadecimal color.
 * @throws {Error} If a RGB value is missing, is not a number, or is outside of its respective range.
*/
function rgbToHex({ r, g, b }: Rgb): Hex {
  validateRgb({ r, g, b })

  // Calculate Hexadecimal values
  const hexR = r.toString(16).padStart(2, '0')
  const hexG = g.toString(16).padStart(2, '0')
  const hexB = b.toString(16).padStart(2, '0')

  return '#' + hexR + hexG + hexB
}

export { rgbToHex }