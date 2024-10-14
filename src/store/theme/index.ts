import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IThemeStore {
     theme: 'dark' | 'light' | 'system';
     setTheme: (value: 'dark' | 'light' | 'system') => undefined;
}

export const useThemeStore = create<IThemeStore>()(
     persist(
          (set, get) => ({
               theme: get()?.theme || 'system',
               setTheme: value => {
                    set(() => ({ theme: value }));
               },
          }),
          {
               name: 'theme',
          }
     )
);
