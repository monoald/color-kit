export function validateHex(hex: string ): void {
  let value: string

  if (hex.length === 7 || hex.length === 3) {
    // Extract hash and values
    const hash = hex.substring(0, 1)
    value = hex.substring(1, 7)
    if (hash !== '#') {
      throw new Error('Value is not valid')
    }
  } else {
    value = hex.substring(0,6)
  }

  if (
    !/^[a-f0-9]+$/gi.test(value)
  ) {
    throw new Error('Value is not valid')
  } 
}