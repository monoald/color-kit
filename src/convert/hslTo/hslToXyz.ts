import { Hsl, Xyz } from '../../types'
import { rgbToXyz } from '../rgbTo'
import { hslToRgb } from './hslToRgb'

/**
 * Converts an HSL color to XYZ format.
 * 
 * @param {Hsl} hsl - HSL color.
 * @returns {Xyz} An XYZ color.
 * @throws {Error} If a HSL value is missing, is not a number, or is outside of its respective range.
*/
function hslToXyz(hsl: Hsl): Xyz {
  // Convert HSL to RGB
  const rgb = hslToRgb(hsl)

  // Convert RGB to XYZ
  const { x, y, z } = rgbToXyz(rgb)

  return { x, y, z }
}

export { hslToXyz }