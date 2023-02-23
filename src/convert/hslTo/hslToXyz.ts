import { Hsl, Xyz } from '../../types'
import { validateHsl } from '../../utils/validateHsl'
import { rgbToXyz } from '../rgbTo'
import { hslToRgb } from './hslToRgb'

function hslToXyz(hsl: Hsl): Xyz {
  validateHsl(hsl)

  // Convert HSL to RGB
  const rgb = hslToRgb(hsl)

  // Convert RGB to XYZ
  const { x, y, z } = rgbToXyz(rgb)

  return { x, y, z }
}

export { hslToXyz }