import { create } from 'zustand';

export const useAppState = create<IAppState>(set => ({
     appState: 'Loading',
     setAppState: appState => set(() => ({ appState })),
}));
