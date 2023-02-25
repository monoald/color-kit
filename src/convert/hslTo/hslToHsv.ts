import { Hsl, Hsv } from '../../types'
import { validateHsl } from '../../utils/validateHsl';

function hslToHsv({ h, s, l }: Hsl): Hsv {
  validateHsl({ h, s, l })

  // Normalize values to a range of range 0 to 1
  s /= 100;
  l /= 100;

  // Calculate Value and Saturation
  let v = l + s * Math.min(l, 1 - l);
  s = v === 0 ? 0 : 2 * (1 - l / v);
  
  // Normalize values to a range of range 0 to 100
  s = Math.round(s * 100)
  v = Math.round(v * 100)

  return { h, s, v };
}

export { hslToHsv }