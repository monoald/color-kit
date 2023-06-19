import { BaseColor, ColorFormats, Rgb } from '../types'
import converter from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

/**
 * Simulate Protanomaly color blindness.
 * 
 * @param {BaseColor} color - The color to be simulated.
 * @returns {BaseColor} A color blindness simulation of the input color.
 * @throws {Error} If the parameter color does not follow its format requirements.
*/
function toProtanomaly(color: BaseColor): BaseColor {
  const format = identifyFormat(color) as keyof ColorFormats
  let protanomalyColor: BaseColor
  let r: number
  let g: number
  let b: number

  // Get RGB to manipulate color
  if (format === 'rgb') {
    ({ r, g, b } = color as Rgb)
  } else {
    ({ r, g, b } = converter.colorFormatConverter(color, {
      currentFormat: format,
      targetFormat: ['rgb']
    }).rgb as Rgb)
  }

  // Calculate Protanomaly values
  const newRed = Math.floor((0.817 * r) + (0.183 * g))
  const newGreen = Math.floor((0.333 * r) + (0.667 * g))
  const newBlue = Math.floor((0.125 * g) + (0.875 * b))

  const newColorRgb = {
    r: newRed,
    g: newGreen,
    b: newBlue
  }

  // Convert to base format
  if (format === 'rgb') {
    protanomalyColor = newColorRgb
  } else {
    protanomalyColor = converter.colorFormatConverter(newColorRgb, {
      currentFormat: 'rgb',
      targetFormat: [format]
    })[format] as BaseColor
  }

  return protanomalyColor
}

export { toProtanomaly }