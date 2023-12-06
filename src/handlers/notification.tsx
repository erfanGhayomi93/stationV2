import { toast, ToastOptions } from 'react-toastify';
import { getResourceValue } from './boot';
interface IonErrorNotifType extends ToastOptions {
    title: string;
}
//
export const apiErrorHandler = (reqApiError: string[]) => {
    if (Array.isArray(reqApiError)) {
        reqApiError.forEach((error) => {
            onErrorNotif({
                title: getResourceValue('ApiError', error) || 'خطا در پردازش اطلاعات',
                className: 'bg-danger-2',
            });
        });
    }
};

//
//
//
//
//
// Success
export const onSuccessNotif = (options?: IonErrorNotifType) => {
    toast.success(options?.title || 'با موفقیت انجام شد', { ...options });
};
//
//
//
//
// Error

export const onErrorNotif = (options?: IonErrorNotifType) => {
    toast.error(options?.title || 'متاسفانه انجام نشد', { ...options });
};
