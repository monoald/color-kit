import { Hsl } from '../../types'
import { rgbToHex } from '../rgbTo'
import { hslToRgb } from './hslToRgb'

/**
 * Converts an HSL color to Hexadecimal format.
 * 
 * @param {Hsl} hsl - HSL color.
 * @returns {string} A Hexadecimal color.
 * @throws {Error} If a HSL value is missing, is not a number, or is outside of its respective range.
*/
function hslToHex(hsl: Hsl): string {
  // Convert HSL to RGB
  const rgb = hslToRgb(hsl)

  // Convert RGB to Hexadecimal
  const hex = rgbToHex(rgb)

  return hex
}

export { hslToHex }