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
        background-size: 20rem 20rem;
        background-position: 0 0, 0 10rem, 10rem -10rem, -10rem 0rem;

        position: relative;
        width: 200rem;
        max-width: 100%;
        aspect-ratio: 200 / 120;
      `}
    >
      <div
        id="backgroundColor"
        className={css`
          position: absolute;
          width: 50%;
          height: 83%;
        `}
        style={{
          background: toRgba(props.bg),
        }}
      />
      <div
        id="inputColor"
        className={css`
          position: absolute;
          top: 17%;
          width: 50%;
          height: 83%;
        `}
        style={{
          background: toRgba(props.fg),
        }}
      />
      <div
        id="targetColor"
        className={css`
          position: absolute;
          top: 17%;
          left: 50%;
          width: 50%;
          height: 67%;
        `}
        style={{
          background: toRgba(props.sum),
        }}
      />
    </div>
  );
};

export default LayeringVisual;
