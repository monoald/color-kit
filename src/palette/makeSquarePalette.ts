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
 * Creates a square color palette from a base color.
 * 
 * @param {Options} options - Options to define the palette.
 * @param {Color} options.color - Base color to create the color palette, random if not sent.
 * @param {number} [options.quantity = 4] - Number of colors to be part of the palette, minimum value 4.
 * @param {Format} [options.format = 'hsl'] - Palette's color format.
 * 
 * @returns {Array<Color>} An array of four colors that make a color palette.
 * @throws {Error} If a color parameter does not follow its format requirements.
*/
function makeSquarePalette(options?: Options): Array<Color> {
  let color = options && options.color ? options.color : {
    h: Math.floor(Math.random() * 361),
    s: Math.floor(Math.random() * (100 - 20 + 1) + 20),
    l: Math.floor(Math.random() * (85 - 12 + 1) + 12)
  }

  const currentFormat = identifyFormat(color) as keyof ColorFormats
  const targetFormat = options && options.format ? options.format : currentFormat
  const quantity = options && options.quantity ? options.quantity : 4
  const palette: Array<Color> = []

  let h: number
  let s: number
  let l: number

  if (quantity < 4) throw new Error('Quantity of colors on a square color palette can`t be less than 4.')

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

  // Calculate Square colors
  const hue1 = (h + 90) % 360
  const hue2 = (hue1 + 90) % 360
  const hue3 = (hue2 + 90) % 360

  let color1: Color = { h: hue1, s, l}
  let color2: Color = { h: hue2, s, l }
  let color3: Color = { h: hue3, s, l }


  if (targetFormat !== 'hsl') {
    color1 = colorFormatConverter(color1, {
      currentFormat: 'hsl',
      targetFormat: [targetFormat]
    })[targetFormat] as Color
    color2 = colorFormatConverter(color2, {
      currentFormat: 'hsl',
      targetFormat: [targetFormat]
    })[targetFormat] as Color
    color3 = colorFormatConverter(color3, {
      currentFormat: 'hsl',
      targetFormat: [targetFormat]
    })[targetFormat] as Color
  }

  palette.push(color1)
  palette.push(color2)
  palette.push(color3)

  if (quantity > 4) {
    const primaryQuantity = Math.ceil((quantity - 4) / 2)
    const secondaryQuantity = Math.floor((quantity - 4) / 2)
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
        color: palette[3],
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

export { makeSquarePalette }