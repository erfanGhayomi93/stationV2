import { FC, useEffect } from 'react';
import { useReducer } from 'react';
import { ComboReducer } from './reducer/reducer';
import ComboSearchBox from './components/SearchBox';
import ComboPanel from './components/Options';
import { IComboSelectProviderType } from './types';
import { ComboSelectContext } from './context';
import ComboDataSet from './components/Options/DataSet';

const ComboSelectProvider: FC<IComboSelectProviderType> = ({
    children,
    value,
    keyId,
    placeholder,
    withDebounce,
    onInputChange,
    onSelectionChange,
    onPanelVisibiltyChange,
    onMinimumEntered,
    min,
    selections,
    showPanel,
    multiple,
}) => {
    const useComboReducer = () =>
        useReducer(ComboReducer, {
            value,
            placeholder,
            keyId,
            withDebounce,
            selections,
            showPanel,
            multiple,
            min,
            onMinimumEntered,
            onInputChange,
            onSelectionChange,
            onPanelVisibiltyChange,
        });
    const [state, dispatch] = useComboReducer();

    useEffect(() => {
        if (showPanel !== undefined) {
            dispatch({ type: 'SET_ACTIVE_PANEL', value: showPanel });
        }
    }, [showPanel]);

    useEffect(() => {
        dispatch({ type: 'SET_MULTIPLE', value: !!multiple });
    }, [multiple]);

    useEffect(() => {
        typeof value === 'string' && dispatch({ type: 'SET_VALUE', value: value });
    }, [value]);

    useEffect(() => {
        dispatch({ type: 'TOGGLE_SELECTED', value: selections });
        onSelectionChange(selections)
    }, [selections]);

    const setPanel = (value: boolean) => {
        onPanelVisibiltyChange && onPanelVisibiltyChange(value);
        dispatch({ type: 'SET_ACTIVE_PANEL', value: value });
    };
    const setPanelContent = (value: string) => {
        dispatch({ type: 'SET_PANEL_CONTENT', value: value });
    };
    const setValue = (value: string) => {
        dispatch({ type: 'SET_VALUE', value: value });
        onInputChange && onInputChange(value);
    };
    const clearSelected = () => {
        onSelectionChange && onSelectionChange([]);
        dispatch({ type: 'TOGGLE_SELECTED', value: [] });
    };
    return (
        <ComboSelectContext.Provider
            value={{
                state,
                setPanel,
                setPanelContent,
                dispatch,
                setValue,
                clearSelected,
            }}
        >
            <>{children}</>
        </ComboSelectContext.Provider>
    );
};
ComboSelectProvider;

ComboSelectProvider.displayName = 'ComboSelectProvider'

const Combo = {
    Provider: ComboSelectProvider,
    SearchBox: ComboSearchBox,
    Panel: ComboPanel,
    DataSet: ComboDataSet,
};

export default Combo;
