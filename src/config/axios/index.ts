import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

export const tokenCookieName = 'ROS_2_client_id';

const AXIOS = axios
     .create
     // {    paramsSerializer: (params) => qs.stringify(params, { arrayFormat: 'repeat' })}
     ();

AXIOS.interceptors.request.use(
     function (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig> {
          // const client_id = Cookies.get(tokenCookieName);
          const client_id = 'QYZkRauNnpbib2snK251LPTdonNh18Qwc7SGludCLtxx1sgkwChTQGQ4QrYB7EkR';
          if (client_id) config.headers.Authorization = `Bearer ${client_id}`;

          return config;
     },
     function (error) {
          return Promise.reject(error instanceof Error ? error : new Error(String(error)));
     }
);

AXIOS.interceptors.response.use(function (response: AxiosResponse) {
     if (response?.data?.succeeded === false) {
          try {
               // const findError = !!response?.data?.errors.length ? response?.data?.errors[0] : response.data?.result.loginResultType;
               // onErrorNotif({ title: i18next.t('Errors.' + findError) });
               const error = new AxiosError(
                    response.data.errors ? response.data.errors : 'Client Error',
                    '400',
                    response.config,
                    response.request,
                    response
               );
               // Attach the response instance, in case we would like to access it.
               error.response = response;
               return Promise.reject(error);
          } catch (err) {
               console.log('check error in response interceptors', err);
          }
     }

     return response;
});

export default AXIOS;
