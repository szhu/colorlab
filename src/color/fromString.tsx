import fromHex from "./fromHex";
import fromRgba from "./fromRgba";

export default function (string: string) {
  return fromRgba(string) ?? fromHex(string);
}
