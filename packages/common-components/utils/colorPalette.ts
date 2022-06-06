export const COLORS = [
  '#981c33',
  '#d53e4f',
  '#f46d43',
  '#fdae61',
  '#fee08b',
  '#d2e08a',
  '#abdda4',
  '#66c2a5',
  '#3288bd',
  '#5e4fa2'
]

export const colorPicker = (index: number): string => {
  return COLORS[index % COLORS.length]
}
