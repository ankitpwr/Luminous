import type { ColorValue } from "./styletypes";
// const charCache = new Map<string, HTMLCanvasElement>();

export function calculateGrayscaleValue(
  data: ImageDataArray,
  contrast: number,
  brightness: number,
) {
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];
    let gray: number = 0.2126 * r + 0.7152 * g + 0.0722 * b;

    let normalize = gray / 255;
    normalize = (normalize - 0.5) * contrast + 0.5;
    normalize = normalize + brightness;
    normalize = Math.max(0, Math.min(normalize, 1));
    gray = Math.max(0, Math.min(normalize * 255, 255));

    data[i] = gray; // R
    data[i + 1] = gray; // G
    data[i + 2] = gray; // B
  }
  return data;
}

export function renderAsciiGrayscale(
  imageData: ImageData,
  blockHeight: number,
  blockWidth: number,
  asciiChar: string[],

  asciiCanvas: HTMLCanvasElement,
  fontSize: number,
  color: ColorValue,
  dpr: number,
) {
  const asciiCtx = asciiCanvas.getContext("2d")!;
  asciiCtx.fillStyle = "black";
  asciiCtx.fillRect(0, 0, asciiCanvas.width, asciiCanvas.height);
  asciiCtx.font = `${fontSize}px monospace`;
  asciiCtx.textBaseline = "top";
  const data = imageData.data;

  const charW = blockWidth * dpr;
  const charH = blockHeight * dpr;

  for (let i = 0; i < imageData.height; i++) {
    let gray = 0;
    for (let j = 0; j < imageData.width; j++) {
      const index = (i * imageData.width + j) * 4;
      gray = data[index];
      const charIndex = Math.floor((gray / 255) * (asciiChar.length - 1));
      asciiCtx.fillStyle =
        color == "#6a7282" ? `rgb(${gray},${gray},${gray})` : color;
      const dx = Math.round(j * charW);
      const dy = Math.round(i * charH);
      asciiCtx.fillText(asciiChar[charIndex], dx, dy);
    }
  }
}
