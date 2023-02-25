import { Cmyk, Hsl, Hsv, Lab, Rgb, Xyz } from '../types'
import converter from './index'

type CurrentValue = Cmyk | string | Hsl | Hsv | Rgb
type FinalValue = Cmyk | string | Hsl | Hsv | Lab | Rgb | Xyz

function colorFormatConverter(
  currentFormat: string, 
  value: CurrentValue, 
  targetFormat: string
): FinalValue {
  let finalValue: FinalValue

  // CMYK to - convertions
  if (
    currentFormat === 'cmyk' &&
    targetFormat ===  'hex'
  ) {
    finalValue = converter.cmykToHex(value as Cmyk)
  } else if (
    currentFormat === 'cmyk' &&
    targetFormat === 'hsl'
  ) {
    finalValue = converter.cmykToHsl(value as Cmyk)
  } else if (
    currentFormat === 'cmyk' &&
    targetFormat === 'hsv'
  ) {
    finalValue = converter.cmykToHsv(value as Cmyk)
  } else if (
    currentFormat === 'cmyk' &&
    targetFormat === 'lab'
  ) {
    finalValue = converter.cmykToLab(value as Cmyk)
  } else if (
    currentFormat === 'cmyk' &&
    targetFormat === 'rgb'
  ) {
    finalValue = converter.cmykToRgb(value as Cmyk)
  } else if (
    currentFormat === 'cmyk' &&
    targetFormat === 'xyz'
  ) {
    finalValue = converter.cmykToXyz(value as Cmyk)
  }
  // Hexadecimal to - convertions
  else if (
    currentFormat === 'hex' &&
    targetFormat === 'cmyk'
  ) {
    finalValue = converter.hexToCmyk(value as string)
  } else if (
    currentFormat === 'hex' &&
    targetFormat === 'hsl'
  ) {
    finalValue = converter.hexToHsl(value as string)
  } else if (
    currentFormat === 'hex' &&
    targetFormat === 'hsv'
  ) {
    finalValue = converter.hexToHsv(value as string)
  } else if (
    currentFormat === 'hex' &&
    targetFormat === 'lab'
  ) {
    finalValue = converter.hexToLab(value as string)
  } else if (
    currentFormat === 'hex' &&
    targetFormat === 'rgb'
  ) {
    finalValue = converter.hexToRgb(value as string)
  } else if (
    currentFormat === 'hex' &&
    targetFormat === 'xyz'
  ) {
    finalValue = converter.hexToXyz(value as string)
  }
  // HSL to - convertions
  else if (
    currentFormat === 'hsl' &&
    targetFormat === 'cmyk'
  ) {
    finalValue = converter.hslToCmyk(value as Hsl)
  } else if (
    currentFormat === 'hsl' &&
    targetFormat === 'hex'
  ) {
    finalValue = converter.hslToHex(value as Hsl)
  } else if (
    currentFormat === 'hsl' &&
    targetFormat === 'hsv'
  ) {
    finalValue = converter.hslToHsv(value as Hsl)
  } else if (
    currentFormat === 'hsl' &&
    targetFormat === 'lab'
  ) {
    finalValue = converter.hslToLab(value as Hsl)
  } else if (
    currentFormat === 'hsl' &&
    targetFormat === 'rgb'
  ) {
    finalValue = converter.hslToRgb(value as Hsl)
  } else if (
    currentFormat === 'hsl' &&
    targetFormat === 'xyz'
  ) {
    finalValue = converter.hslToXyz(value as Hsl)
  }
  // HSV to - convertions
  else if (
    currentFormat === 'hsv' &&
    targetFormat === 'cmyk'
  ) {
    finalValue = converter.hsvToCmyk(value as Hsv)
  } else if (
    currentFormat === 'hsv' &&
    targetFormat === 'hex'
  ) {
    finalValue = converter.hsvToHex(value as Hsv)
  } else if (
    currentFormat === 'hsv' &&
    targetFormat === 'hsl'
  ) {
    finalValue = converter.hsvToHsl(value as Hsv)
  } else if (
    currentFormat === 'hsv' &&
    targetFormat === 'lab'
  ) {
    finalValue = converter.hsvToLab(value as Hsv)
  } else if (
    currentFormat === 'hsv' &&
    targetFormat === 'rgb'
  ) {
    finalValue = converter.hsvToRgb(value as Hsv)
  } else if (
    currentFormat === 'hsv' &&
    targetFormat === 'xyz'
  ) {
    finalValue = converter.hsvToXyz(value as Hsv)
  }
  // RGB to - convertions
  else if (
    currentFormat === 'rgb' &&
    targetFormat === 'cmyk'
  ) {
    finalValue = converter.rgbToCmyk(value as Rgb)
  } else if (
    currentFormat === 'rgb' &&
    targetFormat === 'hex'
  ) {
    finalValue = converter.rgbToHex(value as Rgb)
  } else if (
    currentFormat === 'rgb' &&
    targetFormat === 'hsl'
  ) {
    finalValue = converter.rgbToHsl(value as Rgb)
  } else if (
    currentFormat === 'rgb' &&
    targetFormat === 'hsv'
  ) {
    finalValue = converter.rgbToHsv(value as Rgb)
  } else if (
    currentFormat === 'rgb' &&
    targetFormat === 'lab'
  ) {
    finalValue = converter.rgbToLab(value as Rgb)
  } else if (
    currentFormat === 'rgb' &&
    targetFormat === 'xyz'
  ) {
    finalValue = converter.rgbToXyz(value as Rgb)
  } else {
    throw new Error('Format not valid')
  }

  return finalValue
}

export { colorFormatConverter }