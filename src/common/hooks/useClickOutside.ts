import React, { useEffect } from 'react';

const useClickOutside = <T extends HTMLElement>(
     refs: React.MutableRefObject<T | null>[],
     callback: (event: MouseEvent | TouchEvent) => void
): void => {
     useEffect(() => {
          const handleClickOutside = (event: MouseEvent | TouchEvent): void => {
               const isOutside = !refs.some(ref => ref.current?.contains(event.target as Node));
               if (isOutside) {
                    callback(event);
               }
          };

          document.addEventListener('mousedown', handleClickOutside);

          return () => {
               document.removeEventListener('mousedown', handleClickOutside);
          };
     }, [callback, refs]);
};

export default useClickOutside;
