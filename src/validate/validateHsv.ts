import { Hsv } from '../types'

export function validateHsv(hsv: Hsv): void {
  const { h, s, v } = hsv

  // Check if values are not numbers
  if (!Number.isInteger(h)) {
    throw new Error(`Expected property hue (h) to be of type number, but got ${typeof h}.`)
  }
  if (!Number.isInteger(s)) {
    throw new Error(`Expected property saturation (s) to be of type number, but got ${typeof s}.`)
  }
  if (!Number.isInteger(v)) {
    throw new Error(`Expected property brightness (v) to be of type number, but got ${typeof v}.`)
  }

  // Check if values are outside the range.
  if (h < 0 || h > 360) {
    throw new Error('The hue (h) value is not valid. Hue value must be between 0 and 360.')
  }
  if (s < 0 || s > 100) {
    throw new Error('The saturation (s) value is not valid. Saturation value must be between 0 and 100.')
  }
  if (v < 0 || v > 100) {
    throw new Error('The brightness (v) value is not valid. Brightness value must be between 0 and 100.')
  }
}