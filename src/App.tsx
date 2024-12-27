import { useThemeStore } from '@store/theme';
import { Fragment, useEffect } from 'react';
import 'tippy.js/dist/tippy.css';
import RouterPage from './router/routerPage';
import useApiPath from '@hooks/useApiPath';
import { useAppState } from '@store/appState';

function App() {
     const { theme } = useThemeStore();

     const { apiRoutes, isLoading, isSuccess } = useApiPath();

     const { setAppState } = useAppState()


     useEffect(() => {
          const element = document.documentElement;

          if (theme !== 'system') {
               element.classList.toggle('dark', theme === 'dark');
          } else {
               const darkQuery = window.matchMedia('(prefers-color-scheme: dark)');
               element.classList.toggle('dark', darkQuery.matches);
          }
     }, [theme]);

     useEffect(() => {
          if (isLoading) {
               setAppState('Loading')
          }
          else if (apiRoutes && isSuccess) {
               setAppState('FetchedConfig')
          }
     }, [apiRoutes, isLoading])



     return (
          <Fragment>
               {(apiRoutes && isSuccess) && RouterPage}
               {/* {!(apiRoutes && isSuccess) && 'Crashed'} */}
          </Fragment>
     )
}

export default App;
