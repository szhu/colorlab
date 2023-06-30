import { useState } from "react";

export default function useNormalizedState<T>(
  initialValue: T,
  normalize: (value: T) => T,
): [T, (value: T) => void] {
  const [value, setValue] = useState<T>(initialValue);

  function setValueChecked(value: T) {
    setValue(normalize(value));
  }

  return [value, setValueChecked];
}
