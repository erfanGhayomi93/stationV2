import { createContext } from 'react';
import { ComboState, IComboSelectContextType } from '../types';

export const ComboSelectContext = createContext<IComboSelectContextType<ComboState>>({
    state: { keyId: '' },
    dispatch: () => {},
    setPanel: () => {},
    setValue: () => {},
    setPanelContent: () => {},
    clearSelected: () => {},
});
