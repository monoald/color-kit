import { AnyFormat, BaseColor, ColorFormats, Hsv } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

function makeTetradicPalette(color: BaseColor, variation = 0): Array<AnyFormat> {
  const format = identifyFormat(color) as keyof ColorFormats
  const palette: Array<AnyFormat> = [color]
  let h: number
  let s: number
  let v: number
  let color1: AnyFormat
  let color2: AnyFormat
  let color3: AnyFormat

  // Get HSL value to manipulate Hue
  if (format === 'hsv') {
    ({ h, s, v } = color as Hsv)
  } else {
    ({ h, s, v } = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['hsv']
    }).hsv as Hsv)
  }

  // Calculate Tetradic colors
  const hue1 = (h + 30) % 360
  const hue2 = (h + 180) % 360
  const hue3 = (hue1 + 180) % 360

  const colorHsv1: Hsv = { h: hue1, s, v}
  const colorHsv2: Hsv = { h: hue2, s, v: 80 }
  const colorHsv3: Hsv = { h: hue3, s, v: 40 }

  if (format !== 'hsv') {
    color1 = colorFormatConverter(colorHsv1, {
      currentFormat: 'hsv',
      targetFormat: [format]
    })[format] as AnyFormat
    color2 = colorFormatConverter(colorHsv2, {
      currentFormat: 'hsv',
      targetFormat: [format]
    })[format] as AnyFormat
    color3 = colorFormatConverter(colorHsv3, {
      currentFormat: 'hsv',
      targetFormat: [format]
    })[format] as AnyFormat
  }

  palette.push(color1)
  palette.push(color2)
  palette.push(color3)

  return palette
}

export { makeTetradicPalette }