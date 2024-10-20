import { Fragment, useEffect } from 'react';
import RouterPage from './router/routerPage';

import 'tippy.js/dist/tippy.css';
import useRamandOMSGateway from '@hooks/useRamandOMSGateway';
import { useQueryGeneralUser } from '@api/trader';

function App() {
     const { data: dataUser } = useQueryGeneralUser()

     const { brokerCode, userName } = dataUser || {};

     const { isSubscribed, subscribeCustomers, unSubscribeCustomers } = useRamandOMSGateway()


     useEffect(() => {
          if (userName && brokerCode) {
               subscribeCustomers(userName, brokerCode)
          }

          return () => {
               isSubscribed() && unSubscribeCustomers()
          }
     }, [userName])

     return <Fragment>{RouterPage}</Fragment>;
}

export default App;
