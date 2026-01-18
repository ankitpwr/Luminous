export function grayscaleValue(data: ImageDataArray, contrast: Number) {
  for (let i = 0; i < data.length; i += 4) {
    let r = data[i];
    let g = data[i + 1];
    let b = data[i + 2];
    let gray: number = 0.299 * r + 0.587 * g + 0.114 * b;

    const normalize = gray / 255;
    let distance = normalize - 0.5;
    distance = distance * Number(contrast);

    gray = Math.max(0, Math.min((distance + 0.5) * 255, 255));

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
  canvas: HTMLCanvasElement,
) {
  let asciiImage = [];
  for (let i = 0; i < imageData.height; i += blockHeight) {
    let row = "";

    for (let j = 0; j < imageData.width; j += blockWidth) {
      let sum = 0;
      let count = 0;

      for (let x = 0; x < blockHeight; x++) {
        for (let y = 0; y < blockWidth; y++) {
          const px = j + y;
          const py = i + x;

          if (px >= canvas.width || py >= canvas.height) continue;

          const index = (py * canvas.width + px) * 4;
          sum += data[index]; // grayscale value (R channel)
          count++;
        }
      }
      const avg = sum / count;
      const charIndex = Math.floor((avg / 255) * (asciiChar.length - 1));
      row += asciiChar[charIndex];
    }
    asciiImage.push(row);
  }
  return asciiImage;
}
