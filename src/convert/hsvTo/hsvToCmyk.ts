import { Cmyk, Hsv } from '../../types'
import { rgbToCmyk } from '../rgbTo'
import { hsvToRgb } from './hsvToRgb'

/**
 * Converts an HSV color to CMYK format.
 * 
 * @param {Hsv} hsv - HSV color.
 * @returns {Cmyk} A CMYK color.
 * @throws {Error} If a HSV value is missing, is not a number, or is outside of its respective range.
*/
function hsvToCmyk(hsv: Hsv): Cmyk {
  // Convert HSL to RGB
  const rgb = hsvToRgb(hsv)

  // Convert RGB to CMYK
  const { c, m, y, k } = rgbToCmyk(rgb)

  return { c, m, y, k }
}

export { hsvToCmyk }