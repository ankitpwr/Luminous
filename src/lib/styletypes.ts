export const Colors = {
  Grey: "#6a7282",
  Blue: "#5A7ACD",
  Green: "#03A062",
} as const;

type ColorKeys = keyof typeof Colors;

export type ColorValue = (typeof Colors)[ColorKeys];
