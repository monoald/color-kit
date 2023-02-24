import { Cmyk, Hsl, Hsv, Lab, Rgb, Xyz } from "../types"
import converter from './index'

enum CurrentFormatName {
  cmyk = 'cmyk',
  hex = 'hex',
  hsl = 'hsl',
  hsv = 'hsv',
  rgb = 'rgb'
}

enum TargetFormatName {
  cmyk = 'cmyk',
  hex = 'hex',
  hsl = 'hsl',
  hsv = 'hsv',
  lab = 'lab',
  rgb = 'rgb',
  xyz = 'xyz'
}

type CurrentValue = Cmyk | string | Hsl | Hsv | Rgb
type FinalValue = Cmyk | string | Hsl | Hsv | Lab | Rgb | Xyz

function colorFormatConverter(
  currentFormat: string, 
  value: CurrentValue, 
  targetFormat: string
): FinalValue {
  let finalValue: FinalValue

  if (
    currentFormat === CurrentFormatName.cmyk &&
    targetFormat ===  TargetFormatName.hex
  ) {
    finalValue = converter.cmykToHex(value as Cmyk)
  } else if (
    currentFormat === CurrentFormatName.cmyk &&
    targetFormat === TargetFormatName.hsl
  ) {
    finalValue = converter.cmykToHsl(value as Cmyk)
  } else if (
    currentFormat === CurrentFormatName.cmyk &&
    targetFormat === TargetFormatName.hsv
  ) {
    finalValue = converter.cmykToHsv(value as Cmyk)
  } else if (
    currentFormat === CurrentFormatName.cmyk &&
    targetFormat === TargetFormatName.lab
  ) {
    finalValue = converter.cmykToLab(value as Cmyk)
  } else if (
    currentFormat === CurrentFormatName.cmyk &&
    targetFormat === TargetFormatName.rgb
  ) {
    finalValue = converter.cmykToRgb(value as Cmyk)
  } else if (
    currentFormat === CurrentFormatName.cmyk &&
    targetFormat === TargetFormatName.xyz
  ) {
    finalValue = converter.cmykToXyz(value as Cmyk)
  }

  else if (
    currentFormat === CurrentFormatName.hex &&
    targetFormat === TargetFormatName.cmyk
  ) {
    finalValue = converter.hexToCmyk(value as string)
  } else if (
    currentFormat === CurrentFormatName.hex &&
    targetFormat === TargetFormatName.hsl
  ) {
    finalValue = converter.hexToHsl(value as string)
  } else if (
    currentFormat === CurrentFormatName.hex &&
    targetFormat === TargetFormatName.hsv
  ) {
    finalValue = converter.hexToHsv(value as string)
  } else if (
    currentFormat === CurrentFormatName.hex &&
    targetFormat === TargetFormatName.lab
  ) {
    finalValue = converter.hexToLab(value as string)
  } else if (
    currentFormat === CurrentFormatName.hex &&
    targetFormat === TargetFormatName.rgb
  ) {
    finalValue = converter.hexToRgb(value as string)
  } else if (
    currentFormat === CurrentFormatName.hex &&
    targetFormat === TargetFormatName.xyz
  ) {
    finalValue = converter.hexToXyz(value as string)
  }

  else if (
    currentFormat === CurrentFormatName.hsl &&
    targetFormat === TargetFormatName.cmyk
  ) {
    finalValue = converter.hslToCmyk(value as Hsl)
  } else if (
    currentFormat === CurrentFormatName.hsl &&
    targetFormat === TargetFormatName.hex
  ) {
    finalValue = converter.hslToHex(value as Hsl)
  } else if (
    currentFormat === CurrentFormatName.hsl &&
    targetFormat === TargetFormatName.hsv
  ) {
    finalValue = converter.hslToHsv(value as Hsl)
  } else if (
    currentFormat === CurrentFormatName.hsl &&
    targetFormat === TargetFormatName.lab
  ) {
    finalValue = converter.hslToLab(value as Hsl)
  } else if (
    currentFormat === CurrentFormatName.hsl &&
    targetFormat === TargetFormatName.rgb
  ) {
    finalValue = converter.hslToRgb(value as Hsl)
  } else if (
    currentFormat === CurrentFormatName.hsl &&
    targetFormat === TargetFormatName.xyz
  ) {
    finalValue = converter.hslToXyz(value as Hsl)
  }

  else if (
    currentFormat === CurrentFormatName.hsv &&
    targetFormat === TargetFormatName.cmyk
  ) {
    finalValue = converter.hsvToCmyk(value as Hsv)
  } else if (
    currentFormat === CurrentFormatName.hsv &&
    targetFormat === TargetFormatName.hex
  ) {
    finalValue = converter.hsvToHex(value as Hsv)
  } else if (
    currentFormat === CurrentFormatName.hsv &&
    targetFormat === TargetFormatName.hsl
  ) {
    finalValue = converter.hsvToHsl(value as Hsv)
  } else if (
    currentFormat === CurrentFormatName.hsv &&
    targetFormat === TargetFormatName.lab
  ) {
    finalValue = converter.hsvToLab(value as Hsv)
  } else if (
    currentFormat === CurrentFormatName.hsv &&
    targetFormat === TargetFormatName.rgb
  ) {
    finalValue = converter.hsvToRgb(value as Hsv)
  } else if (
    currentFormat === CurrentFormatName.hsv &&
    targetFormat === TargetFormatName.xyz
  ) {
    finalValue = converter.hsvToXyz(value as Hsv)
  }

  else if (
    currentFormat === CurrentFormatName.rgb &&
    targetFormat === TargetFormatName.cmyk
  ) {
    finalValue = converter.rgbToCmyk(value as Rgb)
  } else if (
    currentFormat === CurrentFormatName.rgb &&
    targetFormat === TargetFormatName.hex
  ) {
    finalValue = converter.rgbToHex(value as Rgb)
  } else if (
    currentFormat === CurrentFormatName.rgb &&
    targetFormat === TargetFormatName.hsl
  ) {
    finalValue = converter.rgbToHsl(value as Rgb)
  } else if (
    currentFormat === CurrentFormatName.rgb &&
    targetFormat === TargetFormatName.hsv
  ) {
    finalValue = converter.rgbToHsv(value as Rgb)
  } else if (
    currentFormat === CurrentFormatName.rgb &&
    targetFormat === TargetFormatName.lab
  ) {
    finalValue = converter.rgbToLab(value as Rgb)
  } else if (
    currentFormat === CurrentFormatName.rgb &&
    targetFormat === TargetFormatName.xyz
  ) {
    finalValue = converter.rgbToXyz(value as Rgb)
  } else {
    throw new Error('Format not valid')
  }

  return finalValue
}

export { colorFormatConverter }