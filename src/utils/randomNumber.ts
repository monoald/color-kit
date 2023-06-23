/**
 * Gets a random number between determined range.
 * 
 * @param {number} min - The minimum number to get.
 * @param {number} min - The maximum number to get.
 * @returns {number} A random number between the min and max parameters..
*/
function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min)) + min
}

export { randomNumber }