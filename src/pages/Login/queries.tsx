import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS, { setAuthorizeData } from 'src/api/axiosInstance';
import { useAppDispatch, ReducerActionEnum as AppActionEnum } from 'src/contexts/app';

const loginFormSubmitReq = async ({ userName, password }: { userName: string; password: string }) => {
    const { data } = await AXIOS.post(apiRoutes.User.Login, { userName, password });
    return data?.result;
};

export const useLoginFormSubmit = () => {
    //
    const appDispatch = useAppDispatch();
    const navigate = useNavigate();

    return useMutation(loginFormSubmitReq, {
        onSuccess: (result: any) => {
            if (result) {
                setAuthorizeData(result?.token);
                appDispatch({
                    type: AppActionEnum.SET_APP_USER,
                    payload: { userName: result?.userName, firstName: result?.firstName, lastName: result?.lastName },
                });
                navigate('/');
            }
        },
    });
};
