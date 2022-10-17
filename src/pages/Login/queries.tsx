import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';

import { toast } from 'react-toastify';
import { Apis, getApiPath } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const loginFormSubmitReq = async (payload: IGTAuthorizationRequestType) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.post(Apis().OAuthApi.authorization as string, payload);
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
    const apiRoutes = getApiPath();
    const res = await axios.get<IGetCaptchaType>(Apis().OAuthApi.captcha as string);
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
