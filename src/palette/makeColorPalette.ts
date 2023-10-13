import { makeAnalogousPalette, makeComplementaryPalette, makeMonochromaticPalette, makeRandomPalette, makeSplitComplementaryPalette, makeSquarePalette, makeTetradicPalette, makeTriadicPalette } from ".";
import { Color, ColorFormats, Palette } from "../types";

interface Options {
  color?: Color
  format: string
  paletteType: Palette
  quantity?: number,
  shift?: number
}

/**
 * Creates a color palette.
 * 
 * @param {Options} options - The options to create a color palette.
 * @param {Color} options.color - The base color to create the palette.
 * @param {string} options.format - The color format to return the palette.
 * @param {Palette} options.paletteType - The type of color palette to create.
 * @param {number} options.quantity - The number of colors to be part of the palette.
 * @param {number} options.shift - Mathematical distance the saturation and lightness will take from each color.
 * 
 * @returns {Array<Color>} An array of colors that make a color palette.
 * @throws {Error} If a color parameter does not follow its format requirements.
*/
const paletteTypes: Array<Palette> = ['analogous', 'complementary', 'monochromatic', 'split-complementary', 'square', 'tetradic', 'triadic']

function makeColorPalette(options: Options): Array<Color> {
  const color = options.color
  const format = options.format as keyof ColorFormats
  const paletteType = options.paletteType !== 'random' ? options.paletteType : paletteTypes[Math.floor(Math.random() * (paletteTypes.length - 1))]
  const quantity = options.quantity
  const shift = options.shift
  let colorPalette: Array<Color>

  // Make color palette
  switch (paletteType) {
    case 'analogous':
      colorPalette = makeAnalogousPalette({
        color,
        quantity,
        format,
        shift
      })
      break;
    case 'complementary':
      colorPalette = makeComplementaryPalette({
        color,
        quantity,
        format,
      })
      break;
    case 'monochromatic':
      colorPalette = makeMonochromaticPalette({
        color,
        quantity,
        format,
        shift
      })
      break;
    case 'split-complementary':
      colorPalette = makeSplitComplementaryPalette({
        color,
        quantity,
        format,
      })
      break;
    case 'square':
      colorPalette = makeSquarePalette({
        color,
        quantity,
        format,
      })
      break;
      case 'tetradic':
      colorPalette = makeTetradicPalette({
        color,
        quantity,
        format,
      })
      break;
    case 'triadic':
      colorPalette = makeTriadicPalette({
        color,
        quantity,
        format,
      })
      break;
    default:
      throw new Error('Invalid palette type.')
  }

  return colorPalette
}

export { makeColorPalette }