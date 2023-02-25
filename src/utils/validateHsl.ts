import { Hsl } from '../types'

function validateHsl(hsl: Hsl): void {
  const { h, s, l } = hsl

  // Check for invalid data
  if (
    h < 0 || h > 360 ||
    s < 0 || s > 100 ||
    l < 0 || l > 100
  ) {
    throw new Error('Values are not valid. HSL only accept values for: hue from 0 to 360, saturation and lightness from 0 to 100')
  }
}

export { validateHsl }