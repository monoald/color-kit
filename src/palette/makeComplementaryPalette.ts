import { BaseColor, ColorFormats, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'


function makeComplementaryPalette(color: BaseColor): Array<BaseColor> {
  const format = identifyFormat(color) as keyof ColorFormats
  let h: number
  let s: number
  let l: number

  // Get HSL value to manipulate Hue
  if (format === 'hsl') {
    ({ h, s, l } = color as Hsl)
  } else {
    ({ h, s, l} = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['hsl']
    }).hsl as Hsl)
  }

  // Calculate complementary hue
  const complementaryHue = (h + 180) % 360
  const complementaryHsl: Hsl = { h: complementaryHue, s, l }
  let complementaryColor: BaseColor

  if (format !== 'hsl') {
    complementaryColor = colorFormatConverter(complementaryHsl, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })[format] as BaseColor
  }

  return [color, complementaryColor]
}

export { makeComplementaryPalette }