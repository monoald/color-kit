import palette, { makeAnalogousPalette, makeComplementaryPalette, makeMonochromaticPalette, makeRandomPalette, makeSplitComplementaryPalette, makeSquarePalette, makeTetradicPalette, makeTriadicPalette } from ".";
import { getRandomColor } from "../random";
import { BaseColor, ColorFormats, Palette } from "../types";

interface Options {
  randomColor?: boolean
  color?: BaseColor
  format: string
  paletteType: Palette
  quantity?: number,
  variation?: number
}

/**
 * Creates a color palette.
 * 
 * @param {Options} options - The options to create a color palette.
 * @param {boolean} options.randomColor - Whether to create a random color to use as the base color.
 * @param {BaseColor} options.color - The base color to create the palette.
 * @param {string} options.format - The color format to return the palette.
 * @param {Palette} options.paletteType - The type of color palette to create.
 * @param {number} options.quantity - The number of colors to be part of the palette.
 * @param {number} options.variation - The mathematical variation of shade in a color.
 * @returns {Array<BaseColor>} An array of colors that make a color palette.
 * @throws {Error} If parameter color sent and does not follow its format requirements.
*/
function makeColorPalette(options: Options): Array<BaseColor> {
  const format = options.format as keyof ColorFormats
  const variation = options.variation ? options.variation : 0
  let color: BaseColor
  let colorPalette: Array<BaseColor>

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
        colorPalette = makeAnalogousPalette(color, options.quantity, variation)
      } else {
        colorPalette = makeAnalogousPalette(color, options.quantity)
      }
      break;
    case 'complementary':
      colorPalette = makeComplementaryPalette(color)
      break;
    case 'monochromatic':
      if (variation !== 0) {
        colorPalette = makeMonochromaticPalette(color, options.quantity, variation)
      } else {
        colorPalette = makeMonochromaticPalette(color, options.quantity)
      }
      break;
    case 'split-complementary':
      if (variation !== 0) {
        colorPalette = makeSplitComplementaryPalette(color, variation)
      } else {
        colorPalette = makeSplitComplementaryPalette(color,)
      }
      break;
    case 'square':
      colorPalette = makeSquarePalette(color)
      break;
      case 'tetradic':
      colorPalette = makeTetradicPalette(color)
      break;
    case 'triadic':
      colorPalette = makeTriadicPalette(color)
      break;
    case 'random':
      colorPalette = makeRandomPalette(options.format, options.quantity)
      break;
    default:
      throw new Error('Invalid palette type.')
  }

  return colorPalette
}

export { makeColorPalette }