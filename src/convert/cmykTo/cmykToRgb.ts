import { Cmyk, Rgb } from '../../types'
import { validateCmyk } from '../../validate'

function cmykToRgb(cmyk: Cmyk): Rgb {
  validateCmyk(cmyk)

  // Normalize values to a range of range 0 to 1
  const c = cmyk.c / 100
  const m = cmyk.m / 100
  const y = cmyk.y / 100
  const k = cmyk.k / 100

  // Calculate RGB values
  const r = Math.round(255 * (1 - c) * (1 - k))
  const g = Math.round(255 * (1 - m) * (1 - k))
  const b = Math.round(255 * (1 - y) * (1 - k))

  return { r, g, b}
}

export { cmykToRgb }