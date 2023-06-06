import { Hsv, Lab } from '../../types'
import { validateHsv } from '../../validate'
import { rgbToLab } from '../rgbTo'
import { hsvToRgb } from './hsvToRgb'

function hsvToLab(hsv: Hsv): Lab {
  validateHsv(hsv)

  // Convert HSV to RGB
  const rgb = hsvToRgb(hsv)

  // Convert RGB to LAB
  const { l, a, b } = rgbToLab(rgb)

  return { l, a, b }
}

export { hsvToLab }