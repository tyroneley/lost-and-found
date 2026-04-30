type HSL = {
  h: number
  s: number
  l: number
}

const hexToRgb = (hex: string) => {
  const cleaned = hex.replace('#', '')

  const bigint = parseInt(cleaned, 16)

  return {
    r: (bigint >> 16) & 255,
    g: (bigint >> 8) & 255,
    b: bigint & 255
  }
}

const rgbToHsl = (r: number, g: number, b: number): HSL => {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)

  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max !== min) {
    const d = max - min

    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0)
        break
      case g:
        h = (b - r) / d + 2
        break
      case b:
        h = (r - g) / d + 4
        break
    }

    h /= 6
  }

  return {
    h: h * 360,
    s,
    l
  }
}

export const getColorBucket = (hex: string): string => {
  const { r, g, b } = hexToRgb(hex)
  const { h, s, l } = rgbToHsl(r, g, b)

  if (s < 0.15) {
    if (l < 0.15) return 'BLACK'
    if (l > 0.85) return 'WHITE'
    return 'GRAY'
  }
  if (l < 0.15) return 'BLACK'
  if (h >= 20 && h <= 45 && l < 0.5) return 'BROWN'
  if (h < 15 || h >= 345) return 'RED'
  if (h < 45) return 'ORANGE'
  if (h < 65) return 'YELLOW'
  if (h < 150) return 'GREEN'
  if (h < 210) return 'CYAN'
  if (h < 270) return 'BLUE'
  if (h < 300) return 'PURPLE'
  if (h < 345) return 'PINK'

  return 'UNKNOWN'
}