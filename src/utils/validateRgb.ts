import { Rgb } from '../types'

function validateRgb(rgb: Rgb): void {
  const { r, g, b } = rgb

  // Check for invalid data
  if (
    r < 0 || r > 255 ||
    g < 0 || g > 255 ||
    b < 0 || b > 255
  ) {
    throw new Error('Values are not valid. RGB only accept values from 0 to 255')
  }
}

export { validateRgb }