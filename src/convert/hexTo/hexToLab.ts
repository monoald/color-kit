import { Lab } from '../../types'
import { hexToRgb } from './hexToRgb'
import { rgbToLab } from '../rgbTo'

/**
 * Converts a Hexadecimal color to LAB format.
 * 
 * @param {string} hex - Hexadecimal color.
 * @returns {Lsb} A LAB color.
 * @throws {Error} If the string has a length different from 4 or 7, it does not include the hash (#) symbol at the beginning or includes letters outside of the hexadecimal values.
*/
function hexToLab(hex: string): Lab {
  // Convert Hexadecimal to RGB
  const rgb = hexToRgb(hex)

  // Convert RGB to LAB
  const { l, a, b } = rgbToLab(rgb)

  return { l, a, b }
}

export { hexToLab }