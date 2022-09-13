import React, { useEffect } from 'react';
import useIsFirstRender from 'src/common/hooks/useIsFirstRender';
import { useWidgetValues } from '.';
import { ListenersType } from './types';

const Listeners = ({ onSymbolChange }: ListenersType) => {
    //
    const { selectedSymbol } = useWidgetValues();
    const isFirstRender = useIsFirstRender();

    useEffect(() => {
        onSymbolChange && !isFirstRender && onSymbolChange(selectedSymbol);
    }, [selectedSymbol]);

    return <></>;
};

export default Listeners;
