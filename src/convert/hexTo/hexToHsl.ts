import { Hsl } from '../../types'
import { hexToRgb } from './hexToRgb'
import { rgbToHsl } from '../rgbTo'

function hexToHsl(hex: string): Hsl {
  // Convert Hexadecimal to RGB
  const rgb = hexToRgb(hex)

  // Convert RGB to HSL
  const { h, s, l } = rgbToHsl(rgb)

  return { h, s, l }
}

export { hexToHsl }