import { getRandomColor } from "../random"
import { BaseColor, Palette, ColorFormats } from "../types"
import { randomNumber } from "../utils/randomNumber"
import { makeColorPalette } from "./makeColorPalette"
/**
 * Creates a mix color palette with different color palette types.
 * 
 * @param {number} quantity - The number of colors to get on palette, by default 5.
 * @returns {Array<BaseColor>} An array of colors that make a color palette.
 * @throws {Error} If parameter color sent and does not follow its format requirements.
*/
function makeRandomPalette(format: string, quantity = 5,): Array<BaseColor> {
  const paletteTypes: Array<Palette> = ['analogous', 'complementary', 'monochromatic', 'split-complementary', 'square', 'tetradic', 'triadic']
  const color = getRandomColor({
    formats: [format]
  })[format as keyof ColorFormats] as BaseColor
  
  // Get first part of the palette
  const firstPaletteQuantity = Math.ceil(quantity / 2)
  const firstPaletteType: Palette = paletteTypes.splice(randomNumber(0, paletteTypes.length - 1), 1)[0]
  const firstPalette = makeColorPalette({
    color: color,
    format: format,
    paletteType: firstPaletteType,
    quantity: firstPaletteQuantity
  })

  // Get second part of the palette
  const secondPaletteQuantity = quantity - firstPalette.length + 1
  const secondPaletteType: Palette = paletteTypes.splice(randomNumber(0, paletteTypes.length - 1), 1)[0]
  const secondPalette = makeColorPalette({
    color: firstPalette[firstPalette.length - 1],
    format: format,
    paletteType: secondPaletteType,
    quantity: secondPaletteQuantity
  })

  firstPalette.splice(firstPalette.length - 1, 1)
  let palette = [...firstPalette, ...secondPalette]

  if (palette.length < quantity) {
    const thirdPaletteType = paletteTypes.splice(randomNumber(0, paletteTypes.length - 1), 1)[0]
    const thirdPalette = makeColorPalette({
      color: secondPalette[secondPalette.length - 1],
      format: format,
      paletteType: thirdPaletteType,
      quantity: 10,
    })

    palette = [...palette, ...thirdPalette]
  }

  palette.splice(quantity, 100)

  return palette
}

export { makeRandomPalette }