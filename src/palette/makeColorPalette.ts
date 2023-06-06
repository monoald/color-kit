import palette from ".";
import { getRandomColor } from "../random";
import { AnyFormat, BaseColor, ColorFormats } from "../types";

export type PaletteType = 'analogous' | 'complementary' | 'monochromatic' | 'split-complementary' | 'square' | 'tetradic' | 'triadic'

interface Options {
  randomColor?: boolean
  color?: BaseColor
  format: string
  paletteType?: PaletteType
  quantity?: number,
  variation?: number
}

function makeColorPalette(options: Options): Array<AnyFormat> {
  const format = options.format as keyof ColorFormats
  const variation = options.variation ? options.variation : 0
  let color: BaseColor
  let colorPalette: Array<AnyFormat>

  // Get base color
  if (options.randomColor) {
    color = getRandomColor({
      formats: [options.format]
    })[format] as BaseColor
  } else if (options.color) {
    color = options.color
  }

  // Make color palette
  switch (options.paletteType) {
    case 'analogous':
      if (variation !== 0) {
        colorPalette = palette.makeAnalogousPalette(color, options.quantity, variation)
      } else {
        colorPalette = palette.makeAnalogousPalette(color, options.quantity)
      }
      break;
    case 'complementary':
      colorPalette = palette.makeComplementaryPalette(color)
      break;
    case 'monochromatic':
      if (variation !== 0) {
        colorPalette = palette.makeMonochromaticPalette(color, options.quantity, variation)
      } else {
        colorPalette = palette.makeMonochromaticPalette(color, options.quantity)
      }
      break;
    case 'split-complementary':
      colorPalette = palette.makeSplitComplementaryPalette(color, options.quantity)
      break;
    case 'square':
      colorPalette = palette.makeSquarePalette(color)
      break;
      case 'tetradic':
      colorPalette = palette.makeTetradicPalette(color, options.quantity)
      break;
    case 'triadic':
      colorPalette = palette.makeTriadicPalette(color)
      break;
    default:
      throw new Error('Invalid palette type.')
  }

  return colorPalette
}

export { makeColorPalette }