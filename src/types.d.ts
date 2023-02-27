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