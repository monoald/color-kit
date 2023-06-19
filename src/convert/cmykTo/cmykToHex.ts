import { Cmyk, Hex } from '../../types'
import { validateCmyk } from '../../validate'
import { cmykToRgb } from './cmykToRgb'

/**
 * Converts a CMYK color to Hexadecimal format.
 * 
 * @param {Cmyk} cmyk - CMYK color.
 * @returns {string} A Hexadecimal color.
 * @throws {Error} If a CMYK value is missing, is not a number, or is outside the range of 0 to 100.
*/
function cmykToHex(cmyk: Cmyk): Hex {
  validateCmyk(cmyk)

  // Convert CMYK to RGB
  const { r, g, b } = cmykToRgb(cmyk)

  // Convert RGB to HEX
  const hexR = r.toString(16).padStart(2, '0')
  const hexG = g.toString(16).padStart(2, '0')
  const hexB = b.toString(16).padStart(2, '0')

  return '#' + hexR + hexG + hexB
}

export { cmykToHex }