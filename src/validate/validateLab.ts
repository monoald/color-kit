import { Lab } from '../types'

export function validateLab(lab: Lab): void {
  const { l, a, b } = lab

  // Check for invalid data
  if (
    l < 0 || l > 100 ||
    a < -128 || a > 127 ||
    b < -128 || b > 127
  ) {
    throw new Error('Values are not valid. Lab only accept values from 0 to 100 for L and -128 to 127 for A and B')
  }
}