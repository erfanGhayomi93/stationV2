import { toast, ToastOptions } from 'react-toastify';
interface IonErrorNotifType extends ToastOptions {
    title: string;
}
//
export const apiErrorHandler = (data: string[]) => {
    // console.log({ reqApiError });
    //
    // let errorMessage = '';
    // if (Array.isArray(reqApiError)) {
    //     reqApiError.forEach((error) => {
    //         if (typeof error === 'string') {
    //             errorMessage = getResValue('ApiError', error);
    //         }
    //     });
    // }
    // onErrorNotif({
    //     message: 'خطا سرویس',
    //     description: errorMessage || 'خطا در پردازش اطلاعات',
    //     className: 'bg-danger-2',
    // });
};

//
//
//
//
//
// Success
export const onSuccessNotif = (options?: IonErrorNotifType) => {
    toast.success(options?.title || 'با موقفیت انجام شد', { ...options });
};
//
//
//
//
// Error

export const onErrorNotif = (options?: IonErrorNotifType) => {
    toast.error(options?.title || 'متاسفانه انجام نشد', { ...options });
};
