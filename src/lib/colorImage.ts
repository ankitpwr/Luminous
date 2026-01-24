export function downScaleColorImage(
  imageData: ImageData,
  blockHeight: number,
  blockWidth: number,
  asciiChar: string[],
  asciiCanvas: HTMLCanvasElement,
  fontSize: number,
  contrast: number,
  brightness: number,
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
    for (let j = 0; j < imageData.width; j++) {
      const index = (i * imageData.width + j) * 4;

      const avgR = data[index];
      const avgG = data[index + 1];
      const avgB = data[index + 2];
      const luminance = 0.2126 * avgR + 0.7152 * avgG + 0.0722 * avgB;
      const constrastLuminous = contrastValue(luminance, contrast, brightness);
      const scale = constrastLuminous / (luminance + 1e-6);

      const cr = Math.min(255, Math.max(0, avgR * scale));
      const cg = Math.min(255, Math.max(0, avgG * scale));
      const cb = Math.min(255, Math.max(0, avgB * scale));

      const charIndex = Math.floor(
        (constrastLuminous / 255) * (asciiChar.length - 1),
      );
      const dx = Math.round(j * charW);
      const dy = Math.round(i * charH);

      asciiCtx.fillStyle = `rgb(${cr},${cg},${cb})`;
      asciiCtx.fillText(asciiChar[charIndex], dx, dy);
    }
  }
}
function contrastValue(
  val: number,
  contrast: number,
  brightness: number,
): number {
  let normalize = val / 255;
  normalize = (normalize - 0.5) * contrast + 0.5;
  normalize = normalize + brightness;
  normalize = Math.max(0, Math.min(normalize, 1));

  val = Math.max(0, Math.min(normalize * 255, 255));

  return val;
}
