import converter from '../convert'
import { BaseColor, ColorFormats, Rgb } from '../types'
import { identifyFormat } from '../utils/identifyFormat'

function toAchromatomaly(color: BaseColor): BaseColor {
  const format = identifyFormat(color) as keyof ColorFormats
  let achromatomalyColor: BaseColor
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

  // Calculate Achromatomaly value
  const newRed = Math.floor((r * 0.618) + (g * 0.32) + (b * 0.062));
  const newGreen = Math.floor((r * 0.163) + (g * 0.775) + (b * 0.062));
  const newBlue = Math.floor((r * 0.163) + (g * 0.32) + (b * 0.516));

  const newColorRgb = {
    r: newRed,
    g: newGreen,
    b: newBlue
  }

  // Convert to base format
  if (format === 'rgb') {
    achromatomalyColor = newColorRgb
  } else {
    achromatomalyColor = converter.colorFormatConverter(newColorRgb, {
      currentFormat: 'rgb',
      targetFormat: [format]
    })[format] as BaseColor
  }

  return achromatomalyColor
}

export { toAchromatomaly }