import { Cmyk } from '../types'

function getRandomCmyk(): Cmyk {
  // Get random integer between 0 and 100 (max value)
  const c = Math.floor(Math.random() * 101)
  const m = Math.floor(Math.random() * 101)
  const y = Math.floor(Math.random() * 101)
  const k = Math.floor(Math.random() * 101)

  return { c, m, y, k }
}

export { getRandomCmyk }