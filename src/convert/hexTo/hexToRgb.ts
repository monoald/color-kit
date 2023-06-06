import { hex3ToHex6 } from '../../utils/hex3ToHex6'
import { validateHex } from '../../validate'

function hexToRgb(hex: string) {
  validateHex(hex)

  // Normalize 3-digit Hex to 6-digit Hex
  if (hex.length === 4) hex = hex3ToHex6(hex)

  hex = hex.replace('#', '')
  
  // Calculate RGB values
  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  return { r, g, b }
}

export { hexToRgb }