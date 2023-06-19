import { Rgb, Cmyk } from '../../types'
import { validateRgb } from '../../validate'

/**
 * Converts an RGB color to CMYK format.
 * 
 * @param {Rgb} rgb - RGB color.
 * @returns {Cmyk} A CMYK color.
 * @throws {Error} If a RGB value is missing, is not a number, or is outside of its respective range.
*/
function rgbToCmyk({ r, g, b }: Rgb): Cmyk {
  validateRgb({ r, g, b })

  let c: number
  let m: number
  let y: number
  let k: number

  // Normalize values to a range of 0 to 100
  c = 1 - (r / 255)
  m = 1 - (g / 255)
  y = 1 - (b / 255)

  // Calculate key (black) color.
  k = Math.min(c, Math.min(m, y))

  // Calculate CMY values
  if (k === 1) {
    c = m = y = 0
  } else {
    c = (c - k) / (1 - k)
    m = (m - k) / (1 - k)
    y = (y - k) / (1 - k)
  }

  // Normalize values to a range of 0 to 100
  k = Math.round(k * 100)
  c = Math.round(c * 100)
  m = Math.round(m * 100)
  y = Math.round(y * 100)

  return { c, m, y, k } 
}

export { rgbToCmyk }