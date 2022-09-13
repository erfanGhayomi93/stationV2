//
export type WidgetStateType = {
    selectedSymbol: string;
};

export enum WidgetActionEnum {
    SET_WIDGET_SELECTED_SYMBOL = 'SET_WIDGET_SELECTED_SYMBOL',
}

export type WidgetActionType = { type: WidgetActionEnum.SET_WIDGET_SELECTED_SYMBOL; payload: WidgetStateType['selectedSymbol'] };

export type ListenersType = {
    onSymbolChange?: (selectedSymbolISIN: string) => void;
};

export type MethodsRefType = {
    setSelectedSymbol: (symbolISIN: string) => void;
};

export type LayoutWrapperType = {
    initialState?: Partial<WidgetStateType>;
    listeners?: ListenersType;
};
