import { useThemeManager } from '@zustand/theme';
import { useEffect, useState } from 'react';

const useDarkMode = () => {
     const { theme } = useThemeManager();
     const [isDarkMode, setIsDarkMode] = useState(false);

     useEffect(() => {
          const updateDarkMode = () => {
               if (theme === 'system') {
                    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                    setIsDarkMode(prefersDark);
               } else {
                    setIsDarkMode(theme === 'dark');
               }
          };

          updateDarkMode();

          const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
          if (theme === 'system') {
               darkModeMediaQuery.addEventListener('change', updateDarkMode);
          }

          return () => {
               if (theme === 'system') {
                    darkModeMediaQuery.removeEventListener('change', updateDarkMode);
               }
          };
     }, [theme]);

     return isDarkMode;
};

export default useDarkMode;
