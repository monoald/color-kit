import { Hsl, Lab } from '../../types'
import { validateHsl } from '../../validate'
import { rgbToLab } from '../rgbTo'
import { hslToRgb } from './hslToRgb'

function hslToLab(hsl: Hsl): Lab {
  validateHsl(hsl)

  // Convert HSL to RGB
  const rgb = hslToRgb(hsl)

  // Convert RGB to LAB
  const { l, a, b } = rgbToLab(rgb)

  return { l, a, b }
}

export { hslToLab }