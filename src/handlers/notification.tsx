import { toast } from 'react-toastify';

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
export const onSuccessNotif: (options?: any) => void = (options = {}) => {};

//
//
//
//
// Error
export const onErrorNotif: (options?: any) => void = (options = {}) => {};
