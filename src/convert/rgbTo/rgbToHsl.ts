import { Rgb, Hsl } from '../../types'
import { validateRgb } from '../../utils/validateRgb'

function rgbToHsl(rgb: Rgb): Hsl {
  validateRgb(rgb)

  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const delta = cmax - cmin

  let h: number = 0

  if (delta === 0) {
    h = 0
  } else if (cmax === r) {
    h = ((g - b) / delta) % 6
  } else if (cmax === g) {
    h = (b - r) / delta + 2
  } else {
    h = (r - g) / delta + 4
  }
  h = Math.round(h * 60)

  h = h <= 0 ? h + 360 : h

  let l = ((cmax + cmin) / 2)

  let s: number = 0
  if (delta === 0) {
    s = 0
  } else {
    s = delta / (1 - Math.abs(2 * l - 1))
  }
  s = Math.round(s * 100)

  l = Math.round(l * 100)

  return { h, s, l }
}

export { rgbToHsl }