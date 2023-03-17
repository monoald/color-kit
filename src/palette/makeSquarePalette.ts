import { AnyFormat, BaseColor, ColorFormats, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

function makeSquarePalette(color: BaseColor) {
  const format = identifyFormat(color) as keyof ColorFormats
  const palette: Array<AnyFormat> = [color]
  let h: number
  let s: number
  let l: number

  // Get HSL value to manipulate Hue
  if (format === 'hsl') {
    ({ h, s, l } = color as Hsl)
  } else {
    ({ h, s, l } = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['hsl']
    }).hsl)
  }

  // Calculate Square colors
  const hue1 = (h + 90) % 360
  const hue2 = (hue1 + 90) % 360
  const hue3 = (hue2 + 90) % 360

  let newColor1: ColorFormats = {
    hsl: { h: hue1, s, l}
  }
  let newColor2: ColorFormats = {
    hsl: { h: hue2, s, l }
  }
  let newColor3: ColorFormats = {
    hsl: { h: hue3, s, l }
  }

  if (format !== 'hsl') {
    newColor1 = colorFormatConverter(newColor1.hsl, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })
    newColor2 = colorFormatConverter(newColor2.hsl, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })
    newColor3 = colorFormatConverter(newColor3.hsl, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })
  }

  palette.push(newColor1[format])
  palette.push(newColor2[format])
  palette.push(newColor3[format])

  return palette
}

export { makeSquarePalette }