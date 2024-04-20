import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import Cookies, { CookieAttributes } from 'js-cookie';
import { NavigateFunction } from 'react-router-dom';
import { apiErrorHandler, onErrorNotif } from 'src/handlers/notification';
import { setAppState } from 'src/redux/slices/global';
import { AppDispatch, store } from 'src/redux/store';
import { Navigate } from 'react-router-dom';
import i18next from 'i18next';

import qs from 'qs';
import ipcMain from 'src/common/classes/IpcMain';
import { pushEngine } from 'src/ls/pushEngine';

let routerNavigate: NavigateFunction | undefined;
// let appDispatch: AppDispatch | undefined;

export const tokenCookieName = 'ROS_client_id';

const AXIOS = axios.create({
    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' }),
});

AXIOS.interceptors.request.use(
    function (config: AxiosRequestConfig): AxiosRequestConfig {
        // Do something before request is sent

        const client_id = Cookies.get(tokenCookieName);
        if (client_id) config.headers!.Authorization = `Bearer ${client_id}`;

        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

AXIOS.interceptors.response.use(
    function (response: AxiosResponse) {
        // Any status code that lie within the range of 2xx cause this function to trigger

        if (response?.data?.succeeded === false) {
            try {
                const findError = !!response?.data?.errors.length ? response?.data?.errors[0] : response.data?.result.loginResultType;
                onErrorNotif({ title: i18next.t('Errors.' + findError) });
                // apiErrorHandler(response?.data?.errors);
                const error = new AxiosError(
                    response.data.errors ? response.data.errors : 'Client Error',
                    '400',
                    response.config,
                    response.request,
                    response,
                );
                // Attach the response instance, in case we would like to access it.
                error.response = response;
                return Promise.reject(error);
            } catch (err) {
                console.log('check error in response interceptors', err);
            }
        }

        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // console.log({ error });
        if (error.response) {
            // Request made and server responded
            console.log('error.response.status', error.response.status);

            switch (error.response.status) {
                case 400: // Bad Request
                    apiErrorHandler(error?.response?.data?.errors);
                    break;
                case 401: // Unauthorized
                    unAuthorized();
                    break;
                case 403: // Forbidden
                    onErrorNotif({ title: 'دسترسی غیرمجاز' });
                    break;
                case 404: // Not Found
                    if (import.meta.env.MODE === 'development') onErrorNotif({ title: 'یافت نشد' });
                    // else unAuthorized();
                    break;
                case 405: // Method Not Allowed
                    onErrorNotif({ title: 'عدم تطابق اطلاعات' });
                    break;
                case 408: // Request Timeout
                    onErrorNotif({ title: 'سرعت اینترنت خود را چک کنید' });
                    break;
                case 429: // Too Many Requests
                    onErrorNotif({ title: 'درخواست‌ها بیش از حد شمار' });
                    break;
                case 500: // Internal Server Error
                    onErrorNotif({ title: 'خطا در ارتباط با سرور' });
                    break;
                case 502: // Bad Gateway
                    onErrorNotif({ title: 'پاسخ نامعتبر است' });
                    break;
                case 503: // Service Unavailable
                    onErrorNotif({ title: 'سرویس‌ها در دسترسی نمی‌باشند' });
                    break;
                case 504: // Gateway Timeout
                    onErrorNotif({ title: 'پاسخی دریافت نشد' });
                    break;
                case 511: // Network Authentication Required
                    onErrorNotif({ title: 'عدم توانایی در احراز هویت برای دسترسی به اینترنت' });
                    break;
                default:
                    onErrorNotif({ title: 'خطا در پردازش اطلاعات' });
                    break;
            }
        } else if (error.request) {
            // The request was made but no response was received

            switch (error.message) {
                case 'Network Error':
                    onErrorNotif({ title: 'دسترسی خود به اینترنت را چک کنید' });
                    break;
                default:
                    onErrorNotif({ title: 'خطا در پردازش اطلاعات' });
                    break;
            }
        } else {
            // Something happened in setting up the request that triggered an Error
            // console.error('Error', error.message);
        }

        return Promise.reject(error);
    },
);

// export const transferFunctions = (routerNavigateFun: NavigateFunction, appDispatchFun : AppDispatch) => {
//     routerNavigate = routerNavigateFun;
//     appDispatch = store.dispatch;
// };

export const setAuthorizeData = (client_id: string) => {
    //
    if (!client_id) return;

    const expiresTimeInDay = import.meta.env.REACT_APP_CLIENT_ID_TIMEOUT ? +import.meta.env.REACT_APP_CLIENT_ID_TIMEOUT : 1;

    const options: CookieAttributes = {
        expires: expiresTimeInDay,
        path: '/',
        // httpOnly: true,
        secure: true,
        sameSite: 'Lax',
    };

    // if (window.REACT_APP_ENV === 'production') {
    // options.secure = true;
    // options.sameSite = 'Lax';
    // options.httpOnly = true;
    // }

    Cookies.set(tokenCookieName, client_id, options);
    AXIOS.defaults.headers.common['Authorization'] = `Bearer ${client_id}`;
};

export const unAuthorized = () => {
    const appDispatch = store.dispatch;
    appDispatch && appDispatch(setAppState('LoggedOut'));
    pushEngine.disConnect();
    Cookies.remove(tokenCookieName);
    delete AXIOS.defaults.headers.common['Authorization'];
    ipcMain.send('unAuthorized');
    // routerNavigate && routerNavigate('/login');
};

export default AXIOS;
