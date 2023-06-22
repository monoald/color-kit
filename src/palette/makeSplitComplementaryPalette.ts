import { BaseColor, ColorFormats, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

/**
 * Creates a split-complementary color palette from a base color.
 * 
 * @param {BaseColor} color - The base color to create the color palette.
 * @param {number} quantity - The number of colors to be part of the palette, by default 3.
 * @returns {Array<BaseColor>} An array of colors that make a color palette.
 * @throws {Error} If the parameter color does not follow its format requirements.
*/
function makeSplitComplementaryPalette(color: BaseColor, variation = 50): Array<BaseColor> {
  const format = identifyFormat(color) as keyof ColorFormats
  const palette: Array<BaseColor> = [color]
  let h: number
  let s: number
  let l: number
  let complementary1: BaseColor
  let complementary2: BaseColor

  // Get HSL value to manipulate Hue
  if (format === 'hsl') {
    ({ h, s, l } = color as Hsl)
  } else {
    ({ h, s, l} = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['hsl']
    }).hsl as Hsl)
  }

  const complementaryHue = (h + 180) % 360

  let complementaryHue1 = complementaryHue - variation
  complementaryHue1 = complementaryHue1 < 0 ? complementaryHue1 + 360 : complementaryHue1

  let complementaryHue2 = complementaryHue + variation
  complementaryHue2 = complementaryHue2 > 360 ? complementaryHue2 - 360 : complementaryHue2

  complementary1 = { h: complementaryHue1, s, l }

  if (format !== 'hsl') {
    complementary1 = colorFormatConverter(complementary1, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })[format] as BaseColor
  }

  complementary2 = { h: complementaryHue2, s, l }

  if (format !== 'hsl') {
    complementary2 = colorFormatConverter(complementary2, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })[format] as BaseColor
  }

  palette.push(complementary1)
  palette.push(complementary2)

  return palette
}

export { makeSplitComplementaryPalette }