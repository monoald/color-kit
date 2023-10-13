import { Color, Palette, Format } from "../types"
import { randomNumber } from "../utils/randomNumber"
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
function makeRandomPalette(options: Options): Array<Color> {
  let color = options.color ? options.color : {
    h: Math.floor(Math.random() * 361),
    s: Math.floor(Math.random() * (100 - 20 + 1) + 20),
    l: Math.floor(Math.random() * (100 - 12 + 1) + 12)
  }
  const targetFormat = options.format ? options.format : 'hsl'
  const quantity = options.quantity ? options.quantity : 5
  const paletteTypes: Array<Palette> = ['analogous', 'complementary', 'monochromatic', 'split-complementary', 'square', 'tetradic', 'triadic']
  
  // Get first part of the palette
  const firstPaletteQuantity = Math.ceil(quantity / 2)
  const firstPaletteType: Palette = paletteTypes.splice(randomNumber(0, paletteTypes.length - 1), 1)[0]
  const firstPalette = makeColorPalette({
    color,
    format: targetFormat,
    paletteType: firstPaletteType,
    quantity: firstPaletteQuantity,
  })

  // Get second part of the palette
  const secondPaletteQuantity = Math.floor(quantity / 2)
  const secondPaletteType: Palette = paletteTypes.splice(randomNumber(0, paletteTypes.length - 1), 1)[0]
  const secondPalette = makeColorPalette({
    color: firstPalette[firstPalette.length - 1],
    format: targetFormat,
    paletteType: secondPaletteType,
    quantity: secondPaletteQuantity
  })

  firstPalette.splice(firstPalette.length - 1, 1)
  let palette = [...firstPalette, ...secondPalette]

  if (palette.length < quantity) {
    const thirdPaletteType = paletteTypes.splice(randomNumber(0, paletteTypes.length - 1), 1)[0]
    const thirdPalette = makeColorPalette({
      color: secondPalette[secondPalette.length - 1],
      format: targetFormat,
      paletteType: thirdPaletteType,
      quantity: 10,
    })

    palette = [...palette, ...thirdPalette]
  }

  palette.splice(quantity, 100)

  return palette
}

export { makeRandomPalette }