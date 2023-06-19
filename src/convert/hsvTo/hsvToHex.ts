import { Hsv } from '../../types'
import { validateHsv } from '../../validate'
import { rgbToHex } from '../rgbTo'
import { hsvToRgb } from './hsvToRgb'

/**
 * Converts an HSV color to Hexadecimal format.
 * 
 * @param {Hsv} hsv - HSV color.
 * @returns {string} A Hexadecimal color.
 * @throws {Error} If a HSV value is missing, is not a number, or is outside of its respective range.
*/
function hsvToHex(hsv: Hsv): string {
  validateHsv(hsv)

  // Convert HSL to RGB
  const rgb = hsvToRgb(hsv)

  // Convert RGB to Hexadecimal
  const hex = rgbToHex(rgb)

  return hex
}

export { hsvToHex }