import Color from "./Color";

export default function (hex: string): Color | null {
  let m = hex.match(/^#*([0-9a-f]{6,8})$/i);
  if (!m) return null;

  let [r, g, b, a] = m[1] //
    .match(/../g)!
    .map((x) => parseInt(x, 16) / 255);

  a ??= 1;

  return { colors: [r, g, b], a };
}
