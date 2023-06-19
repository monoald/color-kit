import { Xyz } from '../types'

/**
 * Generates a random XYZ color.
 * 
 * @returns {Xyz} An XYZ color.
*/
function getRandomXyz(): Xyz {
  // Get random integer between 0 and 100 (max value)
  const x = Math.floor(Math.random() * 101)
  const y = Math.floor(Math.random() * 101)
  const z = Math.floor(Math.random() * 101)

  return { x, y, z }
}

export { getRandomXyz }