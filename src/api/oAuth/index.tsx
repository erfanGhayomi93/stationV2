import AXIOS from '@config/axios';
import { routeApi } from '@router/routeApi';
import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useCaptcha = () => {
     const url = routeApi().OAuth.captcha;

     let countRefreshCaptcha = 1;
     const numberRevalidate = 16;
     const longRevalidate = 1.9 * 60 * 1000;

     const getSessionCaptcha = sessionStorage.getItem('isInvalidCaptcha');

     const isEnableInterval = () => {
          if (countRefreshCaptcha < numberRevalidate) {
               return true;
          }

          return false;
     };

     return useQuery({
          queryKey: ['Captcha'],
          queryFn: async () => {
               const response = await AXIOS.get<IGetCaptchaType>(url);

               if (response.status === 200) {
                    if (getSessionCaptcha) {
                         countRefreshCaptcha = 0;
                         sessionStorage.removeItem('isInvalidCaptcha');
                    }
                    if (countRefreshCaptcha >= numberRevalidate) {
                         sessionStorage.setItem('isInvalidCaptcha', 'true');
                         toast.warning('کد امنیتی منقضی شده است، لطفا مجدد تلاش کنید');
                    }

                    if (response.data.result === 'TooRequest') {
                         toast.error(response.data.result);
                    }
               }

               return response.data;
          },
          refetchInterval: isEnableInterval() ? longRevalidate : false,
     });
};

export const useLoginFormSubmit = (
     options?: Omit<UseMutationOptions<IGTAuthorizationResultType, IGTAuthorizationRequestType, unknown>, 'mutationFn'>
) => {
     const url = routeApi().OAuth.authorization;

     return useMutation({
          mutationFn: async (params: IGTAuthorizationRequestType) => {
               const { data } = await AXIOS.post(url, params, {
                    headers: {
                         'X-TestEnv':
                              import.meta.env.MODE === 'development' ? '@!F4NYBkG^Y203LobM}6Kj#jYU&5uE1oJ&xR%tBGugO#I0pPfw' : '',
                    },
               });

               return data?.result;
          },
          ...options,
     });
};

export const useLogout = () => {
     const url = routeApi().OAuth.logout;

     return useMutation({
          mutationFn: async () => {
               const { data } = await AXIOS.post<GlobalApiResponseType<string>>(url);

               return data.succeeded;
          },
     });
};
