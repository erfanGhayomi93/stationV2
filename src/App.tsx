import RouterPage from './router/routerPage';
import Cookies from 'js-cookie';
import { Fragment, useEffect } from 'react';
import { pushEngine } from '@LS/pushEngine';
import { tokenCookieName } from './config/axios';

import 'tippy.js/dist/tippy.css';

function App() {
     useEffect(() => {
          const clientId = Cookies.get(tokenCookieName);

          pushEngine.connect({
               DomainName: 'https://pushengine.ramandtech.com',
               DomainPort: +'443',
               AdapterSet: 'Ramand_Remoter_Adapter',
               User: 'default user',
               Password: clientId ?? 'default password', // get from app context
          });
     }, []);

     return <Fragment>{RouterPage}</Fragment>;
}

export default App;
