import { Hsl, Hsv } from '../../types'
import { validateHsl } from '../../utils/validateHsl';

function hslToHsv(hsl: Hsl): Hsv {
  validateHsl(hsl)

  let { h, s, l } = hsl

  s /= 100;
  l /= 100;

  let v = l + s * Math.min(l, 1 - l);

  if (v === 0) {
    s = 0
  } else {
    s = 2 * (1 - l / v)
  }
  
  s = s * 100
  v = v * 100

  return { h, s, v };
}

export { hslToHsv }