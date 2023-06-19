import { Xyz } from '../../types'
import { validateHex } from '../../validate'
import { rgbToXyz } from '../rgbTo'
import { hexToRgb } from './hexToRgb'

/**
 * Converts a Hexadecimal color to XYZ format.
 * 
 * @param {string} hex - Hexadecimal color.
 * @returns {Xyz} A XYZ color.
 * @throws {Error} If the string has a length different from 4 or 7, it does not include the hash (#) symbol at the beginning or includes letters outside of the hexadecimal values.
*/
function hexToXyz(hex: string): Xyz {
  validateHex(hex)

  // Convert Hexadecimal to RGB
  const rgb = hexToRgb(hex)

  // Conver RGB to Xyz
  const { x, y, z } = rgbToXyz(rgb)

  return { x, y, z }
}

export { hexToXyz }