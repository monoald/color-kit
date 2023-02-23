import { Rgb, Lab } from '../../types'
import { validateRgb } from '../../utils/validateRgb'
import { rgbToXyz } from './rgbToXyz'

function rgbToLab(rgb: Rgb): Lab {
  validateRgb(rgb)

  // Convert RGB to XYZ
  const { x, y, z } = rgbToXyz(rgb)

  // Convert XYZ to LAB
  const var_X = x / 95.047
  const var_Y = y / 100
  const var_Z = z / 108.883

  const var_X3 = var_X > 0.008856 ? Math.pow(var_X, 1 / 3) : 7.787 * var_X + 16 / 116
  const var_Y3 = var_Y > 0.008856 ? Math.pow(var_Y, 1 / 3) : 7.787 * var_Y + 16 / 116
  const var_Z3 = var_Z > 0.008856 ? Math.pow(var_Z, 1 / 3) : 7.787 * var_Z + 16 / 116

  let l = Math.round(116 * var_Y3 - 16)
  let a = Math.round(500 * (var_X3 - var_Y3))
  let b = Math.round(200 * (var_Y3 - var_Z3))

  // Fix negative -0
  if (l.toString() === '0') l = 0
  if (a.toString() === '0') a = 0
  if (b.toString() === '0') b = 0

  return { l, a, b }
}

export { rgbToLab }