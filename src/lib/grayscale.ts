import type { ColorValue } from "./styletypes";

export function grayscaleValue(
  data: ImageDataArray,
  contrast: number,
  brightness: number,
) {
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];
    let gray: number = 0.299 * r + 0.587 * g + 0.114 * b;

    let normalize = gray / 255;
    normalize = normalize + brightness;
    let distance = (normalize - 0.5) * contrast + 0.5;
    distance = Math.max(0, Math.min(1, distance));

    gray = Math.max(0, Math.min(distance * 255, 255));

    data[i] = gray; // R
    data[i + 1] = gray; // G
    data[i + 2] = gray; // B
  }
  return data;
}

export function downScaleGrayscaleImage(
  imageData: ImageData,
  blockHeight: number,
  blockWidth: number,
  asciiChar: String[],
  data: ImageDataArray,
  srcCanvas: HTMLCanvasElement,
  asciiCanvas: HTMLCanvasElement,
  fontSize: number,
  contrast: number,
  color: ColorValue,
  video: boolean,
  startVideoRecording: boolean,
) {
  asciiCanvas.width = srcCanvas.width;
  asciiCanvas.height = srcCanvas.height;
  const asciiCtx = asciiCanvas.getContext("2d")!;
  asciiCtx.fillStyle = "black";
  asciiCtx.fillRect(0, 0, asciiCanvas.width, asciiCanvas.height);
  asciiCtx.font = `${fontSize}px monospace`;
  asciiCtx.textBaseline = "top";

  for (let i = 0; i < imageData.height; i += blockHeight) {
    for (let j = 0; j < imageData.width; j += blockWidth) {
      let sum = 0;
      let count = 0;

      for (let x = 0; x < blockHeight; x++) {
        for (let y = 0; y < blockWidth; y++) {
          const px = j + y;
          const py = i + x;

          if (px >= srcCanvas.width || py >= srcCanvas.height) continue;

          const index = (py * srcCanvas.width + px) * 4;
          sum += data[index]; // grayscale value (R channel)
          count++;
        }
      }
      const avg = sum / count;
      const charIndex = Math.floor((avg / 255) * (asciiChar.length - 1));
      asciiCtx.fillStyle =
        color == "#6a7282" ? `rgb(${avg},${avg},${avg})` : color;
      asciiCtx.fillText(String(asciiChar[charIndex]), j, i);
    }
  }
}
