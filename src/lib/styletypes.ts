export const Colors = {
  Grey: "#6a7282",
  Red: "#91678a",
  Green: " #00FF41",
  Blue: "#5A7ACD",
} as const;
type ColorKeys = keyof typeof Colors;
export type ColorValue = (typeof Colors)[ColorKeys];

export const Theme = {
  Normal: {
    regular: [" ", ".", ":", "-", "=", "+", "*", "#", "%", "@"],
    invert: ["@", "%", "#", " ", " "],
  },
  Dot: {
    regular: [" ", ".", "•", "●"],
    invert: ["●", "•", ".", " ", " ", " ", " "],
  },
  Matrix: {
    regular: [" ", "0", "1", "1"],
    invert: ["1", "1", "0", " ", " "],
  },
  Blocky: {
    regular: [" ", "░", "▒", "▓", "█"],
    invert: ["█", "▓", "▒", "░", " ", " ", " "],
  },
};

export const InvertTheme = {
  Invert_Normal: ["@", "%", "#", "*", "+", "=", "-", ":", ".", " "],
  Invert_Dot: ["●", "•", ".", " "],
  Invert_Matrix: ["1", "1", "0", " "],
  Invert_Blocky: ["█", "▓", "▒", "░", " "],
};

export type ThemeKeys = keyof typeof Theme;
export type ThemeValue = (typeof Theme)[ThemeKeys];
