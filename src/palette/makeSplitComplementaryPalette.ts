import { BaseColor, ColorFormats, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

function makeSplitComplementaryPalette(color: BaseColor, quantity = 3): Array<BaseColor> {
  const format = identifyFormat(color) as keyof ColorFormats
  const palette: Array<BaseColor> = [color]
  let h: number
  let s: number
  let l: number
  let complementary1: BaseColor
  let complementary2: BaseColor
  let complementarySplit1: BaseColor
  let complementarySplit2: BaseColor

  // Get HSL value to manipulate Hue
  if (format === 'hsl') {
    ({ h, s, l } = color as Hsl)
  } else {
    ({ h, s, l} = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['hsl']
    }).hsl as Hsl)
  }

  // Calculate split-complementary colors
  const hue1 = (h + 150) % 360
  const hue2 = (h - 150) % 360

  const complementaryHsl1: Hsl = { h: hue1, s, l}
  const complementaryHsl2: Hsl = { h: hue2, s, l}

  if (format !== 'hsl') {
    complementary1 = colorFormatConverter(complementaryHsl1, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })[format] as BaseColor

    complementary2 = colorFormatConverter(complementaryHsl2, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })[format] as BaseColor
  }

  palette.push(complementary1)
  palette.push(complementary2)

  // Add complementary colors
  if (quantity === 4) {
    const hue3 = (h + 165) % 360
    const complementarySplitHsl1: Hsl = { h: hue3, s, l}

    if (format !== 'hsl') {
      complementarySplit1 = colorFormatConverter(complementarySplitHsl1, {
        currentFormat: 'hsl',
        targetFormat: [format]
      })[format] as BaseColor
    }
    palette.push(complementarySplit1)
  }

  if (quantity === 5) {
    const hue4 = (h - 165) % 360
    const complementarySplitHsl2: Hsl = { h: hue4, s, l}

    if (format !== 'hsl') {
      complementarySplit2 = colorFormatConverter(complementarySplitHsl2, {
        currentFormat: 'hsl',
        targetFormat: [format]
      })[format] as BaseColor
    }
    palette.push(complementarySplit2)
  }

  return palette
}

export { makeSplitComplementaryPalette }