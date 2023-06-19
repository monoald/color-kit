import { Hsv, Lab } from '../../types'
import { validateHsv } from '../../validate'
import { rgbToLab } from '../rgbTo'
import { hsvToRgb } from './hsvToRgb'

/**
 * Converts an HSV color to LAB format.
 * 
 * @param {Hsv} hsv - HSV color.
 * @returns {Lab} A LAB color.
 * @throws {Error} If a HSV value is missing, is not a number, or is outside of its respective range.
*/
function hsvToLab(hsv: Hsv): Lab {
  validateHsv(hsv)

  // Convert HSV to RGB
  const rgb = hsvToRgb(hsv)

  // Convert RGB to LAB
  const { l, a, b } = rgbToLab(rgb)

  return { l, a, b }
}

export { hsvToLab }