import { Cmyk, Xyz } from '../../types'
import { rgbToXyz } from '../rgbTo'
import { cmykToRgb } from './cmykToRgb'

/**
 * Converts a CMYK color to XYZ format.
 * 
 * @param {Cmyk} cmyk - CMYK color.
 * @returns {Xyz} An XYZ color.
 * @throws {Error} If a CMYK value is missing, is not a number, or is outside the range of 0 to 100.
*/
function cmykToXyz(cmyk: Cmyk): Xyz {
  // Convert CMYK to RGB
  const { r, g, b } = cmykToRgb(cmyk)

  // Convert RGB to XYZ
  const { x, y, z } = rgbToXyz({ r, g, b })

  return { x, y, z }
}

export { cmykToXyz }