import { Color, ColorFormats, Format, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'
import { makeMonochromaticPalette } from './makeMonochromaticPalette'

interface Options {
  color?: Color
  quantity?: number
  format?: Format
}

/**
 * Creates a complementary color palette from a base color.
 * 
 * @param {Options} options - Options to define the palette.
 * @param {Color} options.color - Base color to create the color palette, random if not sent.
 * @param {number} [options.quantity = 2] - Number of colors to be part of the palette, minimum value 2.
 * @param {Format} [options.format = 'hsl'] - Palette's color format.
 * 
 * @returns {Array<Color>} An array of colors two that make a color palette.
 * @throws {Error} If a color parameter does not follow its format requirements.
*/
function makeComplementaryPalette(options: Options): Array<Color> {
  let color = options.color ? options.color : {
    h: Math.floor(Math.random() * 361),
    s: Math.floor(Math.random() * (100 - 20 + 1) + 20),
    l: Math.floor(Math.random() * (100 - 12 + 1) + 12)
  }
  const currentFormat = identifyFormat(color) as keyof ColorFormats
  const targetFormat = options.format ? options.format : currentFormat
  const quantity = options.quantity ? options.quantity : 3
  const palette: Array<Color> = []
  let h: number
  let s: number
  let l: number

  if (quantity < 2) throw new Error('Quantity of colors on a color palette can`t be less than 2.')

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

  // Calculate complementary hue
  const complementaryHue = (h + 180) % 360
  const complementaryHsl: Hsl = { h: complementaryHue, s, l }
  let complementaryColor: Color

  if (targetFormat !== 'hsl') {
    complementaryColor = colorFormatConverter(complementaryHsl, {
      currentFormat: 'hsl',
      targetFormat: [targetFormat]
    })[targetFormat] as Color
  } else {
    complementaryColor = complementaryHsl
  }

  palette.push(complementaryColor)

  if (quantity > 2) {
    const primaryQuantity = Math.ceil((quantity - 2) / 2)
    const secondaryQuantity = Math.floor((quantity - 2) / 2)
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
        color: palette[1],
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

export { makeComplementaryPalette }