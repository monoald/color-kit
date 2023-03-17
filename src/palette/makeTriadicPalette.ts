import { AnyFormat, BaseColor, ColorFormats, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

function makeTriadicPalette(color: BaseColor): Array<AnyFormat> {
  const format = identifyFormat(color) as keyof ColorFormats
  let h: number
  let s: number
  let l: number

  // Get HSL value to manipulate Hue
  if (format === 'hsl') {
    ({ h, s, l } = color as Hsl)
  } else {
    ({ h, s, l} = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['hsl']
    }).hsl)
  }

  // Calculate angles for the triadic colors
  const angle1 = (h + 120) % 360
  const angle2 = (h + 240) % 360

  // Convert the angles back to origin format
  let newColor1: ColorFormats = {
    hsl: { h: angle1, s, l }
  }

  let newColor2: ColorFormats = {
    hsl: { h: angle2, s, l }
  }

  if (format !== 'hsl') {
    newColor1 = colorFormatConverter(newColor1.hsl, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })

    newColor2 = colorFormatConverter(newColor2.hsl, {
      currentFormat: 'hsl',
      targetFormat: [format]
    })
  }

  return [color, newColor1[format], newColor2[format]]
}

export { makeTriadicPalette }