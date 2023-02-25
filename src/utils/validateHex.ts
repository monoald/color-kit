function validateHex(hex: string ): void {
  // Extract hash and values
  const hash = hex.substring(0, 1)
  const value = hex.substring(1, 7)

  // Check for invalid data
  if (
    hash !== '#' ||
    !/^[a-f0-9]+$/gi.test(value)
  ) {
    throw new Error('Value is not valid')
  } 
}

export { validateHex }