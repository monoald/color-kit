import { BaseColor, ColorFormats, Rgb } from '../types'
import converter from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

/**
 * Simulate Protanopia color blindness.
 * 
 * @param {BaseColor} color - The color to be simulated.
 * @returns {BaseColor} A color blindness simulation of the input color.
 * @throws {Error} If the parameter color does not follow its format requirements.
*/
function toProtanopia(color: BaseColor): BaseColor {
  const format = identifyFormat(color) as keyof ColorFormats
  let protanopiaColor: BaseColor
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

  // Calculate Protanopia values
  const newRed = Math.floor((r * 0.56667) + (g * 0.43333))
  const newGreen = Math.floor((r * 0.55833) + (g * 0.44167))
  const newBlue = Math.round((g * 0.24167) + (b * 0.75833))

  const newColorRgb = {
    r: newRed,
    g: newGreen,
    b: newBlue
  }

  // Convert to base format
  if (format === 'rgb') {
    protanopiaColor = newColorRgb
  } else {
    protanopiaColor = converter.colorFormatConverter(newColorRgb, {
      currentFormat: 'rgb',
      targetFormat: [format]
    })[format] as BaseColor
  }

  return protanopiaColor
}

export { toProtanopia }