import clamp from "../math/clamp";
import Color from "./Color";

export default function (color: Color): Color {
  return {
    colors: color.colors.map((c) => clamp(0, c, 255)) as [number, number, number],
    a: clamp(0, color.a, 1),
  };
}
