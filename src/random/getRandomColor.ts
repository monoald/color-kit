import { ColorFormats } from "../types";
import { getRandomRgb } from "./getRandomRgb";
import converter from "../convert";

interface Options {
  formats?: Array<string>
  allFormats?: boolean
}

function getRandomColor(options: Options): ColorFormats {
  const formats = options.allFormats ? ['cmyk', 'hex', 'hsl', 'hsv', 'lab', 'rgb', 'xyz'] : options.formats

  // Generate random RGB color
  const rgb = getRandomRgb()

  const colors: ColorFormats = {}

  // Get its equivalent in required format(s)
  formats.forEach((format) => {
    switch (format) {
      case 'cmyk':
        colors.cmyk = converter.rgbToCmyk(rgb)
        break;
      case 'hex':
        colors.hex = converter.rgbToHex(rgb)
        break;
      case 'hsl':
        colors.hsl = converter.rgbToHsl(rgb)
        break;
      case 'hsv':
        colors.hsv = converter.rgbToHsv(rgb)
        break;
      case 'lab':
        colors.lab = converter.rgbToLab(rgb)
        break;
      case 'xyz':
        colors.xyz = converter.rgbToXyz(rgb)
        break;
      default:
        colors.rgb = rgb
        break;
    }
  })

  return colors
}

export { getRandomColor }