import { AnyFormat, BaseColor, ColorFormats, Rgb } from '../types'
import converter from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

function toTritanopia(color: BaseColor): AnyFormat {
  const format = identifyFormat(color) as keyof ColorFormats
  let tritanopiaColor: AnyFormat
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
    }).rgb)
  }

  // Calculate Tritanopia value
  const newRed = Math.round((0.95 * r) + (0.05 * g))
  const newGreen = Math.floor((0.433 * g) + (0.567 * b))
  const newBlue = Math.round((0.433 * b) + (0.567 * g))
  
  const newColorRgb = {
    r: newRed,
    g: newGreen,
    b: newBlue
  }

  // Convert to base format
  if (format === 'rgb') {
    tritanopiaColor = newColorRgb
  } else {
    tritanopiaColor = converter.colorFormatConverter(newColorRgb, {
      currentFormat: 'rgb',
      targetFormat: [format]
    })[format]
  }

  return tritanopiaColor
}

export { toTritanopia }