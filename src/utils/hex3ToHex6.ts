/**
 * Converts a hexadecimal color of three characters to a hexadecimal color of six characters.
 *
 * @param {string} hex - A three character hexadecimal color.
 * @returns {string} A six character hexadecimal color.
*/
function hex3ToHex6(hex: string): string {
  // Extract values
  let hexR = hex.substring(1, 2)
  let hexG = hex.substring(2, 3)
  let hexB = hex.substring(3, 4)

  // Duplicate values
  hexR = hexR + hexR
  hexG = hexG + hexG
  hexB = hexB + hexB

  return '#' + hexR + hexG + hexB
}

export { hex3ToHex6 }