import { useThemeStore } from '@store/theme';
import { Fragment, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import RouterPage from './router/routerPage';

function App() {
     const { theme } = useThemeStore();

     useEffect(() => {
          const element = document.documentElement;

          if (theme !== 'system') {
               element.classList.toggle('dark', theme === 'dark');
          } else {
               const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
               element.classList.toggle('dark', darkQuery.matches);
          }
     }, [theme]);

     return <Fragment>{RouterPage}</Fragment>;
}

export default App;
