import { Dispatch } from 'react';

interface IComboSelectContextType<T> {
    state: T;
    dispatch: Dispatch<ComboAction>;
    setPanel: (value: boolean) => void;
    setPanelContent: (value: string) => void;
    setValue: (value: string) => void;
    clearSelected: () => void;
}

interface IComboSelectProviderType {
    // children
    children: JSX.Element | JSX.Element[];
    //defaults
    placeholder: string;
    withDebounce?: number;
    multiple?: boolean;
    keyId?: string | string[];
    showPanel?: boolean;
    panelContent?: string;
    min?: number;

    //states
    value?: string;
    selections?: any[];
    //functions
    onMinimumEntered?: (value: boolean) => void;
    onInputChange: (value: string) => void;
    onSelectionChange?: (value: any) => void;
    onPanelVisibiltyChange?: (value: boolean) => void;
}

type ComboState = {
    value?: string;
    placeholder?: string;
    multiple?: boolean;
    selections?: any[];
    showPanel?: boolean;
    panelContent?: string;
    keyId?: string | string[];
    withDebounce?: number;
    min?: number;

    onMinimumEntered?: (value: boolean) => void;
    onInputChange?: (value: string) => void;
    onSelectionChange?: (value: any) => void;
    onPanelVisibiltyChange?: (value: boolean) => void;
};

type ComboAction =
    | { type: 'SET_VALUE'; value: string }
    | { type: 'TOGGLE_SELECTED'; value: any }
    | { type: 'SET_ACTIVE_PANEL'; value: boolean }
    | { type: 'SET_PANEL_CONTENT'; value: string }
    | { type: 'SET_MULTIPLE'; value: boolean };
