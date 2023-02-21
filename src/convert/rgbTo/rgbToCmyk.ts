import { Rgb, Cmyk } from '../../types';
import { validateRgb } from '../../utils/validateRgb'

function rgbToCmyk(rgb: Rgb): Cmyk {
  validateRgb(rgb)

  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);

  let c: number = 0
  let m: number = 0 
  let y: number = 0
  let k: number = 0;

  if (max === 0) {
    k = 1;
  } else {
    c = (1 - r - k) / (1 - k);
    m = (1 - g - k) / (1 - k);
    y = (1 - b - k) / (1 - k);
  }

  c = Math.round(c * 100);
  m = Math.round(m * 100);
  y = Math.round(y * 100);
  k = Math.round(k * 100);

  return { c, m, y, k };
}

export { rgbToCmyk }