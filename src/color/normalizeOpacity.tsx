import clamp from "../math/clamp";

export default function (opacity: number): number {
  return clamp(0, opacity, 1);
}
