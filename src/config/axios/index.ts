import { routerPage, routerPagePath } from '@router/routerPage';
import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

export const tokenCookieName = 'ROS_client_id';

const toastError = (text: string, id: string) => {
     toast.error(text, {
          toastId: id,
     });
};

const AXIOS = axios
     .create
     // {    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })}
     ();

AXIOS.interceptors.request.use(
     function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
          const client_id = Cookies.get(tokenCookieName);

          if (client_id) config.headers.Authorization = `Bearer ${client_id}`;

          return config;
     },
     function (error) {
          return Promise.reject(error instanceof Error ? error : new Error(String(error)));
     }
);

AXIOS.interceptors.response.use(
     function (response: AxiosResponse) {
          if (response?.data?.succeeded === false) {
               try {
                    const error = new AxiosError(
                         response.data.errors ? response.data.errors : 'Client Error',
                         '400',
                         response.config,
                         response.request,
                         response
                    );

                    error.response = response;
                    return Promise.reject(error);
               } catch (err) {
                    console.log('check error in response interceptors', err);
               }
          }

          return response;
     },

     function (error) {
          if (error.response) {

               switch (error.response.status) {
                    case 400:
                         toastError('دسترسی غیرمجاز', 'Bad Request');
                         break;
                    case 401:
                         unAuthorized();
                         break;
                    case 403:
                         toastError('دسترسی غیرمجاز', 'Forbidden');
                         break;
                    case 404:
                         if (import.meta.env.MODE === 'development') toastError('یافت نشد', 'Not Found');
                         break;
                    case 405:
                         toastError('عدم تطابق اطلاعات', 'Method Not Allowed');
                         break;
                    case 408:
                         toastError('سرعت اینترنت خود را چک کنید', 'Request Timeout');
                         break;
                    case 429:
                         toastError('درخواست‌ها بیش از حد شمار', 'Too Many Requests');
                         break;
                    case 500:
                         toastError('خطا در ارتباط با سرور', 'Internal Server Error');
                         break;
                    case 502:
                         toastError('پاسخ نامعتبر است', 'Bad Gateway');
                         break;
                    case 503:
                         toastError('سرویس‌ها در دسترسی نمی‌باشند', 'Service Unavailable');
                         break;
                    case 504:
                         toastError('پاسخی دریافت نشد', 'Gateway Timeout');
                         break;
                    case 511:
                         toastError('عدم توانایی در احراز هویت برای دسترسی به اینترنت', 'Network Authentication Required');
                         break;
                    default:
                         toastError('خطا در پردازش اطلاعات', 'Default error');
                         break;
               }
          } else if (error.request) {
               switch (error.message) {
                    case 'Network Error':
                         toastError('دسترسی خود به اینترنت را چک کنید', 'Network Error');
                         break;
                    default:
                         toastError('خطا در پردازش اطلاعات', 'Default Error');
                         break;
               }
          } else {
               // Something happened in setting up the request that triggered an Error
               // console.error('Error', error.message);
          }

          return Promise.reject(error);
     }
);

export const setAuthorizeData = (client_id: string) => {
     const expiresTimeInDay = import.meta.env.REACT_APP_CLIENT_ID_TIMEOUT ? +import.meta.env.REACT_APP_CLIENT_ID_TIMEOUT : 1;

     Cookies.set(tokenCookieName, client_id, {
          expires: expiresTimeInDay,
          path: '/',
          secure: true,
          sameSite: 'Lax',
     });
};

export const unAuthorized = () => {
     routerPage.navigate(routerPagePath.oAuth.logout);
};

export default AXIOS;
