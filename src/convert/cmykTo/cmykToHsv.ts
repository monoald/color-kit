import { Cmyk, Hsv } from '../../types'
import { rgbToHsv } from '../rgbTo'
import { cmykToRgb } from './cmykToRgb'

function cmykToHsv(cmyk: Cmyk): Hsv {
  // Convert CMYK to RGB
  const { r, g, b } = cmykToRgb(cmyk)

  // Convert RGB to HSV
  const { h, s, v } = rgbToHsv({ r, g, b })

  return { h, s, v }
}

export { cmykToHsv }