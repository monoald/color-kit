import { Cmyk, Hsl } from '../../types'
import { rgbToCmyk } from '../rgbTo'
import { hslToRgb } from './hslToRgb'

function hslToCmyk(hsl: Hsl): Cmyk {
  // Convert HSL to RGB
  const rgb = hslToRgb(hsl)

  // Convert RGB to CMYK
  const { c, m, y, k } = rgbToCmyk(rgb)

  return { c, m, y, k }
}

export { hslToCmyk }