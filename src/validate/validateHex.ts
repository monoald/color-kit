export function validateHex(hex: string ): void {
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