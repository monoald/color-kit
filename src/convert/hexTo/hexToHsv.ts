import { Hsv } from '../../types'
import { hexToRgb } from './hexToRgb'
import { rgbToHsv } from '../rgbTo'
import { validateHex } from '../../validate'

/**
 * Converts a Hexadecimal color to HSV format.
 * 
 * @param {string} hex - Hexadecimal color.
 * @returns {Hsv} An HSV color.
 * @throws {Error} If the string has a length different from 4 or 7, it does not include the hash (#) symbol at the beginning or includes letters outside of the hexadecimal values.
*/
function hexToHsv(hex: string): Hsv {
  validateHex(hex)

  // Convert Hexadecimal to RGB
  const rgb = hexToRgb(hex)

  // Convert RGB to HSV
  const { h, s, v } = rgbToHsv(rgb)

  return { h, s, v }
}

export { hexToHsv }