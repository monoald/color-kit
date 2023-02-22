import { Rgb, Cmyk } from '../../types'
import { validateRgb } from '../../utils/validateRgb'

function rgbToCmyk(rgb: Rgb): Cmyk {
  validateRgb(rgb)

  let c: number
  let m: number
  let y: number
  let k: number

  c = 1 - (rgb.r / 255)
  m = 1 - (rgb.g / 255)
  y = 1 - (rgb.b / 255)
  k = Math.min(c, Math.min(m, y))

  if (k === 1) {
    c = 0
    m = 0
    y = 0
  } else {
    c = (c - k) / (1 - k)
    m = (m - k) / (1 - k)
    y = (y - k) / (1 - k)
  }
  k = Math.round(k * 100)
  
  c = Math.round(c * 100)
  m = Math.round(m * 100)
  y = Math.round(y * 100)

  return { c, m, y, k } 
}

export { rgbToCmyk }