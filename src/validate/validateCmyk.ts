import { Cmyk } from '../types'

export function validateCmyk(cmyk: Cmyk): void {
  const { c, m, y, k } = cmyk

  // Check if values are not numbers
  if (!Number.isInteger(c)) {
    throw new Error(`Expected property cyan (c) to be of type number, but got ${typeof c}.`)
  }
  if (!Number.isInteger(m)) {
    throw new Error(`Expected property magenta (m) to be of type number, but got ${typeof m}.`)
  }
  if (!Number.isInteger(y)) {
    throw new Error(`Expected property yellow (y) to be of type number, but got ${typeof y}.`)
  }
  if (!Number.isInteger(k)) {
    throw new Error(`Expected property key (k) to be of type number, but got ${typeof k}.`)
  }

  // Check if values are outside the range.
  if (c < 0 || c > 360) {
    throw new Error('The cyan (c) value is not valid. Cyan value must be between 0 and 100.')
  }
  if (m < 0 || m > 100) {
    throw new Error('The magenta (m) value is not valid. Magenta value must be between 0 and 100.')
  }
  if (y < 0 || y > 100) {
    throw new Error('The yellow (y) value is not valid. Yellow value must be between 0 and 100.')
  }
  if (k < 0 || k > 100) {
    throw new Error('The key (k) value is not valid. Key value must be between 0 and 100.')
  }
}