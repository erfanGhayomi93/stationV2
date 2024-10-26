import { Fragment, useEffect } from 'react';
import RouterPage from './router/routerPage';

import { useQueryGeneralUser } from '@api/trader';
import useRamandOMSGateway from '@hooks/useRamandOMSGateway';
import 'tippy.js/dist/tippy.css';

function App() {
     return <Fragment>{RouterPage}</Fragment>;
}

export default App;
