import { Cmyk, Hsv } from '../../types'
import { validateCmyk } from '../../validate'
import { rgbToHsv } from '../rgbTo'
import { cmykToRgb } from './cmykToRgb'

/**
 * Converts a CMYK color to HSV format.
 * 
 * @param {Cmyk} cmyk - CMYK color.
 * @returns {Hsv} An HSV color.
 * @throws {Error} If a CMYK value is missing, is not a number, or is outside the range of 0 to 100.
*/
function cmykToHsv(cmyk: Cmyk): Hsv {
  validateCmyk(cmyk)

  // Convert CMYK to RGB
  const { r, g, b } = cmykToRgb(cmyk)

  // Convert RGB to HSV
  const { h, s, v } = rgbToHsv({ r, g, b })

  return { h, s, v }
}

export { cmykToHsv }