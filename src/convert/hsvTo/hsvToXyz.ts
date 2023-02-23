import { Hsv, Xyz } from '../../types'
import { rgbToXyz } from '../rgbTo'
import { hsvToRgb } from './hsvToRgb'

function hsvToXyz(hsv: Hsv): Xyz {
  // Convert HSV to RGB
  const rgb = hsvToRgb(hsv)

  // Convert RGB to XYZ
  const { x, y, z } = rgbToXyz(rgb)

  return { x, y, z }
}

export { hsvToXyz }