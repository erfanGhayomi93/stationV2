import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { NavigateFunction } from 'react-router-dom';
import Cookies from 'js-cookie';
import { onErrorNotif, apiErrorHandler } from 'src/handlers/notification';
import { AppDispatch } from 'src/redux/store';
import { setAppState } from 'src/redux/slices/global';
// import { configMockAdapter } from 'src/api_mock/config';

let routerNavigate: NavigateFunction | undefined;
let appDispatch: AppDispatch | undefined;

const tokenCookieName = 'ROS_client_id';

const AXIOS = axios.create();

// // MockAdapter
// configMockAdapter(AXIOS);

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
            apiErrorHandler(response?.data?.errors);

            const error: any = new Error(response.data.errors);
            // Attach the response instance, in case we would like to access it.
            error.response = response;
            throw error;
        }

        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger

        if (error.response) {
            // Request made and server responded

            switch (error.response.status) {
                case 400: // Bad Request
                    apiErrorHandler(error?.response?.data?.errors);
                    break;
                case 401: // Unauthorized
                    unAuthorized();
                    break;
                case 403: // Forbidden
                    onErrorNotif({ description: 'دسترسی غیرمجاز' });
                    break;
                case 404: // Not Found
                    if (process.env.NODE_ENV === 'development') onErrorNotif({ description: 'یافت نشد' });
                    else unAuthorized();
                    break;
                case 405: // Method Not Allowed
                    onErrorNotif({ description: 'عدم تطابق اطلاعات' });
                    break;
                case 408: // Request Timeout
                    onErrorNotif({ description: 'سرعت اینترنت خود را چک کنید' });
                    break;
                case 429: // Too Many Requests
                    onErrorNotif({ description: 'درخواست‌ها بیش از حد شمار' });
                    break;
                case 500: // Internal Server Error
                    onErrorNotif({ description: 'خطا در ارتباط با سرور' });
                    break;
                case 502: // Bad Gateway
                    onErrorNotif({ description: 'پاسخ نامعتبر است' });
                    break;
                case 503: // Service Unavailable
                    onErrorNotif({ description: 'سرویس‌ها در دسترسی نمی‌باشند' });
                    break;
                case 504: // Gateway Timeout
                    onErrorNotif({ description: 'پاسخی دریافت نشد' });
                    break;
                case 511: // Network Authentication Required
                    onErrorNotif({ description: 'عدم توانایی در احراز هویت برای دسترسی به اینترنت' });
                    break;
                default:
                    onErrorNotif({ description: 'خطا در پردازش اطلاعات' });
                    break;
            }
        } else if (error.request) {
            // The request was made but no response was received

            switch (error.message) {
                case 'Network Error':
                    onErrorNotif({ description: 'دسترسی خود به اینترنت را چک کنید' });
                    break;
                default:
                    onErrorNotif({ description: 'خطا در پردازش اطلاعات' });
                    break;
            }
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }

        return Promise.reject(error);
    },
);

export const transferFunctions = (routerNavigateFun: NavigateFunction, appDispatchFun: AppDispatch) => {
    routerNavigate = routerNavigateFun;
    appDispatch = appDispatchFun;
};

export const setAuthorizeData = (client_id: string) => {
    //
    if (!client_id) return;

    const expiresTimeInDay = process.env.REACT_APP_CLIENT_ID_TIMEOUT ? +process.env.REACT_APP_CLIENT_ID_TIMEOUT : 1;

    const options: any = {
        expires: expiresTimeInDay,
        path: '/',
    };

    if (window.APP_ENV === 'production') {
        options.secure = true;
        options.sameSite = 'Lax';
    }

    Cookies.set(tokenCookieName, client_id, options);
    AXIOS.defaults.headers.common['Authorization'] = `Bearer ${client_id}`;
};

export const unAuthorized = () => {
    //
    appDispatch && appDispatch(setAppState('LoggedOut'));
    Cookies.remove(tokenCookieName);
    delete AXIOS.defaults.headers.common['Authorization'];
    routerNavigate && routerNavigate('/login');
};

export default AXIOS;
