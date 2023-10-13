import { Cmyk, Hsl, Hsv, Rgb, ColorFormats, Color } from '../types'
import { identifyFormat } from '../utils/identifyFormat'
import converter from './index'

interface Options {
  currentFormat?: string
  targetFormat?: Array<string>
  allFormats?: boolean
  identifyFormat?: boolean
}

/**
 * Generates a random color.
 * 
 * @param {Color} color - A color in any format of the Color formats.
 * @param {Options} options - The options to convert a color to other format.
 * @param {Array<string>} options.currentFormat - The current formats of the color.
 * @param {Array<string>} options.targetFormats - The formats to convert the color.
 * @param {boolean} options.allFormats - Whether to convert a color in all available formats.
 * @param {Array<string>} options.identifyFormat - If no currentFormat is sent, the format could be identified.
 * @returns {ColorFormats} An object with a color in different formats.
 * @throws {Error} If the parameter color does not follow its format requirements.
*/
function colorFormatConverter(
  color: Color,
  options: Options
): ColorFormats {
  const currentFormat = options.identifyFormat ? identifyFormat(color) : options.currentFormat
  const targetFormats = options.allFormats ? ['cmyk', 'hex', 'hsl', 'hsv', 'lab', 'rgb', 'xyz'] : options.targetFormat

  const finalValue: ColorFormats = {}

  targetFormats?.map((format) => {
    // Exclude current format
    if (format === currentFormat) return

    // CMYK to - convertions
    if (
      currentFormat === 'cmyk' &&
      format ===  'hex'
    ) {
      finalValue['hex'] = converter.cmykToHex(color as Cmyk)
    } else if (
      currentFormat === 'cmyk' &&
      format === 'hsl'
    ) {
      finalValue['hsl'] = converter.cmykToHsl(color as Cmyk)
    } else if (
      currentFormat === 'cmyk' &&
      format === 'hsv'
    ) {
      finalValue['hsv'] = converter.cmykToHsv(color as Cmyk)
    } else if (
      currentFormat === 'cmyk' &&
      format === 'lab'
    ) {
      finalValue['lab'] = converter.cmykToLab(color as Cmyk)
    } else if (
      currentFormat === 'cmyk' &&
      format === 'rgb'
    ) {
      finalValue['rgb'] = converter.cmykToRgb(color as Cmyk)
    } else if (
      currentFormat === 'cmyk' &&
      format === 'xyz'
    ) {
      finalValue['xyz'] = converter.cmykToXyz(color as Cmyk)
    }
    // Hexadecimal to - convertions
    else if (
      currentFormat === 'hex' &&
      format === 'cmyk'
    ) {
      finalValue['cmyk'] = converter.hexToCmyk(color as string)
    } else if (
      currentFormat === 'hex' &&
      format === 'hsl'
    ) {
      finalValue['hsl'] = converter.hexToHsl(color as string)
    } else if (
      currentFormat === 'hex' &&
      format === 'hsv'
    ) {
      finalValue['hsv'] = converter.hexToHsv(color as string)
    } else if (
      currentFormat === 'hex' &&
      format === 'lab'
    ) {
      finalValue['lab'] = converter.hexToLab(color as string)
    } else if (
      currentFormat === 'hex' &&
      format === 'rgb'
    ) {
      finalValue['rgb'] = converter.hexToRgb(color as string)
    } else if (
      currentFormat === 'hex' &&
      format === 'xyz'
    ) {
      finalValue['xyz'] = converter.hexToXyz(color as string)
    }
    // HSL to - convertions
    else if (
      currentFormat === 'hsl' &&
      format === 'cmyk'
    ) {
      finalValue['cmyk'] = converter.hslToCmyk(color as Hsl)
    } else if (
      currentFormat === 'hsl' &&
      format === 'hex'
    ) {
      finalValue['hex'] = converter.hslToHex(color as Hsl)
    } else if (
      currentFormat === 'hsl' &&
      format === 'hsv'
    ) {
      finalValue['hsv'] = converter.hslToHsv(color as Hsl)
    } else if (
      currentFormat === 'hsl' &&
      format === 'lab'
    ) {
      finalValue['lab'] = converter.hslToLab(color as Hsl)
    } else if (
      currentFormat === 'hsl' &&
      format === 'rgb'
    ) {
      finalValue['rgb'] = converter.hslToRgb(color as Hsl)
    } else if (
      currentFormat === 'hsl' &&
      format === 'xyz'
    ) {
      finalValue['xyz'] = converter.hslToXyz(color as Hsl)
    }
    // HSV to - convertions
    else if (
      currentFormat === 'hsv' &&
      format === 'cmyk'
    ) {
      finalValue['cmyk'] = converter.hsvToCmyk(color as Hsv)
    } else if (
      currentFormat === 'hsv' &&
      format === 'hex'
    ) {
      finalValue['hex'] = converter.hsvToHex(color as Hsv)
    } else if (
      currentFormat === 'hsv' &&
      format === 'hsl'
    ) {
      finalValue['hsl'] = converter.hsvToHsl(color as Hsv)
    } else if (
      currentFormat === 'hsv' &&
      format === 'lab'
    ) {
      finalValue['lab'] = converter.hsvToLab(color as Hsv)
    } else if (
      currentFormat === 'hsv' &&
      format === 'rgb'
    ) {
      finalValue['rgb'] = converter.hsvToRgb(color as Hsv)
    } else if (
      currentFormat === 'hsv' &&
      format === 'xyz'
    ) {
      finalValue['xyz'] = converter.hsvToXyz(color as Hsv)
    }
    // RGB to - convertions
    else if (
      currentFormat === 'rgb' &&
      format === 'cmyk'
    ) {
      finalValue['cmyk'] = converter.rgbToCmyk(color as Rgb)
    } else if (
      currentFormat === 'rgb' &&
      format === 'hex'
    ) {
      finalValue['hex'] = converter.rgbToHex(color as Rgb)
    } else if (
      currentFormat === 'rgb' &&
      format === 'hsl'
    ) {
      finalValue['hsl'] = converter.rgbToHsl(color as Rgb)
    } else if (
      currentFormat === 'rgb' &&
      format === 'hsv'
    ) {
      finalValue['hsv'] = converter.rgbToHsv(color as Rgb)
    } else if (
      currentFormat === 'rgb' &&
      format === 'lab'
    ) {
      finalValue['lab'] = converter.rgbToLab(color as Rgb)
    } else if (
      currentFormat === 'rgb' &&
      format === 'xyz'
    ) {
      finalValue['xyz'] = converter.rgbToXyz(color as Rgb)
    } else {
      throw new Error('Format not valid')
    }
  })

  if (options.allFormats) {
    if (currentFormat === 'cmyk') finalValue['cmyk'] = color as Cmyk
    else if (currentFormat === 'hex') finalValue['hex'] = color as string
    else if (currentFormat === 'hsl') finalValue['hsl'] = color as Hsl
    else if (currentFormat === 'hsv') finalValue['hsv'] = color as Hsv
    else if (currentFormat === 'rgb') finalValue['rgb'] = color as Rgb
  }

  return finalValue
}

export { colorFormatConverter }