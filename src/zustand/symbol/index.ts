import { create } from 'zustand';

interface ISelectedSymbolState {
     selectedSymbol: string;
}

export const useSelectedSymbolState = create<ISelectedSymbolState>(set => ({
     selectedSymbol: '',
     setSelectedSymbol: set(state => ({ selectedSymbol: state.selectedSymbol })),
}));
