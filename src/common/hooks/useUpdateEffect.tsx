import { DependencyList, EffectCallback, useEffect, useRef } from "react";

export default function useUpdateEffect(
  effect: EffectCallback,
  deps: DependencyList
) {
  const isInitialMount = useRef(true);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    effect();
  }, deps);
}