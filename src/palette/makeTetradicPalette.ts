import { AnyFormat, BaseColor, ColorFormats, Hsv } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

function makeTetradicPalette(color: BaseColor, variation = 0) {
  const format = identifyFormat(color) as keyof ColorFormats
  const palette: Array<AnyFormat> = [color]
  let h: number
  let s: number
  let v: number

  // Get HSL value to manipulate Hue
  if (format === 'hsv') {
    ({ h, s, v } = color as Hsv)
  } else {
    ({ h, s, v } = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['hsv']
    }).hsv)
  }

  // Calculate Tetradic colors
  const hue1 = (h + 30) % 360
  const hue2 = (h + 180) % 360
  const hue3 = (hue1 + 180) % 360

  let newColor1: ColorFormats = {
    hsv: { h: hue1, s, v}
  }
  let newColor2: ColorFormats = {
    hsv: { h: hue2, s, v: 80 }
  }
  let newColor3: ColorFormats = {
    hsv: { h: hue3, s, v: 40 }
  }

  if (format !== 'hsv') {
    newColor1 = colorFormatConverter(newColor1.hsv, {
      currentFormat: 'hsv',
      targetFormat: [format]
    })
    newColor2 = colorFormatConverter(newColor2.hsv, {
      currentFormat: 'hsv',
      targetFormat: [format]
    })
    newColor3 = colorFormatConverter(newColor3.hsv, {
      currentFormat: 'hsv',
      targetFormat: [format]
    })
  }

  palette.push(newColor1[format])
  palette.push(newColor2[format])
  palette.push(newColor3[format])

  return palette
}

export { makeTetradicPalette }