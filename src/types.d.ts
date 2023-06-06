export interface Rgb {
  r: number
  g: number
  b: number
}

export interface Cmyk {
  c: number
  m: number
  y: number
  k: number
}

export interface Hsl {
  h: number
  s: number
  l: number
}

export interface Hsv {
  h: number
  s: number
  v: number
}

export interface Lab {
  l: number
  a: number
  b: number
}

export interface Xyz {
  x: number
  y: number
  z: number
}

export interface ColorFormats {
  cmyk?: Cmyk
  hex?: string
  hsl?: Hsl
  hsv?: Hsv
  lab?: Lab
  rgb?: Rgb
  xyz?: Xyz
}

export interface Range {
  min: number,
  max: number
}

export type AnyFormat = Cmyk | string | Hsl | Hsv | Lab | Rgb | Xyz

export type BaseColor = Cmyk | string | Hsl | Hsv | Rgb

export type Color = Array<number>

export type Colors = Array<Color>

export type K = number
