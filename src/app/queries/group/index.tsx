import { useQuery } from '@tanstack/react-query';
import apiRoutes from 'src/api/apiRoutes';
import AXIOS from 'src/api/axiosInstance';
import { Apis, getApiPath } from 'src/common/hooks/useApiRoutes/useApiRoutes';

const GetGroupInformation = async (params: IGetGroupInformationRequestType) => {
    const apiRoutes = getApiPath();

    const { data } = await AXIOS.get<GlobalApiResponseType<IGroupInformationResultType>>(Apis().Customer.GetGroupInformation as string, {
        params,
    });
    return data.result || [];
};

export const useGroupInformation = (param: IGetGroupInformationRequestType) => {
    return useQuery(['GetGroupInformation', param], ({ queryKey }) => GetGroupInformation(queryKey[1] as IGetGroupInformationRequestType), {
        enabled: !!param.groupId,
    });
};
