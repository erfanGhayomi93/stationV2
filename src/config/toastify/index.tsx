import useDarkMode from '@hooks/useDarkMode';
import { Bounce, ToastContainer, ToastOptions, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

interface IonErrorNotifType extends ToastOptions {
     title: string;
}

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


// Success
export const onSuccessNotif = (options?: IonErrorNotifType) => {
     toast.success(options?.title || 'با موفقیت انجام شد', { ...options });
};
// Error
export const onErrorNotif = (options?: IonErrorNotifType) => {
     toast.error(options?.title || 'متاسفانه انجام نشد', { ...options });
};
// info
export const onInfoNotif = (options?: IonErrorNotifType) => {
     toast.info(options?.title || 'پیام پیش فرض سیستم می باشد', { ...options });
};

