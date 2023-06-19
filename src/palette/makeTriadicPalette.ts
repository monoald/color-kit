import { BaseColor, ColorFormats, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

/**
 * Creates a triadic color palette from a base color.
 * 
 * @param {BaseColor} color - The base color to create the color palette.
 * @returns {Array<BaseColor>} An array of three colors that make a color palette.
 * @throws {Error} If the parameter color does not follow its format requirements.
*/
function makeTriadicPalette(color: BaseColor): Array<BaseColor> {
  const format = identifyFormat(color) as keyof ColorFormats
  let h: number
  let s: number
  let l: number
  let color1: BaseColor
  let color2: BaseColor

  // Get HSL value to manipulate Hue
  if (format === 'hsl') {
    ({ h, s, l } = color as Hsl)
  } else {
    ({ h, s, l} = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['hsl']
    }).hsl as Hsl)
  }

  // Calculate angles for the triadic colors
  const angle1 = (h + 120) % 360
  const angle2 = (h + 240) % 360

  // Convert the angles back to origin format
  const colorHsl1: Hsl = { h: angle1, s, l }

  const colorHsl2: Hsl = { h: angle2, s, l }

  if (format !== 'hsl') {
    color1 = colorFormatConverter(colorHsl1, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })[format] as BaseColor

    color2 = colorFormatConverter(colorHsl2, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })[format] as BaseColor
  }

  return [color, color1, color2]
}

export { makeTriadicPalette }