import { AnyFormat } from "../types";

function identifyFormat(color: AnyFormat): string {
  let colorFormat: string

  if (typeof(color) === 'string') {
    colorFormat = 'hex'
  } else {
    const format = Object.keys(color)

    if (
      format.length === 4 &&
      format.includes('c') &&
      format.includes('m') &&
      format.includes('y') &&
      format.includes('k')
    ) {
      colorFormat = 'cmyk'
    } else if (
      format.length === 3 &&
      format.includes('h') &&
      format.includes('s') &&
      format.includes('l')
    ) {
      colorFormat = 'hsl'
    } else if (
      format.length === 3 &&
      format.includes('h') &&
      format.includes('s') &&
      format.includes('v')
    ) {
      colorFormat = 'hsv'
    } else if (
      format.length === 3 &&
      format.includes('l') &&
      format.includes('a') &&
      format.includes('b')
    ) {
      colorFormat = 'lab'
    } else if (
      format.length === 3 &&
      format.includes('r') &&
      format.includes('g') &&
      format.includes('b')
    ) {
      colorFormat = 'rgb'
    } else if (
      format.length === 3 &&
      format.includes('x') &&
      format.includes('y') &&
      format.includes('x')
    ) {
      colorFormat = 'xyz'
    } else {
      throw new Error('Invalid color format.')
    }
  }
  return colorFormat
}

export { identifyFormat }