import { Color, ColorFormats, Format, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

interface Options {
  color?: Color
  quantity?: number
  format?: Format
  shift?: number
}

/**
 * Creates a monochromatic color palette from a base color.
 * 
 * @param {Options} options - Options to define the palette.
 * @param {Color} options.color - Base color to create the color palette, random if not sent.
 * @param {number} [options.quantity = 3] - Number of colors to be part of the palette, minimum value 2.
 * @param {Format} [options.format = 'hsl'] - Palette's color format.
 * @param {number} options.shift - Mathematical distance the saturation and lightness will take from each color, minimum value 1 and maximum value 10, random if not sent.
 * 
 * @returns {Array<Color>} An array of colors that make a color palette.
 * @throws {Error} If a color parameter does not follow its format requirements.
*/
function makeShadesPalette(options?: Options): Array<Color> {
  // Basic config
  let color = options && options.color ? options.color : {
    h: Math.floor(Math.random() * 361),
    s: Math.floor(Math.random() * 101),
    l: Math.floor(Math.random() * 101)
  }
  const currentFormat = identifyFormat(color) as keyof ColorFormats
  const targetFormat = options && options.format ? options.format : currentFormat
  const quantity = options && options.quantity ? options.quantity : 3
  const shift = options && options.shift ? options.shift : Math.floor(Math.random() * (15 - 3 + 1) + 3)

  const palette: Array<Color> = []
  let h: number
  let s: number
  let l: number

  // Values validation
  if (shift < 3) throw new Error('Shift can`t be less than 5.')
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

  const minShift = 5

  // Generate new colors
  const lightnessDirection = Math.round(Math.random()) // 0 down - 1 up
  let lightness = l

  for (let i = 0; i < quantity - 1; i++) {
    const variation = Math.floor(Math.random() * ((minShift * shift) - minShift + 1) + minShift)
    if (lightnessDirection === 0) {
      lightness -= variation
      lightness = lightness < 4 ? lightness + 92 : lightness
    } else {
      lightness += variation
      lightness = lightness > 96 ? lightness - 92 : lightness
    }


    let newColor: Color = {
      h,
      s,
      l: lightness
    }

    if (targetFormat !== 'hsl') {
      newColor = colorFormatConverter(newColor, {
        currentFormat: 'hsl',
        targetFormat: [targetFormat]
      })[targetFormat] as Color
      palette.push(newColor)
    } else {
      palette.push(newColor)
    }
  }

  return palette
}

export { makeShadesPalette }