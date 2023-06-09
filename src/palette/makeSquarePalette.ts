import { AnyFormat, BaseColor, ColorFormats, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

function makeSquarePalette(color: BaseColor): Array<AnyFormat> {
  const format = identifyFormat(color) as keyof ColorFormats
  const palette: Array<AnyFormat> = [color]
  let h: number
  let s: number
  let l: number
  let color1: AnyFormat
  let color2: AnyFormat
  let color3: AnyFormat

  // Get HSL value to manipulate Hue
  if (format === 'hsl') {
    ({ h, s, l } = color as Hsl)
  } else {
    ({ h, s, l } = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['hsl']
    }).hsl as Hsl)
  }

  // Calculate Square colors
  const hue1 = (h + 90) % 360
  const hue2 = (hue1 + 90) % 360
  const hue3 = (hue2 + 90) % 360

  const colorHsl1: Hsl = { h: hue1, s, l}
  const colorHsl2: Hsl = { h: hue2, s, l }
  const colorHsl3: Hsl = { h: hue3, s, l }

  if (format !== 'hsl') {
    color1 = colorFormatConverter(colorHsl1, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })[format] as AnyFormat
    color2 = colorFormatConverter(colorHsl2, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })[format] as AnyFormat
    color3 = colorFormatConverter(colorHsl3, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })[format] as AnyFormat
  }

  palette.push(color1)
  palette.push(color2)
  palette.push(color3)

  return palette
}

export { makeSquarePalette }