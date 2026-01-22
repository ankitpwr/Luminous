export const Colors = {
  Grey: "#6a7282",
  Red: "#91678a",
  Green: " #00FF41",
  Blue: "#5A7ACD",
} as const;
type ColorKeys = keyof typeof Colors;
export type ColorValue = (typeof Colors)[ColorKeys];

export const Theme = {
  Normal: [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"],
  Dot: [" ", ".", "•", "●"],
  Matrix: [" ", "0", "1", "1"],
  Blocky: [" ", "░", "▒", "▓", "█"],
};

export type ThemeKeys = keyof typeof Theme;
export type ThemeValue = (typeof Theme)[ThemeKeys];
