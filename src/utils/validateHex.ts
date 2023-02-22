function validateHex(hex: string ): void {
  const hash = hex.substring(0, 1)
  const value = hex.substring(1, 7)

  if (
    hash !== '#' ||
    !/^[a-f0-9]+$/gi.test(value)
  ) {
    throw new Error('Value is not valid')
  } 
}

export { validateHex }