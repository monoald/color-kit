import { Hsv, Xyz } from '../../types'
import { rgbToXyz } from '../rgbTo'
import { hsvToRgb } from './hsvToRgb'

/**
 * Converts an HSV color to XYZ format.
 * 
 * @param {Hsv} hsv - HSV color.
 * @returns {Xyz} A XYZ color.
 * @throws {Error} If a HSV value is missing, is not a number, or is outside of its respective range.
*/
function hsvToXyz(hsv: Hsv): Xyz {
  // Convert HSV to RGB
  const rgb = hsvToRgb(hsv)

  // Convert RGB to XYZ
  const { x, y, z } = rgbToXyz(rgb)

  return { x, y, z }
}

export { hsvToXyz }