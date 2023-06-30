import Color from "../color/Color";

export default function (bg: Color, fg: Color): Color {
  const bgEffectiveA = bg.a * (1 - fg.a);
  const blendedA = fg.a + bgEffectiveA;

  return {
    colors: [0, 1, 2].map((i) => {
      let fgColor = fg.colors[i];
      let bgColor = bg.colors[i];
      return (fgColor * fg.a + bgColor * bgEffectiveA) / blendedA;
    }) as [number, number, number],
    a: blendedA,
  };
}
