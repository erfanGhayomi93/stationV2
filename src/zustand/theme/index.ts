import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IUseTheme {
     theme: 'dark' | 'light' | 'system';
     setTheme: (value: 'dark' | 'light' | 'system') => undefined;
}

export const useTheme = create<IUseTheme>()(
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
