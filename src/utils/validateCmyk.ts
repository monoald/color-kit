import { Cmyk } from '../types'

function validateCmyk(cmyk: Cmyk): void {
  const { c, m, y, k } = cmyk

  // Check for invalid data
  if (
    c < 0 || c > 100 ||
    m < 0 || m > 100 ||
    y < 0 || y > 100 ||
    k < 0 || k > 100
  ) {
    throw new Error('Values are not valid. Cmyk only accept values from 0 to 100')
  }
}

export { validateCmyk }