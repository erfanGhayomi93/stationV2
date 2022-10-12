import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';

import { toast } from 'react-toastify';

const loginFormSubmitReq = async (payload: IGTAuthorizationRequestType) => {
    const { data } = await AXIOS.post(apiRoutes.OAuthApi.authorization, payload);
    console.log({ data });
    return data?.result || {};
};

export const useLoginFormSubmit = <T,>(
    options?: Omit<UseMutationOptions<IGTAuthorizationResultType, T, IGTAuthorizationRequestType, unknown>, 'mutationFn'>,
) => {
    //

    return useMutation(loginFormSubmitReq, {
        ...options,
    });
};

const fetchCaptcha = async () => {
    const res = await axios.get<IGetCaptchaType>(apiRoutes.OAuthApi.captcha);
    return res.data;
};

export const useCaptcha = () => {
    return useQuery(['Captcha'], fetchCaptcha, {
        onSuccess: (data) => {
            data.result === 'TooRequest' && toast.error(data.result);
        },
        refetchInterval: 1000 * 60 * 2,
    });
};
