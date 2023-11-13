import { useMutation, UseMutationOptions, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import AXIOS from 'src/api/axiosInstance';

import { toast } from 'react-toastify';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';


//*mutate login
const loginFormSubmitReq = async (payload: IGTAuthorizationRequestType) => {
    const { data } = await AXIOS.post(Apis().OAuthApi.authorization as string, payload, {
        headers: {
            'X-TestEnv': process.env.NODE_ENV === 'development' ? '@!F4NYBkG^Y203LobM}6Kj#jYU&5uE1oJ&xR%tBGugO#I0pPfw' : '',
        },
    });
    return data?.result || {};
};

export const useLoginFormSubmit = <T,>(
    options?: Omit<UseMutationOptions<IGTAuthorizationResultType, T, IGTAuthorizationRequestType, unknown>, 'mutationFn'>,
) => useMutation(loginFormSubmitReq, {
    ...options,
});





//*mutate forgetPassword Request
const forgetPasswordRequestFormSubmit = async (payload: ISubmitForgetPasswordRequest) => {
    const { data } = await AXIOS.post(Apis().OAuthApi.forgetPasswordRequest, payload);
    return data || {};
};

export const useForgetPasswordRequestMutate = (
    options?: Omit<UseMutationOptions<GlobalApiResponseType<IResultForgetPasswordRequest>, unknown, ISubmitForgetPasswordRequest, unknown>, 'mutationFn'>,
) => useMutation(forgetPasswordRequestFormSubmit, {
    ...options,
});

//*mutate forgetPassword Validation
const forgetPasswordValidationFormSubmit = async (payload: ISubmitForgetPasswordValidation) => {
    const { data } = await AXIOS.post(Apis().OAuthApi.forgetPasswordValidation, payload);
    return data || {};
};

export const useForgetPasswordValidationMutate = (
    options?: Omit<UseMutationOptions<GlobalApiResponseType<string>, unknown, ISubmitForgetPasswordValidation, unknown>, 'mutationFn'>,
) => useMutation(forgetPasswordValidationFormSubmit, {
    ...options,
});

//*mutate forgetPassword ChangePassword
const forgetPasswordChangeFormSubmit = async (payload: ISubmitForgetPasswordChange) => {
    const { data } = await AXIOS.post(Apis().OAuthApi.forgetPasswordChangePassword, payload);
    return data || {};
};

export const useForgetPasswordChangeMutate = (
    options?: Omit<UseMutationOptions<GlobalApiResponseType<string>, unknown, ISubmitForgetPasswordChange, unknown>, 'mutationFn'>,
) => useMutation(forgetPasswordChangeFormSubmit, {
    ...options,
});





//*mutate changePassword Request

const changePasswordRequestFormSubmit = async () => {
    const { data } = await AXIOS.post(Apis().OAuthApi.changePasswordRequest);
    return data || {};
};

export const useChangePasswordRequestMutate = (
    options?: Omit<UseMutationOptions<GlobalApiResponseType<IResultForgetPasswordRequest>>, 'mutationFn'>,
) => useMutation(changePasswordRequestFormSubmit, {
    ...options,
});

//*mutate changePassword validation

const changePasswordValidationFormSubmit = async (payload: ISubmitChangePasswordValidation) => {
    const { data } = await AXIOS.post(Apis().OAuthApi.changePasswordValidation, payload);
    return data || {};
};

export const useChangePasswordValidationMutate = (
    options?: Omit<UseMutationOptions<GlobalApiResponseType<string>, unknown, ISubmitChangePasswordValidation>, 'mutationFn'>,
) => useMutation(changePasswordValidationFormSubmit, {
    ...options,
});

//*mutate changePassword setPassword

const changePasswordSetPasswordFormSubmit = async (payload: ISubmitChangePasswordSetPassword) => {
    const { data } = await AXIOS.post(Apis().OAuthApi.changePasswordSetPassword, payload);
    return data || {};
};

export const useChangePasswordSetPasswordMutate = (
    options?: Omit<UseMutationOptions<GlobalApiResponseType<string>, unknown, ISubmitChangePasswordSetPassword>, 'mutationFn'>,
) => useMutation(changePasswordSetPasswordFormSubmit, {
    ...options,
});






//*query captcha
const fetchCaptcha = async () => {
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
