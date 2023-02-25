import { Hsv } from '../types'

function validateHsv(hsv: Hsv): void {
  const { h, s, v } = hsv

  // Check for invalid data
  if (
    h < 0 || h > 360 ||
    s < 0 || s > 100 ||
    v < 0 || v > 100
  ) {
    throw new Error('Values are not valid. HSV only accept values for: hue from 0 to 360, saturation and value from 0 to 100')
  }
}

export { validateHsv }