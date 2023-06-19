import { Hsl } from '../types'

/**
 * Generates a random HSL color.
 * 
 * @returns {Hsl} An HSL color.
*/
function getRandomHsl(): Hsl {
  // Get random integer between 0 and 100 (max Hue value)
  const h = Math.floor(Math.random() * 361)

  // Get random integer between 0 and 100 (max Saturation and Lightness value)
  const s = Math.floor(Math.random() * 101) 
  const l = Math.floor(Math.random() * 101) 

  return { h, s, l }
}

export { getRandomHsl }