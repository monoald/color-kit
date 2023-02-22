import { Cmyk, Lab } from '../../types'
import { rgbToXyz } from '../rgbTo'
import { cmykToRgb } from './cmykToRgb'

function cmykToLab(cmyk: Cmyk): Lab {
  // Convert CMYK to RGB
  const rgb =  cmykToRgb(cmyk)

  // Convert RGB to XYZ
  let { x, y, z } = rgbToXyz(rgb)

  // Convert XYZ to Lab
  x = x / 95.047
  y = y / 100.000
  z = z / 108.883

  const fx = x > 0.008856 ? Math.pow(x, 1 / 3) : (7.787 * x) + 16 / 116
  const fy = y > 0.008856 ? Math.pow(y, 1 / 3) : (7.787 * y) + 16 / 116
  const fz = z > 0.008856 ? Math.pow(z, 1 / 3) : (7.787 * z) + 16 / 116

  const l = Math.round(116 * fy - 16)
  const a = Math.round(500 * (fx - fy))
  const b = Math.round(200 * (fy - fz))

  return { l, a, b }
}

export { cmykToLab }