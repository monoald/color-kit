import { Color, ColorFormats, Format, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'
import { makeMonochromaticPalette } from './makeMonochromaticPalette'

interface Options {
  color?: Color
  quantity?: number
  shift?: number
  format?: Format
}

/**
 * Creates a split-complementary color palette from a base color.
 * 
 * @param {Options} options - Options to define the palette.
 * @param {Color} options.color - Base color to create the color palette, random if not sent.
 * @param {number} [options.quantity = 3] - Number of colors to be part of the palette, minimum value 3.
 * @param {Format} [options.format = 'hsl'] - Palette's color format.
 * @param {number} options.shift - Mathematical distance the saturation and lightness will take from each color, minimum value 7 and maximum value 35.
 * 
 * @returns {Array<Color>} An array of colors that make a color palette.
 * @throws {Error} If a color parameter does not follow its format requirements.
*/
function makeSplitComplementaryPalette(options: Options): Array<Color> {
  let color = options.color ? options.color : {
    h: Math.floor(Math.random() * 361),
    s: Math.floor(Math.random() * (100 - 20 + 1) + 20),
    l: Math.floor(Math.random() * (100 - 12 + 1) + 12)
  }
  const shift = options.shift ? options.shift : Math.floor(Math.random() * (35 - 12 + 1) + 12)
  const currentFormat = identifyFormat(color) as keyof ColorFormats
  const targetFormat = options.format ? options.format : currentFormat
  const quantity = options.quantity ? options.quantity : 3
  const palette: Array<Color> = []
  let h: number
  let s: number
  let l: number
  let complementary1: Color
  let complementary2: Color

  if (quantity < 3) throw new Error('Quantity of colors on a split complementary color palette can`t be less than 3.')

  // Get HSL value to manipulate Hue
  if (currentFormat !== 'hsl') {
    ({ h, s, l } = colorFormatConverter(color, {
      currentFormat,
      targetFormat: ['hsl']
    })['hsl']) as Hsl
  } else {
    ({ h, s, l } = color as Hsl)
  }

  if (currentFormat !== targetFormat) { 
    color = colorFormatConverter(color, {
      currentFormat,
      targetFormat: [targetFormat]
    })[targetFormat] as Color
  }

  palette.push(color)

  const complementaryHue = (h + 180) % 360

  let complementarySplit1 = complementaryHue - shift
  complementarySplit1 = complementarySplit1 < 0 ? complementarySplit1 + 360 : complementarySplit1

  let complementarySplit2 = complementaryHue + shift
  complementarySplit2 = complementarySplit2 > 360 ? complementarySplit2 - 360 : complementarySplit2

  complementary1 = { h: complementarySplit1, s, l }

  complementary2 = {
    h: complementarySplit2,
    s, l
  }

  if (targetFormat !== 'hsl') {
    complementary1 = colorFormatConverter(complementary1, {
      currentFormat: 'hsl',
      targetFormat: [targetFormat]
    })[targetFormat] as Color
    complementary2 = colorFormatConverter(complementary2, {
      currentFormat: 'hsl',
      targetFormat: [targetFormat]
    })[targetFormat] as Color
  }

  palette.push(complementary1)
  palette.push(complementary2)

  if (quantity > 3) {
    const primaryQuantity = Math.ceil((quantity - 3) / 2)
    const secondaryQuantity = Math.floor((quantity - 3) / 2)
    const shift = Math.floor(Math.random() * (10 - 1 + 1) + 1)

    const primaryPalette = makeMonochromaticPalette({
      color: palette[0],
      quantity: primaryQuantity + 1,
      shift
    })
    primaryPalette.splice(0, 1)
    primaryPalette.reverse()

    if (secondaryQuantity > 0) {
      const secondaryPalette = makeMonochromaticPalette({
        color: palette[2],
        quantity: secondaryQuantity + 1,
        shift
      })
      secondaryPalette.splice(0, 1)
      secondaryPalette.reverse()

      palette.push(...secondaryPalette)
    }
    palette.splice(0, 0, ...primaryPalette)
  }

  return palette
}

export { makeSplitComplementaryPalette }