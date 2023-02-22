import { Cmyk, Xyz } from '../../types'
import { rgbToXyz } from '../rgbTo'
import { cmykToRgb } from './cmykToRgb'

function cmykToXyz(cmyk: Cmyk): Xyz {
  // Convert CMYK to RGB
  const { r, g, b } = cmykToRgb(cmyk)

  // Convert RGB to XYZ
  const { x, y, z } = rgbToXyz({ r, g, b })

  return { x, y, z }
}

export { cmykToXyz }