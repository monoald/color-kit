import { BaseColor, ColorFormats, Rgb } from '../types'
import { colorFormatConverter } from '../convert'
import { identifyFormat } from '../utils/identifyFormat'

function makeMonochromaticPalette(color: BaseColor, quantity = 3, variation = 20): Array<BaseColor> {
  const format = identifyFormat(color) as keyof ColorFormats
  const palette: Array<BaseColor> = [color]
  const iterations = (quantity - 1) / 2
  let r: number
  let g: number
  let b: number
  let darker: BaseColor
  let brighter: BaseColor

  // Get RGB value to manipulate color
  if (format === 'rgb') {
    ({ r, g, b } = color as Rgb)
  } else {
    ({ r, g, b} = colorFormatConverter(color, {
      currentFormat: format, targetFormat: ['rgb']
    }).rgb as Rgb)
  }

  // Generate new colors
  for (let i = 0; i < iterations; i++) {
    const darkerRgb: Rgb = {
      r: Math.max(r - variation, 0),
      g: Math.max(g - variation, 0),
      b: Math.max(b - variation, 0)
    }

    if (format !== 'rgb') {
      darker = colorFormatConverter(darkerRgb, {
        currentFormat: 'rgb',
        targetFormat: [format]
      })[format] as BaseColor
    }

    palette.unshift(darker)

    // Skip extra color if requested colors are even
    if (i + 0.5 === iterations) continue

    const brighterRgb: Rgb = {
      r: Math.min(r + variation, 255),
      g: Math.min(g + variation, 255),
      b: Math.min(b + variation, 255)
    }

    if (format !== 'rgb') {
      brighter = colorFormatConverter(brighterRgb, {
        currentFormat: 'rgb',
        targetFormat: [format]
      })[format] as BaseColor
    }

    palette.push(brighter)

    // Change shadow variation
    variation += 20
  }

  return palette
}

export { makeMonochromaticPalette }