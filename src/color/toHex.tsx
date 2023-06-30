import Color from "./Color";

export default function (color: Color): string {
  return (
    "#" +
    [...color.colors, color.a]
      .map((x) =>
        Math.round(x * 255)
          .toString(16)
          .padStart(2, "0"),
      )
      .join("")
      .toUpperCase()
  );
}
