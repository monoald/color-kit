import { AnyFormat, BaseColor, ColorFormats, Rgb } from '../types'
import converter from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

function toProtanopia(color: BaseColor): AnyFormat {
  const format = identifyFormat(color) as keyof ColorFormats
  let protanopiaColor: AnyFormat
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
    })[format]
  }

  return protanopiaColor
}

export { toProtanopia }