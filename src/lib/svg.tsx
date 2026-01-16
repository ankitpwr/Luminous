export function NormalFontFamilyIcon({
  size,
  color,
}: {
  size: number;
  color: string;
}) {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      role="img"
      viewBox="0 0 20 20"
      width={size}
      height={size}
      fill="none"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <g
        stroke="white"
        strokeWidth="1.25"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5.833 16.667v-10a3.333 3.333 0 0 1 3.334-3.334h1.666a3.333 3.333 0 0 1 3.334 3.334v10M5.833 10.833h8.334"></path>
      </g>
    </svg>
  );
}
