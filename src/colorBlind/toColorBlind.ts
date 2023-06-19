import { BaseColor, ColorBlindness } from '../types'
import colorBlind from '.'

/**
 * Simulate Tritanopia color blindness.
 * 
 * @param {BaseColor} color - The color to be simulated.
 * @param {ColorBlindness} colorBlindness - The color blindness type to simulate.
 * @returns {BaseColor} A color blindness simulation of the input color.
 * @throws {Error} If the parameter color does not follow its format requirements.
*/
function toColorBlind(color: BaseColor, colorBlindness: ColorBlindness): BaseColor {

  switch (colorBlindness) {
    case 'achromatomaly':
      color = colorBlind.toAchromatomaly(color)
      break
    case 'achromatopsia':
      color = colorBlind.toAchromatopsia(color)
      break
    case 'deuteranomaly':
        color = colorBlind.toDeuteranomaly(color)
      break
    case 'deuteranopia':
      color = colorBlind.toDeuteranopia(color)
      break
    case 'protanomaly':
      color = colorBlind.toProtanomaly(color)
      break
    case 'protanopia':
      color = colorBlind.toProtanopia(color)
      break
    case 'tritanomaly':
      color = colorBlind.toTritanomaly(color)
      break
    case 'tritanopia':
      color = colorBlind.toTritanopia(color)
      break
    default:
      throw new Error('Invalid color blindness.')
  }

  return color
}

export { toColorBlind }