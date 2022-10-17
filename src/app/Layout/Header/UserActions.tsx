import { useMutation } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS, { unAuthorized } from 'src/api/axiosInstance';
import { Apis } from 'src/common/hooks/useApiRoutes/useApiRoutes';
import { PowerOff } from 'src/common/icons';

const UserActions = () => {
    //
    const { isLoading, mutate: logOutUser } = useMutation(logOutReq, {
        onSuccess: (data) => {
            if (data) unAuthorized();
        },
    });

    return (
        <div className="mx-2 text-L-error-150 cursor-pointer dark:text-L-error-150" onClick={() => logOutUser()}>
            <PowerOff />
        </div>
    );
};


const logOutReq = async () => {
    const { data } = await AXIOS.post(Apis().OAuthApi.logout as string);
    return data?.succeeded;
};

export default UserActions;
