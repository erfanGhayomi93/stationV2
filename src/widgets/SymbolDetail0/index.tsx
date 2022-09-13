import { forwardRef } from 'react';
import { WidgetProvider } from './context';
import Listeners from './context/Listeners';
import Methods from './context/Methods';
import { LayoutWrapperType, MethodsRefType } from './context/types';
import Layout from './Layout';

const SymbolDetail = forwardRef<MethodsRefType, LayoutWrapperType>(({ initialState, listeners }, ref) => {
    //
    return (
        <WidgetProvider {...initialState}>
            <Methods ref={ref} />
            <Listeners {...listeners} />
            <Layout />
        </WidgetProvider>
    );
});

SymbolDetail.displayName = 'SymbolDetail';

export type { MethodsRefType as WidgetRefType } from './context/types';
export default SymbolDetail;
