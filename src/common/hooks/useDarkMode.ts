import { useLayoutEffect, useState } from 'react';
import { useThemeStore } from 'store/theme';

const useDarkMode = () => {
     const { theme } = useThemeStore();
     const [isDarkMode, setIsDarkMode] = useState(false);

     const updateDarkMode = () => {
          if (theme === 'system') {
               const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
               setIsDarkMode(prefersDark);
          } else {
               setIsDarkMode(theme === 'dark');
          }
     };

     useLayoutEffect(() => {
          updateDarkMode();
     }, [theme]);

     return isDarkMode;
};

export default useDarkMode;
