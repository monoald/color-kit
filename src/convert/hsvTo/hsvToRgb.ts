import { Hsv, Rgb } from '../../types'
import { validateHsv } from '../../utils/validateHsv'

function hsvToRgb(hsv: Hsv): Rgb {
  validateHsv(hsv)

  let { h, s, v } = hsv

  h /= 360
  s /= 100
  v /= 100

  let r: number
  let g: number
  let b: number

  let i = Math.floor(h * 6)
  let f = h * 6 - i
  let p = v * (1 - s)
  let q = v * (1 - f * s)
  let t = v * (1 - (1 - f) * s)

  switch (i % 6) {
    case 0: r = v, g = t, b = p 
      break
    case 1: r = q, g = v, b = p 
      break
    case 2: r = p, g = v, b = t 
      break
    case 3: r = p, g = q, b = v 
      break
    case 4: r = t, g = p, b = v 
      break
    case 5: r = v, g = p, b = q 
      break
  }

  r = Math.round(r * 255)
  g = Math.round(g * 255)
  b = Math.round(b * 255)

  return { r, g, b }
}

export { hsvToRgb }