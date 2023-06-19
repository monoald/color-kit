import { Rgb } from '../types'

/**
 * Calculates the relative luminance of an rgb color.
 *
 * @param {Rgb} color - The color to calulate the relative luminance from.
 * @returns {number} The realtive luminance.
*/
function getRelativeLuminance(color: Rgb): number {
  const r = color.r / 255
  const g = color.g / 255
  const b = color.b / 255
  let rsrgb: number
  let gsrgb: number
  let bsrgb: number

  // Calculate relative luminance based on sRGB color space
  if (r <= 0.03928) {
    rsrgb =  r / 12.92
  } else {
    rsrgb = Math.pow((r + 0.055) / 1.055, 2.4)
  }

  if (g <= 0.03928) {
    gsrgb = g / 12.92
  } else {
    gsrgb = Math.pow((g + 0.055) / 1.055, 2.4)
  }
  
  if (b <= 0.03928) {
    bsrgb = b / 12.92
  } else {
    bsrgb = Math.pow((b + 0.055) / 1.055, 2.4)
  }
  
  const luminance = 0.2126 * rsrgb + 0.7152 * gsrgb + 0.0722 * bsrgb

  return luminance
}

export { getRelativeLuminance }