/**
 * Generates a random Hexadecimal color.
 * 
 * @returns {string} A Hexadecimal color.
*/
function getRandomHex(): string {
  // Get random integer between 0 and 16777215 (decimal equivalent of FFFFFF)
  const randomInt = Math.floor(Math.random() * 16777216)

  // Convert to hexadecimal and pad with zeros if necessary
  const hexColor = randomInt.toString(16).padStart(6, '0')

  return '#' + hexColor
}

export { getRandomHex }