import { Hsl, Lab } from '../../types'
import { validateHsl } from '../../validate'
import { rgbToLab } from '../rgbTo'
import { hslToRgb } from './hslToRgb'

/**
 * Converts an HSL color to LAB format.
 * 
 * @param {Hsl} hsl - HSL color.
 * @returns {Lab} A LAB color.
 * @throws {Error} If a HSL value is missing, is not a number, or is outside of its respective range.
*/
function hslToLab(hsl: Hsl): Lab {
  validateHsl(hsl)

  // Convert HSL to RGB
  const rgb = hslToRgb(hsl)

  // Convert RGB to LAB
  const { l, a, b } = rgbToLab(rgb)

  return { l, a, b }
}

export { hslToLab }