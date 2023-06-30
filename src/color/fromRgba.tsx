import Color from "./Color";

export default function (rgb: string): Color | null {
  let m = rgb.match(/rgba?\((.*)\)/);
  if (!m) return null;

  const [r, g, b] = m[1] //
    .split(",")
    .map((x) => parseFloat(x) / 255);

  return { colors: [r, g, b], a: 1 };
}
