import { css } from "@emotion/css";
import Color from "../color/Color";
import toRgba from "../color/toRgba";

const LayeringVisual: React.FC<{
  fg: Color;
  bg: Color;
  sum: Color;
}> = (props) => {
  return (
    <div
      className={css`
        zoom: 2.5;

        /* https://stackoverflow.com/a/35362074/782045 */
        background-image: linear-gradient(45deg, black 25%, transparent 25%),
          linear-gradient(-45deg, black 25%, transparent 25%),
          linear-gradient(45deg, transparent 75%, black 75%),
          linear-gradient(-45deg, transparent 75%, black 75%);
        background-size: 20px 20px;
        background-position: 0 0, 0 10px, 10px -10px, -10px 0px;

        position: relative;
        width: 200px;
        height: 120px;
      `}
    >
      <div
        id="backgroundColor"
        className={css`
          position: absolute;
          width: 100px;
          height: 100px;
        `}
        style={{
          background: toRgba(props.bg),
        }}
      />
      <div
        id="inputColor"
        className={css`
          position: absolute;
          top: 20px;
          width: 100px;
          height: 100px;
        `}
        style={{
          background: toRgba(props.fg),
        }}
      />
      <div
        id="targetColor"
        className={css`
          position: absolute;
          top: 20px;
          left: 100px;
          width: 100px;
          height: 80px;
        `}
        style={{
          background: toRgba(props.sum),
        }}
      />
    </div>
  );
};

export default LayeringVisual;
