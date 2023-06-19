import { Cmyk } from '../../types'
import { hexToRgb } from './hexToRgb'
import { rgbToCmyk } from '../rgbTo'

/**
 * Converts a Hexadecimal color to CMYK format.
 * 
 * @param {string} hex - Hexadecimal color.
 * @returns {Cmyk} A CMYK color.
 * @throws {Error} If the string has a length different from 4 or 7, it does not include the hash (#) symbol at the beginning or includes letters outside of the hexadecimal values.
*/
function hexToCmyk(hex: string): Cmyk {
  // Convert Hexadecimal to RGB
  const rgb = hexToRgb(hex)

  // Convert RGB to CMYK
  const { c, m, y, k } = rgbToCmyk(rgb)
  
  return { c, m, y, k }
}

export { hexToCmyk }