import { Hsl } from '../../types'
import { validateHsl } from '../../utils/validateHsl'
import { rgbToHex } from '../rgbTo'
import { hslToRgb } from './hslToRgb'

function hslToHex(hsl: Hsl): string {
  // Convert HSL to RGB
  const rgb = hslToRgb(hsl)

  // Convert RGB to Hexadecimal
  const hex = rgbToHex(rgb)

  return hex
}

export { hslToHex }