import converter from '../convert'
import { BaseColor, ColorFormats, Rgb } from '../types'
import { identifyFormat } from '../utils/identifyFormat'

/**
 * Simulate Achromatopsia color blindness.
 * 
 * @param {BaseColor} color - The color to be simulated.
 * @returns {BaseColor} A color blindness simulation of the input color.
 * @throws {Error} If the parameter color does not follow its format requirements.
*/
function toAchromatopsia(color: BaseColor): BaseColor {
  const format = identifyFormat(color) as keyof ColorFormats
  let achromatopsiaColor: BaseColor
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

  // Calculate Achromatopsia value
  const gray = Math.round((r + g + b) / 3)

  const newColorRgb = {
    r: gray,
    g: gray,
    b: gray
  }

  // Convert to base format
  if (format === 'rgb') {
    achromatopsiaColor = newColorRgb
  } else {
    achromatopsiaColor = converter.colorFormatConverter(newColorRgb, {
      currentFormat: 'rgb',
      targetFormat: [format]
    })[format] as BaseColor
  }

  return achromatopsiaColor
}

export { toAchromatopsia }