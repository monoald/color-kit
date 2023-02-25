import { Rgb, Hsl } from '../../types'
import { validateRgb } from '../../utils/validateRgb'

function rgbToHsl(rgb: Rgb): Hsl {
  validateRgb(rgb)

  // Normalize values to a range of 0 to 100
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  // Calculate Delta
  const min = Math.min(r, g, b)
  const max = Math.max(r, g, b)
  const delta = max - min
  
  let h: number
  let s: number
  let l: number

  // Calculate Hue
  if (delta === 0) {
    h = 0
  } else if (max === r) {
    h = ((g - b) / delta) % 6
  } else if (max === g) {
    h = (b - r) / delta + 2
  } else {
    h = (r - g) / delta + 4
  }

  h = Math.round(h * 60)
  h = h < 0 ? h + 360 : h

  // Calculate Lightness
  l = ((max + min) / 2)

  // Calculate Saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  // Normalize values whithin 0 to 100
  s = Math.round(s * 100)
  l = Math.round(l * 100)

  return { h, s, l }
}

export { rgbToHsl }