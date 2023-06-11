import { Hsl } from '../types'

export function validateHsl(hsl: Hsl): void {
  const { h, s, l } = hsl

  // Check if values are not numbers
  if (!Number.isInteger(h)) {
    throw new Error(`Expected property hue (h) to be of type number, but got ${typeof h}.`)
  }
  if (!Number.isInteger(s)) {
    throw new Error(`Expected property saturation (s) to be of type number, but got ${typeof s}.`)
  }
  if (!Number.isInteger(l)) {
    throw new Error(`Expected property lightness (l) to be of type number, but got ${typeof l}.`)
  }

  // Check if values are outside the range.
  if (h < 0 || h > 360) {
    throw new Error('The hue (h) value is not valid. Hue value must be between 0 and 360.')
  }
  if (s < 0 || s > 100) {
    throw new Error('The saturation (s) value is not valid. Saturation value must be between 0 and 100.')
  }
  if (l < 0 || l > 100) {
    throw new Error('The lightness (l) value is not valid. Lightness value must be between 0 and 100.')
  }
}