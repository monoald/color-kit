import { Rgb } from '../types'

export function validateRgb(rgb: Rgb): void {
  const { r, g, b } = rgb

  // Check if values are not numbers
  if (!Number.isInteger(r)) {
    throw new Error(`Expected property red (r) to be of type number, but got ${typeof r}.`)
  }
  if (!Number.isInteger(g)) {
    throw new Error(`Expected property green (g) to be of type number, but got ${typeof g}.`)
  }
  if (!Number.isInteger(b)) {
    throw new Error(`Expected property blue (b) to be of type number, but got ${typeof b}.`)
  }

  // Check if values are outside the range.
  if (r < 0 || r > 255) {
    throw new Error('The red (r) value is not valid. Red value must be between 0 and 255.')
  }
  if (g < 0 || g > 255) {
    throw new Error('The green (g) value is not valid. Green value must be between 0 and 255.')
  }
  if (b < 0 || b > 255) {
    throw new Error('The blue (b) value is not valid. Blue value must be between 0 and 255.')
  }
}