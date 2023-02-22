import { Xyz } from '../../types'
import { rgbToXyz } from '../rgbTo'
import { hexToRgb } from './hexToRgb'

function hexToXyz(hex: string): Xyz {
  // Convert Hexadecimal to RGB
  const rgb = hexToRgb(hex)

  // Conver RGB to Xyz
  const { x, y, z } = rgbToXyz(rgb)

  return { x, y, z }
}

export { hexToXyz }