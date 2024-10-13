import useDarkMode from '@hooks/useDarkMode';
import { Bounce, ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const ToastContainerCom = () => {
     const isDark = useDarkMode();

     return (
          <ToastContainer
               rtl
               draggable
               draggablePercent={60}
               transition={Bounce}
               limit={3}
               autoClose={3000}
               position="bottom-left"
               stacked
               theme={isDark ? 'dark' : 'light'}
          />
     );
};

export default ToastContainerCom;
