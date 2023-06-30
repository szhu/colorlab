import { css } from "@emotion/css";
import { useEffect, useState } from "react";
import Color from "./color/Color";
import ColorInput from "./color/ColorInput";
import Transparent from "./color/Transparent";
import fromHex from "./color/fromHex";
import fromString from "./color/fromString";
import normalizeColor from "./color/normalizeColor";
import toHex from "./color/toHex";
import LayeringVisual from "./layering/LayeringVisual";
import layerColor from "./layering/layerColor";
import removeBackground from "./layering/removeBackground";
import useNormalizedState from "./useNormalizedState";
import Flex from "./visual/Flex";

export default function () {
  const [bg, setBg] = useNormalizedState<Color>(fromHex("#0000FFFF")!, normalizeColor);
  const [fg, setFg] = useNormalizedState<Color>(fromHex("#FF000080")!, normalizeColor);
  const [sum, setSum] = useNormalizedState<Color>(Transparent, normalizeColor);
  const [textWithSums, setTextWithSums] = useState(
    `background-image: linear-gradient(45deg, #808080 25%, transparent 25%), linear-gradient(-45deg, #808080 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #808080 75%), linear-gradient(-45deg, transparent 75%, #808080 75%);`,
  );
  const [textWithFgs, setTextWithFgs] = useState("");

  const [lastConverted, setLastConverted] = useState<"single" | "text-box">("single");

  useEffect(() => {
    updateSum(bg, fg);
    updateTextWithFgs(textWithSums, bg, fg.a);
  }, []);

  function updateSum(newBg: Color, newFg: Color) {
    let newSum = layerColor(newBg, newFg);
    setSum(newSum);
    return newSum;
  }

  function updateFg(newSum: Color, newBg: Color, fgAlpha: number) {
    let newFg = removeBackground(newBg, newSum, fgAlpha);
    setFg(newFg);
    return newFg;
  }

  function updateTextWithFgs(newTextWithSums: string, newBg: Color, fgAlpha: number) {
    const ColorsRegexp = /#?([0-9a-f]{6,8})|rgba?\(([^\)]*)\)/gi;

    let newTextWithFgs = newTextWithSums.replaceAll(ColorsRegexp, (substring) => {
      let newSum = fromString(substring);
      if (!newSum) return substring;

      let newFg = removeBackground(newBg, newSum, fgAlpha);
      return toHex(newFg);
    });

    setTextWithFgs(newTextWithFgs);
    return newTextWithFgs;
  }

  return (
    <Flex y="20rem 40rem" x="stretch 8rem" flex="1 0 0">
      <div
        className={css`
          margin: 0 auto;
          max-width: 100%;
        `}
      >
        <LayeringVisual bg={bg} fg={fg} sum={sum} />
      </div>

      <Flex wrap x="center 10rem" y="50rem">
        <Flex y x="center">
          Background
          <ColorInput
            value={bg}
            onChangeValue={(newBg) => {
              setBg(newBg);
              updateSum(newBg, fg);
              updateTextWithFgs(textWithSums, newBg, fg.a);
            }}
          />
        </Flex>
        <Flex y x="center">
          Foreground
          <ColorInput
            value={fg}
            onChangeValue={(newFg) => {
              setFg(newFg);
              updateSum(bg, newFg);
              updateTextWithFgs(textWithSums, bg, newFg.a);
            }}
          />
        </Flex>
        <Flex
          y
          x="center"
          className={css`
            opacity: ${lastConverted !== "single" && 0.2};
          `}
        >
          Result
          <ColorInput
            value={sum}
            onChangeValue={(newSum) => {
              setSum(newSum);
              updateFg(newSum, bg, fg.a);
              setLastConverted("single");
            }}
          />
        </Flex>
      </Flex>
      <hr
        className={css`
          width: 80%;
        `}
      />

      <Flex
        y="20rem"
        className={css`
          margin: 0 auto;
          width: 100%;
          max-width: 600rem;
        `}
      >
        <div>
          Text containing results
          <textarea
            value={textWithSums}
            onChange={(e) => {
              let newTextWithSums = e.target.value;
              setTextWithSums(newTextWithSums);
              updateTextWithFgs(newTextWithSums, bg, fg.a);
              setLastConverted("text-box");
            }}
            className={css`
              box-sizing: border-box;
              width: 100%;
              resize: vertical;
              min-height: 5em;
              flex-basis: 1 0 800rem;
            `}
          />
        </div>
        <div>
          Text containing foregrounds
          <textarea
            value={textWithFgs}
            readOnly
            onFocus={(e) => e.target.select()}
            className={css`
              box-sizing: border-box;
              width: 100%;
              resize: vertical;
              min-height: 5em;
              flex-basis: 1 0 800rem;
              user-select: all;
            `}
          />
        </div>
      </Flex>
    </Flex>
  );
}
