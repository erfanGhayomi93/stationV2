import { useEffect, useState } from 'react';

function useDebounce<T>(value: T, delay?: number): T {
    if (!delay) {
        return value;
    }
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay);

        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
}

export default useDebounce;
