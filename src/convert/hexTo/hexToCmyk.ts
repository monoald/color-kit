import { Cmyk } from '../../types'
import { hexToRgb } from './hexToRgb'
import { rgbToCmyk } from '../rgbTo'

function hexToCmyk(hex: string): Cmyk {
  // Convert Hexadecimal to RGB
  const rgb = hexToRgb(hex)

  // Convert RGB to CMYK
  const { c, m, y, k } = rgbToCmyk(rgb)
  
  return { c, m, y, k }
}

export { hexToCmyk }