import { css } from "@emotion/css";
import { useState } from "react";
import Flex from "../visual/Flex";
import Color from "./Color";
import Transparent from "./Transparent";
import fromHex from "./fromHex";
import toHex from "./toHex";

const ColorInput: React.FC<{
  value?: Color;
  onChangeValue?: (value: Color) => void;
}> = (props) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<Color>(Transparent);

  const value = props.value ?? uncontrolledValue;
  const onChangeValue = props.onChangeValue ?? setUncontrolledValue;

  const hex = toHex(value);

  return (
    <Flex
      inline
      y="8rem stretch 12rem"
      x="8rem center"
      className={css`
        flex: 0 0 auto;
        width: 100rem;
      `}
    >
      <input
        type="text"
        placeholder="#88888888"
        value={hex}
        onFocus={(e) => {
          e.currentTarget.select();
        }}
        onInput={(e) => {
          let newValue = fromHex(e.currentTarget.value);
          if (!newValue) return;

          onChangeValue(newValue);
        }}
        className={css`
          text-align: center;
        `}
      />
      <input
        type="color"
        value={hex.slice(0, 7)}
        onInput={(e) => {
          let newValue = fromHex(e.currentTarget.value);
          if (!newValue) return;

          newValue.a = value.a;

          onChangeValue(newValue);
        }}
      />
      <input
        type="range"
        min="0"
        max="1"
        step="0.01"
        value={value.a}
        onInput={(e) => {
          onChangeValue({
            colors: value.colors,
            a: e.currentTarget.valueAsNumber,
          });
        }}
      />
    </Flex>
  );
};

export default ColorInput;
