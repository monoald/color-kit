import { BaseColor, ColorFormats, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

/**
 * Creates an analogous color palette from a base color.
 * 
 * @param {BaseColor} color - The base color to create the color palette.
 * @param {number} quantity - The number of colors to be part of the palette, by default 3.
 * @param {number} variation - The mathematical distance of the hue on the color wheel, by default 40.
 * @returns {Array<BaseColor>} An array of colors that make a color palette.
 * @throws {Error} If the parameter color does not follow its format requirements.
*/
function makeAnalogousPalette(color: BaseColor, quantity = 3, variation = 40): Array<BaseColor> {
  const format = identifyFormat(color) as keyof ColorFormats
  const palette: Array<BaseColor> = []
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

  let hue = h

  // Generate new colors
  for (let i = 0; i < quantity; i++) {
      hue += variation

      hue = hue > 360 ? hue - 360 : hue

    const newColorHsl: Hsl = { h: hue, s, l }
    let newColor: ColorFormats

    if (format !== 'hsl') {
      newColor = colorFormatConverter(newColorHsl, {
        currentFormat: 'hsl',
        targetFormat: [format]
      })
    }
    palette.push(newColor[format] as BaseColor)
  }

  return palette
}

export { makeAnalogousPalette }