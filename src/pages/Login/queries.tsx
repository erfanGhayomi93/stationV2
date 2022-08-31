import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS, { setAuthorizeData } from 'src/api/axiosInstance';
import { useAppDispatch } from 'src/redux/hooks';
import { setAppUser } from 'src/redux/slices/global';

const loginFormSubmitReq = async (payload: any) => {
    const { data } = await AXIOS.post(apiRoutes.OAuthApi.authorization, payload);
    return data?.result || {};
};

export const useLoginFormSubmit = () => {
    //
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();

    return useMutation(loginFormSubmitReq, {
        onSuccess: (result) => {
            if (result) {
                setAuthorizeData(result?.token);
                appDispatch(setAppUser({ userName: 'soheilkh', firstName: 'جواد', lastName: 'بینایی' }));
                navigate('/');
            }
        },
    });
};

const fetchCaptcha = async () => {
    const { data } = await axios.get<{ key: string; base64String: string }>(apiRoutes.OAuthApi.captcha);
    return { key: data.key, base64String: data.base64String };
};

export const useCaptcha = () => {
    return useQuery(['Captcha'], fetchCaptcha);
};
