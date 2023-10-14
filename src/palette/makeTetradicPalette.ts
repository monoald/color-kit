import { Color, ColorFormats, Format, Hsv } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'
import { makeMonochromaticPalette } from './makeMonochromaticPalette'

interface Options {
  color?: Color
  quantity?: number
  format?: Format
}

/**
 * Creates a tetradic color palette from a base color.
 * 
 * @param {Options} options - Options to define the palette.
 * @param {Color} options.color - Base color to create the color palette, random if not sent.
 * @param {number} [options.quantity = 4] - Number of colors to be part of the palette, minimum value 4.
 * @param {Format} [options.format = 'hsv'] - Palette's color format.
 * 
 * @returns {Array<Color>} An array of four colors that make a color palette.
 * @throws {Error} If a color parameter does not follow its format requirements.
*/
function makeTetradicPalette(options: Options): Array<Color> {
  let color = options.color ? options.color : {
    h: Math.floor(Math.random() * 361),
    s: Math.floor(Math.random() * (100 - 20 + 1) + 20),
    v: Math.floor(Math.random() * (100 - 12 + 1) + 12)
  }
  const currentFormat = identifyFormat(color) as keyof ColorFormats
  const targetFormat = options.format ? options.format : currentFormat
  const quantity = options.quantity ? options.quantity : 4
  const palette: Array<Color> = []
  let h: number
  let s: number
  let v: number

  if (quantity < 4) throw new Error('Quantity of colors on a tetradic color palette can`t be less than 4.')

  // Get HSL value to manipulate Hue
  if (currentFormat !== 'hsv') {
    ({ h, s, v } = colorFormatConverter(color, {
      currentFormat,
      targetFormat: ['hsv']
    })['hsv']) as Hsv
  } else {
    ({ h, s, v } = color as Hsv)
  }

  if (currentFormat !== targetFormat) { 
    color = colorFormatConverter(color, {
      currentFormat,
      targetFormat: [targetFormat]
    })[targetFormat] as Color
  }

  palette.push(color)

  // Calculate Tetradic colors
  const hue1 = (h + 30) % 360
  const hue2 = (h + 180) % 360
  const hue3 = (hue1 + 180) % 360

  let color1: Color = { h: hue1, s, v}
  let color2: Color = { h: hue2, s, v: 80 }
  let color3: Color = { h: hue3, s, v: 40 }

  if (targetFormat !== 'hsv') {
    color1 = colorFormatConverter(color1, {
      currentFormat: 'hsv',
      targetFormat: [targetFormat]
    })[targetFormat] as Color
    color2 = colorFormatConverter(color2, {
      currentFormat: 'hsv',
      targetFormat: [targetFormat]
    })[targetFormat] as Color
    color3 = colorFormatConverter(color3, {
      currentFormat: 'hsv',
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

export { makeTetradicPalette }