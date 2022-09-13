import React, { forwardRef, useImperativeHandle } from 'react';
import { useWidgetDispatch } from '.';
import { MethodsRefType, WidgetActionEnum } from './types';

const Methods = forwardRef<MethodsRefType, any>((props, ref) => {
    //
    const widgetDispatch = useWidgetDispatch();

    useImperativeHandle(ref, () => {
        return {
            setSelectedSymbol(symbolISIN) {
                widgetDispatch({ type: WidgetActionEnum.SET_WIDGET_SELECTED_SYMBOL, payload: symbolISIN });
            },
        };
    });

    return <></>;
});

Methods.displayName = 'Methods';

export default Methods;
