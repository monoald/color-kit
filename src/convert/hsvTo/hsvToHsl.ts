import { Hsl, Hsv } from '../../types'
import { validateHsv } from '../../utils/validateHsv'

function hsvToHsl(hsv: Hsv): Hsl {
  validateHsv(hsv)

  let { h, s, v } = hsv
  s /= 100
  v /= 100

  let l = (2 - s) * v / 2

  if (l !== 0) {
    if (l === 1) {
      s = 0
    } else if (l < 0.5) {
      s = s * v / (l * 2)
    } else {
      s = s * v / (2 - l * 2)
    }
  }

  s = s * 100
  l = l * 100

  return { h, s, l }
}


export { hsvToHsl }