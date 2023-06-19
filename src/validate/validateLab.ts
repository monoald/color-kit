import { Lab } from '../types'

/**
 * Validates LAB color lightness to be between 0 and 100, and channels A and B to be between -128 and 127.
 * 
 * @param {Lab} lab - LAB color.
 * @throws {Error} If a LAB value is missing, is not a number, or is outside of its respective range.
*/
function validateLab(lab: Lab): void {
  const { l, a, b } = lab

  // Check if values are not numbers
  if (!Number.isInteger(l)) {
    throw new Error(`Expected property lightness (l) to be of type number, but got ${typeof l}.`)
  }
  if (!Number.isInteger(a)) {
    throw new Error(`Expected property a to be of type number, but got ${typeof a}.`)
  }
  if (!Number.isInteger(b)) {
    throw new Error(`Expected property b to be of type number, but got ${typeof b}.`)
  }

  // Check if values are outside the range.
  if (l < 0 || l > 100) {
    throw new Error('The lightness (l) value is not valid. Lightness value must be between 0 and 100.')
  }
  if (a < -128 || a > 127) {
    throw new Error('The a value is not valid. A value must be between -128 and 127.')
  }
  if (b < -128 || b > 127) {
    throw new Error('The b value is not valid. B value must be between -128 and 127.')
  }
}

export { validateLab }