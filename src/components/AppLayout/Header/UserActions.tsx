import { useMutation } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS, { unAuthorized } from 'src/api/axiosInstance';
import { PowerOff } from 'src/components/Icons';

const UserActions = () => {
    //
    const { isLoading, mutate: logOutUser } = useMutation(logOutReq, {
        onSuccess: (data) => {
            if (data) unAuthorized();
        },
    });

    return (
        <div className="mx-2 text-red-600 hover:cursor-pointer hover:text-red-800" onClick={() => logOutUser()}>
            <PowerOff />
        </div>
    );
};

const logOutReq = async () => {
    const { data } = await AXIOS.post(apiRoutes.User.Logout);
    return data?.result;
};

export default UserActions;
