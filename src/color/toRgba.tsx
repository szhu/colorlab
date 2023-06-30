import Color from "./Color";

export default function (color: Color) {
  return `rgba(${color.colors.map((x) => x * 255).join(",")}, ${color.a})`;
}
