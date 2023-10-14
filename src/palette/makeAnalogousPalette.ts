import { Color, ColorFormats, Format, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

type Direction = 'left' | 'right'

interface Options {
  color?: Color
  quantity?: number
  format?: Format
  shift?: number
  direction?: Direction
}

/**
 * Creates an analogous color palette from a base color.
 * 
 * @param {Options} options - Options to define the palette.
 * @param {Color} options.color - Base color to create the color palette, random if not sent.
 * @param {number} [options.quantity = 3] - Number of colors to be part of the palette, minimum value 2.
 * @param {Format} [options.format = 'hsl'] - Palette's Color format.
 * @param {number} options.shift - Mathematical distance the saturation and lightness will take from each color, minimum value 1 and maximum value 10, random if not sent.
 * @param {Direction} options.direction - Direction on the color wheel the palette will take, random if not sent.
 * 
 * @returns {Array<Color>} An array of colors that make a color palette.
 * @throws {Error} If a color parameter does not follow its format requirements.
*/
const directions: Direction[] = ['left', 'right']

function makeAnalogousPalette(options: Options): Array<Color> {
  // Basic config
  let color = options.color ? options.color : {
    h: Math.floor(Math.random() * 361),
    s: Math.floor(Math.random() * 95),
    l: Math.floor(Math.random() * (100 - 40 + 1) + 40)
  }
  const currentFormat = identifyFormat(color) as keyof ColorFormats
  const targetFormat = options.format ? options.format : currentFormat
  const quantity = options.quantity ? options.quantity : 3
  const shift = options.shift ? options.shift : Math.floor(Math.random() * (10 - 1 + 1) + 1)
  const direction = options.direction ? options.direction : directions[Math.floor(Math.random() * 2)]

  const palette: Array<Color> = []
  let h: number
  let s: number
  let l: number

  // Values validation
  if (quantity < 2) throw new Error('Quantity of colors on an analogous palette can`t be less than 2.')
  if (shift < 0 || shift > 10) throw new Error('Shift values can only be between 1 and 10.')
  if (!directions.includes(direction)) throw new Error('Invalid direction, only "left" or "right" are valid values.')

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

  let hue = h

  // Generate new colors
  const maxShift = 130
  const minShift = maxShift / 10

  for (let i = 0; i < quantity - 1; i++) {
    const variation = Math.floor(Math.random() * ((minShift * shift) - minShift + 1) + minShift)
    if (direction === 'right') {
      hue += variation

      hue = hue > 360 ? hue - 360 : hue
    } else if (direction === 'left') {
      hue -= variation

      hue = hue < 0 ? hue + 360 : hue
    }

    let newColor: Color = { h: hue, s, l }

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

export { makeAnalogousPalette }