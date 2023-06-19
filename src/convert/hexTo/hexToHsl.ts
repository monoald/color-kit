import { Hsl } from '../../types'
import { hexToRgb } from './hexToRgb'
import { rgbToHsl } from '../rgbTo'

/**
 * Converts a Hexadecimal color to HSL format.
 * 
 * @param {string} hex - Hexadecimal color.
 * @returns {Hsl} An HSL color.
 * @throws {Error} If the string has a length different from 4 or 7, it does not include the hash (#) symbol at the beginning or includes letters outside of the hexadecimal values.
*/
function hexToHsl(hex: string): Hsl {
  // Convert Hexadecimal to RGB
  const rgb = hexToRgb(hex)

  // Convert RGB to HSL
  const { h, s, l } = rgbToHsl(rgb)

  return { h, s, l }
}

export { hexToHsl }