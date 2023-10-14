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
 * Creates a triadic color palette from a base color.
 * 
 * @param {Options} options - Options to define the palette.
 * @param {Color} options.color - Base color to create the color palette, random if not sent.
 * @param {number} [options.quantity = 4] - Number of colors to be part of the palette, minimum value 4.
 * @param {Format} [options.format = 'hsl'] - Palette's color format.
 * 
 * @returns {Array<Color>} An array of three colors that make a color palette.
 * @throws {Error} If a color parameter does not follow its format requirements.
*/
function makeTriadicPalette(options: Options): Array<Color> {
  let color = options.color ? options.color : {
    h: Math.floor(Math.random() * 361),
    s: Math.floor(Math.random() * (100 - 20 + 1) + 20),
    l: Math.floor(Math.random() * (100 - 12 + 1) + 12)
  }
  const currentFormat = identifyFormat(color) as keyof ColorFormats
  const targetFormat = options.format ? options.format : currentFormat
  const quantity = options.quantity ? options.quantity : 4
  const palette: Array<Color> = []
  let h: number
  let s: number
  let l: number

  if (quantity < 3) throw new Error('Quantity of colors on a triadic color palette can`t be less than 3.')

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

  // Calculate angles for the triadic colors
  const angle1 = (h + 120) % 360
  const angle2 = (h + 240) % 360

  // Convert the angles back to origin format
  let color1: Color = { h: angle1, s, l }

  let color2: Color = { h: angle2, s, l }

  if (targetFormat !== 'hsl') {
    color1 = colorFormatConverter(color1, {
      currentFormat: 'hsl',
      targetFormat: [targetFormat]
    })[targetFormat] as Color

    color2 = colorFormatConverter(color2, {
      currentFormat: 'hsl',
      targetFormat: [targetFormat]
    })[targetFormat] as Color
  }

  palette.push(color1)
  palette.push(color2)

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
        color: palette[1],
        quantity: secondaryQuantity + 1,
        shift
      })
      secondaryPalette.splice(0, 1)
      secondaryPalette.reverse()

      palette.push(...secondaryPalette)
    }
    palette.push(...primaryPalette)
  }

  return palette
}

export { makeTriadicPalette }