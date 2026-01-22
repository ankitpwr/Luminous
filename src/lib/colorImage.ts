export function downScaleColorImage(
  imageData: ImageData,
  blockHeight: number,
  blockWidth: number,
  asciiChar: String[],
  data: ImageDataArray,
  srcCanvas: HTMLCanvasElement,
  asciiCanvas: HTMLCanvasElement,
  fontSize: number,
  contrast: number,
  brightness: number,
) {
  asciiCanvas.width = srcCanvas.width;
  asciiCanvas.height = srcCanvas.height;
  const asciiCtx = asciiCanvas.getContext("2d")!;
  asciiCtx.fillStyle = "black";
  asciiCtx.fillRect(0, 0, asciiCanvas.width, asciiCanvas.height);
  asciiCtx.font = `${fontSize}px monospace`;
  asciiCtx.textBaseline = "top";
  asciiCtx.fillStyle = "white";
  for (let i = 0; i < imageData.height; i += blockHeight) {
    for (let j = 0; j < imageData.width; j += blockWidth) {
      let sumR = 0;
      let sumG = 0;
      let sumB = 0;
      let count = 0;

      for (let x = 0; x < blockHeight; x++) {
        for (let y = 0; y < blockWidth; y++) {
          const px = j + y;
          const py = i + x;

          if (px >= asciiCanvas.width || py >= asciiCanvas.height) continue;

          const index = (py * asciiCanvas.width + px) * 4;
          sumR += data[index]; // grayscale value (R channel)
          sumG += data[index + 1];
          sumB += data[index + 2];
          count++;
        }
      }
      const avgR = sumR / count;
      const avgG = sumG / count;
      const avgB = sumB / count;
      const luminance = 0.299 * avgR + 0.587 * avgG + 0.114 * avgB;
      const constrastLuminous = contrastValue(luminance, contrast, brightness);
      const scale = constrastLuminous / (luminance + 1e-6);

      const cr = Math.min(255, Math.max(0, avgR * scale));
      const cg = Math.min(255, Math.max(0, avgG * scale));
      const cb = Math.min(255, Math.max(0, avgB * scale));

      const charIndex = Math.floor(
        (constrastLuminous / 255) * (asciiChar.length - 1),
      );

      asciiCtx.fillStyle = `rgb(${cr},${cg},${cb})`;
      asciiCtx.fillText(String(asciiChar[charIndex]), j, i);
    }
  }
}
function contrastValue(
  val: number,
  contrast: number,
  brightness: number,
): number {
  let normalize = val / 255;
  normalize = normalize + brightness;
  let distance = normalize - 0.5;
  distance = distance * contrast;

  val = Math.max(0, Math.min((distance + 0.5) * 255, 255));

  return val;
}
