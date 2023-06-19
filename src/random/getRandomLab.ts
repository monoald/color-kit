import { Lab } from '../types'

/**
 * Generates a random LAB color.
 * 
 * @returns {Lab} A LAB color.
*/
function getRandomLab(): Lab {
  // Get random integer between 0 and 100 (max Lightness value)
  const l = Math.floor(Math.random() * 101) 

  // Get random integer between -128 and 127 (max Hue value)
  const a = Math.floor(Math.random() * 256) - 128
  const b = Math.floor(Math.random() * 256) - 128

  return { l, a, b }
}

export { getRandomLab }