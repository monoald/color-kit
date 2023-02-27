import { Cmyk, Hsl, Hsv, Lab, Rgb, Xyz } from '../types'
import converter from './index'

type CurrentValue = Cmyk | string | Hsl | Hsv | Rgb
type FinalValue = Cmyk | string | Hsl | Hsv | Lab | Rgb | Xyz

interface Options {
  currentFormat: string
  targetFormat?: Array<string>
  AllFormats?: boolean
}

function colorFormatConverter(
  // currentFormat: string, 
  // value: CurrentValue, 
  // targetFormat: string
  value: CurrentValue,
  options: Options
): Array<FinalValue> {
  const currentFormat = options.currentFormat
  const targetFormats = options.AllFormats ? ['cmyk', 'hex', 'hsl', 'hsv', 'lab', 'rgb', 'xyz'] : options.targetFormat

  const finalValue: Array<FinalValue> = []

  targetFormats.map((format) => {
    // Exclude current format
    if (format === currentFormat) return

    // CMYK to - convertions
    if (
      currentFormat === 'cmyk' &&
      format ===  'hex'
    ) {
      finalValue.push(converter.cmykToHex(value as Cmyk))
    } else if (
      currentFormat === 'cmyk' &&
      format === 'hsl'
    ) {
      finalValue.push(converter.cmykToHsl(value as Cmyk))
    } else if (
      currentFormat === 'cmyk' &&
      format === 'hsv'
    ) {
      finalValue.push(converter.cmykToHsv(value as Cmyk))
    } else if (
      currentFormat === 'cmyk' &&
      format === 'lab'
    ) {
      finalValue.push(converter.cmykToLab(value as Cmyk))
    } else if (
      currentFormat === 'cmyk' &&
      format === 'rgb'
    ) {
      finalValue.push(converter.cmykToRgb(value as Cmyk))
    } else if (
      currentFormat === 'cmyk' &&
      format === 'xyz'
    ) {
      finalValue.push(converter.cmykToXyz(value as Cmyk))
    }
    // Hexadecimal to - convertions
    else if (
      currentFormat === 'hex' &&
      format === 'cmyk'
    ) {
      finalValue.push(converter.hexToCmyk(value as string))
    } else if (
      currentFormat === 'hex' &&
      format === 'hsl'
    ) {
      finalValue.push(converter.hexToHsl(value as string))
    } else if (
      currentFormat === 'hex' &&
      format === 'hsv'
    ) {
      finalValue.push(converter.hexToHsv(value as string))
    } else if (
      currentFormat === 'hex' &&
      format === 'lab'
    ) {
      finalValue.push(converter.hexToLab(value as string))
    } else if (
      currentFormat === 'hex' &&
      format === 'rgb'
    ) {
      finalValue.push(converter.hexToRgb(value as string))
    } else if (
      currentFormat === 'hex' &&
      format === 'xyz'
    ) {
      finalValue.push(converter.hexToXyz(value as string))
    }
    // HSL to - convertions
    else if (
      currentFormat === 'hsl' &&
      format === 'cmyk'
    ) {
      finalValue.push(converter.hslToCmyk(value as Hsl))
    } else if (
      currentFormat === 'hsl' &&
      format === 'hex'
    ) {
      finalValue.push(converter.hslToHex(value as Hsl))
    } else if (
      currentFormat === 'hsl' &&
      format === 'hsv'
    ) {
      finalValue.push(converter.hslToHsv(value as Hsl))
    } else if (
      currentFormat === 'hsl' &&
      format === 'lab'
    ) {
      finalValue.push(converter.hslToLab(value as Hsl))
    } else if (
      currentFormat === 'hsl' &&
      format === 'rgb'
    ) {
      finalValue.push(converter.hslToRgb(value as Hsl))
    } else if (
      currentFormat === 'hsl' &&
      format === 'xyz'
    ) {
      finalValue.push(converter.hslToXyz(value as Hsl))
    }
    // HSV to - convertions
    else if (
      currentFormat === 'hsv' &&
      format === 'cmyk'
    ) {
      finalValue.push(converter.hsvToCmyk(value as Hsv))
    } else if (
      currentFormat === 'hsv' &&
      format === 'hex'
    ) {
      finalValue.push(converter.hsvToHex(value as Hsv))
    } else if (
      currentFormat === 'hsv' &&
      format === 'hsl'
    ) {
      finalValue.push(converter.hsvToHsl(value as Hsv))
    } else if (
      currentFormat === 'hsv' &&
      format === 'lab'
    ) {
      finalValue.push(converter.hsvToLab(value as Hsv))
    } else if (
      currentFormat === 'hsv' &&
      format === 'rgb'
    ) {
      finalValue.push(converter.hsvToRgb(value as Hsv))
    } else if (
      currentFormat === 'hsv' &&
      format === 'xyz'
    ) {
      finalValue.push(converter.hsvToXyz(value as Hsv))
    }
    // RGB to - convertions
    else if (
      currentFormat === 'rgb' &&
      format === 'cmyk'
    ) {
      finalValue.push(converter.rgbToCmyk(value as Rgb))
    } else if (
      currentFormat === 'rgb' &&
      format === 'hex'
    ) {
      finalValue.push(converter.rgbToHex(value as Rgb))
    } else if (
      currentFormat === 'rgb' &&
      format === 'hsl'
    ) {
      finalValue.push(converter.rgbToHsl(value as Rgb))
    } else if (
      currentFormat === 'rgb' &&
      format === 'hsv'
    ) {
      finalValue.push(converter.rgbToHsv(value as Rgb))
    } else if (
      currentFormat === 'rgb' &&
      format === 'lab'
    ) {
      finalValue.push(converter.rgbToLab(value as Rgb))
    } else if (
      currentFormat === 'rgb' &&
      format === 'xyz'
    ) {
      finalValue.push(converter.rgbToXyz(value as Rgb))
    } else {
      throw new Error('Format not valid')
    }
  })


  return finalValue
}

export { colorFormatConverter }