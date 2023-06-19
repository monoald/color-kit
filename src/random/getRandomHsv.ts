import { Hsv } from '../types'

/**
 * Generates a random HSV color.
 * 
 * @returns {Hsv} An HSV color.
*/
function getRandomHsv(): Hsv {
  // Get random integer between 0 and 100 (max Hue value)
  const h = Math.floor(Math.random() * 361)

  // Get random integer between 0 and 100 (max Saturation and Value value)
  const s = Math.floor(Math.random() * 101) 
  const v = Math.floor(Math.random() * 101) 

  return { h, s, v }
}

export { getRandomHsv }