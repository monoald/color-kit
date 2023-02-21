import { Rgb } from '../../types';
import { validateRgb } from '../../utils/validateRgb';

type Hex = string

function rgbToHex(rgb: Rgb): Hex {
  validateRgb(rgb)

  const { r, g, b } = rgb

  const hexR = r.toString(16).padStart(2, '0');
  const hexG = g.toString(16).padStart(2, '0');
  const hexB = b.toString(16).padStart(2, '0');

  return '#' + hexR + hexG + hexB;
}

export { rgbToHex }