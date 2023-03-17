import { AnyFormat, BaseColor, ColorFormats, Rgb } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

function makeMonochromaticPalette(color: BaseColor, quantity = 3, variation = 20): Array<AnyFormat> {
  const format = identifyFormat(color) as keyof ColorFormats
  const palette: Array<AnyFormat> = [color]
  const iterations = (quantity - 1) / 2
  let r: number
  let g: number
  let b: number

  // Get RGB value to manipulate color
  if (format === 'rgb') {
    ({ r, g, b } = color as Rgb)
  } else {
    ({ r, g, b} = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['rgb']
    }).rgb)
  }

  // Generate new colors
  for (let i = 0; i < iterations; i++) {
    let darker: ColorFormats = {
      rgb: {
        r: Math.max(r - variation, 0),
        g: Math.max(g - variation, 0),
        b: Math.max(b - variation, 0)
      }
    }

    if (format !== 'rgb') {
      darker = colorFormatConverter(darker.rgb, {
        currentFormat: 'rgb',
        targetFormat: [format]
      })
    }

    palette.unshift(darker[format])

    // Skip extra color if requested colors are even
    if (i + 0.5 === iterations) continue

    let brighter: ColorFormats = {
      rgb: {
        r: Math.min(r + variation, 255),
        g: Math.min(g + variation, 255),
        b: Math.min(b + variation, 255)
      }
    }

    if (format !== 'rgb') {
      brighter = colorFormatConverter(brighter.rgb, {
        currentFormat: 'rgb',
        targetFormat: [format]
      })
    }

    palette.push(brighter[format])

    // Change shadow variation
    variation += 20
  }

  return palette
}

export { makeMonochromaticPalette }