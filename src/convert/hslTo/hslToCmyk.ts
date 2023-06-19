import { Cmyk, Hsl } from '../../types'
import { rgbToCmyk } from '../rgbTo'
import { hslToRgb } from './hslToRgb'

/**
 * Converts an HSL color to CMYK format.
 * 
 * @param {Hsl} hsl - HSL color.
 * @returns {Cmyk} A Cmyk color.
 * @throws {Error} If a HSL value is missing, is not a number, or is outside of its respective range.
*/
function hslToCmyk(hsl: Hsl): Cmyk {
  // Convert HSL to RGB
  const rgb = hslToRgb(hsl)

  // Convert RGB to CMYK
  const { c, m, y, k } = rgbToCmyk(rgb)

  return { c, m, y, k }
}

export { hslToCmyk }