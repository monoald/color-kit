import { Hsv } from '../../types'
import { rgbToHex } from '../rgbTo'
import { hsvToRgb } from './hsvToRgb'

function hsvToHex(hsv: Hsv): string {
  // Convert HSL to RGB
  const rgb = hsvToRgb(hsv)

  // Convert RGB to Hexadecimal
  const hex = rgbToHex(rgb)

  return hex
}

export { hsvToHex }