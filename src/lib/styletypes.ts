export const Colors = {
  Grey: "#6a7282",
  Blue: "#5A7ACD",
  Green: "#00a000",
  White: "#ffffff",
  Red: "#91678a",
} as const;
type ColorKeys = keyof typeof Colors;
export type ColorValue = (typeof Colors)[ColorKeys];

export const Theme = {
  Normal: [" ", ".", "-", ",", ":", "=", "+", "*", "#", "%", "@"],
  Matrix: [" ", " ", "0", "0", "1", "1"],
  Blocky: [" ", "░", "▒", "▓", "█"],
  Dot: [" ", ".", "•", "●"],
  flip: [],
};

type ThemeKeys = keyof typeof Theme;
export type ThemeValue = (typeof Theme)[ThemeKeys];
