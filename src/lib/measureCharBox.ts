export function measureCharBox(
  fontSize: Number,
  letterSpacing: Number,
  lineHeight: Number,
) {
  const span = document.createElement("span");
  span.textContent = "@";
  span.style.fontFamily = "monospace";
  span.style.fontSize = `${fontSize}px`;
  span.style.letterSpacing = `${letterSpacing}px`;
  span.style.lineHeight = `${lineHeight}px`;
  span.style.position = "absolute";
  span.style.visibility = "hidden";
  document.body.appendChild(span);
  const rect = span.getBoundingClientRect();
  document.body.removeChild(span);

  return { width: Math.floor(rect.width), height: Math.floor(rect.height) };
}
