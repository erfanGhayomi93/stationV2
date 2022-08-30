import { useEffect } from 'react';
import { setWindowHistoryState } from 'src/utils/helpers';
import useIsFirstRender from './useIsFirstRender';

function useWindowHistoryStateSaver(propertyName: string, value: any) {
    //
    const isFirstRender = useIsFirstRender();

    useEffect(() => {
        //
        if (isFirstRender) return;

        const timer = setTimeout(() => setWindowHistoryState(propertyName, value), 300);

        return () => {
            if (isFirstRender) return;
            clearTimeout(timer);
        };
    }, [value]);
}

export default useWindowHistoryStateSaver;
