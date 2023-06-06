import { AnyFormat, BaseColor } from '../types'
import colorBlind from '.'

interface Options {
  color?: BaseColor
  colorBlindness?: string
}

function toColorBlind(options: Options): AnyFormat {
  let color: AnyFormat = '#000000'

  if (options.color === undefined || options.color === null) {
    return color
  }

  switch (options.colorBlindness) {
    case 'achromatomaly':
      color = colorBlind.toAchromatomaly(options.color)
      break
    case 'achromatopsia':
      color = colorBlind.toAchromatopsia(options.color)
      break
    case 'deuteranomaly':
        color = colorBlind.toDeuteranomaly(options.color)
      break
    case 'deuteranopia':
      color = colorBlind.toDeuteranopia(options.color)
      break
    case 'protanomaly':
      color = colorBlind.toProtanomaly(options.color)
      break
    case 'protanopia':
      color = colorBlind.toProtanopia(options.color)
      break
    case 'tritanomaly':
      color = colorBlind.toTritanomaly(options.color)
      break
    case 'tritanopia':
      color = colorBlind.toTritanopia(options.color)
      break
    default:
      throw new Error('Invalid color blindness.')
  }

  return color
}

export { toColorBlind }