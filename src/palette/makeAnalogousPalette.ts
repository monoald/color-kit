import { BaseColor, ColorFormats, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

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