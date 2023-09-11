import { useReducer } from 'react';
import { symbolDataReducer } from './symbolDataReducer';
import { createContainer } from 'react-tracked';
import SymbolData from '..';

const initialState: ISymbolDataState = {
    symbolChartType: 'Linear',
    symbolChartDate: 'Today',
    orderBookViewMode: 'Row',
    isMarketDepthOpen: false,
    isDepthChartOpen: true,
};
//@ts-ignore
const useValue = () => useReducer(symbolDataReducer, initialState);
const { Provider: SymbolDataProvider, useTrackedState, useUpdate } = createContainer(useValue);
export const useSymbolDataState = () => useTrackedState();
export const useSymbolDataDispatch = () => useUpdate();

const SymbolDataWidget = () => {
    return (
        <SymbolDataProvider>
            <SymbolData />
        </SymbolDataProvider>
    );
};


export default SymbolDataWidget;