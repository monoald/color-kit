import { Hsl, Hsv } from '../../types'
import { validateHsl } from '../../utils/validateHsl'
import { rgbToHsv } from '../rgbTo'
import { hslToRgb } from './hslToRgb'

function hslToHsv(hsl: Hsl): Hsv {
  // Convert HSL to RGB
  const rgb = hslToRgb(hsl)

  // Convert RGB to HSV
  const { h, s, v } = rgbToHsv(rgb)

  return { h, s, v }
}

export { hslToHsv }