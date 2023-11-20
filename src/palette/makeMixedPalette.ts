import { Color, Palette, Format, ColorFormats } from "../types"
import { identifyFormat } from "../utils/identifyFormat"
import { makeColorPalette } from "./makeColorPalette"

interface Options {
  color?: Color
  quantity?: number
  format?: Format
}

/**
 * Creates a mix color palette with different color palette types.
 *
 * @param {Options} options - Options to define the palette.
 * @param {Color} options.color - Base color to create the color palette, random if not sent.
 * @param {number} [options.quantity = 5] - Number of colors to be part of the palette, minimum value 5.
 * @param {Format} [options.format = 'hsl'] - Palette's color format.
 *
 * @returns {Array<Color>} An array of colors that make a color palette.
 * @throws {Error} If a color parameter does not follow its format requirements.
*/

const paletteTypes: Array<Palette> = ['analogous', 'complementary', 'monochromatic', 'split-complementary', 'shades']

function makeMixedPalette(options?: Options): Array<Color> {
  // Basic config
  let color = options && options.color ? options.color : {
    h: Math.floor(Math.random() * 361),
    s: Math.floor(Math.random() * 96),
    l: Math.floor(Math.random() * (95 - 5 + 1) + 5)
  }
  const targetFormat = options && options.format ? options.format : identifyFormat(color) as keyof ColorFormats
  const quantity = options && options.quantity ? options.quantity : 5
  const palette: Array<Color> = []

  let currentQuantity = quantity

  while (palette.length < quantity) {
    const paletteType = paletteTypes[Math.floor(Math.random() * paletteTypes.length)]
    const newQuantity = paletteType === 'split-complementary' ? 3 : Math.floor(Math.random() * ((quantity - palette.length) - 2 + 1) + 2)

    palette.push(...makeColorPalette({
      color: palette.length === 0 ? color : palette.splice(Math.floor(Math.random() * palette.length), 1)[0],
      paletteType,
      quantity: newQuantity,
      format: targetFormat
    }))
  }

  if (palette.length > quantity) {
    palette.splice(quantity, palette.length - quantity)
  }

  return palette
}


export { makeMixedPalette }