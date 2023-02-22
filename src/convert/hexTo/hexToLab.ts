import { Lab } from '../../types'
import { hexToRgb } from './hexToRgb'
import { rgbToLab } from '../rgbTo'

function hexToLab(hex: string): Lab {
  // Convert Hexadecimal to RGB
  const rgb = hexToRgb(hex)

  // Convert RGB to LAB
  const { l, a, b } = rgbToLab(rgb)

  return { l, a, b }
}

export { hexToLab }