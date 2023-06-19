import { BaseColor, ColorFormats, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

/**
 * Creates a square color palette from a base color.
 * 
 * @param {BaseColor} color - The base color to create the color palette.
 * @returns {Array<BaseColor>} An array of four colors that make a color palette.
 * @throws {Error} If the parameter color does not follow its format requirements.
*/
function makeSquarePalette(color: BaseColor): Array<BaseColor> {
  const format = identifyFormat(color) as keyof ColorFormats
  const palette: Array<BaseColor> = [color]
  let h: number
  let s: number
  let l: number
  let color1: BaseColor
  let color2: BaseColor
  let color3: BaseColor

  // Get HSL value to manipulate Hue
  if (format === 'hsl') {
    ({ h, s, l } = color as Hsl)
  } else {
    ({ h, s, l } = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['hsl']
    }).hsl as Hsl)
  }

  // Calculate Square colors
  const hue1 = (h + 90) % 360
  const hue2 = (hue1 + 90) % 360
  const hue3 = (hue2 + 90) % 360

  const colorHsl1: Hsl = { h: hue1, s, l}
  const colorHsl2: Hsl = { h: hue2, s, l }
  const colorHsl3: Hsl = { h: hue3, s, l }

  if (format !== 'hsl') {
    color1 = colorFormatConverter(colorHsl1, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })[format] as BaseColor
    color2 = colorFormatConverter(colorHsl2, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })[format] as BaseColor
    color3 = colorFormatConverter(colorHsl3, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })[format] as BaseColor
  }

  palette.push(color1)
  palette.push(color2)
  palette.push(color3)

  return palette
}

export { makeSquarePalette }