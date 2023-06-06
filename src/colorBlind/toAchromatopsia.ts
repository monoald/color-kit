import { AnyFormat, BaseColor, ColorFormats, Rgb } from '../types'
import converter from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

function toAchromatopsia(color: BaseColor): AnyFormat {
  const format = identifyFormat(color) as keyof ColorFormats
  let deuteranopiaColor: AnyFormat
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

  // Calculate Deuteranopia value
  const gray = Math.round((r + g + b) / 3)

  const newColorRgb = {
    r: gray,
    g: gray,
    b: gray
  }

  // Convert to base format
  if (format === 'rgb') {
    deuteranopiaColor = newColorRgb
  } else {
    deuteranopiaColor = converter.colorFormatConverter(newColorRgb, {
      currentFormat: 'rgb',
      targetFormat: [format]
    })[format] as AnyFormat
  }

  return deuteranopiaColor
}

export { toAchromatopsia }