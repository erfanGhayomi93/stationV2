import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IThemeManager {
     theme: 'dark' | 'light' | 'system';
     setTheme: (value: 'dark' | 'light' | 'system') => undefined;
}

export const useThemeManager = create<IThemeManager>()(
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
