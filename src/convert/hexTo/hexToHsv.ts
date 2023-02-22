import { Hsv } from '../../types'
import { hexToRgb } from './hexToRgb'
import { rgbToHsv } from '../rgbTo'

function hexToHsv(hex: string): Hsv {
  // Convert Hexadecimal to RGB
  const rgb = hexToRgb(hex)

  // Convert RGB to HSV
  const { h, s, v } = rgbToHsv(rgb)

  return { h, s, v }
}

export { hexToHsv }