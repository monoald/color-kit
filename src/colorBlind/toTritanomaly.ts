import { BaseColor, ColorFormats, Rgb } from '../types'
import converter from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

/**
 * Simulate Tritanomaly color blindness.
 * 
 * @param {BaseColor} color - The color to be simulated.
 * @returns {BaseColor} A color blindness simulation of the input color.
 * @throws {Error} If the parameter color does not follow its format requirements.
*/
function toTritanomaly(color: BaseColor): BaseColor {
  const format = identifyFormat(color) as keyof ColorFormats
  let tritanomalyColor: BaseColor
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

  if (g < 10) {
    g = g * 10
  }

  // Calculate Tritanomaly values
  const newRed = Math.round((0.967 * r) + (0.033 * g))
  const newGreen = Math.floor((g * 0.73) + (b * 0.271))
  const newBlue = Math.floor((0.183 * g) + (0.817 * b))

  const newColorRgb = {
    r: newRed,
    g: newGreen,
    b: newBlue
  }
  

  // Convert to base format
  if (format === 'rgb') {
    tritanomalyColor = newColorRgb
  } else {
    tritanomalyColor = converter.colorFormatConverter(newColorRgb, {
      currentFormat: 'rgb',
      targetFormat: [format]
    })[format] as BaseColor
  }

  return tritanomalyColor
}

export { toTritanomaly }