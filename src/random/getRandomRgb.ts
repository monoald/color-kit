import { Rgb } from '../types'

/**
 * Generates a random RGB color.
 * 
 * @returns {Rgb} An RGB color.
*/
function getRandomRgb(): Rgb {
  // Get random integer between 0 and 255 (max Red, Green and Blue value)
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)

  return { r, g, b }
}

export { getRandomRgb }