import { Rgb, Hsv } from '../../types'
import { validateRgb } from '../../validate'

/**
 * Converts an RGB color to HSV format.
 * 
 * @param {Rgb} rgb - RGB color.
 * @returns {Hsv} A HSV color.
 * @throws {Error} If a RGB value is missing, is not a number, or is outside of its respective range.
*/
function rgbToHsv(rgb: Rgb): Hsv {
  validateRgb(rgb)

  // Normalize values to a range of 0 to 100
  const r = rgb.r / 255
  const g = rgb.g / 255
  const b = rgb.b / 255

  // Calculate Delta
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min

  let h: number
  let s: number
  let v: number

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

  // Calculate Saturation
  s = max === 0 ? 0 : delta / max
  s = Math.round(s * 100)

  // Calculate Value
  v = Math.round(max * 100)

  return { h, s, v }
}

export { rgbToHsv }