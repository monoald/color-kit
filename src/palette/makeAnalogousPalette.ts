import { AnyFormat, BaseColor, ColorFormats, Hsl } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

function makeAnalogousPalette(color: BaseColor, quantity = 3, variation = 30): Array<AnyFormat> {
  const format = identifyFormat(color) as keyof ColorFormats
  const palette: Array<AnyFormat> = []
  quantity -= 1
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

  // Calculate total range of hues to cover
  const range = (quantity - 1) * variation

  // Calculate starting hue
  const startHue = (h - range / 1.5 + 360) % 360

  // Generate new colors
  for (let i = 0; i < quantity; i++) {
    let analogousHue = (startHue + i * variation) % 360

    // Skip base color
    if (analogousHue >= h) {
      analogousHue += 30
    }

    let newColor: ColorFormats = {
      hsl: {h: analogousHue, s, l}
    }

    if (format !== 'hsl') {
      newColor = colorFormatConverter(newColor.hsl, {
        currentFormat: 'hsl',
        targetFormat: [format]
      })
    }
    palette.push(newColor[format])
  }

  // Add base color to palette
  palette.splice(Math.ceil(palette.length / 2), 0, color)

  return palette
}

export { makeAnalogousPalette }