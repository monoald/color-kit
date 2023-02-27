import { Cmyk, Hsl, Hsv, Rgb, ColorFormats } from '../types'
import converter from './index'

type CurrentValue = Cmyk | string | Hsl | Hsv | Rgb

interface Options {
  currentFormat: string
  targetFormat?: Array<string>
  AllFormats?: boolean
}

function colorFormatConverter(
  value: CurrentValue,
  options: Options
): ColorFormats {
  const currentFormat = options.currentFormat
  const targetFormats = options.AllFormats ? ['cmyk', 'hex', 'hsl', 'hsv', 'lab', 'rgb', 'xyz'] : options.targetFormat

  const finalValue: ColorFormats = {}

  targetFormats.map((format) => {
    // Exclude current format
    if (format === currentFormat) return

    // CMYK to - convertions
    if (
      currentFormat === 'cmyk' &&
      format ===  'hex'
    ) {
      finalValue['hex'] = converter.cmykToHex(value as Cmyk)
    } else if (
      currentFormat === 'cmyk' &&
      format === 'hsl'
    ) {
      finalValue['hsl'] = converter.cmykToHsl(value as Cmyk)
    } else if (
      currentFormat === 'cmyk' &&
      format === 'hsv'
    ) {
      finalValue['hsv'] = converter.cmykToHsv(value as Cmyk)
    } else if (
      currentFormat === 'cmyk' &&
      format === 'lab'
    ) {
      finalValue['lab'] = converter.cmykToLab(value as Cmyk)
    } else if (
      currentFormat === 'cmyk' &&
      format === 'rgb'
    ) {
      finalValue['rgb'] = converter.cmykToRgb(value as Cmyk)
    } else if (
      currentFormat === 'cmyk' &&
      format === 'xyz'
    ) {
      finalValue['xyz'] = converter.cmykToXyz(value as Cmyk)
    }
    // Hexadecimal to - convertions
    else if (
      currentFormat === 'hex' &&
      format === 'cmyk'
    ) {
      finalValue['cmyk'] = converter.hexToCmyk(value as string)
    } else if (
      currentFormat === 'hex' &&
      format === 'hsl'
    ) {
      finalValue['hsl'] = converter.hexToHsl(value as string)
    } else if (
      currentFormat === 'hex' &&
      format === 'hsv'
    ) {
      finalValue['hsv'] = converter.hexToHsv(value as string)
    } else if (
      currentFormat === 'hex' &&
      format === 'lab'
    ) {
      finalValue['lab'] = converter.hexToLab(value as string)
    } else if (
      currentFormat === 'hex' &&
      format === 'rgb'
    ) {
      finalValue['rgb'] = converter.hexToRgb(value as string)
    } else if (
      currentFormat === 'hex' &&
      format === 'xyz'
    ) {
      finalValue['xyz'] = converter.hexToXyz(value as string)
    }
    // HSL to - convertions
    else if (
      currentFormat === 'hsl' &&
      format === 'cmyk'
    ) {
      finalValue['cmyk'] = converter.hslToCmyk(value as Hsl)
    } else if (
      currentFormat === 'hsl' &&
      format === 'hex'
    ) {
      finalValue['hex'] = converter.hslToHex(value as Hsl)
    } else if (
      currentFormat === 'hsl' &&
      format === 'hsv'
    ) {
      finalValue['hsv'] = converter.hslToHsv(value as Hsl)
    } else if (
      currentFormat === 'hsl' &&
      format === 'lab'
    ) {
      finalValue['lab'] = converter.hslToLab(value as Hsl)
    } else if (
      currentFormat === 'hsl' &&
      format === 'rgb'
    ) {
      finalValue['rgb'] = converter.hslToRgb(value as Hsl)
    } else if (
      currentFormat === 'hsl' &&
      format === 'xyz'
    ) {
      finalValue['xyz'] = converter.hslToXyz(value as Hsl)
    }
    // HSV to - convertions
    else if (
      currentFormat === 'hsv' &&
      format === 'cmyk'
    ) {
      finalValue['cmyk'] = converter.hsvToCmyk(value as Hsv)
    } else if (
      currentFormat === 'hsv' &&
      format === 'hex'
    ) {
      finalValue['hex'] = converter.hsvToHex(value as Hsv)
    } else if (
      currentFormat === 'hsv' &&
      format === 'hsl'
    ) {
      finalValue['hsl'] = converter.hsvToHsl(value as Hsv)
    } else if (
      currentFormat === 'hsv' &&
      format === 'lab'
    ) {
      finalValue['lab'] = converter.hsvToLab(value as Hsv)
    } else if (
      currentFormat === 'hsv' &&
      format === 'rgb'
    ) {
      finalValue['rgb'] = converter.hsvToRgb(value as Hsv)
    } else if (
      currentFormat === 'hsv' &&
      format === 'xyz'
    ) {
      finalValue['xyz'] = converter.hsvToXyz(value as Hsv)
    }
    // RGB to - convertions
    else if (
      currentFormat === 'rgb' &&
      format === 'cmyk'
    ) {
      finalValue['cmyk'] = converter.rgbToCmyk(value as Rgb)
    } else if (
      currentFormat === 'rgb' &&
      format === 'hex'
    ) {
      finalValue['hex'] = converter.rgbToHex(value as Rgb)
    } else if (
      currentFormat === 'rgb' &&
      format === 'hsl'
    ) {
      finalValue['hsl'] = converter.rgbToHsl(value as Rgb)
    } else if (
      currentFormat === 'rgb' &&
      format === 'hsv'
    ) {
      finalValue['hsv'] = converter.rgbToHsv(value as Rgb)
    } else if (
      currentFormat === 'rgb' &&
      format === 'lab'
    ) {
      finalValue['lab'] = converter.rgbToLab(value as Rgb)
    } else if (
      currentFormat === 'rgb' &&
      format === 'xyz'
    ) {
      finalValue['xyz'] = converter.rgbToXyz(value as Rgb)
    } else {
      throw new Error('Format not valid')
    }
  })


  return finalValue
}

export { colorFormatConverter }