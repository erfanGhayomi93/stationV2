import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface IThemeStore {
     theme: 'dark' | 'light' | 'system';
     setTheme: (value: 'dark' | 'light' | 'system') => undefined;
}

export const useThemeStore = create<IThemeStore>()(
     persist(
          (set, get) => ({
               theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light',
               setTheme: value => {
                    set(() => ({ theme: value }));

                    document.documentElement.classList.toggle(
                         'dark',
                         get().theme === 'dark' ||
                              (get().theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)
                    );
               },
          }),
          {
               name: 'theme',
          }
     )
);
