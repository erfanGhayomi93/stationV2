import { useThemeStore } from '@store/theme';
import { Fragment, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import RouterPage from './router/routerPage';
import useApiPath from '@hooks/useApiPath';
import Loading from 'layouts/components/Loading';

function App() {
     const { theme } = useThemeStore();

     const { apiRoutes, isLoading, isSuccess } = useApiPath();


     useEffect(() => {
          const element = document.documentElement;

          if (theme !== 'system') {
               element.classList.toggle('dark', theme === 'dark');
          } else {
               const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
               element.classList.toggle('dark', darkQuery.matches);
          }
     }, [theme]);

     if (isLoading) return <Loading />

     return (
          <Fragment>
               {(!apiRoutes || !isSuccess) ? 'moshkeli pish umade' : RouterPage}
          </Fragment>
     )
}

export default App;
