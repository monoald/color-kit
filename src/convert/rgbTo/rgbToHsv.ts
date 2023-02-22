import { Rgb, Hsv } from '../../types'
import { validateRgb } from '../../utils/validateRgb'

function rgbToHsv(rgb: Rgb): Hsv {
  validateRgb(rgb)

  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h, s, v
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
  if (h < 0) h += 360

  s = max === 0 ? 0 : delta / max
  s = Math.round(s * 100)

  v = Math.round(max * 100)

  return { h, s, v }
}

export { rgbToHsv }