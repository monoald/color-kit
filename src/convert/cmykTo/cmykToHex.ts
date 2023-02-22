import { Cmyk } from '../../types'
import { cmykToRgb } from './cmykToRgb'

type Hex = string

function cmykToHex(cmyk: Cmyk): Hex {
  // Convert CMYK to RGB
  const { r, g, b } = cmykToRgb(cmyk)

  // Convert RGB to HEX
  const hexR = r.toString(16).padStart(2, '0')
  const hexG = g.toString(16).padStart(2, '0')
  const hexB = b.toString(16).padStart(2, '0')

  return '#' + hexR + hexG + hexB
}

export { cmykToHex }