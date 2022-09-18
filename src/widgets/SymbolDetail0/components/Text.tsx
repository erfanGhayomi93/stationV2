import React, { useEffect } from 'react';
import { useWidgetDispatch, useWidgetValues } from '../context';
import { WidgetActionEnum } from '../context/types';

const Text = () => {
    //
    const { selectedSymbol } = useWidgetValues();
    const widgetDispatch = useWidgetDispatch();

    useEffect(() => {
        setTimeout(() => {
            widgetDispatch({ type: WidgetActionEnum.SET_WIDGET_SELECTED_SYMBOL, payload: 'sdf' });
        }, 5000);
    }, []);
    return <div>Text{selectedSymbol}</div>;
};

export default Text;
