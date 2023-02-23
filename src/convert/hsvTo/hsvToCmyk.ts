import { Cmyk, Hsv } from '../../types'
import { rgbToCmyk } from '../rgbTo'
import { hsvToRgb } from './hsvToRgb'

function hsvToCmyk(hsv: Hsv): Cmyk {
  // Convert HSL to RGB
  const rgb = hsvToRgb(hsv)

  // Convert RGB to CMYK
  const { c, m, y, k } = rgbToCmyk(rgb)

  return { c, m, y, k }
}

export { hsvToCmyk }