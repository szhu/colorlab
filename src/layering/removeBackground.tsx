import Color from "../color/Color";

/**
 * The inverse of layerColor.
 *
 *     blended             =  (fg * fgA  +  bg * bgEffectiveA)  /  blendedA
 *     blended * blendedA  =   fg * fgA  +  bg * bgEffectiveA
 *           fg * fgA  =   blended * blendedA  -  bg * bgEffectiveA
 *           fg            =  (blended * blendedA  -  bg * bgEffectiveA)  /  fgA
 *
 */
export default function (bg: Color, sum: Color, fgA: number): Color {
  const bgEffectiveA = bg.a * (1 - fgA);

  const clampBetween0And1 = (x: number) => Math.max(0, Math.min(1, x));

  return {
    colors: [0, 1, 2]
      .map((i) => (sum.colors[i] * sum.a - bg.colors[i] * bgEffectiveA) / fgA)
      .map(clampBetween0And1) as [number, number, number],
    a: fgA,
  };
}
