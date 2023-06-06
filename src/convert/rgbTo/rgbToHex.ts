import { Rgb } from '../../types'
import { validateRgb } from '../../validate'

type Hex = string

function rgbToHex({ r, g, b }: Rgb): Hex {
  validateRgb({ r, g, b })

  // Calculate Hexadecimal values
  const hexR = r.toString(16).padStart(2, '0')
  const hexG = g.toString(16).padStart(2, '0')
  const hexB = b.toString(16).padStart(2, '0')

  return '#' + hexR + hexG + hexB
}

export { rgbToHex }