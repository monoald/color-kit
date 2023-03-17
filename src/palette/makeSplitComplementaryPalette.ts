import { AnyFormat, BaseColor, ColorFormats, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

function makeSplitComplementaryPalette(color: BaseColor, quantity = 3) {
  const format = identifyFormat(color) as keyof ColorFormats
  const palette: Array<AnyFormat> = [color]
  let h: number
  let s: number
  let l: number

  // Get HSL value to manipulate Hue
  if (format === 'hsl') {
    ({ h, s, l } = color as Hsl)
  } else {
    ({ h, s, l} = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['hsl']
    }).hsl)
  }

  // Calculate split-complementary colors
  const hue1 = (h + 150) % 360
  const hue2 = (h - 150) % 360

  let newColor1: ColorFormats = {
    hsl: { h: hue1, s, l}
  }
  let newColor2: ColorFormats = {
    hsl: { h: hue2, s, l}
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
  }

  palette.push(newColor1[format])
  palette.push(newColor2[format])

  // Add complementary colors
  if (quantity === 4) {
    const hue3 = (h + 165) % 360
    let newSplitColor1: ColorFormats = {
      hsl: { h: hue3, s, l}
    }

    if (format !== 'hsl') {
      newSplitColor1 = colorFormatConverter(newSplitColor1.hsl, {
        currentFormat: 'hsl',
        targetFormat: [format]
      })
    }
    palette.push(newSplitColor1[format])
  }

  if (quantity === 5) {
    const hue4 = (h - 165) % 360
    let newSplitColor2: ColorFormats = {
      hsl: { h: hue4, s, l}
    }

    if (format !== 'hsl') {
      newSplitColor2 = colorFormatConverter(newSplitColor2.hsl, {
        currentFormat: 'hsl',
        targetFormat: [format]
      })
    }
    palette.push(newSplitColor2[format])
  }

  return palette
}

export { makeSplitComplementaryPalette }