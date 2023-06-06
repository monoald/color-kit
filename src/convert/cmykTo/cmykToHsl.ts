import { Cmyk, Hsl } from '../../types'
import { validateCmyk } from '../../validate'

function cmykToHsl(cmyk: Cmyk): Hsl {
  validateCmyk(cmyk)

  // Normalize values to a range of range 0 to 1
  const c = cmyk.c / 100
  const m = cmyk.m / 100
  const y = cmyk.y / 100
  const k = cmyk.k / 100

  // Convert CMYK to RGB
  const r = 1 - Math.min(1, c * (1 - k) + k)
  const g = 1 - Math.min(1, m * (1 - k) + k)
  const b = 1 - Math.min(1, y * (1 - k) + k)

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  // Calculate Lightness
  let l = (max + min) / 2

  // Calculate Hue and Saturation
  let h: number
  let s: number

  if (max === min) {
    h = s = 0
  } else {
    const d = max - min

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }
    h /= 6
  }

  // Normalize values to a range of range 0 to 100
  h = Math.round(h * 360)
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return { h, s, l }
}

export { cmykToHsl }