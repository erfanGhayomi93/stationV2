import { useEffect, useRef } from 'react';

type UseDebounceOutputType = {
     setDebounce: (cb: () => void, milliseconds?: number) => void;
     clearDebounce: () => void;
};

const UseDebounceOutput = (): UseDebounceOutputType => {
     const timer = useRef<null | NodeJS.Timeout>(null);

     const clearDebounce = () => {
          if (!timer.current) return;

          clearTimeout(timer.current);
          timer.current = null;
     };

     const setDebounce = (cb: () => void, milliseconds?: number) => {
          clearDebounce();

          timer.current = setTimeout(cb, milliseconds ?? 100);
     };

     useEffect(() => clearDebounce, []);

     return { setDebounce, clearDebounce };
};

export default UseDebounceOutput;
