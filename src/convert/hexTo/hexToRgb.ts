import { hex3ToHex6 } from '../../utils/hex3ToHex6'
import { validateHex } from '../../utils/validateHex'

function hexToRgb(hex: string) {
  validateHex(hex)

  if (hex.length === 4) hex = hex3ToHex6(hex)

  hex = hex.replace('#', '')
  
  var r = parseInt(hex.substring(0, 2), 16)
  var g = parseInt(hex.substring(2, 4), 16)
  var b = parseInt(hex.substring(4, 6), 16)

  return { r, g, b }
}

export { hexToRgb }