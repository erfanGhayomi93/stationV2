import { useReducer } from 'react';
import { symbolDataReducer } from './symbolDataReducer';
import { createContainer } from 'react-tracked';

const initialState: ISymbolDataState = {
    symbolChartType: 'Linear',
    symbolChartDate: 'Today',
    orderBookViewMode: 'Row',
    isMarketDepthOpen: false,
    isDepthChartOpen: true,
};

const useValue = () => useReducer(symbolDataReducer, initialState);
const { Provider: SymbolDataProvider, useTrackedState, useUpdate } = createContainer(useValue);
export const useSymbolTabsState = () => useTrackedState();
export const useSymbolTabsDispatch = () => useUpdate();

const SymbolTabsContext = ({ children }: { children: JSX.Element }) => {
    return <SymbolDataProvider>{children}</SymbolDataProvider>;
};

export default SymbolTabsContext;
