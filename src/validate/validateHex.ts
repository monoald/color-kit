/**
 * Validates a Hexadecimal color to be a string with 4 or 7 hexadecimal characters, including the hash (#) symbol.
 * 
 * @param {string} hex - Hexadecimal color.
 * @throws {Error} If the string has a length different from 4 or 7, it does not include the hash (#) symbol at the beginning or includes letters outside of the hexadecimal values.
*/
function validateHex(hex: string ): void {
  let value: string

  if (hex.length === 7 || hex.length === 4) {
    // Extract hash and values
    const hash = hex.substring(0, 1)
    value = hex.substring(1, 7)
    if (hash !== '#') {
      throw new Error('A hash symbol (#) must be present at the begining of the color.')
    }
  } else {
    throw new Error('A Hexadecimal color should have 6 or 3 digits.')
  }

  if (
    !/^[a-f0-9]+$/gi.test(value)
  ) {
    throw new Error('A Hexadecimal color should have numbers between 0-9 and letter between a-f.')
  } 
}

export { validateHex }